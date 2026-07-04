import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-ethics-frontier-cs',
  estimatedMinutes: 48,
  sections: [
    {
      id: 'sec-08-basic-acm-ieee',
      type: 'markdown',
      level: 'basic',
      title: 'Kode Etik ACM dan IEEE',
      content: `## Mengapa Etika Penting di CS?

Teknologi computing memengaruhi jutaan orang: privasi data, keselamatan infrastruktur kritis, bias algoritma, dan dampak lingkungan data center. **Kode etik profesional** memberikan kerangka untuk keputusan di luar "bisakah kita?" menjadi "haruskah kita?".

## ACM Code of Ethics (2018)

Association for Computing Machinery mengadopsi **24 prinsip** dalam empat kategori:

### 1. General Ethical Principles
- **Contribute to society and human well-being** — teknologi harus meningkatkan kesejahteraan.
- **Avoid harm** — minimalkan risiko negatif yang dapat diantisipasi.
- **Be honest and trustworthy** — transparansi tentang kemampuan dan keterbatasan sistem.
- **Be fair and take action not to discriminate** — desain inklusif, hindari bias.
- **Respect privacy** — perlindungan data pribadi.
- **Honor confidentiality** — jaga informasi yang dipercayakan.

### 2. Professional Responsibilities
- Strive for high quality, recognize dan dokumentasikan risiko.
- Perform work only in areas of competence.
- **Provide access to computing resources** — equity akses teknologi.
- **Design and implement robust systems** — keandalan dan keamanan.

### 3. Professional Leadership
- Articulate, apply, and support ethical policies.
- Create opportunities for members of organization to grow as professionals.
- **Recognize and take special care of systems that become integrated into society's infrastructure**.

### 4. Compliance with the Code
- Uphold, promote, and respect the Code.
- Report violations when appropriate.

## IEEE Code of Ethics

IEEE menekankan prinsip serupa dengan formulasi ringkas:

1. **Hold paramount the safety, health, and welfare of the public.**
2. Avoid conflicts of interest.
3. Be honest and realistic in stating claims.
4. Reject bribery and corruption.
5. Improve understanding of technology by the public.
6. Maintain and improve technical competence.
7. Seek, accept, and offer honest criticism of technical work.
8. Treat fairly all persons regardless of race, religion, gender, disability, age, or national origin.
9. Avoid injuring others, their property, reputation, or employment.
10. Assist colleagues in professional development.

## Dilema Etis dalam Praktik

- **Whistleblowing**: melaporkan praktik berbahaya vs loyalitas perusahaan.
- **Dual use**: teknologi yang bermanfaat dapat disalahgunakan (facial recognition, surveillance).
- **Automation bias**: over-reliance pada output algoritma tanpa verifikasi manusia.`,
    },
    {
      id: 'sec-08-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go-basic',
        filename: 'ethics_checklist.go',
        language: 'go',
        title: 'Go: Checklist Prinsip Etik ACM',
        code: `package main

import "fmt"

type EthicalPrinciple struct {
	Name        string
	Description string
	Checked     bool
}

func evaluateFeature(principles []EthicalPrinciple) bool {
	for _, p := range principles {
		if !p.Checked {
			fmt.Printf("PERINGATAN: %s belum dipenuhi — %s\\n", p.Name, p.Description)
			return false
		}
	}
	return true
}

func main() {
	feature := []EthicalPrinciple{
		{Name: "Avoid Harm", Description: "Risiko negatif diminimalkan", Checked: true},
		{Name: "Privacy", Description: "Data pribadi dilindungi", Checked: true},
		{Name: "Fairness", Description: "Tidak ada bias diskriminatif", Checked: false},
	}

	if evaluateFeature(feature) {
		fmt.Println("Fitur lolos evaluasi etik")
	} else {
		fmt.Println("Fitur perlu revisi sebelum rilis")
	}
}`,
        explanation:
          'Kerangka etik ACM dapat dioperasionalkan sebagai checklist sebelum rilis fitur. Prinsip seperti fairness dan privacy harus diverifikasi eksplisit, bukan diasumsikan.',
      },
    },
    {
      id: 'sec-08-intermediate-privacy-gdpr',
      type: 'markdown',
      level: 'intermediate',
      title: 'Privacy by Design dan GDPR',
      content: `## Privacy by Design (PbD)

**Privacy by Design** (Ann Cavoukian, 1990s) adalah pendekatan proaktif: privasi diintegrasikan ke dalam desain sistem **sejak awal**, bukan ditambahkan setelah produk selesai.

### Tujuh Prinsip PbD

1. **Proactive not Reactive** — cegah, jangan perbaiki setelah breach.
2. **Privacy as the Default** — pengaturan paling privasi tanpa aksi user.
3. **Privacy Embedded into Design** — bukan add-on.
4. **Full Functionality** — privasi dan fungsionalitas, bukan trade-off.
5. **End-to-End Security** — enkripsi sepanjang lifecycle data.
6. **Visibility and Transparency** — user tahu data apa yang dikumpulkan.
7. **Respect for User Privacy** — user-centric.

### Implementasi untuk Developer

- **Data minimization**: kumpulkan hanya data yang diperlukan.
- **Purpose limitation**: gunakan data hanya untuk tujuan yang disetujui.
- **Pseudonymization/anonymization**: pisahkan identitas dari data analitik.
- **Privacy impact assessment (PIA/DPIA)**: evaluasi risiko sebelum fitur baru.

## GDPR (General Data Protection Regulation)

GDPR EU (2018) mengatur pemrosesan data pribadi warga EU, berlaku global jika memproses data EU.

### Peran

- **Data Controller**: menentukan tujuan dan cara pemrosesan.
- **Data Processor**: memproses atas nama controller (cloud provider, SaaS).

### Lawful Basis (Art. 6)

Pemrosesan harus memiliki dasar hukum: consent, contract, legal obligation, vital interests, public task, atau legitimate interests.

### Hak Subjek Data

- **Right to access** (Art. 15): salinan data pribadi.
- **Right to erasure** ("right to be forgotten", Art. 17).
- **Right to data portability** (Art. 20): export data format terstruktur.
- **Right to object** (Art. 21): tolak profiling/ marketing.

### Kewajiban Teknis

- **Privacy by design and by default** (Art. 25).
- **Data breach notification** dalam 72 jam ke authority.
- **DPO (Data Protection Officer)** untuk organisasi tertentu.
- **DPIA** untuk pemrosesan berisiko tinggi.

### Dampak Global

GDPR menjadi benchmark regulasi privasi worldwide. Indonesia UU PDP (2022) dan regulasi serupa di berbagai negara mengadopsi prinsip serupa.`,
    },
    {
      id: 'sec-08-intermediate-ai-ml',
      type: 'markdown',
      level: 'intermediate',
      title: 'Reliabilitas AI/ML',
      content: `## Di Luar Akurasi

Model ML dengan akurasi tinggi dapat **gagal** dalam produksi karena:

- **Distribution shift**: data training ≠ data production.
- **Adversarial examples**: input dirancang untuk menipu model.
- **Bias**: model mereplikasi bias historis dalam data training.
- **Opacity**: black-box model sulit diaudit dan dijelaskan.

## Dimensi Reliabilitas AI

### 1. Fairness dan Bias

- **Historical bias**: data mencerminkan diskriminasi masa lalu.
- **Representation bias**: underrepresentation kelompok tertentu.
- **Evaluation bias**: metrik tidak representatif untuk semua subgroup.

Mitigasi: diverse training data, fairness metrics (demographic parity, equalized odds), bias audit.

### 2. Robustness

Model harus stabil terhadap:
- Noise input.
- Adversarial perturbation.
- Edge cases (out-of-distribution).

### 3. Explainability (XAI)

Regulasi (GDPR Art. 22) dan etika menuntut **explainability** untuk keputusan otomatis:

- **LIME/SHAP**: interpretasi prediksi per instance.
- **Feature importance**: kontribusi fitur global.
- **Model cards**: dokumentasi intended use, limitations, bias.

### 4. Monitoring dan Drift

- **Data drift**: distribusi input berubah.
- **Concept drift**: hubungan input-output berubah.
- **Performance degradation**: akurasi turun tanpa retraining.

Production ML membutuhkan **MLOps**: versioning model, A/B testing, rollback, dan alerting.`,
    },
    {
      id: 'sec-08-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go-intermediate',
        filename: 'data_minimization.go',
        language: 'go',
        title: 'Go: Data Minimization pada API Response',
        code: `package main

import (
	"fmt"
	"strings"
	"time"
)

type UserRecord struct {
	ID           string
	Email        string
	PasswordHash string
	SSN          string
	CreatedAt    time.Time
}

type PublicUserProfile struct {
	ID          string
	DisplayName string
}

func toPublicProfile(user UserRecord) PublicUserProfile {
	parts := strings.SplitN(user.Email, "@", 2)
	displayName := parts[0]
	return PublicUserProfile{ID: user.ID, DisplayName: displayName}
}

func getUserProfile(userID string, users []UserRecord) (PublicUserProfile, bool) {
	for _, u := range users {
		if u.ID == userID {
			return toPublicProfile(u), true
		}
	}
	return PublicUserProfile{}, false
}

func main() {
	users := []UserRecord{
		{ID: "u1", Email: "alice@example.com", PasswordHash: "hash", SSN: "xxx"},
	}
	if profile, ok := getUserProfile("u1", users); ok {
		fmt.Printf("%+v\\n", profile)
		// Hanya ID dan DisplayName — tidak ada passwordHash atau SSN
	}
}`,
        explanation:
          'Data minimization: API publik tidak mengekspos passwordHash, SSN, atau email penuh. Hanya field yang diperlukan untuk tujuan endpoint.',
      },
    },
    {
      id: 'sec-08-advanced-quantum-opensource',
      type: 'markdown',
      level: 'advanced',
      title: 'Komputasi Kuantum dan Tata Kelola Open-Source',
      content: `## Pengantar Komputasi Kuantum

Komputer klasik memproses **bit** (0 atau 1). Komputer kuantum memproses **qubit** yang dapat berada dalam **superposisi** (0 dan 1 simultan) dan **entanglement** (korelasi kuantum antar qubit).

### Qubit dan Gates

\`\`\`text
|0⟩ dan |1⟩ = basis state
Superposisi: α|0⟩ + β|1⟩  (|α|² + |β|² = 1)
Gate kuantum: operasi unitary pada qubit (Hadamard, CNOT, dll.)
\`\`\`

### Algoritma Kuantum Penting

- **Shor's algorithm** (1994): faktorisasi bilangan besar dalam waktu polinomial → **mengancam RSA dan ECC**.
- **Grover's algorithm**: pencarian unsorted database O(√N) vs O(N) klasik.

### Post-Quantum Cryptography

NIST (2024) menstandardisasi algoritma **post-quantum**:

- **ML-KEM** (Kyber): key encapsulation.
- **ML-DSA** (Dilithium): digital signature.
- **SLH-DSA** (SPHINCS+): hash-based signature.

Migrasi "harvest now, decrypt later" sudah dimulai: attacker menyimpan traffic terenkripsi hari ini untuk didekripsi saat komputer kuantum cukup kuat.

### Status Hardware

Qubit saat ini rentan **decoherence** dan **error**. Quantum error correction membutuhkan ribuan physical qubit per logical qubit. Quantum advantage praktis terbatas pada domain spesifik (simulasi kimia, optimasi) dalam horizon dekat.

## Tata Kelola Open-Source

Open-source memperkuat ekosistem CS, tetapi membawa tanggung jawab:

### Lisensi

- **Permissive** (MIT, Apache 2.0): penggunaan luas, minimal restriksi.
- **Copyleft** (GPL, AGPL): derivatif harus open-source; AGPL menutup SaaS loophole.
- **Compliance**: SBOM, license scanning, attribution.

### Contributor License Agreement (CLA)

CLA memastikan project dapat melisensikan ulang kontribusi (penting untuk dual licensing atau foundation).

### Security Governance

- **SECURITY.md**: cara melaporkan vulnerability.
- **Responsible disclosure**: embargo sebelum patch publik.
- **Dependabot/Renovate**: update dependency otomatis.
- **OpenSSF Scorecard**: metrik keamanan supply chain.

### Sustainability Maintainer

Burnout maintainer (xz utils incident 2024) menunjukkan risiko sistemik. Praktik sehat:

- Dokumentasi onboarding contributor.
- Banyak maintainer, bukan bus factor 1.
- Funding (GitHub Sponsors, Tidelift, foundation).
- Clear governance model (BDFL, committee, foundation).`,
    },
    {
      id: 'sec-08-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go-advanced',
        filename: 'license_check.go',
        language: 'go',
        title: 'Go: Pemeriksaan Lisensi Open-Source',
        code: `package main

import "fmt"

type LicenseCategory string

const (
	Permissive LicenseCategory = "permissive"
	Copyleft   LicenseCategory = "copyleft"
	Unknown    LicenseCategory = "unknown"
)

var knownLicenses = map[string]LicenseCategory{
	"MIT":        Permissive,
	"Apache-2.0": Permissive,
	"GPL-3.0":    Copyleft,
	"AGPL-3.0":   Copyleft,
}

type Dependency struct {
	Name    string
	License string
}

func classifyLicense(license string) LicenseCategory {
	if cat, ok := knownLicenses[license]; ok {
		return cat
	}
	return Unknown
}

func auditDependencies(deps []Dependency) {
	for _, d := range deps {
		cat := classifyLicense(d.License)
		switch cat {
		case Copyleft:
			fmt.Printf("REVIEW: %s (%s) — derivatif mungkin harus open-source\\n", d.Name, d.License)
		case Unknown:
			fmt.Printf("WARN: %s — lisensi tidak dikenal\\n", d.Name)
		default:
			fmt.Printf("OK: %s (%s)\\n", d.Name, d.License)
		}
	}
}

func main() {
	deps := []Dependency{
		{Name: "react", License: "MIT"},
		{Name: "some-lib", License: "GPL-3.0"},
		{Name: "mystery-pkg", License: "CUSTOM"},
	}
	auditDependencies(deps)
}`,
        explanation:
          'Tata kelola open-source membutuhkan license compliance scanning. Copyleft (GPL/AGPL) membatasi penggunaan komersial; SBOM dan audit otomatis mencegah pelanggaran lisensi.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Etika CS melampaui compliance checklist. Kode etik ACM/IEEE, privacy by design, GDPR, reliabilitas AI, komputasi kuantum, dan tata kelola open-source membentuk tanggung jawab profesional engineer modern. Keputusan teknis selalu memiliki dimensi sosial dan hukum.',
    },
  ],
}
