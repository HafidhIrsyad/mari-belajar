import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-environment-management',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-04-basic-environments',
      type: 'markdown',
      level: 'basic',
      title: 'Environment dan Konfigurasi',
      content: `## Apa itu Environment?

Environment adalah instansi aplikasi yang berjalan dengan konfigurasi tertentu. Environment umum:

- **Development (dev)**: lingkungan lokal developer untuk eksperimen.
- **Staging**: replika production untuk pengujian integrasi sebelum rilis.
- **Production**: lingkungan yang digunakan oleh pengguna akhir.

Setiap environment memiliki database, cache, endpoint, dan credentials sendiri.

## Environment Variables

Environment variables adalah pasangan key-value yang disediakan sistem operasi ke process saat runtime. Mereka adalah cara paling sederhana untuk menyuntikkan konfigurasi tanpa mengubah kode.

Contoh di Linux/macOS:

\`\`\`bash
export DATABASE_URL=postgres://user:pass@localhost:5432/devdb
export PORT=3000
\`\`\`

Contoh di Windows PowerShell:

\`\`\`powershell
$env:DATABASE_URL = "postgres://user:pass@localhost:5432/devdb"
\`\`\`

## Config vs Code

Prinsip penting: **config berubah antar environment; code tidak berubah**. Jika Anda menemukan nilai seperti URL database atau API key di kode sumber, itu adalah anti-pattern.

## File .env

File \`.env\` menyimpan environment variables untuk development lokal. Contoh:

\`\`\`
DATABASE_URL=postgres://localhost:5432/devdb
REDIS_URL=redis://localhost:6379
PORT=3000
LOG_LEVEL=debug
\`\`\`

File \`.env\` tidak boleh di-commit ke version control. Gunakan \`.env.example\` sebagai template.

## Perilaku Umum per Environment

| Aspek | Dev | Staging | Production |
|-------|-----|---------|------------|
| Data | Sintetis | Anonymized production-like | Data nyata |
| Log level | debug | info | info/warn |
| Debug mode | Aktif | Nonaktif | Nonaktif |
| Resource | Minimal | Mirip production | Maksimal |
| CDN cache | Nonaktif | Rendah | Tinggi |`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'env-loader.js',
        language: 'javascript',
        title: 'JavaScript: Memuat Konfigurasi dari Environment',
        code: `function loadConfig() {
  const port = Number.parseInt(process.env.PORT || '3000', 10)
  const logLevel = process.env.LOG_LEVEL || 'info'
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL wajib di-set')
  }

  return {
    env: process.env.NODE_ENV || 'development',
    port,
    logLevel,
    databaseUrl,
    enableDebug: process.env.NODE_ENV === 'development',
  }
}

const config = loadConfig()
console.log('Config:', {
  ...config,
  databaseUrl: config.databaseUrl.replace(/:.*@/, ':***@'),
})`,
        explanation:
          'Konfigurasi dibaca dari environment variables dengan nilai default. Secrets seperti database URL divalidasi keberadaannya dan disensor saat logging untuk menghindari kebocoran.',
      },
    },
    {
      id: 'sec-04-intermediate-12factor',
      type: 'markdown',
      level: 'intermediate',
      title: '12-Factor App, Secrets, dan Feature Flags',
      content: `## 12-Factor App Config

Salah satu dari 12 factor adalah **Store config in the environment**. Ini berarti:

- Setiap environment memiliki konfigurasi sendiri.
- Konfigurasi dapat diubah tanpa rebuild aplikasi.
- Tidak ada config yang di-commit ke repository.

## Secrets Management

Secrets adalah data sensitif seperti password, API key, token, dan sertifikat. Praktik terbaik:

- Gunakan secrets manager: AWS Secrets Manager, Azure Key Vault, HashiCorp Vault, Google Secret Manager.
- Injeksikan secrets sebagai environment variables saat runtime.
- Enkripsi secrets at rest dan in transit.
- Rotasi secrets secara berkala.
- Gunakan least privilege: aplikasi hanya dapat membaca secrets yang dibutuhkan.

## Configuration Drift

Configuration drift terjadi ketika perubahan manual di environment membuat konfigurasi menyimpang dari source of truth. Solusinya:

- Gunakan Infrastructure as Code.
- Hindari perubahan manual di production.
- Audit perubahan konfigurasi.

## Feature Flags

Feature flag adalah mekanisme menyalakan/mematikan fitur tanpa deploy ulang. Manfaat:

- Canary release secara bertahap.
- A/B testing.
- Kill switch untuk fitur bermasalah.
- Rilis fitur terjadwal.

Feature flags dapat disimpan di database, config service, atau dedicated platform seperti LaunchDarkly atau Unleash.

## Externalized Configuration

Dibanding menyimpan config di file dalam container, externalized configuration memungkinkan aplikasi mengambil config dari sumber eksternal seperti:

- Environment variables.
- Config server (Spring Cloud Config, Consul, etcd).
- Key-value store.
- Kubernetes ConfigMap dan Secret.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
        codeExample: {
        id: 'code-04-ts',
        filename: 'config-validator.ts',
        language: 'typescript',
        title: 'TypeScript: Validasi Config dengan Tipe Kuat',
        code: `interface AppConfig {
  nodeEnv: 'development' | 'staging' | 'production'
  port: number
  databaseUrl: string
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  featureFlags: Record<string, boolean>
}

function parseFeatureFlags(raw: string | undefined): Record<string, boolean> {
  if (!raw) return {}
  return raw.split(',').reduce((acc, pair) => {
    const [key, value] = pair.split('=')
    acc[key.trim()] = value?.trim() === 'true'
    return acc
  }, {} as Record<string, boolean>)
}

function loadConfig(): AppConfig {
  const nodeEnv = process.env.NODE_ENV as AppConfig['nodeEnv']
  if (!['development', 'staging', 'production'].includes(nodeEnv)) {
    throw new Error(\`NODE_ENV tidak valid: \${nodeEnv}\`)
  }

  const port = Number.parseInt(process.env.PORT || '3000', 10)
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL wajib di-set')
  }

  return {
    nodeEnv,
    port,
    databaseUrl,
    logLevel: (process.env.LOG_LEVEL as AppConfig['logLevel']) || 'info',
    featureFlags: parseFeatureFlags(process.env.FEATURE_FLAGS),
  }
}

const config = loadConfig()
console.log('Feature flags:', config.featureFlags)`,
        explanation:
          'Validasi tipe memastikan hanya nilai environment yang valid diterima. Feature flags diparse dari string environment menjadi objek boolean yang dapat dikonsumsi aplikasi.',
      },
    },
    {
      id: 'sec-04-advanced-externalized',
      type: 'markdown',
      level: 'advanced',
      title: 'Config Management Systems dan Immutable Infrastructure',
      content: `## Externalized Configuration Patterns

Terdapat beberapa pola untuk menyebarkan konfigurasi:

1. **Pull model**: aplikasi mengambil config dari config server saat startup.
2. **Push model**: orchestrator menginjeksikan config sebagai environment variables atau mounted files.
3. **Sidecar model**: agent terpisah mengelola config dan secrets; aplikasi membaca dari agent.

## Kubernetes ConfigMap dan Secret

- **ConfigMap**: menyimpan konfigurasi non-sensitif sebagai key-value.
- **Secret**: menyimpan data sensitif, base64-encoded by default (bukan enkripsi, kecuali encryption at rest diaktifkan).

Keduanya dapat di-mount sebagai volume atau diinjeksikan sebagai environment variables.

## Immutable Infrastructure

Dalam immutable infrastructure, server atau container tidak dimodifikasi setelah dibuat. Jika config berubah, artifact baru dibangun dan deploy. Keuntungan:

- Predictability: environment bersih dari perubahan manual.
- Rollback: mudah kembali ke versi artifact sebelumnya.
- Auditability: setiap perubahan terekam di version control.

## Configuration Server

Config server seperti Spring Cloud Config, Consul, atau etcd menyediakan config terpusat. Keuntungan:

- Config dapat diubah tanpa restart aplikasi (jika aplikasi support hot reload).
- Pusat audit untuk semua environment.
- Dapat menggabungkan config umum dan config environment-spesifik.

## Encryption dan Rotation

- **At rest**: secrets dienkripsi di disk menggunakan KMS.
- **In transit**: komunikasi ke secrets manager menggunakan TLS.
- **Rotation**: mengganti secrets secara berkala untuk membatasi window of exposure.

## Configuration Testing

Uji konfigurasi sebelum deploy:

- Validasi skema config.
- Render config untuk setiap environment di CI.
- Deteksi nilai yang hilang atau salah tipe.
- Simulasikan startup dengan config target.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'config.go',
        language: 'go',
        title: 'Go: Config Loader dengan Default dan Validasi',
        code: `package main

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	Env         string
	Port        int
	DatabaseURL string
	LogLevel    string
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func loadConfig() (Config, error) {
	port, err := strconv.Atoi(getEnv("PORT", "8080"))
	if err != nil {
		return Config{}, fmt.Errorf("PORT tidak valid: %w", err)
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return Config{}, fmt.Errorf("DATABASE_URL wajib di-set")
	}

	return Config{
		Env:         getEnv("GO_ENV", "development"),
		Port:        port,
		DatabaseURL: dbURL,
		LogLevel:    getEnv("LOG_LEVEL", "info"),
	}, nil
}

func main() {
	cfg, err := loadConfig()
	if err != nil {
		fmt.Println("Config error:", err)
		os.Exit(1)
	}
	fmt.Printf("Running in %s mode on port %d\\n", cfg.Env, cfg.Port)
}`,
        explanation:
          'Loader ini membaca environment variables dengan fallback default, melakukan konversi tipe, dan menolak startup jika konfigurasi wajib seperti DATABASE_URL tidak ada.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Manajemen environment yang baik memisahkan config dari code, melindungi secrets, menerapkan 12-factor principles, dan menggunakan feature flags serta externalized configuration untuk fleksibilitas tanpa mengorbankan keamanan.',
    },
  ],
}
