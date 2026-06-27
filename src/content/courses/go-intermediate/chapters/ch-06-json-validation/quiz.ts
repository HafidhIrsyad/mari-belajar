import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-json-validation',
  title: 'Quiz: JSON & Validation',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Fungsi apa yang mengubah struct Go menjadi JSON?',
      options: [
        'json.Encode',
        'json.Marshal',
        'json.Stringify',
        'json.Serialize',
      ],
      correctOptionIndex: 1,
      explanation:
        'json.Marshal mengubah value Go menjadi slice byte JSON.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Apa kegunaan tag json:"name,omitempty"?',
      options: [
        'Field selalu disertakan',
        'Field diabaikan saat deserialisasi',
        'Field diabaikan saat serialisasi jika nilai nol',
        'Field diubah menjadi string',
      ],
      correctOptionIndex: 2,
      explanation:
        'omitempty menyebabkan field tidak disertakan dalam output JSON jika nilainya merupakan zero value.',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Mengapa menggunakan pointer untuk field optional dalam struct?',
      options: [
        'Agar lebih cepat',
        'Untuk membedakan nilai tidak di-set dan nilai nol',
        'Agar JSON otomatis valid',
        'Karena Go mengharuskan pointer untuk JSON',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pointer nil menunjukkan field tidak di-set, sedangkan non-nil menunjukkan field memiliki nilai termasuk zero value.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Method apa yang diimplementasikan untuk custom marshaling?',
      options: [
        'JSON()',
        'MarshalJSON()',
        'ToJSON()',
        'SerializeJSON()',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mengimplementasikan json.Marshaler dengan method MarshalJSON memungkinkan kontrol kustom atas serialisasi.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Method Decoder mana yang memungkinkan membaca array JSON token demi token?',
      options: [
        'DecodeAll',
        'More',
        'Next',
        'Read',
      ],
      correctOptionIndex: 1,
      explanation:
        'dec.More() mengembalikan true selama masih ada token berikutnya dalam array atau object yang sedang dibaca.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Apa fungsi DisallowUnknownFields pada json.Decoder?',
      options: [
        'Mengabaikan field tidak dikenal',
        'Mengembalikan error jika JSON memiliki field yang tidak ada di struct',
        'Menambahkan field baru ke struct',
        'Mengubah nama field JSON',
      ],
      correctOptionIndex: 1,
      explanation:
        'DisallowUnknownFields membuat decoder lebih ketat dengan menolak field JSON yang tidak cocok dengan struct.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Library Go mana yang umum digunakan untuk validasi struct dengan tag?',
      options: [
        'go-playground/validator',
        'encoding/validator',
        'go-validator/core',
        'net/validate',
      ],
      correctOptionIndex: 0,
      explanation:
        'go-playground/validator/v10 adalah library populer untuk validasi struct menggunakan tags.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Mengapa encoding/json relatif lambat untuk data besar?',
      options: [
        'Karena menggunakan channel',
        'Karena bergantung pada reflection',
        'Karena tidak mendukung struct',
        'Karena harus membuka file',
      ],
      correctOptionIndex: 1,
      explanation:
        'encoding/json menggunakan reflection untuk membaca tipe dan struct tags, yang memiliki overhead dibandingkan serialisasi manual.',
    },
  ],
}
