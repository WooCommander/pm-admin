import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_VAULT_PATH = 'C:\\Projects\\obsidian\\tirscript';
const vaultRoot = path.resolve(process.env.OBSIDIAN_VAULT_PATH ?? DEFAULT_VAULT_PATH);

const serverInfo = {
  name: 'obsidian-vault-mcp',
  version: '0.1.0',
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder('utf-8');

let inputBuffer = Buffer.alloc(0);

const MIME_JSON = 'application/json';

const tools = [
  {
    name: 'list_notes',
    description: 'List markdown notes in the Obsidian vault. Optionally filter by a relative folder path.',
    inputSchema: {
      type: 'object',
      properties: {
        folder: {
          type: 'string',
          description: 'Relative vault folder to scan. Defaults to the vault root.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'read_note',
    description: 'Read a markdown note from the Obsidian vault by relative path.',
    inputSchema: {
      type: 'object',
      properties: {
        notePath: {
          type: 'string',
          description: 'Relative path to the note inside the vault, for example Daily/2026-04-25.md.',
        },
      },
      required: ['notePath'],
      additionalProperties: false,
    },
  },
  {
    name: 'search_notes',
    description: 'Search markdown notes by plain text query.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Case-insensitive plain text query.',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of matching notes to return. Defaults to 20.',
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'write_note',
    description: 'Create or replace a markdown note in the vault.',
    inputSchema: {
      type: 'object',
      properties: {
        notePath: {
          type: 'string',
          description: 'Relative path to the note inside the vault.',
        },
        content: {
          type: 'string',
          description: 'Full markdown content to write.',
        },
      },
      required: ['notePath', 'content'],
      additionalProperties: false,
    },
  },
  {
    name: 'append_note',
    description: 'Append markdown content to the end of a note, creating it if needed.',
    inputSchema: {
      type: 'object',
      properties: {
        notePath: {
          type: 'string',
          description: 'Relative path to the note inside the vault.',
        },
        content: {
          type: 'string',
          description: 'Markdown content to append.',
        },
      },
      required: ['notePath', 'content'],
      additionalProperties: false,
    },
  },
];

process.stdin.on('data', (chunk) => {
  inputBuffer = Buffer.concat([inputBuffer, chunk]);
  consumeFrames().catch((error) => {
    logError('Failed to consume MCP frame', error);
  });
});

process.stdin.on('end', () => {
  process.exit(0);
});

async function consumeFrames() {
  while (true) {
    const headerEnd = inputBuffer.indexOf('\r\n\r\n');

    if (headerEnd === -1) {
      return;
    }

    const headerText = inputBuffer.subarray(0, headerEnd).toString('utf-8');
    const contentLength = parseContentLength(headerText);

    if (contentLength === null) {
      throw new Error(`Missing Content-Length header: ${headerText}`);
    }

    const frameStart = headerEnd + 4;
    const frameEnd = frameStart + contentLength;

    if (inputBuffer.length < frameEnd) {
      return;
    }

    const payloadBuffer = inputBuffer.subarray(frameStart, frameEnd);
    inputBuffer = inputBuffer.subarray(frameEnd);

    const message = JSON.parse(textDecoder.decode(payloadBuffer));
    await handleMessage(message);
  }
}

function parseContentLength(headerText) {
  const headers = headerText.split('\r\n');

  for (const header of headers) {
    const separatorIndex = header.indexOf(':');

    if (separatorIndex === -1) {
      continue;
    }

    const key = header.slice(0, separatorIndex).trim().toLowerCase();
    const value = header.slice(separatorIndex + 1).trim();

    if (key === 'content-length') {
      const parsed = Number.parseInt(value, 10);
      return Number.isFinite(parsed) ? parsed : null;
    }
  }

  return null;
}

async function handleMessage(message) {
  if (message.method === 'notifications/initialized') {
    return;
  }

  if (!Object.hasOwn(message, 'id')) {
    return;
  }

  try {
    const result = await routeRequest(message.method, message.params ?? {});
    writeResponse({
      jsonrpc: '2.0',
      id: message.id,
      result,
    });
  } catch (error) {
    writeResponse({
      jsonrpc: '2.0',
      id: message.id,
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : 'Unknown MCP server error',
      },
    });
  }
}

async function routeRequest(method, params) {
  switch (method) {
    case 'initialize':
      return {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo,
      };
    case 'tools/list':
      return {
        tools,
      };
    case 'tools/call':
      return callTool(params.name, params.arguments ?? {});
    default:
      throw new Error(`Unsupported MCP method: ${method}`);
  }
}

async function callTool(name, args) {
  switch (name) {
    case 'list_notes':
      return successPayload(await listNotes(args.folder));
    case 'read_note':
      return successPayload(await readNote(args.notePath));
    case 'search_notes':
      return successPayload(await searchNotes(args.query, args.limit));
    case 'write_note':
      return successPayload(await writeNote(args.notePath, args.content));
    case 'append_note':
      return successPayload(await appendNote(args.notePath, args.content));
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function successPayload(data) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
        mimeType: MIME_JSON,
      },
    ],
  };
}

async function listNotes(folder = '') {
  const root = await resolveVaultPath(folder, { allowMissing: false, allowDirectory: true });
  const collected = [];
  await walkMarkdownFiles(root, collected);

  const notes = collected
    .map((filePath) => ({
      path: toVaultRelativePath(filePath),
      title: path.basename(filePath, path.extname(filePath)),
    }))
    .sort((left, right) => left.path.localeCompare(right.path));

  return {
    vaultRoot,
    count: notes.length,
    notes,
  };
}

async function readNote(notePath) {
  assertString(notePath, 'notePath');
  const resolvedPath = await resolveVaultPath(notePath, { allowMissing: false, allowDirectory: false });
  const content = await fs.readFile(resolvedPath, 'utf8');

  return {
    path: toVaultRelativePath(resolvedPath),
    content,
  };
}

async function searchNotes(query, limit = 20) {
  assertString(query, 'query');
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new Error('query must not be empty');
  }

  const normalizedLimit = Number.isFinite(limit) ? Math.max(1, Math.min(100, Math.trunc(limit))) : 20;
  const files = [];
  await walkMarkdownFiles(vaultRoot, files);

  const results = [];
  const loweredQuery = trimmedQuery.toLowerCase();

  for (const filePath of files) {
    if (results.length >= normalizedLimit) {
      break;
    }

    const content = await fs.readFile(filePath, 'utf8');
    const loweredContent = content.toLowerCase();
    const firstMatchIndex = loweredContent.indexOf(loweredQuery);

    if (firstMatchIndex === -1) {
      continue;
    }

    results.push({
      path: toVaultRelativePath(filePath),
      preview: makePreview(content, firstMatchIndex, trimmedQuery.length),
    });
  }

  return {
    query: trimmedQuery,
    count: results.length,
    results,
  };
}

