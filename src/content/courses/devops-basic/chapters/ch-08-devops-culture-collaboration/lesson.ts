import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-devops-culture-collaboration',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-08-basic-devops-culture',
      type: 'markdown',
      level: 'basic',
      title: 'Apa itu DevOps?',
      content: `## Definisi DevOps

DevOps adalah kumpulan praktik, tools, dan filosofi kultur yang mengintegrasikan tim development (Dev) dan operations (Ops). Tujuannya: memperpendek siklus pengembangan sistem dan menyediakan continuous delivery dengan kualitas tinggi.

DevOps bukan sebuah role, tool, atau departemen tersendiri. Ia adalah cara kerja di mana development, operations, quality assurance, dan security berkolaborasi sepanjang lifecycle aplikasi.

## Framework CALMS

CALMS adalah akronim untuk lima pilar DevOps:

1. **Culture**: kolaborasi, trust, dan shared responsibility antar tim.
2. **Automation**: otomasi pipeline, test, deployment, dan operasi manual.
3. **Lean**: menghilangkan waste, mengurangi batch size, dan mempercepat aliran nilai.
4. **Measurement**: mengukur apa yang penting, dari metrik teknis hingga business outcomes.
5. **Sharing**: berbagi pengetahuan, tools, dan praktik antar tim.

## Shift-Left

Shift-left berarti memindahkan aktivitas seperti testing, security, dan observability ke awal siklus pengembangan. Semakin awal masalah ditemukan, semakin murah biaya perbaikannya.

## Silo dan Handoff

Tradisionalnya, Dev menulis kode lalu melemparkannya ke Ops untuk deploy. Handoff ini menciptakan silo, ketidakpahaman, dan blame. DevOps menghapus sebagian besar handoff dengan tim yang bertanggung jawab penuh terhadap build dan run.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'incident-workflow.js',
        language: 'javascript',
        title: 'JavaScript: State Machine Alur Insiden',
        code: `const incidentStates = {
  detected: { next: ['triaged'] },
  triaged: { next: ['mitigated', 'escalated'] },
  escalated: { next: ['mitigated'] },
  mitigated: { next: ['resolved'] },
  resolved: { next: ['postmortem_scheduled'] },
  postmortem_scheduled: { next: ['postmortem_completed'] },
  postmortem_completed: { next: [] },
}

