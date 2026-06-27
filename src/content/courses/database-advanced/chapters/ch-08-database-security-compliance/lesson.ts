import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: "lesson-ch-08-database-security-compliance",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-08-01",
      type: 'markdown',
      level: 'basic',
      title: "Prinsip Keamanan Database",
      content: `## Least Privilege

Prinsip **least privilege** menyatakan bahwa user atau aplikasi hanya boleh memiliki izin minimum yang diperlukan untuk menjalankan tugasnya. Contoh:

- Aplikasi reporting hanya memerlukan SELECT.
- Aplikasi order hanya memerlukan INSERT/UPDATE pada tabel orders.
- Jangan gunakan superuser/root untuk koneksi aplikasi.

## Enkripsi

### Encryption at Rest

Melindungi data saat disimpan di disk. Implementasi:
- Transparent Data Encryption (TDE) di PostgreSQL, MySQL, SQL Server.
- Enkripsi volume level (LUKS, EBS encryption).
- Enkripsi file-level.

### Encryption in Transit

Melindungi data saat bergerak antara client dan server. Menggunakan TLS/SSL:
- PostgreSQL: \`sslmode=require\`.
- MySQL: \`REQUIRE SSL\`.
- MongoDB: \`net.tls.mode=requireTLS\`.

## Password Policy

- Gunakan password panjang dan kompleks.
- Gunakan authentication plugin yang aman (SCRAM-SHA-256, caching_sha2_password).
- Rotasi password secara berkala.
- Hindari menyimpan password plain text; gunakan vault atau secret manager.

## Network Security

- Batasi akses database melalui firewall/security group.
- Gunakan private subnet, jangan expose database ke internet.
- Pertimbangkan VPN atau private link untuk akses admin.`,
    },
    {
      id: "sec-08-02",
      type: 'code-example',
      codeExample: {
        id: "code-08-js",
        filename: "access-control.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Access Control Matrix",
        code: "const roles = {\n  admin: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],\n  analyst: ['SELECT'],\n  reporter: ['SELECT'],\n  app_writer: ['INSERT', 'UPDATE'],\n}\n\nconst policies = [\n  { role: 'analyst', table: 'orders', allowed: true },\n  { role: 'analyst', table: 'users', allowed: false },\n  { role: 'app_writer', table: 'orders', allowed: true },\n  { role: 'app_writer', table: 'salary', allowed: false },\n]\n\nfunction canAccess(role, action, table) {\n  const roleActions = roles[role] || []\n  if (!roleActions.includes(action)) return false\n  const policy = policies.find((p) => p.role === role && p.table === table)\n  return policy ? policy.allowed : false\n}\n\nconsole.log(canAccess('analyst', 'SELECT', 'orders')) // true\nconsole.log(canAccess('analyst', 'SELECT', 'users')) // false\nconsole.log(canAccess('analyst', 'DELETE', 'orders')) // false",
        explanation: "Simulasi ini menggambarkan bagaimana role dan table-level policy digabungkan untuk menentukan izin akses.",
      },
    },
    {
      id: "sec-08-03",
      type: 'markdown',
      level: 'intermediate',
      title: "Row-Level Security, Column Encryption & Audit Logging",
      content: `## Row-Level Security (RLS)

RLS membatasi row yang dapat diakses user berdasarkan policy. PostgreSQL menyediakan RLS native:

\`\`\`sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON orders
  FOR ALL
  TO app_user
  USING (tenant_id = current_setting('app.current_tenant')::int);
\`\`\`

Dengan RLS, query \`SELECT * FROM orders\` oleh \`app_user\` hanya mengembalikan row milik tenant yang aktif.

## Column-Level Encryption

Untuk data sangat sensitif seperti nomor kartu kredit atau KTP:
- Enkripsi di aplikasi sebelum disimpan.
- Gunakan envelope encryption: data key dienkripsi dengan master key.
- Hanya decrypt saat dibutuhkan.

## Audit Logging

Audit logging mencatat:
- Siapa yang login.
- Query atau perubahan data sensitif.
- DDL changes (CREATE, ALTER, DROP).
- Gagal login dan akses tidak sah.

PostgreSQL menyediakan \`pgaudit\`; MySQL memiliki audit log plugin; MongoDB memiliki \`mongod_audit\`.

## Masking Data

**Data masking** menyembunyikan bagian data sensitif:
- Nomor kartu kredit: \`****-****-****-1234\`.
- Email: \`a***@example.com\`.

Berguna untuk environment non-production dan reporting.`,
    },
    {
      id: "sec-08-04",
      type: 'code-example',
      codeExample: {
        id: "code-08-ts",
        filename: "rls-policy-builder.ts",
        language: 'typescript',
        title: "TypeScript: Builder untuk RLS Policy",
        code: "type PolicyAction = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL'\n\ntype RLSPolicy = {\n  name: string\n  table: string\n  action: PolicyAction\n  using?: string\n  withCheck?: string\n  roles: string[]\n}\n\nfunction buildRLSPolicySQL(policy: RLSPolicy): string {\n  const roles = policy.roles.join(', ')\n  let sql = `CREATE POLICY ${policy.name} ON ${policy.table}\\n`\n  sql += `  FOR ${policy.action}\\n`\n  sql += `  TO ${roles}\\n`\n  if (policy.using) {\n    sql += `  USING (${policy.using})\\n`\n  }\n  if (policy.withCheck) {\n    sql += `  WITH CHECK (${policy.withCheck})\\n`\n  }\n  return sql + ';'\n}\n\nconst tenantPolicy: RLSPolicy = {\n  name: 'tenant_isolation',\n  table: 'orders',\n  action: 'ALL',\n  using: \"tenant_id = current_setting('app.current_tenant')::int\",\n  withCheck: \"tenant_id = current_setting('app.current_tenant')::int\",\n  roles: ['app_user'],\n}\n\nconsole.log(buildRLSPolicySQL(tenantPolicy))",
        explanation: "Builder ini menghasilkan SQL RLS policy PostgreSQL secara terstruktur, memudahkan pembuatan kebijakan isolasi multi-tenant.",
      },
    },
    {
      id: "sec-08-05",
      type: 'markdown',
      level: 'advanced',
      title: "Anonymization, GDPR & Security Hardening",
      content: `## Anonymization vs Pseudonymization

- **Anonymization**: data tidak dapat lagi diidentifikasi ke individu, bahkan dengan data tambahan. Tidak dapat di-reverse.
- **Pseudonymization**: mengganti identifier dengan token/pseudonym. Data masih dapat di-relink dengan key terpisah.

GDPR menganggap pseudonymized data masih sebagai personal data, sementara anonymized data tidak.

## GDPR Principles

Regulasi GDPR (General Data Protection Regulation) menekankan:

- **Lawfulness, fairness, transparency**: pemrosesan data harus legal dan transparan.
- **Purpose limitation**: data hanya digunakan untuk tujuan yang dinyatakan.
- **Data minimization**: hanya kumpulkan data yang diperlukan.
- **Accuracy**: pastikan data benar dan diperbarui.
- **Storage limitation**: hapus data jika tidak lagi diperlukan.
- **Integrity and confidentiality**: keamanan data.
- **Accountability**: dokumentasi dan audit.

Hak individu termasuk: hak akses, hak rectifikasi, hak erasure (right to be forgotten), dan hak portability.

## Database Hardening

- Nonaktifkan fitur dan akun default yang tidak digunakan.
- Patch dan update database secara berkala.
- Gunakan parameterized query untuk mencegah SQL injection.
- Enkripsi backup dan log.
- Pantau anomali akses dengan SIEM atau database activity monitoring.

## Tokenization

**Tokenization** mengganti data sensitif dengan token acak yang tidak memiliki nilai matematatis. Token disimpan di vault terpisah, sementara database hanya menyimpan token. Berbeda dengan enkripsi, tokenization tidak memerlukan key untuk decrypt.

## Supply Chain & Secrets

- Jangan hardcode credential di kode.
- Gunakan secret manager (HashiCorp Vault, AWS Secrets Manager, Doppler).
- Rotasi credential otomatis.
- Scan repository untuk leaked secrets.`,
    },
    {
      id: "sec-08-06",
      type: 'code-example',
      codeExample: {
        id: "code-08-go",
        filename: "query_filter_crypto.go",
        language: 'go',
        title: "Go: Query Filter Tenant dan Envelope Encryption",
        code: "package main\n\nimport (\n\t\"crypto/aes\"\n\t\"crypto/cipher\"\n\t\"crypto/rand\"\n\t\"crypto/subtle\"\n\t\"encoding/base64\"\n\t\"fmt\"\n\t\"io\"\n)\n\nfunc encrypt(plaintext []byte, key []byte) (string, error) {\n\tblock, err := aes.NewCipher(key)\n\tif err != nil {\n\t\treturn \"\", err\n\t}\n\tgcm, err := cipher.NewGCM(block)\n\tif err != nil {\n\t\treturn \"\", err\n\t}\n\tnonce := make([]byte, gcm.NonceSize())\n\tif _, err := io.ReadFull(rand.Reader, nonce); err != nil {\n\t\treturn \"\", err\n\t}\n\tciphertext := gcm.Seal(nonce, nonce, plaintext, nil)\n\treturn base64.StdEncoding.EncodeToString(ciphertext), nil\n}\n\nfunc constantTimeCompare(a, b string) bool {\n\treturn subtle.ConstantTimeCompare([]byte(a), []byte(b)) == 1\n}\n\nfunc main() {\n\tkey := make([]byte, 32)\n\trand.Read(key)\n\n\tencrypted, err := encrypt([]byte(\"sensitive-data\"), key)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Println(\"encrypted:\", encrypted)\n\n\t// Contoh filter tenant dengan constant-time comparison\n\tfmt.Println(constantTimeCompare(\"tenant-a\", \"tenant-a\"))\n}",
        explanation: "Contoh Go menunjukkan envelope encryption dengan AES-GCM dan constant-time comparison untuk membandingkan tenant ID secara aman.",
      },
    },
    {
      id: "sec-08-07",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Keamanan database adalah lapisan pertahanan terakhir sebelum data sensitif. Terapkan least privilege, RLS, enkripsi, audit logging, dan masking. Pahami kewajiban compliance seperti GDPR dan bangun pipeline untuk menghapus atau menganonymisasi data sesuai kebijakan retensi.

Tools 2026: HashiCorp Vault, pgaudit, AWS RDS encryption, Privacera untuk data governance, dan Snyk/Trivy untuk secret scanning.`,
    },
  ],
}
