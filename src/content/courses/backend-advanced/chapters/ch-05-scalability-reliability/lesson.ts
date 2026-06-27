import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-scalability-reliability',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-05-basic-scaling',
      type: 'markdown',
      level: 'basic',
      title: 'Horizontal vs Vertical Scaling dan Stateless Service',
      content: `## Dimensi Scalability

Scalability adalah kemampuan sistem untuk menangani peningkatan beban dengan menambah kapasitas. Ada dua pendekatan utama:

- **Vertical scaling (scale up)**: meningkatkan CPU, RAM, atau disk pada satu mesin. Mudah tetapi memiliki batas fisik dan biaya eksponensial.
- **Horizontal scaling (scale out)**: menambah lebih banyak mesin atau instance. Lebih fleksibel, fault-tolerant, dan hampir tidak terbatas, tetapi memerlukan load balancing dan arsitektur terdistribusi.

## Stateless Service

Service stateless tidak menyimpan state client di memory lokal antar request. State disimpan di database, cache, atau shared storage. Keuntungan:

- Setiap instance dapat menangani request apa pun.
- Mudah menambah atau menghapus instance sesuai beban.
- Failure satu instance tidak menghilangkan session pengguna.

## Load Balancer

Load balancer mendistribusikan traffic ke banyak instance. Pada layer L4, ia bekerja di level transport; pada layer L7, ia memahami HTTP dan dapat routing berdasarkan path, header, atau cookie.

## Health Checks

Load balancer memantau kesehatan instance melalui health check. Instance yang tidak sehat dikeluarkan dari pool untuk mencegah traffic diarahkan ke node yang down.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'retry.js',
        language: 'javascript',
        title: 'JavaScript: Retry dengan Exponential Backoff dan Jitter',
        code: `async function retryWithBackoff(operation, options = {}) {
  const maxRetries = options.maxRetries || 3
  const baseDelayMs = options.baseDelayMs || 100
  const maxDelayMs = options.maxDelayMs || 5000

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (attempt === maxRetries) throw error

      const exponential = baseDelayMs * Math.pow(2, attempt)
      const jitter = Math.random() * exponential
      const delayMs = Math.min(exponential + jitter, maxDelayMs)

      console.log('retry', attempt + 1, 'in', Math.round(delayMs), 'ms')
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}

async function fetchOrder(orderId) {
  const res = await fetch('http://orders.local/orders/' + orderId)
  if (!res.ok) throw new Error('fetch failed')
  return res.json()
}

retryWithBackoff(() => fetchOrder('O-99'))
  .then(console.log)
  .catch(console.error)`,
        explanation:
          'Exponential backoff memberi jeda yang semakin lama antar percobaan, sedangkan jitter menyebarkan retry sehingga tidak terjadi thundering herd.',
      },
    },
    {
      id: 'sec-05-intermediate-reliability',
      type: 'markdown',
      level: 'intermediate',
      title: 'Auto-Scaling, Health Checks, dan Graceful Degradation',
      content: `## Auto-Scaling

Auto-scaling menyesuaikan jumlah instance berdasarkan metrik seperti CPU, memory, request rate, atau queue depth. Jenis umum:

- **Reactive scaling**: menambah instance setelah metrik melebihi ambang.
- **Predictive scaling**: menambah instance berdasarkan pola historis.
- **Scheduled scaling**: menyesuaikan kapasitas pada waktu tertentu.

Auto-scaling membutuhkan waktu untuk memulai instance baru (cold start), sehingga harus dipasangkan dengan rate limiting dan queue.

## Health Checks

Health check memberi sinyal apakah instance siap menerima traffic. Ada dua jenis:

- **Liveness probe**: apakah proses masih berjalan.
- **Readiness probe**: apakah instance siap menerima request (misalnya koneksi database sudah siap).

Pemisahan ini mencegah traffic masuk ke instance yang baru di-restart tetapi belum selesai inisialisasi.

## Graceful Degradation

Ketika downstream gagal, sistem tetap berfungsi dengan kemampuan yang berkurang. Contoh:

- Menampilkan data cache jika service rekomendasi down.
- Menonaktifkan fitur non-kritikal saat database lambat.
- Mengembalikan response default jika service eksternal timeout.

Degradation membutuhkan prioritas fitur dan default value yang aman.`,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'resilience.ts',
        language: 'typescript',
        title: 'TypeScript: Retry Wrapper dengan Generic',
        code: `type RetryOptions = {
  maxRetries: number
  baseDelayMs: number
  shouldRetry?: (error: unknown) => boolean
}

async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  let lastError: unknown

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      if (attempt === options.maxRetries) break
      if (options.shouldRetry && !options.shouldRetry(error)) break

      const delay = options.baseDelayMs * Math.pow(2, attempt)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

