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
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'pipeline-parser.js',
        language: 'javascript',
        title: 'JavaScript: Parser Pipeline Sederhana',
        code: `const pipeline = {
  name: 'devops-basic-ci',
  trigger: ['push', 'pull_request'],
  jobs: [
    { name: 'install', script: ['pnpm install --frozen-lockfile'] },
    { name: 'lint', needs: ['install'], script: ['pnpm lint'] },
    { name: 'test', needs: ['install'], script: ['pnpm test'] },
    { name: 'build', needs: ['lint', 'test'], script: ['pnpm build'] },
  ],
}

function getExecutionOrder(jobs) {
  const done = new Set()
  const order = []

  function canRun(job) {
    return (job.needs || []).every((need) => done.has(need))
  }

  while (done.size < jobs.length) {
    const runnable = jobs.filter((job) => !done.has(job.name) && canRun(job))
    if (runnable.length === 0) {
      throw new Error('Terdapat siklus dependensi atau kebutuhan yang tidak ada')
    }
    for (const job of runnable) {
      order.push(job.name)
      done.add(job.name)
    }
  }

  return order
}

console.log('Urutan eksekusi:', getExecutionOrder(pipeline.jobs).join(' → '))`,
        explanation:
          'Parser ini menentukan urutan eksekusi job berdasarkan dependensi. Konsep yang sama digunakan CI runner untuk membangun directed acyclic graph (DAG) dari pipeline.',
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
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'pipeline-validator.ts',
        language: 'typescript',
        title: 'TypeScript: Validator Pipeline Stage',
        code: `interface PipelineJob {
  name: string
  needs?: string[]
  script: string[]
  allowFailure?: boolean
}

interface Pipeline {
  name: string
  jobs: PipelineJob[]
}

class PipelineValidator {
  validate(pipeline: Pipeline): string[] {
    const errors: string[] = []
    const jobNames = new Set(pipeline.jobs.map((job) => job.name))

    for (const job of pipeline.jobs) {
      if (job.script.length === 0) {
        errors.push(\`Job "\${job.name}" tidak memiliki script\`)
      }
      for (const need of job.needs || []) {
        if (!jobNames.has(need)) {
          errors.push(\`Job "\${job.name}" bergantung pada job tidak dikenal "\${need}"\`)
        }
      }
      if ((job.needs || []).includes(job.name)) {
        errors.push(\`Job "\${job.name}" bergantung pada dirinya sendiri\`)
      }
    }

    return errors
  }
}

const pipeline: Pipeline = {
  name: 'deploy',
  jobs: [
    { name: 'build', script: ['pnpm build'] },
    { name: 'deploy', needs: ['build'], script: ['pnpm deploy:prod'] },
  ],
}

const validator = new PipelineValidator()
console.log('Validation errors:', validator.validate(pipeline))`,
        explanation:
          'Validator memastikan tidak ada job yang bergantung pada dirinya sendiri atau merujuk job yang tidak ada. Validasi semacam ini mencegah pipeline gagal karena kesalahan konfigurasi.',
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
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'artifact-checksum.go',
        language: 'go',
        title: 'Go: Verifikasi Checksum Artefak',
        code: `package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"os"
)

func checksumFile(path string) (string, error) {
	file, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer file.Close()

	h := sha256.New()
	if _, err := io.Copy(h, file); err != nil {
		return "", err
	}
	return hex.EncodeToString(h.Sum(nil)), nil
}

func main() {
	expected := "a3f5b2..."
	actual, err := checksumFile("dist/app.tar.gz")
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	if actual != expected {
		fmt.Printf("Checksum tidak cocok\\nexpected: %s\\nactual:   %s\\n", expected, actual)
		os.Exit(1)
	}
	fmt.Println("Artefak terverifikasi:", actual)
}`,
        explanation:
          'Verifikasi checksum memastikan artefak yang dipromosikan antar environment tidak berubah. Ini adalah bagian dari immutable artifact dan supply chain security.',
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
