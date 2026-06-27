import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-security-fundamentals',
  estimatedMinutes: 16,
  sections: [
    {
      id: 'sec-08-basic-cia-triad',
      type: 'markdown',
      level: 'basic',
      title: 'CIA Triad, Autentikasi, dan Social Engineering',
      content: `## CIA Triad: Fondasi Keamanan Informasi

Keamanan informasi sering dibahas melalui tiga pilar utama yang dikenal sebagai **CIA Triad**:

- **Confidentiality (Kerahasiaan):** memastikan data hanya bisa diakses oleh pihak yang berwenang.
- **Integrity (Integritas):** memastikan data tidak diubah secara tidak sah selama disimpan atau dikirim.
- **Availability (Ketersediaan):** memastikan sistem dan data bisa diakses saat dibutuhkan.

Contoh sederhana: saat kamu login ke bank online, data saldo harus **rahasia** (confidentiality), tidak boleh **dimanipulasi** tanpa izin (integrity), dan aplikasi harus **bisa dibuka** kapan saja (availability).

## Autentikasi dan Otorisasi

Dua konsep yang sering tertukar:

- **Autentikasi (authentication)** membuktikan siapa kamu. Contoh: memasukkan password, sidik jari, atau kode OTP.
- **Otorisasi (authorization)** menentukan apa yang boleh kamu lakukan setelah identitasmu terverifikasi. Contoh: akun admin bisa menghapus data, akun user biasa hanya bisa melihat.

Autentikasi menjawab pertanyaan "Apakah kamu benar-benar kamu?", sedangkan otorisasi menjawab "Apa yang boleh kamu akses?".

## Social Engineering Awareness

Serangan tidak selalu melalui kode. **Social engineering** memanipulasi manusia untuk membocorkan informasi atau melakukan tindakan berbahaya.

Contoh umum:

- **Phishing:** email atau pesan palsu yang meminta kamu mengklik tautan mencurigakan.
- **Pretexting:** penyerang berpura-pura menjadi pihak berwenang untuk meminta data.
- **Baiting:** menarik korban dengan iming-iming gratis agar menginstal malware.

Kesadaran dan kebiasaan curiga terhadap permintaan tidak wajar adalah pertahanan pertama yang sangat efektif.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'hash-sha256.js',
        language: 'javascript',
        title: 'JavaScript: Hashing SHA-256 dengan Web Crypto API',
        code: `const encoder = new TextEncoder();

async function sha256(message) {
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

sha256("halo").then((hash) => console.log(hash));
// Output: contoh nilai hash heksadesimal 64 karakter`,
        explanation:
          'Web Crypto API menyediakan crypto.subtle.digest untuk menghitung hash SHA-256 secara asinkron. Hash ini bersifat deterministik dan one-way, cocok untuk verifikasi integritas data.',
      },
    },
    {
      id: 'sec-08-intermediate-crypto',
      type: 'markdown',
      level: 'intermediate',
      title: 'Hashing vs Encryption, HTTPS, dan Input Validation',
      content: `## Hashing vs Encryption

Keduanya sering digunakan bersamaan, tetapi tujuannya berbeda:

- **Hashing** adalah fungsi satu arah (*one-way function*). Dari input apapun, hashing menghasilkan nilai panjang tetap yang tidak bisa dikembalikan ke input asli. Cocok untuk menyimpan password.
- **Encryption** adalah proses mengubah data menjadi bentuk terenkripsi yang bisa dikembalikan (*reversible*) dengan kunci yang tepat. Cocok untuk mengamankan data sensitif yang perlu dibaca kembali.

Perbandingan singkat:

\`\`\`text
Hashing:    password -> hash (tidak bisa dibalik)
Encryption: plaintext -> ciphertext -> plaintext (dengan kunci)
\`\`\`

Gunakan **hashing** untuk verifikasi password dan **encryption** untuk melindungi data sensitif yang perlu dibaca kembali.

## HTTPS dan Sertifikat TLS

**HTTPS** adalah HTTP yang dilindungi oleh **TLS (Transport Layer Security)**. TLS menyediakan dua hal penting:

1. **Enkripsi:** data yang dikirim antara browser dan server diacak sehingga pihak ketiga tidak bisa membacanya.
2. **Autentikasi server:** sertifikat TLS membuktikan bahwa server benar-benar milik domain yang dituju.

Ketika browser memvalidasi sertifikat, ia memeriksa rantai kepercayaan hingga ke *certificate authority* (CA) yang dikenali.

## Input Validation dan Sanitization

Semua data dari pengguna harus dianggap tidak aman. **Input validation** memeriksa apakah data sesuai format yang diharapkan, sedangkan **sanitization** membersihkan data agar aman saat diproses.

Contoh bahaya tanpa validasi:

- **SQL Injection:** input disisipkan ke query SQL sehingga penyerang bisa membaca atau menghapus data.
- **XSS (Cross-Site Scripting):** input berisi script yang dieksekusi di browser korban.

Validasi dilakukan secepat mungkin, idealnya sebelum data masuk ke logika bisnis.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'password-flow.ts',
        language: 'typescript',
        title: 'TypeScript: Tipe Aman untuk Alur Password Hashing',
        code: `type PlainPassword = string & { __brand: "PlainPassword" };
type HashedPassword = string & { __brand: "HashedPassword" };

function hashPassword(plain: PlainPassword): HashedPassword {
  // Simulasi: di produksi gunakan bcrypt atau Argon2 di sisi server
  const simulated = \`[hash-of-\${plain.length}-chars]\`;
  return simulated as HashedPassword;
}

function verifyPassword(
  plain: PlainPassword,
  hashed: HashedPassword
): boolean {
  return hashPassword(plain) === hashed;
}

const password = "rahasia123" as PlainPassword;
const hashed = hashPassword(password);

console.log(verifyPassword(password, hashed)); // true
// console.log(verifyPassword("rahasia123", hashed));
// ^ Error compile: plain string tidak boleh dipakai sebagai PlainPassword`,
        explanation:
          'Branded types membedakan password mentah dan password yang sudah di-hash sehingga programmer tidak bisa secara tidak sengaja menukar keduanya saat compile time.',
      },
    },
    {
      id: 'sec-08-advanced-owasp',
      type: 'markdown',
      level: 'advanced',
      title: 'OWASP Top 10, Secure Coding, dan Secret Management',
      content: `## OWASP Top 10 Overview

**OWASP Top 10** adalah daftar risiko keamanan aplikasi web yang paling umum, dikurasi oleh Open Web Application Security Project. Beberapa di antaranya:

1. **Broken Access Control:** pengguna bisa mengakses data atau fitur di luar izinnya.
2. **Cryptographic Failures:** penggunaan algoritma lemah atau transmisi data tanpa enkripsi.
3. **Injection:** serangan seperti SQL injection, NoSQL injection, dan command injection.
4. **Insecure Design:** kelemahan yang muncul karena desain sistem tidak mempertimbangkan keamanan.
5. **Security Misconfiguration:** konfigurasi default, fitur yang tidak perlu, atau pesan error yang membeberkan informasi.
6. **Vulnerable and Outdated Components:** menggunakan library atau framework dengan celah keamanan yang diketahui.
7. **Identification and Authentication Failures:** kelemahan login, session management, atau recovery.
8. **Software and Data Integrity Failures:** data atau kode yang dimodifikasi tanpa deteksi.
9. **Security Logging and Monitoring Failures:** kurangnya log sehingga serangan sulit dideteksi.
10. **Server-Side Request Forgery (SSRF):** server dipaksa mengirim request ke lokasi tidak sah.

Memahami daftar ini membantu programmer memprioritaskan pertahanan yang paling berdampak.

## Secure Coding Practices

Menulis kode dengan mindset keamanan:

- **Validasi dan sanitasi input** di setiap titik masuk.
- **Gunakan parameterized query** untuk mencegah SQL injection.
- **Enkripsi data sensitif** baik saat transit maupun saat istirahat (*at rest*).
- **Jangan hardcode secret** seperti API key atau password.
- **Gunakan library dan framework terbaru** serta aktif memantau CVE.
- **Terapkan least privilege:** berikan izin se-minimal mungkin.
- **Logging yang memadai** tanpa menulis password atau data pribadi.

## Secret Management

**Secret** adalah informasi sensitif seperti password database, API key, atau private key. Praktik terbaik:

- Simpan secret di variabel lingkungan atau *secret manager* (misalnya HashiCorp Vault, AWS Secrets Manager, atau GitHub Secrets).
- Jangan pernah meng-commit secret ke repositori kode.
- Rotasi secret secara berkala.
- Berikan akses secret hanya pada layanan yang membutuhkan.

Secret yang bocor sering kali menjadi pintu masuk utama bagi penyerang.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Konsep Hashing Password dengan bcrypt',
        code: `package main

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	password := []byte("rahasia123")

	// Hash password dengan cost default bcrypt
	hashed, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	fmt.Println("Hash:", string(hashed))

	// Verifikasi password
	err = bcrypt.CompareHashAndPassword(hashed, password)
	fmt.Println("Valid:", err == nil)
}`,
        explanation:
          'Package bcrypt di Go secara otomatis menambahkan salt dan memperlambat perhitungan hash melalui cost factor. Fungsi CompareHashAndPassword membandingkan password mentah dengan hash yang tersimpan.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** CIA Triad menjadi fondasi keamanan informasi. Autentikasi membuktikan identitas, otorisasi menentukan akses, dan social engineering mengingatkan kita bahwa manusia juga menjadi target. Hashing dan encryption memiliki peran berbeda, HTTPS/TLS mengamankan data saat transit, sementara input validation, OWASP Top 10, dan secure coding practices mengurangi celah yang bisa dieksploitasi.',
    },
  ],
}
