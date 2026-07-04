import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-cryptography-fundamentals',
  title: 'Quiz: Fundamental Kriptografi',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Perbedaan utama symmetric dan asymmetric encryption?',
      options: [
        'Symmetric menggunakan satu secret key; asymmetric menggunakan pasangan public/private key',
        'Symmetric lebih lambat dari asymmetric',
        'Asymmetric tidak bisa digunakan untuk signature',
        'Symmetric tidak memerlukan key sama sekali',
      ],
      correctOptionIndex: 0,
      explanation:
        'Symmetric: satu key untuk encrypt/decrypt. Asymmetric: public key encrypt/verify, private key decrypt/sign.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Mengapa AES-GCM lebih disarankan daripada AES-ECB?',
      options: [
        'ECB lebih cepat untuk semua use case',
        'GCM menyediakan authenticated encryption; ECB mengekspos pola plaintext',
        'ECB mendukung key 512-bit',
        'GCM tidak memerlukan IV',
      ],
      correctOptionIndex: 1,
      explanation:
        'ECB encrypt block identik menghasilkan ciphertext identik — pola terlihat. GCM menambahkan auth tag untuk integrity dan confidentiality.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Keamanan RSA bergantung pada kesulitan?',
      options: [
        'Menemukan preimage SHA-256',
        'Memfaktorkan n = p × q menjadi p dan q',
        'Memecahkan AES dengan brute force 128-bit',
        'Menebak IV random',
      ],
      correctOptionIndex: 1,
      explanation:
        'RSA: mengetahui n dan e tidak cukup untuk derive d tanpa memfaktorkan n ke p dan q — masalah computationally hard untuk n besar.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Digital signature dibuat dengan?',
      options: [
        'Encrypt hash dengan public key',
        'Encrypt hash dengan private key',
        'Encrypt plaintext dengan AES',
        'Hash private key',
      ],
      correctOptionIndex: 1,
      explanation:
        'Sign = operasi private key pada hash dokumen. Verify = operasi public key — siapa pun bisa verifikasi tanpa private key.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Fungsi PKI (Certificate Authority) adalah?',
      options: [
        'Men-generate AES key untuk semua user',
        'Menandatangani sertifikat yang mengikat public key ke identitas',
        'Menggantikan TLS handshake',
        'Menyimpan password user',
      ],
      correctOptionIndex: 1,
      explanation:
        'CA trusted menandatangani X.509 certificate yang menyatakan "public key ini milik example.com" — chain of trust hingga root CA di browser/OS.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'ECDH memungkinkan?',
      options: [
        'Decrypt RSA tanpa private key',
        'Dua pihak menghasilkan shared secret tanpa mengirim private key',
        'Hash password dengan bcrypt',
        'Bypass certificate validation',
      ],
      correctOptionIndex: 1,
      explanation:
        'ECDH: tukar public key, masing-masing compute shared secret dari private sendiri + public lawan — hasil identik meski channel publik.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Ukuran modulus RSA minimum yang disarankan untuk production saat ini?',
      options: ['512 bit', '1024 bit', '2048 bit', '128 bit'],
      correctOptionIndex: 2,
      explanation:
        '1024-bit RSA dianggap lemah; 2048 bit adalah minimum industry standard. 4096 bit untuk long-term security.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Hybrid cryptography dalam TLS menggunakan?',
      options: [
        'Hanya RSA untuk semua data',
        'Asymmetric untuk key exchange, symmetric untuk bulk encryption',
        'Hanya hash tanpa encryption',
        'Password plaintext untuk session key',
      ],
      correctOptionIndex: 1,
      explanation:
        'TLS: ECDHE/RSA untuk negosiasi session key, lalu AES-GCM/ChaCha20 untuk encrypt traffic — menggabungkan kelebihan keduanya.',
    },
  ],
}
