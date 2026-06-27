import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: "lesson-ch-05-schema-migrations",
  estimatedMinutes: 50,
  sections: [
    {
      id: "sec-05-$1",
      type: 'markdown',
      level: 'basic',
      title: "Pengantar Schema Migrations",
      content: `## Apa itu Schema Migration?

Schema migration adalah versi perubahan struktur database: membuat table, menambah kolom, membuat index, mengubah constraint. Tujuannya:

- Pelacakan perubahan dalam VCS.
- Reproducibility antar environment (dev, staging, production).
- Rollback terkontrol jika deploy gagal.

## Prinsip Migrasi yang Baik

1. **Versioned**: setiap file migrasi memiliki nomor urut atau timestamp.
2. **Idempoten**: dapat dijalankan ulang tanpa efek samping (gunakan \`IF NOT EXISTS\`).
3. **Atomic**: gunakan transaksi agar all-or-nothing.
4. **Reversible**: sediakan skrip down untuk rollback.
5. **Tested**: jalankan di staging dengan data volumetrik mirip production.

## Contoh File Migrasi

\`001_create_users.up.sql\`:

\`CREATE TABLE IF NOT EXISTS users (id BIGSERIAL PRIMARY KEY, email TEXT NOT NULL);\`

\`001_create_users.down.sql\`:

\`DROP TABLE IF EXISTS users;\``,
    },
    {
      id: "sec-05-$1",
      type: 'code-example',
      codeExample: {
        id: "code-05-js",
        filename: "migration-runner.js",
        language: 'javascript',
        title: "JavaScript: Runner Migrasi Sederhana",
        code: "class MigrationRunner {\n  constructor(db) {\n    this.db = db\n    this.applied = new Set()\n  }\n\n  async init() {\n    await this.db.exec(`\n      CREATE TABLE IF NOT EXISTS schema_migrations (\n        version TEXT PRIMARY KEY,\n        applied_at TIMESTAMPTZ DEFAULT NOW()\n      )\n    `)\n    const rows = await this.db.all(\"SELECT version FROM schema_migrations\")\n    rows.forEach((r) => this.applied.add(r.version))\n  }\n\n  async apply(version, sql) {\n    if (this.applied.has(version)) {\n      console.log(`Skipping ${version}`)\n      return\n    }\n    await this.db.exec(sql)\n    await this.db.run(\"INSERT INTO schema_migrations (version) VALUES (?)\", version)\n    this.applied.add(version)\n    console.log(`Applied ${version}`)\n  }\n}",
        explanation: "Runner ini melacak versi yang sudah diterapkan di table schema_migrations untuk mencegah duplikasi.",
      },
    },
    {
      id: "sec-05-$1",
      type: 'markdown',
      level: 'intermediate',
      title: "Konsep Menengah Schema Migrations",
      content: `## Transaction dan DDL Locking

Di PostgreSQL, banyak DDL dapat berjalan dalam transaksi. Namun beberapa operasi seperti \`CREATE INDEX\` secara default mengunci table. Gunakan \`CREATE INDEX CONCURRENTLY\` untuk menghindari write lock.

Di MySQL, \`ALTER TABLE\` sering menyalin seluruh table, menyebabkan lock lama pada table besar. Solusi:

- \`pt-online-schema-change\` (Percona Toolkit).
- \`gh-ost\` (GitHub) untuk online schema change.

## Backward Compatibility

Saat deploy bertahap, aplikasi lama dan baru dapat berjalan bersamaan. Skema harus kompatibel dengan kedua versi:

- Tambahkan kolom baru sebagai nullable atau dengan default.
- Hapus kolom hanya setelah aplikasi lama tidak menggunakannya.
- Ubah tipe data secara bertahap melalui kolom baru dan backfill.

## Data Migration

Migrasi tidak hanya struktur, tapi juga data: backfill, rename, normalisasi. Strategi:

1. Tambah kolom baru.
2. Tulis dual-write di aplikasi baru.
3. Backfill data lama secara bertahap dengan batch.
4. Alihkan read ke kolom baru.
5. Hapus kolom lama.`,
    },
    {
      id: "sec-05-$1",
      type: 'code-example',
      codeExample: {
        id: "code-05-ts",
        filename: "migration.ts",
        language: 'typescript',
        title: "TypeScript: Skema Migrasi Bertipe",
        code: "type Migration = {\n  version: string\n  up: string\n  down: string\n}\n\nconst migrations: Migration[] = [\n  {\n    version: \"001\",\n    up: \"CREATE TABLE users (id BIGSERIAL PRIMARY KEY, email TEXT NOT NULL);\",\n    down: \"DROP TABLE users;\",\n  },\n  {\n    version: \"002\",\n    up: \"ALTER TABLE users ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();\",\n    down: \"ALTER TABLE users DROP COLUMN created_at;\",\n  },\n]\n\nfunction validateMigrations(list: Migration[]): boolean {\n  const versions = new Set<string>()\n  for (const m of list) {\n    if (versions.has(m.version)) return false\n    versions.add(m.version)\n  }\n  return true\n}\n\nconsole.log(validateMigrations(migrations))",
        explanation: "Struktur bertipe membantu menjaga konsistensi dan mencegah duplikasi versi migrasi.",
      },
    },
    {
      id: "sec-05-$1",
      type: 'markdown',
      level: 'advanced',
      title: "Internal Lanjutan Schema Migrations",
      content: `## Expand-Contract Pattern

Expand-contract adalah teknik zero-downtime migration:

1. **Expand**: tambahkan kolom/index baru tanpa menghapus yang lama.
2. **Dual write**: aplikasi baru menulis ke kedua versi.
3. **Backfill**: isi data kolom baru secara bertahap.
4. **Switch read**: baca dari kolom baru.
5. **Contract**: hapus kolom lama setelah semua aplikasi stabil.

Pola ini membutuhkan waktu dan koordinasi, tetapi memungkinkan deploy tanpa downtime.

## Online Schema Change Internals

Tools seperti gh-ost bekerja dengan:

1. Membuat table bayangan (shadow table) dengan skema baru.
2. Memasang trigger atau binlog streaming untuk menangkap perubahan.
3. Mengisi table bayangan secara bertahap.
4. Melakukan atomic rename table.

Di PostgreSQL, \`CREATE INDEX CONCURRENTLY\` membangun index di background tanpa lock eksklusif, tetapi tidak dapat berjalan dalam transaksi.

## Rollback Strategy

Migrasi harus direncanakan dengan rollback:

- Simpan skrip down yang sudah diuji.
- Lakukan backup sebelum migration besar.
- Gunakan blue/green deployment untuk rollback cepat.
- Catat \`down\` tidak selalu identik reverse dari \`up\` jika ada data loss.

## Database-per-Service Considerations

Dalam arsitektur microservices, setiap service memiliki database sendiri. Migrasi dilakukan per service, dan perubahan skema antar service memerlukan event-driven contract, bukan foreign key langsung.`,
    },
    {
      id: "sec-05-$1",
      type: 'code-example',
      codeExample: {
        id: "code-05-go",
        filename: "main.go",
        language: 'go',
        title: "Go: golang-migrate Example",
        code: "package main\n\nimport (\n\t\"database/sql\"\n\t\"fmt\"\n\t\"log\"\n\n\t\"github.com/golang-migrate/migrate/v4/database/postgres\"\n\t_ \"github.com/golang-migrate/migrate/v4/source/file\"\n\t_ \"github.com/lib/pq\"\n)\n\nfunc main() {\n\tdb, err := sql.Open(\"postgres\", \"postgres://user:pass@localhost/shop?sslmode=disable\")\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\n\tdriver, err := postgres.WithInstance(db, &postgres.Config{})\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\n\tfmt.Println(\"driver ready:\", driver)\n\t// m, err := migrate.NewWithDatabaseInstance(\"file://migrations\", \"postgres\", driver)\n\t// m.Up()\n}",
        explanation: "golang-migrate adalah tool populer untuk mengelola migrasi PostgreSQL, MySQL, dan SQLite dengan versioning.",
      },
    },
    {
      id: "sec-05-$1",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Schema migration adalah bagian integral dari deployment. Rancang migrasi sebagai versi terkontrol, pertimbangkan zero-downtime dengan expand-contract, dan selalu siapkan rollback.`,
    },
  ],
}
