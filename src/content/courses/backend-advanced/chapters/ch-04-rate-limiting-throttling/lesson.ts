import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-rate-limiting-throttling',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-04-basic-rate-limiting',
      type: 'markdown',
      level: 'basic',
      title: 'Rate Limiting, Throttling, dan Fixed Window',
      content: `## Mengapa Rate Limiting Penting?

Rate limiting membatasi berapa banyak request yang dapat diterima dari client dalam periode tertentu. Tujuannya:

- Melindungi server dari abuse, DDoS, dan bug client.
- Menjaga fair usage antar pengguna atau tenant.
- Mencegah downstream service kelebihan beban.

## Throttling vs Rate Limiting

- **Rate limiting**: menolak request yang melebihi batas, biasanya dengan status 429 Too Many Requests.
- **Throttling**: memperlambat pemrosesan request agar beban tetap dalam batas, tanpa selalu menolak.

## Fixed Window

Algoritma paling sederhana: setiap jendela waktu (misalnya satu menit) memiliki counter. Jika counter mencapai batas, request selanjutnya ditolak hingga jendela berganti.

Kelebahan: mudah diimplementasikan dan sedikit state.
Kekurangan: burst bisa terjadi di tepi window; 100 request di detik terakhir window lalu 100 request di detik pertama window berikutnya menghasilkan 200 request dalam dua detik.`,
    },
    {
      id: 'sec-04-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'fixed-window.js',
        language: 'javascript',
        title: 'JavaScript: Fixed Window Rate Limiter In-Memory',
        code: `class FixedWindowLimiter {
  constructor(limit, windowMs) {
    this.limit = limit
    this.windowMs = windowMs
    this.windows = new Map()
  }

  isAllowed(key) {
    const now = Date.now()
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs
    const windowKey = key + ':' + windowStart

    const count = this.windows.get(windowKey) || 0
    if (count >= this.limit) {
      return false
    }

    this.windows.set(windowKey, count + 1)
    return true
  }
}

const limiter = new FixedWindowLimiter(5, 60000)

for (let i = 0; i < 7; i++) {
  console.log('request', i, limiter.isAllowed('user:andi'))
}`,
        explanation:
          'Limiter menghitung request per window. Setelah batas tercapai, request ditolak sampai window berikutnya.',
      },
    },
    {
      id: 'sec-04-intermediate-sliding',
      type: 'markdown',
      level: 'intermediate',
      title: 'Token Bucket, Sliding Window, dan Redis Backing',
      content: `## Token Bucket

Token bucket bekerja seperti ember yang diisi token dengan kecepatan tetap. Setiap request mengambil satu token; jika token habis, request ditolak. Ember memiliki kapasitas maksimum sehingga mengizinkan burst terkontrol.

- **Rate**: kecepatan pengisian token per detik.
- **Burst**: kapasitas maksimum ember.

Token bucket lebih fleksibel daripada fixed window karena burst tidak terkait pada batas window.

## Sliding Window

Sliding window log melacak timestamp setiap request. Sistem menghitung berapa banyak request dalam window terakhir. Algoritma ini menghindari burst di tepi window tetapi membutuhkan lebih banyak storage dan komputasi.

## Redis-Backed Rate Limiter

Untuk deployment multi-instance, state limiter harus disimpan di tempat terpusat. Redis adalah pilihan populer karena latensi rendah dan operasi atomik seperti \`INCR\`, \`EXPIRE\`, dan Lua script. Dengan Redis, semua instance aplikasi berbagi counter yang sama.

## User-Tier Limits

Batas rate dapat bervariasi berdasarkan tier pengguna:

- Free: 10 request/menit.
- Pro: 1000 request/menit.
- Internal: unlimited atau batas lebih tinggi.

Tier biasanya dibaca dari token atau API key, lalu dipetakan ke konfigurasi limit.`,
    },
    {
      id: 'sec-04-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'redis-limiter.ts',
        language: 'typescript',
        title: 'TypeScript: Sliding Window dengan Redis Lua',
        code: `interface RedisClient {
  eval(script: string, keys: string[], args: string[]): Promise<[number, number]>
}

const slidingWindowScript = \`
  local key = KEYS[1]
  local window = tonumber(ARGV[1])
  local limit = tonumber(ARGV[2])
  local now = tonumber(ARGV[3])
  local clearBefore = now - window

  redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)
  local current = redis.call('ZCARD', key)

  if current < limit then
    redis.call('ZADD', key, now, now .. ':' .. math.random())
    redis.call('EXPIRE', key, math.ceil(window / 1000))
    return {1, current + 1}
  else
    return {0, current}
  end
\`

class SlidingWindowRedisLimiter {
  constructor(private redis: RedisClient, private limit: number, private windowMs: number) {}

  async isAllowed(key: string): Promise<boolean> {
    const now = Date.now()
    const [allowed] = await this.redis.eval(slidingWindowScript, [key], [
      String(this.windowMs),
      String(this.limit),
      String(now),
    ])
    return allowed === 1
  }
}

const redis = {
  async eval(script: string, keys: string[], args: string[]) {
    // Actual Redis eval implementation
    return [1, 1] as [number, number]
  },
}

const limiter = new SlidingWindowRedisLimiter(redis, 10, 60000)
limiter.isAllowed('user:andi').then(console.log)`,
        explanation:
          'Lua script memastikan pembersihan window lama, penghitungan, dan penambahan timestamp berjalan atomik di Redis.',
      },
    },
    {
      id: 'sec-04-advanced-distributed',
      type: 'markdown',
      level: 'advanced',
      title: 'Distributed Rate Limiting dan Adaptive Throttling',
      content: `## Distributed Rate Limiting

Dalam lingkungan multi-instance, rate limiter in-memory tidak cukup karena setiap instance memiliki counter sendiri. Solusi:

- **Redis central**: semua instance berbagi counter.
- **Gossip protocol**: instance saling bertukar state lokal secara berkala.
- **Token bucket global**: sinkronisasi token melalui storage terpusat.

Trade-off distributed rate limiter adalah tambahan latency setiap request dan single point of contention pada Redis.

## Adaptive Throttling

Adaptive throttling menyesuaikan batas berdasarkan kondisi downstream:

- Jika error rate downstream naik, batas diturunkan untuk mengurangi tekanan.
- Jika sistem sehat, batas dapat dinaikkan.
- Digunakan oleh service mesh dan circuit breaker untuk graceful degradation.

## Under the Hood: Token Bucket State

Token bucket dapat direpresentasikan dengan dua nilai: jumlah token terakhir \`tokens\` dan timestamp terakhir update \`lastUpdated\`. Saat request masuk:

1. Hitung token yang ditambahkan sejak \`lastUpdated\`: \`min(capacity, tokens + rate * elapsed)\`.
2. Jika token >= 1, kurangi satu dan izinkan request.
3. Jika token < 1, tolak request.

Representasi ini memungkinkan update atomik dengan satu operasi storage (misalnya Redis \`GETSET\` atau Lua script), sehingga scalable untuk throughput tinggi.`,
    },
    {
      id: 'sec-04-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-go',
        filename: 'token_bucket.go',
        language: 'go',
        title: 'Go: Token Bucket dengan sync.Mutex',
        code: `package main

import (
	"fmt"
	"sync"
	"time"
)

type TokenBucket struct {
	mu        sync.Mutex
	tokens    float64
	capacity  float64
	rate      float64
	lastCheck time.Time
}

func NewTokenBucket(capacity, ratePerSecond float64) *TokenBucket {
	return &TokenBucket{
		tokens:    capacity,
		capacity:  capacity,
		rate:      ratePerSecond,
		lastCheck: time.Now(),
	}
}

func (b *TokenBucket) Allow() bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(b.lastCheck).Seconds()
	b.tokens = min(b.capacity, b.tokens+elapsed*b.rate)
	b.lastCheck = now

	if b.tokens >= 1 {
		b.tokens--
		return true
	}
	return false
}

func min(a, b float64) float64 {
	if a < b {
		return a
	}
	return b
}

func main() {
	bucket := NewTokenBucket(3, 1)
	for i := 0; i < 6; i++ {
		fmt.Printf("request %d: %v\\n", i, bucket.Allow())
		time.Sleep(500 * time.Millisecond)
	}
}`,
        explanation:
          'Token bucket mengisi token berdasarkan waktu yang berlalu. Mutex melindungi state saat diakses dari banyak goroutine, mengizinkan burst hingga kapasitas ember.',
      },
    },
    {
      id: 'sec-04-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Rate limiting melindungi sistem dari kelebihan beban. Pilih algoritma sesuai kebutuhan: fixed window untuk kesederhanaan, token bucket untuk burst terkontrol, sliding window untuk distribusi merata. Untuk multi-instance, gunakan backing store terpusat.',
    },
  ],
}
