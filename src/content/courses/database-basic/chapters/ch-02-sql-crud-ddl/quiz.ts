import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-sql-crud-ddl',
  title: 'Quiz: SQL CRUD & DDL',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Perintah SQL untuk membaca data adalah?',
      options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
      correctOptionIndex: 2,
      explanation: 'SELECT adalah perintah DML untuk membaca atau query data dari table.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Constraint apa yang memastikan column tidak boleh NULL?',
      options: ['UNIQUE', 'CHECK', 'NOT NULL', 'FOREIGN KEY'],
      correctOptionIndex: 2,
      explanation: 'NOT NULL menegakkan setiap row harus memiliki nilai pada column tersebut.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Mengapa disarankan menggunakan NUMERIC/DECIMAL untuk uang?',
      options: [
        'Lebih cepat dari INTEGER',
        'Menghindari kesalahan presesi floating point',
        'Selalu lebih kecil penyimpanannya',
        'Hanya bisa menyimpan nilai positif',
      ],
      correctOptionIndex: 1,
      explanation:
        'Tipe floating point seperti FLOAT atau DOUBLE bisa menghasilkan kesalahan pembulatan. NUMERIC/DECIMAL menyimpan nilai dengan presisi tetap.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Bagaimana cara menambah column baru ke table yang sudah ada?',
      options: ['CREATE COLUMN', 'ALTER TABLE ... ADD COLUMN', 'UPDATE TABLE', 'MODIFY TABLE'],
      correctOptionIndex: 1,
      explanation: 'ALTER TABLE ADD COLUMN adalah sintaks DDL untuk menambah column pada table existing.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Apa kegunaan CTE (WITH clause)?',
      options: [
        'Menghapus table sementara',
        'Membuat query modular dan reusable dalam satu statement',
        'Mengubah tipe data column',
        'Membuat index otomatis',
      ],
      correctOptionIndex: 1,
      explanation: 'CTE memungkinkan hasil query dinamai dan digunakan kembali di statement yang sama.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Tipe generated column STORED berarti?',
      options: [
        'Nilainya disimpan fisik saat insert/update',
        'Nilainya dihitung setiap kali dibaca',
        'Tidak boleh di-query langsung',
        'Hanya tersedia di MySQL',
      ],
      correctOptionIndex: 0,
      explanation: 'Generated column STORED dihitung saat data ditulis dan disimpan di disk, sehingga membaca lebih cepat.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Mengapa UPDATE tanpa WHERE berbahaya?',
      options: [
        'Hanya mengubah satu row secara acak',
        'Mengubah semua row dalam table',
        'Menghapus index',
        'Memicu error constraint',
      ],
      correctOptionIndex: 1,
      explanation: 'Kondisi WHERE yang hilang membuat UPDATE berlaku untuk setiap row di table.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Tipe data VARCHAR(200) paling cocok untuk?',
      options: [
        'Menyimpan file biner besar',
        'Menyimpan string dengan panjang variabel hingga 200 karakter',
        'Menyimpan nilai desimal',
        'Menyimpan timestamp absolut',
      ],
      correctOptionIndex: 1,
      explanation: 'VARCHAR(n) menyimpan string dengan panjang variabel maksimal n karakter.',
    },
  ],
}
