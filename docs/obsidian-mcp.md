# Obsidian MCP

Этот сервер подключает vault Obsidian `C:\Projects\obsidian\tirscript` к MCP по `stdio`.

## Что умеет

- `list_notes`
- `read_note`
- `search_notes`
- `write_note`
- `append_note`

Сервер ограничен рамками vault и не даёт выходить за его пределы по пути файла.

## Запуск

Из корня проекта:

```powershell
node scripts/obsidian-mcp.mjs
```

Если vault переедет, можно переопределить путь:

```powershell
$env:OBSIDIAN_VAULT_PATH='C:\Projects\obsidian\tirscript'
node scripts/obsidian-mcp.mjs
```

## Пример MCP-конфига

Пример для клиента, который принимает `mcpServers`:

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "node",
      "args": ["C:\\Projects\\2026\\pm-admin\\scripts\\obsidian-mcp.mjs"],
      "env": {
        "OBSIDIAN_VAULT_PATH": "C:\\Projects\\obsidian\\tirscript"
      }
    }
  }
}
```

## Что дальше

Если нужен более тесный мост именно с Obsidian API, можно следующим шагом сделать отдельный Obsidian plugin, который добавит:

- active note
- backlinks
- tags и frontmatter
- запуск команд Obsidian
- доступ к metadata cache
