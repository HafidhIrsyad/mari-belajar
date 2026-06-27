import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-deployment-environment-basics',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-08-basic-env',
      type: 'markdown',
      level: 'basic',
      title: 'Environment Variables dan Konfigurasi',
      content: `## Prinsip Konfigurasi Twelve-Factor

Aplikasi modern memisahkan konfigurasi dari kode. Konfigurasi seperti port, URL database, API key, dan log level disimpan di environment variables, bukan di file sumber. Keuntungannya:

- Satu build dapat di-deploy ke banyak environment (dev, staging, production).
- Secret tidak tertinggal di repository.
- Perubahan konfigurasi tidak memerlukan rebuild.

## Menggunakan Environment Variables

Di Node.js, kita dapat membaca environment variables melalui \`process.env\`:

\`\`\`javascript
const port = process.env.PORT || 3000
const databaseUrl = process.env.DATABASE_URL
\`\`\`

Untuk development, file \`.env\` sering digunakan bersama library seperti dotenv. Namun, file \`.env\` tidak boleh di-commit ke version control; gunakan \`.env.example\` sebagai template.

## Process Managers

Di production, aplikasi Node.js umumnya dijalankan dengan process manager seperti PM2, systemd, atau container orchestrator. PM2 dapat:

- Restart otomatis saat crash.
- Menjalankan beberapa instance dalam cluster mode.
- Mengelola log dan monitoring dasar.

## Port Configuration

Aplikasi sebaiknya membaca port dari environment variable \`PORT\`. Jangan hard-code port karena environment production mungkin menyediakan port tertentu.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'server.js',
        language: 'javascript',
        title: 'JavaScript: Konfigurasi dari Environment Variable',
        code: `require('dotenv').config()

const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: NODE_ENV })
})

const server = app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT} in \${NODE_ENV} mode\`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})`,
        explanation:
          'dotenv memuat variabel dari file .env saat development. Server ditutup secara graceful saat menerima sinyal SIGTERM dari process manager atau container orchestrator.',
      },
    },
    {
      id: 'sec-08-intermediate-docker',
      type: 'markdown',
      level: 'intermediate',
      title: 'Docker Containerization dan Health Check',
      content: `## Mengapa Container?

Docker membungkus aplikasi beserta dependensinya dalam satu image yang dapat berjalan konsisten di laptop developer, staging, dan production. Container juga memudahkan skalasi horizontal dan orkestrasi dengan Kubernetes.

## Dockerfile Best Practice

- Gunakan base image yang minimal dan aman, misalnya \`node:20-alpine\`.
- Pisahkan tahap install dependency dan copy source untuk memanfaatkan layer cache.
- Jalankan aplikasi dengan user non-root.
- Jangan menyertakan secret dalam image.

## Health Check

Health check memberi tahu orchestrator apakah container masih sehat. Endpoint \`/health\` sebaiknya memeriksa dependensi penting seperti database jika aplikasi bergantung padanya. Response 200 menandakan sehat, sedangkan status lain dapat memicu restart.

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## Environment di Container

Variabel environment dapat diset saat menjalankan container:

\`\`\`bash
docker run -e PORT=8080 -e NODE_ENV=production -p 8080:8080 my-api
\`\`\`

Dengan demikian, image yang sama dapat digunakan untuk berbagai environment tanpa perlu build ulang.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'config.module.ts',
        language: 'typescript',
        title: 'TypeScript: Config Module di NestJS',
        code: `import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}

// Usage in service
@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getPort(): number {
    return this.config.get<number>('PORT') ?? 3000
  }
}`,
        explanation:
          'ConfigModule NestJS memuat environment variables dan dapat divalidasi dengan Joi. Modul global memudahkan akses konfigurasi di seluruh aplikasi.',
      },
    },
    {
      id: 'sec-08-advanced-proxy',
      type: 'markdown',
      level: 'advanced',
      title: 'Reverse Proxy, TLS Termination, dan Monitoring Dasar',
      content: `## Reverse Proxy

Reverse proxy seperti nginx atau Caddy ditempatkan di depan aplikasi backend. Tugasnya meliputi:

- **TLS termination**: menangani handshake HTTPS sebelum meneruskan request ke backend.
- **Load balancing**: mendistribusikan lalu lintas ke beberapa instance backend.
- **Serving static assets**: menyajikan file statis tanpa membebani backend.
- **Rate limiting dan caching**: melindungi backend dari beban berlebih.

Aplikasi backend biasanya berkomunikasi dengan reverse proxy melalui HTTP biasa di jaringan internal yang aman.

## SSL/TLS Termination

Dengan TLS termination di reverse proxy, aplikasi backend tidak perlu mengelola sertifikat TLS. Reverse proxy menyediakan header seperti \`X-Forwarded-For\` dan \`X-Forwarded-Proto\` agar backend tahu IP asli client dan protokol asli.

## Graceful Shutdown

Saat deployment atau skala turun, orchestrator mengirim sinyal \`SIGTERM\`. Aplikasi harus:

1. Berhenti menerima request baru.
2. Menunggu request yang sedang berjalan hingga selesai dalam batas waktu.
3. Menutup koneksi database dan resource eksternal.
4. Keluar dengan kode 0.

Jika aplikasi tidak menangani SIGTERM, container dapat di-\`kill\` secara paksa setelah grace period, menyebabkan request terputus.

## Monitoring Dasar

Monitoring minimal yang perlu ada:

- **Health endpoint**: \`/health\` atau \`/ready\` dan \`/live\`.
- **Metrics**: request rate, error rate, latency.
- **Log aggregation**: log terstruktur dikirim ke sistem agregasi.
- **Alerting**: notifikasi saat error rate tinggi atau health check gagal.

Tools seperti Prometheus dan Grafana dapat mengumpulkan metrics, sementara Loki atau ELK mengumpulkan log. Untuk level dasar, cukup pastikan log dan health endpoint tersedia sebelum menambahkan tools kompleks.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Graceful Shutdown dan Environment Config',
        code: `package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "ok")
	})

	server := &http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}

	go func() {
		fmt.Printf("Server listening on :%s\\n", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Printf("Server error: %v\\n", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	fmt.Println("Shutting down gracefully...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		fmt.Printf("Forced shutdown: %v\\n", err)
	}
	fmt.Println("Server stopped")
}`,
        explanation:
          'Aplikasi Go menunggu sinyal SIGTERM/SIGINT, lalu memanggil server.Shutdown dengan context timeout untuk menyelesaikan request aktif sebelum keluar.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Deployment yang andal dimulai dari konfigurasi yang benar, containerization, health check, dan graceful shutdown. Reverse proxy serta monitoring dasar melengkapi fondasi production, sementara pengelolaan secret yang aman tetap menjadi prioritas utama.',
    },
  ],
}
