import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: 'lesson-ch-06-networking-and-internet-protocols',
  estimatedMinutes: 16,
  sections: [
    {
      id: 'sec-06-basic-networking',
      type: 'markdown',
      level: 'basic',
      title: 'Client, Server, IP, DNS, dan HTTP',
      content: `## Model Client-Server

Ketika kita membuka situs web atau aplikasi, biasanya ada dua peran utama:
- **Client**: perangkat atau aplikasi yang meminta data, seperti browser atau aplikasi mobile.
- **Server**: komputer yang menyediakan data atau layanan, seperti web server atau API server.

Client mengirimkan **request** (permintaan) ke server, lalu server membalas dengan **response** (jawaban).

## IP Address dan DNS

Setiap perangkat di jaringan memiliki **IP address**, yaitu alamat unik yang digunakan agar data bisa dikirim ke tujuan yang tepat. Contoh IP address versi 4 (IPv4):

\`192.168.1.1\`

Namun, manusia lebih mudah mengingat nama seperti \`google.com\` daripada deretan angka. Di sinilah **DNS** (*Domain Name System*) berperan: menerjemahkan nama domain menjadi IP address.

\`\`\`text
Pengguna mengetik: google.com
DNS mengembalikan: 142.250.185.78
Browser menghubungi: 142.250.185.78
\`\`\`

## HTTP: Request dan Response

**HTTP** (*HyperText Transfer Protocol*) adalah aturan komunikasi utama di web. Sebuah HTTP request terdiri dari:

- **Method**: jenis operasi, seperti \`GET\` (mengambil data) atau \`POST\` (mengirim data).
- **Path/URL**: alamat resource, seperti \`/posts/1\`.
- **Headers**: informasi tambahan, seperti tipe konten atau token autentikasi.
- **Body**: data yang dikirim, biasanya untuk method \`POST\` atau \`PUT\`.

Server membalas dengan **response** yang berisi:

- **Status code**: kode hasil, seperti \`200 OK\`, \`404 Not Found\`, atau \`500 Internal Server Error\`.
- **Headers**: informasi tambahan dari server.
- **Body**: data yang diminta, seperti HTML atau JSON.

\`\`\`text
GET /posts/1 HTTP/1.1
Host: jsonplaceholder.typicode.com

HTTP/1.1 200 OK
Content-Type: application/json

{ "id": 1, "title": "...", "body": "..." }
\`\`\`

Method umum: \`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`. Status code umum: \`200\` sukses, \`201\` dibuat, \`400\` request salah, \`401\` tidak terautentikasi, \`403\` dilarang, \`404\` tidak ditemukan, \`500\` error server.`,
    },
    {
      id: 'sec-06-js-fetch',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'fetch-example.js',
        language: 'javascript',
        title: 'JavaScript: HTTP GET dan POST dengan fetch',
        code: `async function getPost(postId) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts/' + postId
  );
  if (!response.ok) {
    throw new Error('HTTP error! status: ' + response.status);
  }
  return response.json();
}

async function createPost(title, body) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 }),
    }
  );
  if (!response.ok) {
    throw new Error('HTTP error! status: ' + response.status);
  }
  return response.json();
}

getPost(1)
  .then((data) => console.log('Judul:', data.title))
  .catch((err) => console.error('Gagal mengambil:', err));

createPost('Halo Jaringan', 'Ini contoh request POST')
  .then((data) => console.log('Dibuat dengan id:', data.id))
  .catch((err) => console.error('Gagal membuat:', err));`,
        explanation:
          'Method fetch di JavaScript mengirim HTTP request secara asynchronous. GET digunakan untuk mengambil data, sedangkan POST mengirim data baru ke server.',
      },
    },
    {
      id: 'sec-06-intermediate-protocols',
      type: 'markdown',
      level: 'intermediate',
      title: 'TCP vs UDP, Port, Socket, dan Routing',
      content: `## TCP vs UDP

Data di jaringan dikirim dalam bentuk **packet** (*paket*) kecil. Dua protokol transport paling umum adalah **TCP** dan **UDP**.

**TCP** (*Transmission Control Protocol*):
- Menjamin data sampai dengan urutan yang benar.
- Melakukan handshake, acknowledgement, dan retransmisi jika ada packet yang hilang.
- Cocok untuk web, email, dan transfer file.

**UDP** (*User Datagram Protocol*):
- Lebih cepat dan ringan karena tidak menjamin urutan atau keberhasilan pengiriman.
- Tidak ada handshake.
- Cocok untuk streaming video, VoIP, dan game online yang lebih mementingkan kecepatan daripada ketepatan setiap packet.

## Port dan Socket

**Port** adalah nomor yang membedakan layanan yang berbeda di satu perangkat. Contoh:
- Port \`80\`: HTTP.
- Port \`443\`: HTTPS.
- Port \`22\`: SSH.

Bayangkan IP address seperti alamat gedung, dan port seperti nomor ruangan di dalam gedung tersebut.

**Socket** adalah titik komunikasi antara dua proses, biasanya terdiri dari kombinasi IP address dan port. Socket memungkinkan client dan server saling mengirim data.

## Packet dan Routing

Ketika data dikirim dari client ke server, data dipecah menjadi **packet**. Setiap packet berisi bagian data, alamat tujuan, dan informasi kontrol.

**Routing** adalah proses memilih jalur terbaik agar packet sampai ke tujuan. Router di sepanjang jaringan membaca alamat tujuan dan meneruskan packet ke router berikutnya hingga sampai.

> Penting: internet tidak memiliki jalur tetap. Packet-packet dari data yang sama bisa saja melewati jalur berbeda dan disusun ulang di tujuan.`,
    },
    {
      id: 'sec-06-ts-fetch',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'typed-fetch.ts',
        language: 'typescript',
        title: 'TypeScript: Fetch dengan Interface',
        code: `interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts/' + id
  );

  if (!response.ok) {
    throw new Error('Gagal mengambil data: ' + response.status);
  }

  return response.json() as Promise<Post>;
}

fetchPost(1)
  .then((post) => console.log('Judul:', post.title))
  .catch((error) => console.error('Terjadi kesalahan:', error));`,
        explanation:
          'Interface Post memberikan tipe data pada hasil fetch. Type assertion memastikan TypeScript mengetahui struktur objek yang dikembalikan, sehingga kesalahan penggunaan properti bisa tertangkap saat compile time.',
      },
    },
    {
      id: 'sec-06-advanced-security',
      type: 'markdown',
      level: 'advanced',
      title: 'TLS/HTTPS, Caching/CDN, dan REST API',
      content: `## TLS/HTTPS dan Enkripsi Transport

**HTTPS** adalah HTTP yang dilindungi oleh **TLS** (*Transport Layer Security*). TLS mengenkripsi data antara client dan server sehingga pihak ketiga yang menyadap jaringan tidak bisa membaca isinya.

Prosesnya melibatkan:
- **Handshake**: client dan server menyepakati kunci enkripsi.
- **Sertifikat digital**: server membuktikan identitasnya kepada client.
- **Enkripsi simetris**: data dienkripsi dengan kunci yang sudah disepakati.

Selalu gunakan HTTPS untuk mengirim data sensitif seperti kata sandi, token, atau informasi pribadi.

## Caching dan CDN

**Caching** menyimpan salinan data di lokasi yang lebih dekat dengan client agar request berikutnya lebih cepat. Browser bisa menyimpan file statis seperti gambar, CSS, atau JavaScript.

**CDN** (*Content Delivery Network*) adalah jaringan server yang disebar di berbagai lokasi geografis. CDN menyimpan salinan konten dan melayani request dari server terdekat, mengurangi latensi dan beban server utama.

## Prinsip REST API

**REST** (*Representational State Transfer*) adalah gaya desain API yang memanfaatkan HTTP secara alami. Prinsip utamanya:

1. **Resource-oriented**: URL merepresentasikan resource, bukan aksi.
   - Contoh: \`/users/123\`, bukan \`/getUser?id=123\`.
2. **Gunakan HTTP method yang tepat**:
   - \`GET\` untuk membaca.
   - \`POST\` untuk membuat.
   - \`PUT\`/\`PATCH\` untuk memperbarui.
   - \`DELETE\` untuk menghapus.
3. **Stateless**: setiap request berdiri sendiri; server tidak menyimpan status client antar request.
4. **Respons yang konsisten**: gunakan format standar seperti JSON.

REST API tidak memaksakan teknologi tertentu, sehingga bisa diakses dari berbagai client: web, mobile, maupun perangkat lain.`,
    },
    {
      id: 'sec-06-go-server',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Server HTTP Sederhana',
        code: `package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Halo dari server Go!\n")
}

func main() {
	http.HandleFunc("/", helloHandler)
	fmt.Println("Server berjalan di http://localhost:8080")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Server error:", err)
	}
}`,
        explanation:
          'Package net/http di Go menyediakan web server bawaan. Fungsi http.HandleFunc memetakan URL ke handler, dan http.ListenAndServe menjalankan server pada port tertentu.',
      },
    },
    {
      id: 'sec-06-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Jaringan komputer menghubungkan client dan server melalui IP address, DNS, dan protokol seperti HTTP. TCP menjamin pengiriman data, sementara UDP lebih cepat tetapi tidak menjamin. Port membedakan layanan, dan socket menjadi titik komunikasi antar proses. TLS/HTTPS mengamankan data saat transit, caching dan CDN mempercepat pengiriman konten, serta REST API memanfaatkan HTTP method dan URL resource untuk komunikasi yang terstruktur.',
    },
  ],
}
