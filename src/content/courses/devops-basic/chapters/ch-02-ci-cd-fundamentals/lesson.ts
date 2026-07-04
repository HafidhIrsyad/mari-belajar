import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-ci-cd-fundamentals',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-02-basic-cicd',
      type: 'markdown',
      level: 'basic',
      title: 'Pengantar CI/CD',
      content: `## Continuous Integration (CI)

CI adalah praktik mengintegrasikan perubahan kode ke branch utama secara sering, idealnya beberapa kali sehari. Setiap integrasi memicu automated build dan test untuk mendeteksi masalah lebih awal.

## Continuous Delivery (CD)

Continuous Delivery memastikan setiap perubahan yang lolos CI dapat dideploy ke production kapan saja dengan satu tombol. Lingkungan production tetap siap menerima rilis.

## Continuous Deployment (CD)

Continuous Deployment melangkah lebih jauh: setiap perubahan yang lolos CI/CD secara otomatis dirilis ke production tanpa intervensi manual.

## Tahapan Pipeline Umum

1. **Trigger**: pipeline berjalan karena push, pull request, atau jadwal.
2. **Checkout**: runner mengambil kode sumber.
3. **Install dependencies**: mengunduh library dan tools.
4. **Lint & format**: memeriksa gaya kode dan potensi bug.
5. **Build**: mengompilasi atau membundel aplikasi.
6. **Test**: menjalankan unit test, integration test, dan kadang e2e test.
7. **Package**: membuat artefak seperti container image atau binary.
8. **Deploy**: mempromosikan artefak ke environment target.

## Manfaat

- Feedback cepat untuk developer.
- Risiko rilis lebih kecil karena perubahan incremental.
- Proses yang dapat direproduksi dan diaudit.
- Waktu recovery lebih cepat saat rollback diperlukan.`,
    },
    {
      id: 'sec-02-yaml-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-yaml',
        filename: 'ci-basic.yml',
        language: 'yaml',
        title: 'GitHub Actions: Pipeline CI Dasar',
        code: `name: CI Basic

on:
  push:
    branches: [main]
  pull_request:

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile

  lint:
    needs: install
    runs-on: ubuntu-latest
    steps:
      - run: pnpm lint

  test:
    needs: install
    runs-on: ubuntu-latest
    steps:
      - run: pnpm test

  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - run: pnpm build`,
        explanation:
          'Setiap job mendefinisikan langkah pipeline. Keyword needs membentuk DAG dependensi — konsep yang sama dengan parser pipeline di runner CI.',
      },
    },
    {
      id: 'sec-02-intermediate-pipeline-architecture',
      type: 'markdown',
      level: 'intermediate',
      title: 'Arsitektur Pipeline, Runner, dan Artefak',
      content: `## Runner / Agent

Runner adalah mesin eksekusi yang menjalankan job pipeline. Runner dapat dikelola penyedia CI (shared runner) atau di-self-host di infrastruktur sendiri. Setiap job biasanya berjalan di environment bersih agar reproducible.

## Artefak

Artefak adalah file hasil build yang diproduksi satu job dan dikonsumsi job lain atau disimpan untuk deploy. Contoh artefak:

- Container image di registry.
- Binary atau bundle aplikasi.
- Laporan test coverage.
- SBOM (Software Bill of Materials).

## Caching

Caching menyimpan dependencies atau hasil intermediate antar pipeline untuk mempercepat build. Cache dibedakan dengan artefak: cache bersifat optimasi performa dan boleh hilang; artefak adalah hasil build yang harus diproduksi ulang jika hilang.

## Secrets Management

Secrets seperti token, password, atau kunci privat tidak boleh di-hardcode di kode. Praktik yang baik:

- Simpan secrets di fitur secrets penyedia CI (encrypted at rest).
- Inject secrets sebagai environment variable saat runtime.
- Gunakan secret masking agar nilai tidak tercetak di log.
- Rotasi secrets secara berkala dan batasi scope.

## Environment Promotion

Dalam CD Delivery, artefak yang sama dipromosikan antar environment (dev → staging → production). Ini memastikan apa yang diuji persis sama dengan apa yang dirilis, mengurangi masalah "works on my machine".`,
    },
    {
      id: 'sec-02-yaml-cache-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-yaml-cache',
        filename: 'ci-with-cache.yml',
        language: 'yaml',
        title: 'GitHub Actions: Pipeline dengan Cache dan Artefak',
        code: `name: CI with Cache

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7`,
        explanation:
          'Cache dependencies mempercepat pipeline berulang. upload-artifact menyimpan hasil build sebagai artefak yang dapat dipakai job deploy berikutnya.',
      },
    },
    {
      id: 'sec-02-advanced-pipeline-as-code',
      type: 'markdown',
      level: 'advanced',
        title: 'Pipeline as Code, DAG, dan Matrix Build',
      content: `## Pipeline as Code

Pipeline didefinisikan dalam file seperti \`.github/workflows/ci.yml\`, \`.gitlab-ci.yml\`, atau \`Jenkinsfile\`. Keuntungannya:

- Version control: perubahan pipeline dapat direview.
- Reproducibility: pipeline yang sama berjalan di setiap branch.
- Portability: definisi dapat dipindahkan antar project.

## Directed Acyclic Graph (DAG)

Pipeline modern tidak lagi berjalan secara sequential stage, melainkan sebagai DAG. Job yang independen berjalan paralel, sementara job lain menunggu dependensinya selesai. Ini mengurangi total waktu pipeline.

## Matrix Build

Matrix build menjalankan job yang sama dengan variasi parameter, misalnya:

- Versi Node.js (18, 20, 22).
- Sistem operasi (ubuntu, windows, macos).
- Browser target (chromium, firefox, webkit).

Matrix meningkatkan confidence karena kode diuji di banyak kombinasi environment.

## Rollout dan Rollback Hooks

Pipeline deploy yang matang menyertakan:

- **Pre-deploy hooks**: health check, database migration, circuit breaker check.
- **Post-deploy hooks**: smoke test, synthetic monitoring, traffic verification.
- **Rollback hooks**: otomatis kembali ke versi sebelumnya jika error rate melonjak.

## Immutable Artifact

Setiap commit menghasilkan artefak yang tidak diubah setelah dibuat. Container image diberi tag dengan hash commit, bukan \`latest\`. Pendekatan ini memastikan traceability dan memudahkan rollback.

## Pipeline Security

- Gunakan least privilege pada runner.
- Pin versi action/third-party image.
- Hindari menjalankan CI dari fork tanpa approval.
- Validasi supply chain dengan checksum dan signed container image.
- Scan dependencies dan image untuk vulnerability.`,
    },
    {
      id: 'sec-02-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-advanced',
        filename: 'ci.yml',
        language: 'yaml',
        title: 'GitHub Actions: Pipeline CI/CD dengan Verifikasi Artefak',
        code: `name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build artefak
        run: npm run build

      - name: Generate checksum
        run: |
          sha256sum dist/app.tar.gz > dist/app.tar.gz.sha256
          cat dist/app.tar.gz.sha256

      - name: Upload immutable artefak
        uses: actions/upload-artifact@v4
        with:
          name: app-\${{ github.sha }}
          path: |
            dist/app.tar.gz
            dist/app.tar.gz.sha256
          retention-days: 30

  deploy-staging:
    needs: build-and-verify
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: app-\${{ github.sha }}

      - name: Verifikasi checksum sebelum deploy
        run: sha256sum -c app.tar.gz.sha256

      - name: Deploy ke staging
        run: echo "Deploying \${{ github.sha }} ke staging..."`,
        explanation:
          'Workflow GitHub Actions ini membangun artefak immutable dengan tag commit SHA, menghasilkan checksum SHA-256, dan memverifikasi integritas sebelum deploy. Pola ini memastikan artefak yang dipromosikan antar environment tidak berubah.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** CI/CD bukan hanya otomasi build dan deploy. Ia mencakup arsitektur runner, manajemen artefak, caching, keamanan secrets, DAG, matrix build, dan immutable artifact. Pipeline yang baik mempercepat feedback loop dan menurunkan risiko rilis.',
    },
  ],
}