async function writeNote(notePath, content) {
  assertString(notePath, 'notePath');
  assertString(content, 'content');

  const resolvedPath = await resolveVaultPath(notePath, { allowMissing: true, allowDirectory: false });
  await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
  await fs.writeFile(resolvedPath, content, 'utf8');

  return {
    path: toVaultRelativePath(resolvedPath),
    bytes: Buffer.byteLength(content, 'utf8'),
    operation: 'write',
  };
}

async function appendNote(notePath, content) {
  assertString(notePath, 'notePath');
  assertString(content, 'content');

  const resolvedPath = await resolveVaultPath(notePath, { allowMissing: true, allowDirectory: false });
  await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
  await fs.appendFile(resolvedPath, content, 'utf8');

  return {
    path: toVaultRelativePath(resolvedPath),
    bytes: Buffer.byteLength(content, 'utf8'),
    operation: 'append',
  };
}

async function walkMarkdownFiles(rootPath, collected) {
  const entries = await fs.readdir(rootPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === '.obsidian') {
        continue;
      }

      await walkMarkdownFiles(fullPath, collected);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      collected.push(fullPath);
    }
  }
}

async function resolveVaultPath(inputPath, options) {
  const relativeInput = inputPath ?? '';
  const normalizedInput = relativeInput.replaceAll('/', path.sep);
  const resolvedPath = path.resolve(vaultRoot, normalizedInput);
  const relativePath = path.relative(vaultRoot, resolvedPath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Path escapes vault root: ${inputPath}`);
  }

  return ensurePathState(resolvedPath, options);
}

function ensurePathState(resolvedPath, options) {
  return fs.stat(resolvedPath)
    .then((stats) => {
      if (stats.isDirectory() && !options.allowDirectory) {
        throw new Error(`Expected a file path, got directory: ${resolvedPath}`);
      }

      return resolvedPath;
    })
    .catch((error) => {
      if (error && error.code === 'ENOENT') {
        if (options.allowMissing) {
          return resolvedPath;
        }

        throw new Error(`Path does not exist in vault: ${resolvedPath}`);
      }

      throw error;
    });
}

function toVaultRelativePath(filePath) {
  return path.relative(vaultRoot, filePath).split(path.sep).join('/');
}

function makePreview(content, startIndex, matchLength) {
  const previewStart = Math.max(0, startIndex - 60);
  const previewEnd = Math.min(content.length, startIndex + matchLength + 60);

  return content
    .slice(previewStart, previewEnd)
    .replace(/\s+/g, ' ')
    .trim();
}

function assertString(value, fieldName) {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }
}

function writeResponse(payload) {
  const body = textEncoder.encode(JSON.stringify(payload));
  const header = `Content-Length: ${body.byteLength}\r\nContent-Type: ${MIME_JSON}\r\n\r\n`;
  process.stdout.write(header);
  process.stdout.write(body);
}

function logError(message, error) {
  const details = error instanceof Error ? `${error.message}\n${error.stack ?? ''}` : String(error);
  process.stderr.write(`[obsidian-mcp] ${message}\n${details}\n`);
}
