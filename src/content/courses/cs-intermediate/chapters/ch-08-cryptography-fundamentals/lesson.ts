import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-cryptography-fundamentals',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'sec-08-basic-crypto',
      type: 'markdown',
      level: 'basic',
      title: 'Symmetric vs Asymmetric Cryptography',
      content: `## Tujuan Kriptografi

Kriptografi modern melayani tiga tujuan utama:

1. **Confidentiality (kerahasiaan)**: hanya pihak berwenang yang membaca data.
2. **Integrity (integritas)**: data tidak diubah tanpa terdeteksi.
3. **Authentication (autentikasi)**: memverifikasi identitas pengirim.

## Symmetric (Simetris)

Satu **secret key** yang sama dipakai untuk encrypt dan decrypt.

- **Keuntungan**: sangat cepat — cocok untuk bulk data (file, disk, TLS record layer).
- **Kelemahan**: key distribution problem — bagaimana mengirim key secara aman ke penerima?

Algoritma umum:

- **AES** (Advanced Encryption Standard): block cipher 128-bit block, key 128/192/256 bit.
- **ChaCha20**: stream cipher populer di TLS dan mobile.

## Asymmetric (Asimetris / Public Key)

Pasangan **public key** (diumumkan) dan **private key** (rahasia):

- Encrypt dengan public key → hanya private key yang decrypt (confidentiality).
- Sign dengan private key → verifikasi dengan public key (authentication).

- **Keuntungan**: tidak perlu channel aman untuk menukar public key.
- **Kelemahan**: jauh lebih lambat — biasanya hanya untuk key exchange dan signature.

Algoritma umum:

- **RSA**: berbasis faktorisasi bilangan besar.
- **ECC** (Elliptic Curve): kunci lebih pendek dengan keamanan setara.

## Hybrid Cryptography

Praktik nyata (TLS, PGP, Signal) menggabungkan keduanya:

1. Asymmetric untuk **key exchange** atau **signature**.
2. Symmetric (AES) untuk **bulk encryption** dengan session key random.`,
    },
    {
      id: 'sec-08-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go-basic',
        filename: 'aes_gcm.go',
        language: 'go',
        title: 'Go: AES-256-GCM dengan crypto Package',
        code: `package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"fmt"
	"io"
)

func encrypt(plaintext, key []byte) (nonce, ciphertext []byte, err error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, nil, err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, nil, err
	}
	nonce = make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, nil, err
	}
	ciphertext = gcm.Seal(nil, nonce, plaintext, nil)
	return nonce, ciphertext, nil
}

func decrypt(nonce, ciphertext, key []byte) (string, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}
	return string(plaintext), nil
}

func main() {
	key := make([]byte, 32) // 256-bit symmetric key
	io.ReadFull(rand.Reader, key)

	nonce, encrypted, err := encrypt([]byte("data rahasia"), key)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Encrypted: %x\n", encrypted)

	decrypted, err := decrypt(nonce, encrypted, key)
	if err != nil {
		panic(err)
	}
	fmt.Println("Decrypted:", decrypted)

	// GCM mode menyediakan authenticated encryption — integrity + confidentiality
}`,
        explanation:
          'AES-256-GCM adalah symmetric authenticated encryption. Nonce harus unik per key. Auth tag (embedded dalam Seal output) mendeteksi tampering — decrypt gagal jika data diubah.',
      },
    },
    {
      id: 'sec-08-intermediate-rsa',
      type: 'markdown',
      level: 'intermediate',
      title: 'AES, RSA, dan Digital Signature',
      content: `## AES — Block Cipher

AES memproses data dalam **block 128 bit**. Mode operasi menentukan bagaimana block di-chain:

- **ECB** (Electronic Codebook): jangan dipakai — pola plaintext terlihat.
- **CBC**: setiap block di-XOR dengan ciphertext block sebelumnya; butuh IV random.
- **GCM**: authenticated encryption — output ciphertext + auth tag. Standar modern.

Key size AES: 128, 192, 256 bit. AES-256 memiliki margin keamanan lebih besar terhadap brute force dan analisis kriptanalisis.

## Matematika RSA (Konseptual)

1. Pilih dua bilangan prima besar **p** dan **q**.
2. Hitung **n = p × q** dan **φ(n) = (p-1)(q-1)**.
3. Pilih **e** (public exponent, umum 65537) sehingga gcd(e, φ(n)) = 1.
4. Hitung **d** (private exponent) sehingga **e × d ≡ 1 (mod φ(n))**.

**Public key**: (n, e). **Private key**: (n, d).

- **Encrypt**: c = m^e mod n
- **Decrypt**: m = c^d mod n

Keamanan RSA bergantung pada kesulitan **faktorkan n** kembali ke p dan q. Minimum **2048 bit** untuk n di production; **4096 bit** untuk data jangka panjang.

## Hash Function

**Hash** one-way: input arbitrer → output fixed size (SHA-256 → 256 bit).

- **Preimage resistance**: sulit menemukan input dari hash.
- **Collision resistance**: sulit menemukan dua input dengan hash sama.

Hash digunakan di: password storage (dengan salt + slow hash), digital signature, blockchain, integrity check.

## Digital Signature

Signature = encrypt hash dengan **private key**. Verifikasi = decrypt dengan **public key** dan bandingkan hash.

Alur:

1. Hash dokumen → H(m)
2. Sign: s = Sign(H(m), privateKey)
3. Verify: Verify(s, publicKey) == H(m)

**RSA-PSS** dan **ECDSA** adalah skema signature modern. Jangan sign data mentah — selalu hash dulu.

## PKI (Public Key Infrastructure)

**Certificate Authority (CA)** menandatangani sertifikat yang mengikat public key ke identitas (domain, organisasi).

Sertifikat X.509 berisi:

- Subject (CN=example.com)
- Public key
- Issuer (CA)
- Validity period
- Signature CA

**Chain of trust**: browser/OS memiliki root CA trusted → intermediate CA → leaf certificate server.`,
    },
    {
      id: 'sec-08-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go-intermediate',
        filename: 'rsa_sign.go',
        language: 'go',
        title: 'Go: RSA Key Pair dan Digital Signature',
        code: `package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"fmt"
)

func hashMessage(message string) []byte {
	h := sha256.Sum256([]byte(message))
	return h[:]
}

func signMessage(message string, priv *rsa.PrivateKey) ([]byte, error) {
	return rsa.SignPKCS1v15(rand.Reader, priv, crypto.SHA256, hashMessage(message))
}

func verifySignature(message string, signature []byte, pub *rsa.PublicKey) bool {
	err := rsa.VerifyPKCS1v15(pub, crypto.SHA256, hashMessage(message), signature)
	return err == nil
}

func main() {
	priv, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		panic(err)
	}
	pub := &priv.PublicKey

	document := "Kontrak kerja sama #2026-001"
	signature, err := signMessage(document, priv)
	if err != nil {
		panic(err)
	}

	fmt.Println("Signature valid:", verifySignature(document, signature, pub))
	fmt.Println("Tampered rejected:", verifySignature(document+"X", signature, pub))
}`,
        explanation:
          'crypto/rsa.GenerateKey membuat pasangan RSA 2048-bit. SignPKCS1v15/VerifyPKCS1v15 menggunakan SHA-256 hash — pola yang sama dengan JWT RS256 dan code signing.',
      },
    },
    {
      id: 'sec-08-advanced-ecdh-pki',
      type: 'markdown',
      level: 'advanced',
      title: 'ECDH, PKI Praktis, dan Best Practices',
      content: `## ECDH (Elliptic Curve Diffie-Hellman)

**Diffie-Hellman** memungkinkan dua pihak menghasilkan **shared secret** melalui channel publik tanpa mengirim private key.

Alur ECDH:

1. Alice dan Bob masing-masing generate private key random dan derive public key dari kurva (mis. P-256).
2. Tukar public key melalui channel (boleh di-sniff).
3. Alice: shared = ECDH(alicePrivate, bobPublic). Bob: shared = ECDH(bobPrivate, alicePublic).
4. Hasil identik — digunakan sebagai seed untuk AES session key.

Keuntungan ECC: kunci 256-bit setara keamanan ~3072-bit RSA, handshake TLS lebih cepat.

## TLS Handshake (Ringkas)

1. ClientHello + supported cipher suites.
2. ServerHello + certificate (PKI) + ServerKeyExchange (ECDH params).
3. Client verify certificate chain → KeyExchange → Finished.
4. Record layer: AES-GCM dengan session key derived via HKDF.

**Forward secrecy**: ephemeral ECDH (ECDHE) — compromise private key server tidak decrypt traffic lama.

## Ancaman dan Mitigasi

| Ancaman | Mitigasi |
|---------|----------|
| Man-in-the-middle | PKI + certificate pinning |
| Weak cipher | TLS 1.3 only, disable RSA key transport |
| Key leak | HSM, rotation, secrets manager |
| Quantum (future) | Post-quantum algorithms (CRYSTALS-Kyber) |

## Password Storage

Jangan encrypt password — **hash** dengan slow function:

- **bcrypt**, **scrypt**, **Argon2id**
- Unique salt per user
- Cost factor disesuaikan hardware (bcrypt cost 12+)

Ini menghubungkan ke implementasi autentikasi di backend.

## Randomness

Semua kriptografi bergantung **CSPRNG** (Cryptographically Secure PRNG). Jangan pakai Math.random() untuk key, IV, atau token.`,
    },
    {
      id: 'sec-08-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go-advanced',
        filename: 'ecdh.go',
        language: 'go',
        title: 'Go: ECDH Key Exchange dan Shared Secret',
        code: `package main

import (
	"crypto/ecdh"
	"crypto/sha256"
	"fmt"
)

func main() {
	curve := ecdh.P256()

	alicePriv, _ := curve.GenerateKey()
	bobPriv, _ := curve.GenerateKey()

	// Tukar public key (boleh melalui channel publik)
	aliceShared, err := alicePriv.ECDH(bobPriv.PublicKey())
	if err != nil {
		panic(err)
	}
	bobShared, err := bobPriv.ECDH(alicePriv.PublicKey())
	if err != nil {
		panic(err)
	}

	// Shared secret identik — derive AES key via SHA-256
	aliceKey := sha256.Sum256(aliceShared)
	bobKey := sha256.Sum256(bobShared)

	fmt.Printf("Alice key: %x\\n", aliceKey[:8])
	fmt.Printf("Bob key:   %x\\n", bobKey[:8])
	fmt.Println("Keys match:", aliceKey == bobKey)
}`,
        explanation:
          'crypto/ecdh di Go memimplementasikan ECDH P-256. Shared secret di-hash menjadi 256-bit key untuk symmetric encryption — pola yang sama dengan TLS key derivation.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Symmetric untuk kecepatan, asymmetric untuk key exchange dan signature, hash untuk integrity. PKI menjembatani public key ke identitas dunia nyata. Untuk implementasi JWT, bcrypt, OAuth2, dan passkeys di aplikasi backend, lanjut ke [Authentication](/courses/backend-intermediate/ch-02-authentication).',
    },
  ],
}
