import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-security-lanjutan-compliance',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-08-basic-security',
      type: 'markdown',
      level: 'basic',
      title: 'OWASP API Security Top 10 dan Secret Scanning',
      content: `## API Security

API modern menghadapi ancaman yang berbeda dari aplikasi web tradisional. OWASP API Security Top 10 menyoroti risiko utama:

1. **Broken Object Level Authorization (BOLA)**: user dapat mengakses data user lain karena tidak ada pengecekan kepemilikan.
2. **Broken Authentication**: token lemah, session tidak kadaluarsa, atau brute force credential.
3. **Excessive Data Exposure**: API mengembalikan lebih banyak data daripada yang ditampilkan client.
4. **Lack of Resources and Rate Limiting**: server tidak dibatasi sehingga bisa kehabisan resource.
5. **Broken Function Level Authorization**: user biasa dapat mengakses endpoint admin.
6. **Mass Assignment**: client dapat mengisi field yang seharusnya read-only.
7. **Security Misconfiguration**: default config, header yang kurang, atau error message yang bocor.
8. **Injection**: SQL, NoSQL, command, atau LDAP injection.
9. **Improper Assets Management**: API versi lama tidak di-patch dan masih diekspos.
10. **Insufficient Logging and Monitoring**: serangan tidak terdeteksi karena tidak ada log.

## Secret Scanning

Credential, API key, dan token yang tertinggal di repository adalah celara umum. Gunakan secret scanning baik di CI maupun di repository. Tools seperti GitHub secret scanning, TruffleHog, atau Gitleaks dapat mendeteksi credential sebelum merge.`,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'scope-guard.js',
        language: 'javascript',
        title: 'JavaScript: Scope Guard Sederhana',
        code: `function requireScope(scopes, requiredScope) {
  if (!scopes.includes(requiredScope)) {
    const error = new Error('insufficient scope')
    error.statusCode = 403
    throw error
  }
}

function getInvoicesHandler(req, res) {
  try {
    const userScopes = req.tokenPayload.scope.split(' ')
    requireScope(userScopes, 'invoices:read')

    // business logic
    res.json({ invoices: [] })
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

function deleteInvoiceHandler(req, res) {
  try {
    const userScopes = req.tokenPayload.scope.split(' ')
    requireScope(userScopes, 'invoices:write')

    // business logic
    res.status(204).send()
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
}

module.exports = { getInvoicesHandler, deleteInvoiceHandler }`,
        explanation:
          'Scope guard memastikan endpoint hanya dapat diakses jika token memiliki izin yang sesuai, membantu mencegah broken function level authorization.',
      },
    },
    {
      id: 'sec-08-intermediate-audit',
      type: 'markdown',
      level: 'intermediate',
      title: 'OAuth2 Scopes, Audit Logging, dan Validasi Data',
      content: `## OAuth2 Scopes

Scope membatasi hak akses token. Sebuah token dapat memiliki scope \`orders:read\` tetapi tidak \`orders:write\`. Server resource harus memeriksa scope setiap endpoint. Scope harus granular dan sesuai dengan least privilege.

## Audit Logging

Audit log mencatat aktivitas keamanan dan bisnis penting. Setiap entri sebaiknya mencakup:

- Siapa (identitas user atau service).
- Apa (aksi yang dilakukan).
- Objek (resource yang diakses).
- Kapan (timestamp).
- Dari mana (IP, user agent).
- Hasil (sukses atau gagal).

Audit log harus immutable dan tersimpan terpisah dari log aplikasi biasa. Log tidak boleh mengandung password, token, atau data sensitif.

## Validasi Data

Input validation tetap menjadi garis pertahanan pertama. Validasi harus:

- Menolak input yang tidak sesuai schema.
- Menggunakan whitelist, bukan blacklist.
- Diterapkan di server, bukan hanya di client.
- Menghindari exposure detail error yang membantu penyerang.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'audit-logger.ts',
        language: 'typescript',
        title: 'TypeScript: Audit Logger dengan Tipe Ketat',
        code: `type AuditAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT'

type AuditEvent = {
  actor: string
  action: AuditAction
  resource: string
  resourceId: string
  success: boolean
  ip: string
  timestamp: string
}

class AuditLogger {
  private events: AuditEvent[] = []

  log(event: Omit<AuditEvent, 'timestamp'>): void {
    this.events.push({
      ...event,
      timestamp: new Date().toISOString(),
    })
  }

  getEventsForResource(resourceId: string): AuditEvent[] {
    return this.events.filter((e) => e.resourceId === resourceId)
  }
}

const audit = new AuditLogger()

audit.log({
  actor: 'user:123',
  action: 'UPDATE',
  resource: 'invoice',
  resourceId: 'INV-99',
  success: true,
  ip: '203.0.113.10',
})

console.log(audit.getEventsForResource('INV-99'))`,
        explanation:
          'Audit logger bertipe membatasi aksi yang tercatat sehingga tidak ada event aneh yang masuk, dan memudahkan analisis kepatuhan.',
      },
    },
    {
      id: 'sec-08-advanced-zero-trust',
      type: 'markdown',
      level: 'advanced',
      title: 'Zero Trust, mTLS, Enkripsi, dan GDPR',
      content: `## Zero Trust

Zero trust berprinsip "never trust, always verify". Tidak ada asumsi bahwa internal network aman. Setiap service dan user harus diautentikasi, diautorisasi, dan diaudit. Implementasinya meliputi:

- Identity-aware proxy untuk setiap akses.
- Fine-grained authorization.
- Continuous validation.
- Minimal privilege.

## mTLS (Mutual TLS)

TLS standar mengotentikasi server ke client. mTLS menambahkan otentikasi client ke server. Dalam microservices, mTLS memastikan bahwa hanya service yang memiliki sertifikat valid yang dapat berkomunikasi. Service mesh sering mengelola sertifikat dan rotasi otomatis.

## Enkripsi At Rest dan In Transit

- **In transit**: gunakan TLS 1.2 atau 1.3 untuk semua komunikasi, termasuk internal antar service.
- **At rest**: enkripsi database, file storage, dan backup menggunakan key management service. Rotasi key secara berkala.

## GDPR dan Privacy

GDPR mengatur perlindungan data pribadi warga UE. Prinsip penting:

- **Lawfulness, fairness, transparency**: data diproses dengan dasar hukum yang jelas.
- **Purpose limitation**: data hanya digunakan untuk tujuan yang dinyatakan.
- **Data minimization**: hanya mengumpulkan data yang diperlukan.
- **Accuracy**: data harus akurat dan diperbarui.
- **Storage limitation**: tidak menyimpan data lebih lama dari yang dibutuhkan.
- **Integrity and confidentiality**: keamanan data.
- **Accountability**: organisasi bertanggung jawab atas kepatuhan.

Right to erasure, right to access, dan data portability juga perlu dipertimbangkan dalam desain API.

## Under the Hood: TLS Handshake

TLS handshake menggabungkan asymmetric cryptography (untuk otentikasi dan pertukaran key) dengan symmetric cryptography (untuk enkripsi data sesi). Pada mTLS, kedua belah pihak menyertakan sertifikat. Setelah handshake, session key digunakan untuk enkripsi stream data. Session resumption dan 0-RTT dapat mengurangi latency tetapi memerlukan pertimbangan keamanan.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'mtls.go',
        language: 'go',
        title: 'Go: Server mTLS Sederhana',
        code: `package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	cert, err := tls.LoadX509KeyPair("server.crt", "server.key")
	if err != nil {
		log.Fatal(err)
	}

	caCert, err := os.ReadFile("ca.crt")
	if err != nil {
		log.Fatal(err)
	}

	caPool := x509.NewCertPool()
	caPool.AppendCertsFromPEM(caCert)

	tlsConfig := &tls.Config{
		Certificates: []tls.Certificate{cert},
		ClientCAs:    caPool,
		ClientAuth:   tls.RequireAndVerifyClientCert,
	}

	server := &http.Server{
		Addr:      ":8443",
		TLSConfig: tlsConfig,
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintln(w, "authenticated client:", r.TLS.VerifiedChains[0][0].Subject.CommonName)
		}),
	}

	log.Println("mTLS server listening on :8443")
	log.Fatal(server.ListenAndServeTLS("", ""))
}`,
        explanation:
          'Server Go dikonfigurasi untuk meminta dan memverifikasi sertifikat client, menciptakan koneksi mTLS dengan otentikasi dua arah.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Security backend lanjutan memerlukan layered defense: validasi input, authorization granular, audit logging, enkripsi, dan zero trust dengan mTLS. Compliance seperti GDPR harus menjadi bagian dari desain data sejak awal, bukan tambahan di akhir.',
    },
  ],
}
