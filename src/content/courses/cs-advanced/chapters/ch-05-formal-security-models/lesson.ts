import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-formal-security-models',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-05-basic-stride-dread',
      type: 'markdown',
      level: 'basic',
      title: 'Threat Modeling: STRIDE dan DREAD',
      content: `## Mengapa Threat Modeling?

Sebelum mengimplementasikan kontrol keamanan, kita perlu memahami **ancaman** yang mungkin terjadi. Threat modeling adalah proses sistematis untuk mengidentifikasi, mengkategorikan, dan memprioritaskan ancaman terhadap sistem.

## STRIDE

**STRIDE** adalah taksonomi ancaman yang dikembangkan Microsoft. Setiap huruf mewakili kategori serangan:

| Kategori | Arti | Contoh |
|----------|------|--------|
| **S** — Spoofing | Menyamar sebagai entitas lain | Phishing credential, IP spoofing |
| **T** — Tampering | Mengubah data atau kode | Modifikasi request, SQL injection |
| **R** — Repudiation | Menyangkal aksi yang dilakukan | Menghapus audit log |
| **I** — Information Disclosure | Mengungkap informasi rahasia | Data breach, error message bocor |
| **D** — Denial of Service | Menghalangi layanan | DDoS, resource exhaustion |
| **E** — Elevation of Privilege | Mendapatkan hak lebih tinggi | Privilege escalation, BOLA |

### Cara Menerapkan STRIDE

1. Gambar **data flow diagram** (DFD) sistem: komponen, data store, trust boundary.
2. Untuk setiap elemen dan alur data, tanyakan: ancaman STRIDE mana yang mungkin?
3. Dokumentasikan mitigasi untuk setiap ancaman yang ditemukan.

## DREAD

Setelah ancaman teridentifikasi, **DREAD** membantu memprioritaskan mitigasi berdasarkan lima dimensi (skala 0–10):

- **D** — Damage potential: seberapa parah dampak jika terjadi?
- **R** — Reproducibility: seberapa mudah mengulang serangan?
- **E** — Exploitability: seberapa mudah dieksploitasi?
- **A** — Affected users: berapa banyak pengguna terdampak?
- **D** — Discoverability: seberapa mudah menemukan kerentanan?

Skor DREAD rata-rata membantu menentukan urutan perbaikan. Ancaman dengan skor tinggi ditangani terlebih dahulu.`,
    },
    {
      id: 'sec-05-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go-basic',
        filename: 'stride_analysis.go',
        language: 'go',
        title: 'Go: Analisis STRIDE pada Endpoint Login',
        code: `package main

import "fmt"

type StrideCategory string

const (
	Spoofing            StrideCategory = "Spoofing"
	Tampering           StrideCategory = "Tampering"
	Repudiation         StrideCategory = "Repudiation"
	InfoDisclosure      StrideCategory = "Information Disclosure"
	DenialOfService     StrideCategory = "Denial of Service"
	ElevationOfPrivilege StrideCategory = "Elevation of Privilege"
)

type Threat struct {
	Category  StrideCategory
	Scenario  string
	Mitigation string
}

func main() {
	threats := []Threat{
		{Spoofing, "Attacker kirim credential curian", "MFA, rate limiting"},
		{Tampering, "Modifikasi token di transit", "HTTPS/TLS, signed JWT"},
		{Repudiation, "User tolak login yang dilakukan", "Audit log immutable"},
		{InfoDisclosure, "Error bocorkan user tidak ditemukan", "Pesan generik credential invalid"},
		{DenialOfService, "Brute-force password", "Rate limit, account lockout"},
		{ElevationOfPrivilege, "Token di-upgrade jadi admin", "RBAC per endpoint"},
	}

	fmt.Println("STRIDE Analysis: POST /auth/login")
	for _, t := range threats {
		fmt.Printf("  %s → %s | Mitigasi: %s\\n", t.Category, t.Scenario, t.Mitigation)
	}
}`,
        explanation:
          'Threat modeling STRIDE diterapkan per komponen dan alur data. Setiap kategori ancaman dipetakan ke mitigasi konkret dalam struktur data Go.',
      },
    },
    {
      id: 'sec-05-intermediate-access-control',
      type: 'markdown',
      level: 'intermediate',
      title: 'Model Kontrol Akses: DAC, MAC, dan RBAC',
      content: `## Discretionary Access Control (DAC)

Pada **DAC**, pemilik resource menentukan siapa yang boleh mengakses. Model ini fleksibel dan umum di sistem operasi desktop (Unix file permissions, Windows ACL).

- Keuntungan: mudah dikonfigurasi oleh pengguna.
- Kelemahan: sulit menegakkan kebijakan organisasi; malware dapat menyebar jika satu akun kompromi.

## Mandatory Access Control (MAC)

**MAC** menggunakan label keamanan yang ditetapkan oleh administrator sistem, bukan pemilik resource. Setiap subjek (user/proses) dan objek (file/koneksi) memiliki label klasifikasi.

- Keuntungan: kebijakan keamanan konsisten dan tidak dapat di-override pengguna.
- Kelemahan: administrasi kompleks; kurang fleksibel untuk lingkungan bisnis umum.
- Contoh: sistem militer dengan label Top Secret, Secret, Confidential.

## Role-Based Access Control (RBAC)

**RBAC** mengelola izin melalui **peran** (role), bukan individu. User diberi satu atau lebih role, dan peran memiliki kumpulan permission.

\`\`\`text
User "Alice" → Role "Editor" → Permissions [posts:read, posts:write]
User "Bob"   → Role "Admin"  → Permissions [posts:*, users:*]
\`\`\`

Komponen RBAC (NIST model):

1. **Users** — entitas yang mengakses sistem.
2. **Roles** — kumpulan permission yang didefinisikan.
3. **Permissions** — operasi yang diizinkan pada resource.
4. **Sessions** — user aktif dengan satu atau lebih role.

### Perbandingan Singkat

| Aspek | DAC | MAC | RBAC |
|-------|-----|-----|------|
| Siapa menentukan akses | Pemilik resource | Administrator sistem | Administrator via role |
| Fleksibilitas | Tinggi | Rendah | Sedang |
| Skala organisasi | Kecil | Militer/government | Perusahaan, SaaS |
| Contoh | File permissions | SELinux labels | OAuth scopes + role matrix |`,
    },
    {
      id: 'sec-05-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go-intermediate',
        filename: 'rbac.go',
        language: 'go',
        title: 'Go: Matriks RBAC Sederhana',
        code: `package main

import "fmt"

type Permission string

const (
	ReadPerm   Permission = "read"
	WritePerm  Permission = "write"
	DeletePerm Permission = "delete"
	AdminPerm  Permission = "admin"
)

type Role string

const (
	ViewerRole Role = "viewer"
	EditorRole Role = "editor"
	AdminRole  Role = "admin"
)

var rolePermissions = map[Role][]Permission{
	ViewerRole: {ReadPerm},
	EditorRole: {ReadPerm, WritePerm},
	AdminRole:  {ReadPerm, WritePerm, DeletePerm, AdminPerm},
}

func hasPermission(role Role, perm Permission) bool {
	for _, p := range rolePermissions[role] {
		if p == perm {
			return true
		}
	}
	return false
}

func authorize(role Role, required Permission) error {
	if !hasPermission(role, required) {
		return fmt.Errorf("access denied")
	}
	return nil
}

func main() {
	fmt.Println(authorize(EditorRole, WritePerm))  // <nil>
	fmt.Println(authorize(ViewerRole, DeletePerm)) // access denied
}`,
        explanation:
          'RBAC memetakan role ke permission. Fungsi authorize memeriksa apakah role user memiliki permission yang dibutuhkan sebelum operasi diizinkan.',
      },
    },
    {
      id: 'sec-05-advanced-bell-lapadula',
      type: 'markdown',
      level: 'advanced',
      title: 'Bell-LaPadula dan Zero-Knowledge Proof',
      content: `## Model Bell-LaPadula

**Bell-LaPadula** adalah model keamanan formal untuk sistem **multilevel security** (MLS). Tujuannya melindungi **kerahasiaan** (confidentiality) informasi berklasifikasi.

Setiap subjek dan objek memiliki **security level** (misalnya: Unclassified < Confidential < Secret < Top Secret).

### Dua Properti Utama

1. **Simple Security Property** (*no read up*):
   Subjek hanya boleh **membaca** objek dengan level keamanan **≤** level subjek.
   User Secret tidak boleh membaca dokumen Top Secret.

2. ***-Property (Star Property)** (*no write down*):
   Subjek hanya boleh **menulis** ke objek dengan level keamanan **≥** level subjek.
   User Top Secret tidak boleh menulis ke file Unclassified (cegah kebocoran ke level rendah).

### Keterbatasan Bell-LaPadula

- Fokus pada **confidentiality**, bukan **integrity** (ditangani model Biba).
- Tidak menangani covert channel dan side-channel.
- Sulit diterapkan di sistem komersial yang membutuhkan fleksibilitas.

## Zero-Knowledge Proof (ZKP)

**Zero-knowledge proof** memungkinkan prover membuktikan pernyataan benar kepada verifier **tanpa mengungkapkan informasi apapun** selain kebenaran pernyataan itu.

### Tiga Properti ZKP

1. **Completeness**: jika pernyataan benar, verifier yakin (dengan probabilitas tinggi).
2. **Soundness**: jika pernyataan salah, prover tidak bisa meyakinkan verifier (kecuali dengan probabilitas negligible).
3. **Zero-knowledge**: verifier tidak mempelajari informasi tambahan di balik kebenaran pernyataan.

### Contoh Intuitif: Ali-Baba Cave

Prover tahu password pintu rahasia di dalam gua berbentuk U. Verifier menunggu di luar. Prover masuk gua, verifier minta keluar dari pintu A atau B secara acak. Prover yang tahu password bisa selalu keluar dari pintu yang diminta. Setelah banyak ronde, verifier yakin prover tahu password tanpa pernah melihat password itu.

### Aplikasi Praktis

- **Autentikasi**: membuktikan identitas tanpa mengirim password.
- **Blockchain**: zk-SNARKs dan zk-STARKs untuk transaksi privat.
- **Voting**: membuktikan suara valid tanpa mengungkapkan pilihan.`,
    },
    {
      id: 'sec-05-advanced-side-channel',
      type: 'markdown',
      level: 'advanced',
      title: 'Taksonomi Side-Channel Attack',
      content: `## Apa itu Side-Channel?

**Side-channel attack** mengeksploitasi informasi **fisik atau implementasi** yang bocor selama eksekusi, bukan kelemahan algoritma kriptografi itu sendiri. Meskipun algoritma matematis aman, implementasinya bisa bocor.

## Taksonomi Side-Channel

### 1. Timing Attack

Mengukur **waktu eksekusi** operasi kriptografi. Implementasi perbandingan string non-constant-time dapat bocorkan byte secret secara bertahap.

\`\`\`text
if (password[i] == input[i]) → lanjut    // cepat jika match
else → return error                       // lambat jika mismatch
\`\`\`

Mitigasi: constant-time comparison, blinding.

### 2. Power Analysis

Mengukur **konsumsi daya** chip selama operasi. Simple Power Analysis (SPA) dan Differential Power Analysis (DPA) dapat merekonstruksi kunci enkripsi.

Mitigasi: masking, noise injection, hardware secure element.

### 3. Cache Timing Attack

Memantau **cache hit/miss** untuk inferensi akses memori. Attacker dan victim berbagi cache (cloud VM, browser) sehingga pola akses memori victim dapat diamati.

Contoh terkenal: Meltdown dan Spectre (2018) mengeksploitasi speculative execution dan cache side-channel.

Mitigasi: cache partitioning, KPTI (Kernel Page Table Isolation), microcode update.

### 4. Electromagnetic (EM) Emanation

Menangkap **radiasi elektromagnetik** dari perangkat untuk merekonstruksi operasi internal. Efektif pada jarak dekat (TEMPEST attack).

### 5. Acoustic / Fault Injection

- **Acoustic**: menganalisis suara fan atau hard drive untuk inferensi operasi.
- **Fault injection**: memanipulasi tegangan atau clock untuk memicu error yang bocorkan informasi (differential fault analysis).

## Defense in Depth

Tidak ada mitigasi tunggal yang cukup. Kombinasi:

- Implementasi constant-time.
- Hardware security module (HSM).
- Isolasi proses dan cache.
- Regular security audit dan penetration testing.`,
    },
    {
      id: 'sec-05-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go-advanced',
        filename: 'constant_time.go',
        language: 'go',
        title: 'Go: Constant-Time Comparison — Mitigasi Timing Attack',
        code: `package main

import (
	"crypto/subtle"
	"fmt"
)

// VULNERABLE: perbandingan byte-per-byte berhenti di mismatch pertama
func insecureCompare(a, b []byte) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false // timing leak: berhenti lebih cepat saat mismatch awal
		}
	}
	return true
}

func main() {
	secret := []byte("super-secret-token")
	guess  := []byte("super-secret-token")

	fmt.Println("insecure:", insecureCompare(secret, guess))
	fmt.Println("constant-time:", subtle.ConstantTimeCompare(secret, guess) == 1)
	// subtle.ConstantTimeCompare selalu membandingkan semua byte
}`,
        explanation:
          'Timing attack mengeksploitasi perbedaan waktu eksekusi. crypto/subtle.ConstantTimeCompare membandingkan semua byte tanpa early return — mitigasi standar untuk API key dan HMAC verification.',
      },
    },
    {
      id: 'sec-05-cross-link',
      type: 'callout',
      calloutType: 'tip',
      content:
        '**Praktik Implementasi:** Teori model keamanan formal ini diterapkan dalam praktik di [Backend Advanced — Security Lanjutan & Compliance](/courses/backend-advanced/ch-08-security-lanjutan-compliance), yang membahas OWASP API Security, OAuth2 scopes, audit logging, zero trust, mTLS, enkripsi, dan GDPR.',
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Keamanan formal memberikan kerangka sistematis. STRIDE/DREAD untuk threat modeling, DAC/MAC/RBAC untuk kontrol akses, Bell-LaPadula untuk confidentiality multilevel, ZKP untuk autentikasi tanpa pengungkapan, dan taksonomi side-channel untuk ancaman implementasi. Model ini melengkapi praktik keamanan operasional.',
    },
  ],
}
