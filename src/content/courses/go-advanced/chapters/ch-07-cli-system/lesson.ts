import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-cli-system',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-go-adv-07-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Package flag dan Environment Variables',
      content: `## Package flag

Package \`flag\` adalah cara paling sederhana untuk membuat CLI di Go. flag mendukung:
- Flags dengan tipe bool, int, string, dan duration.
- Flag posisi setelah parsing.
- Help otomatis dengan \`-h\`.

\`\`\`go
var port = flag.Int("port", 8080, "server port")
flag.Parse()
\`\`\`

## Environment Variables

Prinsip **12-factor app** menyarankan agar konfigurasi disimpan di environment variables, bukan di kode. Di Go, gunakan \`os.Getenv\` atau library seperti \`github.com/joho/godotenv\` untuk development.

Keuntungan environment variables:
- Konfigurasi terpisah dari kode.
- Mudah diubah antar environment (dev, staging, production).
- Tidak perlu rebuild untuk mengubah konfigurasi.`,
    },
    {
      id: 'sec-go-adv-07-js',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-07-js',
        filename: 'cli-args.mjs',
        language: 'javascript',
        title: 'JavaScript: Parsing process.argv',
        code: `const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = portIndex >= 0 ? parseInt(args[portIndex + 1], 10) : 3000;

const nodeEnv = process.env.NODE_ENV || 'development';

console.log({ port, nodeEnv });`,
        explanation:
          'Node.js menyediakan process.argv untuk argumen CLI dan process.env untuk environment variables. Go memiliki package flag dan os.Getenv untuk keperluan serupa.',
      },
    },
    {
      id: 'sec-go-adv-07-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Cobra dan Subcommands',
      content: `## Cobra

Cobra adalah library CLI populer yang digunakan oleh Docker, Kubernetes, dan Hugo. Fitur utama:
- Subcommands dengan hierarki.
- Flags global (persistent) dan lokal.
- Generated help dan shell completion.
- Hook PreRun/PostRun.

\`\`\`go
var rootCmd = &cobra.Command{
    Use:   "myapp",
    Short: "A brief description",
    Run: func(cmd *cobra.Command, args []string) {
        // logic
    },
}
\`\`\`

## urfave/cli

Alternatif cobra adalah urfave/cli yang lebih ringan dan menggunakan pola app-level flags. Pilihan antara keduanya tergantung pada kompleksitas CLI dan preferensi tim.

## Configuration File

Untuk CLI yang kompleks, konfigurasi bisa disimpan dalam file (JSON, YAML, TOML). Library populer:
- \`spf13/viper\`: mendukung file config, env, dan flags dalam satu hierarchy.
- \`knadh/koanf\`: lightweight alternative dengan dukungan multiple providers.`,
    },
    {
      id: 'sec-go-adv-07-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-07-ts',
        filename: 'commander-cli.ts',
        language: 'typescript',
        title: 'TypeScript: CLI dengan commander',
        code: `import { Command } from 'commander';

const program = new Command();

program
  .name('mycli')
  .description('CLI sederhana dengan TypeScript')
  .version('1.0.0');

program
  .command('greet <name>')
  .description('sapa pengguna')
  .option('-u, --uppercase', 'gunakan huruf kapital')
  .action((name: string, options: { uppercase?: boolean }) => {
    const message = \`Halo, \${name}!\`;
    console.log(options.uppercase ? message.toUpperCase() : message);
  });

program.parse();`,
        explanation:
          'commander.js di TypeScript menawarkan subcommand, options, dan action handler. Cobra di Go memiliki konsep serupa tetapi dengan generated help dan shell completion bawaan.',
      },
    },
    {
      id: 'sec-go-adv-07-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Signal Handling, Graceful Shutdown, dan File Watcher',
      content: `## Signal Handling

Package \`os/signal\` memungkinkan program menerima sinyal dari OS seperti:
- \`SIGINT\`: biasanya dari Ctrl+C.
- \`SIGTERM\`: permintaan terminasi dari process manager atau container orchestrator.
- \`SIGHUP\`: sering digunakan untuk reload konfigurasi.

## Graceful Shutdown

**Graceful shutdown** memastikan bahwa:
- Request yang sedang diproses selesai sebelum keluar.
- Koneksi database ditutup dengan benar.
- Goroutine background diberhentikan secara terkontrol.

Pola umum:
1. Buat channel untuk sinyal.
2. Jalankan http.Server di goroutine.
3. Tunggu sinyal di goroutine utama.
4. Panggil \`server.Shutdown(ctx)\` dengan timeout.

## File Watcher

Package \`github.com/fsnotify/fsnotify\` memungkinkan program memantau perubahan file atau direktori. Berguna untuk:
- Hot reload konfigurasi.
- Trigger build/test saat file berubah.
- Monitoring log atau aset.

## Daemon Basics

Daemon adalah proses yang berjalan di background. Di Go modern, biasanya kita tidak membuat daemon manual tetapi menggunakan process manager seperti systemd, supervisord, atau container runtime.`,
    },
    {
      id: 'sec-go-adv-07-go',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-07-go',
        filename: 'graceful_server.go',
        language: 'go',
        title: 'Go: Graceful Shutdown dengan Signal Handling',
        code: `package main

import (
\t"context"
\t"fmt"
\t"net/http"
\t"os"
\t"os/signal"
\t"syscall"
\t"time"
)

func main() {
\tmux := http.NewServeMux()
\tmux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
\t\ttime.Sleep(2 * time.Second)
\t\tfmt.Fprintln(w, "done")
\t})

\tserver := &http.Server{
\t\tAddr:    ":8080",
\t\tHandler: mux,
\t}

\t// Tangkap sinyal graceful shutdown.
\tsigCh := make(chan os.Signal, 1)
\tsignal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

\tgo func() {
\t\tfmt.Println("server listening on", server.Addr)
\t\tif err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
\t\t\tfmt.Println("server error:", err)
\t\t}
\t}()

\t<-sigCh
\tfmt.Println("shutting down gracefully...")

\tctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
\tdefer cancel()
\tif err := server.Shutdown(ctx); err != nil {
\t\tfmt.Println("shutdown error:", err)
\t}
\tfmt.Println("server stopped")
}`,
        explanation:
          'Signal handling menangkap SIGINT/SIGTERM. server.Shutdown dengan context timeout memberikan kesempatan pada request aktif untuk selesai sebelum server ditutup. Pattern ini wajib untuk aplikasi production.',
      },
    },
    {
      id: 'sec-go-adv-07-callout',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** memanggil log.Fatal di tengah shutdown sebelum membersihkan resource; tidak menangani SIGTERM di container; atau menyimpan secret di file konfigurasi. Gunakan environment variables untuk konfigurasi, signal.NotifyContext untuk menggabungkan context dan signal, dan selalu panggil server.Shutdown sebelum keluar. Tools: cobra-cli untuk scaffolding, fsnotify untuk file watcher, dan systemd/docker untuk daemon management.',
    },
  ],
}