function transition(current, next) {
  if (!incidentStates[current].next.includes(next)) {
    throw new Error(\`Transisi tidak valid: \${current} -> \${next}\`)
  }
  return next
}

let state = 'detected'
state = transition(state, 'triaged')
state = transition(state, 'mitigated')
state = transition(state, 'resolved')
state = transition(state, 'postmortem_scheduled')
console.log('Status insiden:', state)`,
        explanation:
          'State machine ini menggambarkan alur insiden dari deteksi hingga postmortem. Setiap tahap memiliki transisi yang jelas sehingga tim respons insiden memiliki kerangka kerja bersama.',
      },
    },
    {
      id: 'sec-08-intermediate-postmortem-sre',
      type: 'markdown',
      level: 'intermediate',
      title: 'Blameless Postmortem, SRE, dan Platform Engineering',
      content: `## Blameless Postmortem

Postmortem adalah dokumentasi analisis setelah insiden. Prinsip blameless berarti fokus pada sistem, bukan menyalahkan individu. Tujuan:

- Memahami apa yang terjadi.
- Mengidentifikasi contributing factors.
- Menentukan action items untuk mencegah kejadian serupa.
- Mendistribusikan pembelajaran ke seluruh organisasi.

Struktur postmortem yang baik mencakup: summary, timeline, impact, root cause, remediation, dan action items.

## Site Reliability Engineering (SRE)

SRE adalah disiplin yang menerapkan prinsip software engineering ke masalah operasional. Konsep kunci:

- **Service Level Objectives (SLO)**: target reliability.
- **Error budget**: toleransi kegagalan yang dapat dikonsumsi tim.
- **Toil**: pekerjaan manual berulang yang harus diminimalkan melalui otomasi.
- **Blameless postmortem**: belajar dari kegagalan.

SRE sering bertindak sebagai penghubung antara engineering dan operations dengan fokus reliability.

## Platform Engineering

Platform engineering membangun platform internal self-service yang memungkinkan developer untuk:

- Menyediakan infrastruktur melalui API atau portal.
- Menggunakan golden path untuk deployment yang aman.
- Mengakses observability, secrets, dan feature flags secara terstandarisasi.

Platform team memperlakukan developer sebagai customer dan platform sebagai produk.

## Internal Developer Platform (IDP)

IDP adalah lapisan abstraksi di atas infrastruktur kompleks. Komponen umum:

- Service catalog.
- Self-service provisioning.
- CI/CD templates.
- Observability dashboards.
- Documentation dan runbooks.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'retrospective.ts',
        language: 'typescript',
        title: 'TypeScript: Template Retrospektif Insiden',
        code: `interface TimelineEvent {
  time: string
  description: string
  actor: string
}

interface ActionItem {
  owner: string
  description: string
  dueDate: string
}

interface IncidentRetrospective {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  summary: string
  timeline: TimelineEvent[]
  rootCause: string
  impact: string
  actionItems: ActionItem[]
  blameless: true
}

const retrospective: IncidentRetrospective = {
  id: 'INC-2026-042',
  title: 'Latensi tinggi pada checkout service',
  severity: 'high',
  summary: 'Latensi p99 checkout service melonjak akibat query database tanpa index.',
  timeline: [
    { time: '08:00', description: 'Alert latensi tinggi aktif', actor: 'monitoring' },
    { time: '08:05', description: 'Tim on-call mengkonfirmasi anomaly', actor: 'sre' },
    { time: '08:20', description: 'Index ditambahkan dan cache diperbesar', actor: 'dba' },
    { time: '08:35', description: 'Metrik kembali normal', actor: 'sre' },
  ],
  rootCause: 'Migration baru menambah query tanpa index pada tabel orders.',
  impact: 'Pengguna mengalami keterlambatan checkout selama 30 menit.',
  actionItems: [
    { owner: 'backend-team', description: 'Tambahkan migration lint untuk query plan', dueDate: '2026-07-05' },
    { owner: 'sre-team', description: 'Tambahkan SLO alert untuk p99 checkout', dueDate: '2026-07-10' },
  ],
  blameless: true,
}

console.log(JSON.stringify(retrospective, null, 2))`,
        explanation:
          'Template ini mencakup elemen penting blameless postmortem: timeline, root cause, impact, dan action items yang dapat ditindaklanjuti.',
      },
    },
    {
      id: 'sec-08-advanced-team-topologies',
      type: 'markdown',
      level: 'advanced',
      title: 'DORA Metrics, Team Topologies, dan Value Stream',
      content: `## DORA Metrics

DORA (DevOps Research and Assessment) mengidentifikasi empat metrik kunci kinerja software delivery:

1. **Deployment Frequency**: seberapa sering deploy ke production. Frekuensi tinggi menunjukkan batch kecil dan confidence tinggi.
2. **Lead Time for Changes**: waktu dari commit hingga production. Lead time pendek memungkinkan feedback cepat.
3. **Change Failure Rate**: persentase deploy yang menyebabkan kegagalan. Nilai rendah menunjukkan kualitas baik.
4. **Time to Restore Service**: waktu pulih dari insiden. Restore cepat mengurangi dampak bisnis.

Empat metrik ini seimbang antara velocity dan stability.

## Team Topologies

Team Topologies oleh Matthew Skelton dan Manuel Pais mengklasifikasikan tim menjadi:

- **Stream-aligned team**: tim yang menyelaraskan dengan aliran nilai bisnis.
- **Platform team**: membangun platform internal untuk meningkatkan productivity.
- **Complicated subsystem team**: menangani domain teknis kompleks yang memerlukan spesialisasi.
- **Enabling team**: membantu stream-aligned team mengadopsi teknologi atau praktik baru.

Interaksi antar tim:

- **Collaboration**: bekerja sama untuk periode tertentu.
- **X-as-a-Service**: mengonsumsi hasil tim lain sebagai layanan.
- **Facilitating**: tim enabling membantu tim lain meningkatkan kemampuan.

## Cognitive Load

Cognitive load adalah jumlah informasi yang harus diproses tim untuk menyelesaikan pekerjaan. Platform engineering mengurangi cognitive load dengan menyediakan abstraction dan golden path, sehingga developer dapat fokus pada fitur bisnis.

## Value Stream Mapping

Value stream mapping mengidentifikasi langkah-langkah yang menambah nilai dan langkah-langkah yang merupakan waste dalam proses pengiriman software. Tujuannya:

- Mengurangi lead time.
- Menghilangkan bottleneck.
- Meningkatkan kolaborasi antar tim.

## Psychological Safety

Psychological safety adalah keyakinan tim bahwa mereka dapat mengambil risiko interpersonal, seperti mengakui kesalahan atau mempertanyakan keputusan. Tim dengan psychological safety tinggi lebih cepat belajar dari kegagalan dan lebih inovatif.

## DevSecOps dan FinOps

- **DevSecOps**: mengintegrasikan security ke dalam pipeline DevOps sejak awal.
- **FinOps**: praktik mengelola dan mengoptimalkan pengeluaran cloud secara kolaboratif.`,
    },
    {
      id: 'sec-08-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-advanced',
        filename: 'postmortem-template.md',
        language: 'text',
        title: 'Template Blameless Postmortem',
        code: `# Postmortem: [Judul Insiden]

**ID:** INC-2026-042
**Severity:** SEV-2
**Tanggal:** 2026-06-15
**Penulis:** Tim SRE + Engineering

## Ringkasan
Latensi p99 checkout naik akibat query tanpa index setelah migration database.

## Impact
- Durasi: 25 menit (08:00–08:25 WIB)
- Pengguna terdampak: ~12.000 sesi checkout
- Revenue impact estimasi: [isi jika tersedia]

## Timeline (UTC)
| Waktu | Peristiwa | Actor |
|-------|-----------|-------|
| 08:00 | Alert latensi p99 > 2s aktif | monitoring |
| 08:05 | Incident commander ditunjuk | on-call SRE |
| 08:15 | Index ditambahkan ke kolom order_date | DBA |
| 08:25 | Metrik kembali normal, incident resolved | SRE |

## Root Cause
Migration v2.4 menambah query ORDER BY tanpa index pada kolom order_date.

## Action Items
| Owner | Tindakan | Due Date | Status |
|-------|----------|----------|--------|
| backend | Tambahkan migration lint untuk query plan review | 2026-07-10 | open |
| platform | Alert burn rate untuk latensi checkout | 2026-07-15 | open |

## Lessons Learned
- Migration review harus mencakup EXPLAIN plan, bukan hanya schema diff.
- Blameless: fokus perbaiki sistem, bukan menyalahkan individu.`,
        explanation:
          'Template postmortem blameless memastikan setiap insiden didokumentasikan dengan timeline, root cause, impact, dan action items yang dapat ditindaklanjuti. Struktur ini mendukung pembelajaran organisasi tanpa culture of blame.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** DevOps tidak hanya tentang tools dan automation. Kultur CALMS, blameless postmortem, SRE, platform engineering, DORA metrics, dan team topologies yang tepat menentukan keberhasilan organisasi dalam mengirimkan software yang andal secara berkelanjutan.',
    },
  ],
}
