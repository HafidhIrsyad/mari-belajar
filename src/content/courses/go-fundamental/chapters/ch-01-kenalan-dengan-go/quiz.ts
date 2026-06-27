import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-kenalan-dengan-go',
  title: 'Quiz: Kenalan dengan Go',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Siapa yang menciptakan bahasa Go?',
      options: [
        'Robert Griesemer, Rob Pike, dan Ken Thompson',
        'Brendan Eich, Ryan Dahl, dan Anders Hejlsberg',
        'James Gosling, Guido van Rossum, dan Bjarne Stroustrup',
        'Dennis Ritchie dan Brian Kernighan',
      ],
      correctOptionIndex: 0,
      explanation:
        'Go dikembangkan di Google oleh Robert Griesemer, Rob Pike, dan Ken Thompson dan dirilis ke publik pada 2009.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Apa output utama dari perintah go build?',
      options: [
        'Binary executable native',
        'File bytecode untuk virtual machine',
        'File HTML statis',
        'Source map',
      ],
      correctOptionIndex: 0,
      explanation:
        'go build mengkompilasi kode Go menjadi binary executable native untuk platform target.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Package apa yang wajib ada agar program Go menghasilkan executable?',
      options: [
        'package main',
        'package exec',
        'package app',
        'package start',
      ],
      correctOptionIndex: 0,
      explanation:
        'Package main adalah package khusus yang menyertakan fungsi main sebagai titik masuk program executable.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'File apa yang menjadi manifest module di Go?',
      options: [
        'go.mod',
        'package.json',
        'tsconfig.json',
        'Cargo.toml',
      ],
      correctOptionIndex: 0,
      explanation:
        'go.mod berisi nama module, versi Go minimum, dan daftar dependensi eksternal.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Apa yang dimaksud dengan scheduler M:N di Go?',
      options: [
        'Banyak goroutine dipetakan ke sejumlah thread OS',
        'Satu goroutine berjalan di satu thread OS',
        'Satu thread OS menjalankan satu program',
        'Go tidak memiliki scheduler',
      ],
      correctOptionIndex: 0,
      explanation:
        'Scheduler Go memetakan banyak goroutine (G) ke sejumlah thread OS (M) melalui logical processor (P).',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Apa karakteristik garbage collector Go?',
      options: [
        'Concurrent, tri-color mark-and-sweep, non-generational',
        'Stop-the-world dan generational',
        'Manual seperti C',
        'Reference counting seperti Swift',
      ],
      correctOptionIndex: 0,
      explanation:
        'GC Go bersifat concurrent, menggunakan algoritma tri-color mark-and-sweep, dan tidak membedakan generasi objek.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Mengapa Go memaksa setiap import harus digunakan?',
      options: [
        'Untuk menjaga kebersihan kode dan menghindari dependensi tidak terpakai',
        'Agar kompilasi lebih lambat',
        'Karena runtime Go tidak mendukung import opsional',
        'Agar file executable lebih besar',
      ],
      correctOptionIndex: 0,
      explanation:
        'Go menghasilkan compile error jika ada import yang tidak digunakan untuk menjaga kode tetap bersih dan ringkas.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Perintah apa yang digunakan untuk memformat kode Go sesuai standar?',
      options: [
        'go fmt',
        'go format',
        'go style',
        'go lint',
      ],
      correctOptionIndex: 0,
      explanation:
        'go fmt adalah perintah built-in untuk memformat kode Go mengikuti gaya penulisan standar.',
    },
  ],
}
