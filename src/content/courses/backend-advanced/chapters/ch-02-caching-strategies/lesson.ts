import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-caching-strategies',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-02-basic-caching',
      type: 'markdown',
      level: 'basic',
      title: 'Fundamental Cache: Hit, Miss, TTL, dan Eviction',
      content: `## Mengapa Cache Penting?

Cache adalah lapisan penyimpanan cepat yang menyimpan salinan data sehingga request berikutnya tidak perlu menghitung atau mengambil data dari sumber yang lambat. Cache dapat berada di browser, CDN, reverse proxy, aplikasi, atau database.

## Cache Hit dan Cache Miss

- **Cache hit**: data ditemukan di cache; response dikembalikan langsung.
- **Cache miss**: data tidak ada di cache; aplikasi mengambil dari sumber asli, lalu menyimpannya ke cache.

## Time-To-Live (TTL)

TTL menentukan berapa lama data dipertahankan di cache. Setelah TTL habis, data dianggap expired dan akan diambil ulang. TTL terlalu pendek meningkatkan beban sumber; TTL terlalu lama menyebabkan data basi.

## Eviction Policy

Ketika cache penuh, eviction policy memilih item yang dibuang:

- **LRU (Least Recently Used)**: membuang item yang paling lama tidak diakses.
- **LFU (Least Frequently Used)**: membuang item dengan akses paling sedikit.
- **FIFO (First In First Out)**: membuang item tertua tanpa memperhatikan frekuensi.

Cache adalah trade-off klasik antara **freshness** dan **performa**: semakin agresif caching, semakin besar risiko data tidak konsisten.`,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'memory-cache.js',
        language: 'javascript',
        title: 'JavaScript: In-Memory Cache dengan TTL',
        code: `class MemoryCache {
  constructor(defaultTtlMs = 60000) {
    this.store = new Map()
    this.defaultTtlMs = defaultTtlMs
  }

  set(key, value, ttlMs = this.defaultTtlMs) {
    const expiresAt = Date.now() + ttlMs
    this.store.set(key, { value, expiresAt })
  }

  get(key) {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return undefined
    }
    return entry.value
  }

  delete(key) {
    this.store.delete(key)
  }
}

const cache = new MemoryCache(5000)

cache.set('user:1', { name: 'Andi' })
console.log(cache.get('user:1'))

setTimeout(() => {
  console.log(cache.get('user:1'))
}, 6000)`,
        explanation:
          'Cache in-memory sederhana menyimpan nilai bersama waktu kedaluwarsa. Setelah TTL habis, entry dihapus sehingga data akan diambil ulang.',
      },
    },
    {
      id: 'sec-02-intermediate-cache-patterns',
      type: 'markdown',
      level: 'intermediate',
      title: 'Cache-Aside, Write-Through, Write-Behind, dan Invalidasi',
      content: `## Cache-Aside (Lazy Loading)

Aplikasi bertanggung jawab mengelola cache:

1. Cek cache; jika miss, ambil dari database.
2. Simpan ke cache dengan TTL.
3. Saat data berubah, hapus cache (bukan update) agar request berikutnya mengisi ulang.

Keuntungan: sederhana. Risiko: cache miss yang banyak dapat membanjiri database.

## Write-Through

Setiap penulisan ke database juga menulis ke cache. Read hampir selalu hit, tetapi write menjadi lebih lambat karena ada dua operasi. Cocok untuk data yang sangat sering dibaca.

## Write-Behind (Write-Back)

Tulis ke cache terlebih dahulu, lalu asynchronously flush ke database. Performa write tinggi tetapi berisiko kehilangan data jika cache crash sebelum flush.

## Invalidasi Cache

Invalidasi adalah masalah klasik yang sulit. Strategi umum:

- **TTL-based**: data dihapus otomatis setelah waktu tertentu.
- **Event-based**: saat update, publish event untuk menghapus atau refresh cache.
- **Stale-while-revalidate**: kembalikan data lama sambil mengambil data baru di background.

Gunakan **cache key versioning** atau **namespace** untuk invalidasi massal saat struktur data berubah.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'cache-aside.ts',
        language: 'typescript',
        title: 'TypeScript: Cache-Aside Repository Bertipe',
        code: `interface CacheProvider {
  get<T>(key: string): Promise<T | undefined>
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>
  delete(key: string): Promise<void>
}

interface Product {
  id: string
  name: string
  price: number
}

class ProductRepository {
  constructor(
    private db: Map<string, Product>,
    private cache: CacheProvider,
    private ttlSeconds: number = 60
  ) {}

  async findById(id: string): Promise<Product | undefined> {
    const cacheKey = 'product:' + id
    const cached = await this.cache.get<Product>(cacheKey)
    if (cached) return cached

    const product = this.db.get(id)
    if (product) {
      await this.cache.set(cacheKey, product, this.ttlSeconds)
    }
    return product
  }

  async update(product: Product): Promise<void> {
    this.db.set(product.id, product)
    await this.cache.delete('product:' + product.id)
  }
}

const cache: CacheProvider = {
  async get(key) { /* Redis GET */ return undefined },
  async set(key, value, ttl) { /* Redis SETEX */ },
  async delete(key) { /* Redis DEL */ },
}

const repo = new ProductRepository(new Map(), cache)
repo.findById('P-1').then(console.log)`,
        explanation:
          'Repository memeriksa cache sebelum database. Setelah update, cache dihapus agar request berikutnya membaca data terbaru.',
      },
    },
    {
      id: 'sec-02-advanced-cache-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Cache Stampede, Thundering Herd, dan CDN Caching',
      content: `## Cache Stampede (Thundering Herd)

Cache stampede terjadi ketika cache entry yang populer expired secara bersamaan, dan puluhan atau ratusan request mencoba menghitung ulang nilai yang sama. Dampaknya adalah lonjakan beban ke database atau service.

Teknik mitigasi:

- **Probabilistic early expiration**: setiap request memiliki probabilitas kecil untuk meregenerate sebelum TTL habis.
- **Mutex / lock**: hanya satu request yang diizinkan meregenerate; request lain menunggu.
- **External recomputation**: proses background yang selalu menjaga cache tetap segar.
- **Permanent cache with background refresh**: cache tidak pernah expired; worker secara berkala memperbarui nilai.

## Konsistensi Cache

Konsistensi kuat antara cache dan database mahal di distributed environment. Banyak sistem memilih **eventual consistency**: update database, publish invalidation event, dan cache akan diperbarui beberapa saat kemudian.

## CDN Caching

Content Delivery Network men-cache asset statis di edge location di seluruh dunia. Mekanisme caching mengikuti header HTTP seperti \`Cache-Control\`, \`ETag\`, dan \`Last-Modified\`. Dynamic content juga bisa di-cache jika TTL dan invalidasi-nya dirancang dengan hati-hati.

## Under the Hood: Redis sebagai Cache

Redis menyimpan data di memory dengan struktur hash table. Operasi \`GET\` dan \`SET\` memiliki kompleksitas O(1). Fitur \`EXPIRE\` menggunakan lazy expiration dan periodic sampling: key dihapus saat diakses setelah TTL, atau dibersihkan secara berkala oleh background process. Redis juga mendukung LRU/LFU eviction saat memory penuh.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Redis Cache Client dengan TTL',
        code: `package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

type Product struct {
	ID    string  \`json:"id"\`
	Name  string  \`json:"name"\`
	Price float64 \`json:"price"\`
}

func main() {
	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})

	ctx := context.Background()
	product := Product{ID: "P-1", Name: "Kopi", Price: 25000}

	data, _ := json.Marshal(product)
	err := rdb.Set(ctx, "product:P-1", data, 30*time.Second).Err()
	if err != nil {
		log.Fatal(err)
	}

	cached, err := rdb.Get(ctx, "product:P-1").Result()
	if err == redis.Nil {
		fmt.Println("cache miss")
		return
	} else if err != nil {
		log.Fatal(err)
	}

	var result Product
	json.Unmarshal([]byte(cached), &result)
	fmt.Printf("cache hit: %+v\\n", result)
}`,
        explanation:
          'Redis menyimpan object sebagai JSON string dengan TTL. Penggunaan `redis.Nil` membedakan cache miss dari error yang sebenarnya.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Caching adalah cara paling efektif untuk meningkatkan performa, tetapi selalu dibayar dengan kompleksitas konsistensi. Pilih pola yang sesuai (cache-aside, write-through, write-behind), atur TTL, dan siapkan mitigasi stampede untuk data yang sangat populer.',
    },
  ],
}
