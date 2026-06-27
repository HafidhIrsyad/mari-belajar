import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-asynchronous-javascript',
  estimatedMinutes: 16,
  sections: [
    {
      id: 'sec-06-basic-intro',
      type: 'markdown',
      level: 'basic',
      title: 'Mengenal Asynchronous JavaScript',
      content: `## Mengapa Asynchronous Penting

JavaScript pada umumnya berjalan secara **single-threaded**, artinya hanya ada satu call stack yang mengeksekusi kode pada satu waktu. Jika sebuah operasi membutuhkan waktu lama, seperti mengambil data dari jaringan atau membaca file, program akan terhenti (*blocking*) sampai operasi selesai.

Pemrograman **asynchronous** memungkinkan kode menjalankan operasi lambat di latar belakang tanpa memblokir eksekusi kode lain. Hasilnya, antarmuka pengguna tetap responsif dan program bisa mengerjakan tugas lain sambil menunggu.

## Callback dan Callback Hell

**Callback** adalah fungsi yang diteruskan ke fungsi lain dan akan dipanggil setelah suatu operasi selesai. Contoh paling sederhana adalah \`setTimeout\`.

\`\`\`js
setTimeout(function () {
  console.log("Dieksekusi setelah 1 detik");
}, 1000);
\`\`\`

Callback praktis, tetapi saat banyak operasi asynchronous harus dijalankan secara berurutan, callback bisa bersarang sangat dalam. Kondisi ini disebut **callback hell** dan membuat kode sulit dibaca serta sulit diuji.

\`\`\`js
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      // semakin dalam, semakin sulit dikelola
    });
  });
});
\`\`\`

## setTimeout dan setInterval

- \`setTimeout(callback, delay)\` menjalankan callback satu kali setelah delay dalam milidetik.
- \`setInterval(callback, delay)\` menjalankan callback berulang kali setiap delay tertentu.

Keduanya mengembalikan **timer id** yang bisa dipakai untuk membatalkan eksekusi dengan \`clearTimeout\` atau \`clearInterval\`.

\`\`\`js
const timer = setInterval(() => {
  console.log("tic");
}, 2000);

clearInterval(timer); // hentikan interval
\`\`\``,
    },
    {
      id: 'sec-06-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'promise-fetch.js',
        language: 'javascript',
        title: 'JavaScript: Promise dan Fetch',
        code: `const fetchUsers = () => {
  return fetch('/api/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
      }
      return response.json();
    })
    .then((users) => {
      console.log('Daftar pengguna:', users);
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error.message);
    });
};

fetchUsers();

// Promise.all menunggu semua Promise selesai
const promiseA = Promise.resolve(10);
const promiseB = Promise.resolve(20);

Promise.all([promiseA, promiseB]).then((values) => {
  console.log(values); // [10, 20]
});`,
        explanation:
          'Method fetch mengembalikan Promise. Rantai then menangani respons yang berhasil, catch menangkap error, dan Promise.all menunggu beberapa Promise selesai sekaligus.',
      },
    },
    {
      id: 'sec-06-intermediate-promise',
      type: 'markdown',
      level: 'intermediate',
      title: 'Promise: Create, Then, Catch, Finally',
      content: `## Promise: create, then, catch, finally

**Promise** adalah objek yang mewakili hasil operasi asynchronous yang mungkin berhasil atau gagal di masa depan. Promise memiliki tiga state: **pending**, **fulfilled**, dan **rejected**.

Membuat Promise secara manual:

\`\`\`js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operasi berhasil");
  } else {
    reject("Operasi gagal");
  }
});
\`\`\`

Menangani hasil Promise:

- \`.then(onFulfilled)\` dipanggil saat Promise berhasil.
- \`.catch(onRejected)\` dipanggil saat Promise gagal.
- \`.finally(onFinally)\` selalu dipanggil, baik berhasil maupun gagal.

\`\`\`js
promise
  .then((value) => console.log(value))
  .catch((error) => console.error(error))
  .finally(() => console.log("Selesai"));
\`\`\`

## Promise Chaining

\`then\` bisa dirantai. Setiap \`then\` bisa mengembalikan nilai biasa atau Promise baru, sehingga operasi asynchronous bisa dijalankan secara berurutan dengan gaya yang lebih rapi daripada callback bersarang.

\`\`\`js
fetch('/api/order')
  .then((res) => res.json())
  .then((order) => fetch('/api/payment/' + order.id))
  .then((res) => res.json())
  .then((payment) => console.log(payment))
  .catch((error) => console.error(error));
\`\`\`

## Promise.all dan Promise.race

- \`Promise.all([p1, p2, ...])\` menunggu semua Promise selesai. Jika salah satu gagal, seluruh hasil langsung rejected.
- \`Promise.race([p1, p2, ...])\` mengembalikan hasil Promise yang selesai pertama kali, baik berhasil maupun gagal.

Gunakan \`Promise.all\` saat butuh hasil banyak operasi sekaligus, dan \`Promise.race\` untuk timeout atau kompetisi antar sumber data.`,
    },
    {
      id: 'sec-06-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'typed-async.ts',
        language: 'typescript',
        title: 'TypeScript: Fungsi Async dengan Tipe',
        code: `interface User {
  id: number;
  name: string;
  email: string;
}

async function getUserById(id: number): Promise<User> {
  try {
    const response = await fetch('/api/users/' + id);

    if (!response.ok) {
      throw new Error('Gagal mengambil data pengguna');
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error(
      'Error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    throw error;
  }
}

getUserById(1)
  .then((user) => console.log(user.name))
  .catch((error) => console.error(error.message));`,
        explanation:
          'Tipe Promise<User> memastikan fungsi async mengembalikan objek User. Type narrowing dengan instanceof Error membantu menangani pesan kesalahan secara aman.',
      },
    },
    {
      id: 'sec-06-advanced-async',
      type: 'markdown',
      level: 'advanced',
      title: 'async/await, Error Handling, dan Event Loop',
      content: `## async/await

Kata kunci \`async\` dan \`await\` diperkenalkan untuk menulis kode asynchronous dengan gaya yang lebih mirip kode synchronous. Fungsi yang dideklarasikan dengan \`async\` selalu mengembalikan Promise.

\`\`\`js
async function greet() {
  return "Halo";
}

greet().then((message) => console.log(message));
\`\`\`

Di dalam fungsi \`async\`, kita bisa menggunakan \`await\` untuk menunggu Promise selesai sebelum melanjutkan ke baris berikutnya.

\`\`\`js
async function loadData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  console.log(data);
}
\`\`\`

## Error Handling dengan try/catch

Karena \`await\` bisa melempar error seperti kode synchronous, penanganan kesalahan lebih alami menggunakan \`try/catch\`.

\`\`\`js
async function loadData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Gagal memuat data:', error.message);
  }
}
\`\`\`

## Event Loop (Konsep)

**Event loop** adalah mekanisme inti yang membuat JavaScript bisa menjalankan kode asynchronous di atas single thread. Komponen utamanya:

- **Call stack**: tempat kode yang sedang dieksekusi.
- **Task queue (macrotask)**: tugas seperti \`setTimeout\`, \`setInterval\`, dan event I/O.
- **Microtask queue**: tugas seperti \`Promise.then\` dan \`catch\`.

Event loop terus memeriksa call stack. Jika stack kosong, ia mengambil tugas dari microtask queue terlebih dahulu, lalu dari task queue. Urutan ini menjadikan Promise lebih cepat dieksekusi daripada \`setTimeout\` meskipun delay-nya 0.

\`\`\`js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

// Urutan output: A, D, C, B
\`\`\``,
    },
    {
      id: 'sec-06-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Goroutine dan Channel',
        code: `package main

import (
	"fmt"
	"time"
)

func fetchData(ch chan string) {
	time.Sleep(500 * time.Millisecond)
	ch <- "data siap"
}

func main() {
	messages := make(chan string)

	go fetchData(messages)

	msg := <-messages
	fmt.Println(msg)
}`,
        explanation:
          'Goroutine adalah thread ringan yang dikelola runtime Go. Channel digunakan untuk berkomunikasi antar goroutine secara aman, berbeda dengan model Promise di JavaScript yang berbasis callback dan event loop.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Asynchronous JavaScript memungkinkan program menangani operasi lambat tanpa blocking. Callback adalah pendekatan paling dasar, tetapi callback hell bisa dihindari dengan Promise. Promise menawarkan then/catch/finally, chaining, serta utility Promise.all dan Promise.race. async/await membuat kode asynchronous lebih mudah dibaca, sementara try/catch menangani error secara alami. Di balik layar, event loop mengatur eksekusi tugas melalui call stack, task queue, dan microtask queue.',
    },
  ],
}
