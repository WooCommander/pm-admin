// Гоняем vue-tsc, но пропускаем шум из node_modules/tir-pm-*
// (в части пакетов с verdaccio не выключены unused-locals и т.п. —
// не наша забота).
// Фейлим билд только если есть ошибки в нашем src/.
import { spawn } from 'node:child_process'

const tsc = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['vue-tsc', '--noEmit'],
  { 
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: process.platform === 'win32' 
  },
)

let stdout = ''
tsc.stdout.on('data', (c) => (stdout += c.toString()))
tsc.stderr.on('data', (c) => (stdout += c.toString()))

tsc.on('close', () => {
  const lines = stdout.split(/\r?\n/)
  const ownErrors = lines.filter((l) => l.startsWith('src/') || l.startsWith('env.d.ts') || l.startsWith('webpack.config.js'))
  if (ownErrors.length) {
    console.error(ownErrors.join('\n'))
    console.error(`\n✗ type-check failed: ${ownErrors.length} error(s) in project sources.`)
    process.exit(1)
  }
  console.log('✓ type-check: project sources are clean.')
})