async function fetchPrice(productId: string): Promise<number> {
  const res = await fetch('/api/prices/' + productId)
  if (!res.ok) throw new Error('price unavailable')
  return res.json()
}

withRetry(() => fetchPrice('P-1'), {
  maxRetries: 3,
  baseDelayMs: 100,
  shouldRetry: (error) => error instanceof Error && !error.message.includes('unavailable'),
})
  .then(console.log)
  .catch(console.error)`,
        explanation:
          'Generic retry wrapper memungkinkan pemanggil menentukan kondisi retry sehingga error non-transient tidak memicu percobaan ulang.',
      },
    },
    {
      id: 'sec-05-advanced-circuit-breaker',
      type: 'markdown',
      level: 'advanced',
      title: 'Circuit Breaker, Bulkhead, dan Chaos Engineering',
      content: `## Circuit Breaker

Circuit breaker mencegah aplikasi terus memanggil service yang sudah diketahui gagal. Ia memiliki tiga state:

- **Closed**: request lewat seperti biasa. Jika failure rate melebihi ambang, breaker open.
- **Open**: request langsung gagal cepat (fail fast) tanpa membebani downstream.
- **Half-open**: setelah waktu tunggu, beberapa request diizinkan melewati untuk menguji apakah downstream sudah pulih.

Pola ini mencegah cascade failure dan memberi waktu downstream untuk recovery.

## Bulkhead

Bulkhead mengisolasi kegagalan dengan membatasi resource yang dapat digunakan oleh satu komponen. Contoh:

- Thread pool terpisah untuk service eksternal sehingga jika satu service lambat, thread pool lain tidak habis.
- Connection limit per downstream.
- Resource quota per tenant.

Tanpa bulkhead, satu service lambat dapat menelan seluruh thread pool dan merusak seluruh aplikasi.

## Chaos Engineering

Chaos engineering sengaja memicu kegagalan di production untuk memverifikasi sistem tetap resilient. Praktik dasar:

- Matikan satu instance secara acak.
- Simulasikan latency tinggi pada downstream.
- Isolasi dependency untuk melihat degradasi yang anggun.

Dilakukan dengan hipotesis jelas dan rollback plan; tujuannya bukan merusak, tetapi membangun kepercayaan pada resiliensi.

## Under the Hood: Retry Storm

Retry yang terlalu agresif dapat memperburuk outage. Jika banyak client retry bersamaan setelah downstream mulai pulih, beban dapat melonjak lagi. Solusinya adalah jitter, exponential backoff, dan circuit breaker yang membatasi retry saat failure rate tinggi.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'circuit_breaker.go',
        language: 'go',
        title: 'Go: Circuit Breaker Sederhana',
        code: `package main

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

type State int

const (
	Closed State = iota
	Open
	HalfOpen
)

type CircuitBreaker struct {
	mu                sync.Mutex
	state             State
	failureThreshold  int
	successThreshold  int
	timeout           time.Duration
	failures          int
	successes         int
	lastFailureTime   time.Time
}

func NewCircuitBreaker(failureThreshold, successThreshold int, timeout time.Duration) *CircuitBreaker {
	return &CircuitBreaker{
		failureThreshold: failureThreshold,
		successThreshold: successThreshold,
		timeout:          timeout,
		state:            Closed,
	}
}

func (cb *CircuitBreaker) Call(fn func() error) error {
	cb.mu.Lock()

	if cb.state == Open && time.Since(cb.lastFailureTime) > cb.timeout {
		cb.state = HalfOpen
		cb.failures = 0
		cb.successes = 0
	}

	if cb.state == Open {
		cb.mu.Unlock()
		return errors.New("circuit breaker is open")
	}

	cb.mu.Unlock()

	err := fn()
	cb.recordResult(err)
	return err
}

func (cb *CircuitBreaker) recordResult(err error) {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	if err != nil {
		cb.failures++
		cb.lastFailureTime = time.Now()
		if cb.failures >= cb.failureThreshold {
			cb.state = Open
		}
		return
	}

	cb.successes++
	if cb.state == HalfOpen && cb.successes >= cb.successThreshold {
		cb.state = Closed
		cb.failures = 0
		cb.successes = 0
	}
}

func main() {
	cb := NewCircuitBreaker(3, 2, 2*time.Second)
	for i := 0; i < 10; i++ {
		err := cb.Call(func() error { return errors.New("down") })
		fmt.Printf("call %d: %v (state=%d)\\n", i, err, cb.state)
	}
}`,
        explanation:
          'Circuit breaker melacak kegagalan dan membuka sirkuit setelah threshold tercapai. State half-open menguji recovery sebelum menutup kembali.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Scalability tanpa reliability tidak berguna. Desain stateless, tambahkan load balancer dan auto-scaling, lalu lindungi sistem dengan retry yang bijak, circuit breaker, dan bulkhead. Uji resiliensi secara sadar melalui chaos engineering.',
    },
  ],
}
