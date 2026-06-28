import type { Lesson } from '@/content/types'

export const ch06SecretsManagementLesson: Lesson = {
  id: "lesson-ch-06-secrets-management",
  estimatedMinutes: 45,
  sections: [
    {
      id: "sec-06-basic-secrets",
      type: 'markdown',
      level: "basic",
      title: "Jangan Hardcode Secrets",
      content: "## Risiko Hardcoded Secrets\n\nMenyimpan password, API key, atau token di source code dapat menyebabkan kebocoran saat repository di-push atau dibagikan. Secret yang ter-commit sulit sepenuhnya dihapus karena history Git tetap menyimpannya.\n\n## Alternatif yang Lebih Aman\n\n- **Environment variables**: sederhana tetapi perlu diatur dengan hati-hati agar tidak bocor ke log.\n- **Secret files**: memuat secret dari file terpisah yang tidak di-commit.\n- **Secret manager**: layanan terpusat seperti AWS Secrets Manager, Google Secret Manager, Azure Key Vault, atau HashiCorp Vault.\n\n## Secret Scanning\n\nTool seperti GitHub secret scanning, GitLeaks, dan TruffleHog memindai repository untuk mendeteksi pola secret. Integrasikan secret scanning di pre-commit hook dan CI pipeline.\n\n## Least Privilege\n\nSetiap aplikasi hanya boleh memiliki akses ke secret yang benar-benar dibutuhkan. Gunakan IAM roles, service accounts, atau Vault policies untuk membatasi akses.",
    },
    {
      id: "sec-06-js-example",
      type: 'code-example',
      codeExample: {
        id: "code-06-js",
        filename: "env-loader.js",
        language: "javascript",
        title: "JavaScript: Load dan Validasi Environment Variables",
        code: "const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD']\n\nfunction loadEnv(keys) {\n  const secrets = {}\n  for (const key of keys) {\n    const value = process.env[key]\n    if (!value) {\n      throw new Error(`Missing environment variable: ${key}`)\n    }\n    secrets[key] = value\n  }\n  return secrets\n}\n\nfunction redact(value) {\n  return value ? `${value.slice(0, 2)}***${value.slice(-2)}` : ''\n}\n\nprocess.env.DB_HOST = 'db.example.com'\nprocess.env.DB_USER = 'app'\nprocess.env.DB_PASSWORD = 'supersecret'\n\nconst secrets = loadEnv(required)\nconsole.log('DB_HOST:', secrets.DB_HOST)\nconsole.log('DB_PASSWORD:', redact(secrets.DB_PASSWORD))",
        explanation: "Loader ini memastikan secret wajib tersedia sebelum aplikasi berjalan dan menyediakan fungsi redact untuk menghindari pembocoran secret di log.",
      },
    },
    {
      id: "sec-06-intermediate-vault",
      type: 'markdown',
      level: "intermediate",
      title: "HashiCorp Vault dan Cloud Secret Managers",
      content: "## HashiCorp Vault\n\nVault adalah secret manager yang dapat dijalankan on-premise atau di cloud. Fitur utamanya:\n\n- **KV secrets engine**: menyimpan key-value secret dengan versioning.\n- **Dynamic secrets**: menghasilkan credential sementara untuk database, cloud, atau lainnya.\n- **PKI engine**: menerbitkan sertifikat TLS otomatis.\n- **Authentication methods**: token, Kubernetes, AWS IAM, LDAP, OIDC.\n- **Policies**: mengontrol akses secret berdasarkan path dan operasi.\n\n## Cloud Secret Managers\n\n- **AWS Secrets Manager**: rotasi otomatis, integrasi dengan RDS, dan audit via CloudTrail.\n- **Google Secret Manager**: versioning secret dan IAM yang terintegrasi.\n- **Azure Key Vault**: menyimpan secret, key, dan sertifikat dengan HSM option.\n\n## SOPS dan Sealed Secrets\n\n- **SOPS**: mengenkripsi file YAML/JSON dengan KMS sehingga dapat di-commit ke Git.\n- **Sealed Secrets**: mengenkripsi Kubernetes Secret menjadi SealedSecret yang hanya cluster target yang dapat membukanya.\n\n## Secret Rotation\n\nRotasi secret secara rutin mengurangi dampak kebocoran. Strategi:\n\n- Rotasi manual berjadwal.\n- Rotasi otomatis melalui AWS Secrets Manager atau Vault.\n- Rotasi bertahap: update consumer baru terlebih dahulu, lalu nonaktifkan secret lama.",
    },
    {
      id: "sec-06-ts-example",
      type: 'code-example',
      codeExample: {
        id: "code-06-ts",
        filename: "secret-loader.ts",
        language: "typescript",
        title: "TypeScript: Type-Safe Secret Loader",
        code: "type SecretName = 'DB_PASSWORD' | 'API_KEY' | 'JWT_SECRET'\n\nclass SecretLoader {\n  private cache = new Map<SecretName, string>()\n\n  load(name: SecretName, value?: string): string {\n    if (!value) {\n      throw new Error(`Secret ${name} tidak ditemukan`)\n    }\n    if (value.length < 8) {\n      throw new Error(`Secret ${name} terlalu pendek`)\n    }\n    this.cache.set(name, value)\n    return value\n  }\n\n  get(name: SecretName): string | undefined {\n    return this.cache.get(name)\n  }\n}\n\nconst loader = new SecretLoader()\nloader.load('DB_PASSWORD', process.env.DB_PASSWORD || 'correcthorsebatterystaple')\nconsole.log('Loaded secret length:', loader.get('DB_PASSWORD')?.length)",
        explanation: "Loader dengan tipe eksplisit memastikan hanya secret yang dikenali yang dapat dimuat, sekaligus memberikan validasi panjang minimal untuk mencegah secret lemah.",
      },
    },
    {
      id: "sec-06-advanced-dynamic",
      type: 'markdown',
      level: "advanced",
      title: "Dynamic Secrets, Short-Lived Credentials, dan Zero-Trust",
      content: "## Dynamic Secrets\n\nDynamic secrets dibuat pada saat aplikasi membutuhkannya dan memiliki masa hidup terbatas. Contoh: Vault membuat user database sementara dengan permission terbatas; setelah lease habis, credential otomatis dicabut.\n\n## Short-Lived Credentials\n\nCredential dengan masa hidup pendek mengurangi window of opportunity bagi attacker. Praktik ini diterapkan pada:\n\n- Service account tokens Kubernetes dengan bounded lifetime.\n- Temporary credentials AWS STS.\n- Database credentials dari Vault.\n\n## Leasing dan Revocation\n\nVault mengelola secret dengan konsep lease. Aplikasi bertanggung jawab untuk renew lease sebelum habis. Jika lease tidak diperpanjang, Vault mencabut credential.\n\n## Zero-Trust dan Secrets\n\nZero-trust mengasumsikan tidak ada jaringan yang tepercaya. Setiap akses ke secret memerlukan autentikasi dan otorisasi kuat. Gunakan mTLS, identity-aware proxy, dan audit logging untuk setiap akses secret.\n\n## HSM dan Key Unwrapping\n\nHardware Security Module (HSM) menyimpan root key secara fisik terlindungi. Vault dapat menggunakan HSM untuk unseal dan melindungi encryption key.\n\n## Runtime Secret Injection\n\nSecret sebaiknya dimuat saat runtime, bukan di build time. Sidecar seperti Vault Agent atau External Secrets Operator dapat menyuntikkan secret ke pod tanpa aplikasi perlu mengetahui cara mengakses Vault langsung.",
    },
    {
      id: "sec-06-go-example",
      type: 'code-example',
      codeExample: {
        id: "code-06-go",
        filename: "vault-read.go",
        language: "go",
        title: "Go: Membaca Secret dari Vault",
        code: "package main\n\nimport (\n\t\"fmt\"\n)\n\n// Simulasi membaca secret KV dari Vault\nfunc readVaultSecret(path string) (map[string]string, error) {\n\tsecrets := map[string]string{\n\t\t\"DB_PASSWORD\": \"vault-generated-password\",\n\t}\n\tvalue, ok := secrets[path]\n\tif !ok {\n\t\treturn nil, fmt.Errorf(\"secret %s not found\", path)\n\t}\n\treturn map[string]string{\"value\": value}, nil\n}\n\nfunc main() {\n\tsecret, err := readVaultSecret(\"DB_PASSWORD\")\n\tif err != nil {\n\t\tfmt.Println(\"error:\", err)\n\t\treturn\n\t}\n\tfmt.Println(\"secret loaded, length:\", len(secret[\"value\"]))\n}",
        explanation: "Aplikasi Go dapat mengakses Vault melalui API atau Vault Agent sidecar. Dynamic secrets bahkan lebih baik karena credential dibuat khusus untuk aplikasi dan masa hidupnya singkat.",
      },
    },
    {
      id: "sec-06-summary",
      type: 'callout',
      calloutType: "info",
      content: "**Kesimpulan:** Secret management yang baik menghindari hardcoded credentials, menggunakan secret manager terpusat, memanfaatkan dynamic secrets, dan merotasi credential secara rutin. Integrasi runtime memastikan aplikasi tidak perlu menyimpan secret di image atau repository.",
    },
  ],
}
