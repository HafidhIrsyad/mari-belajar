import type { Lesson } from '@/content/types'

export const ch08Lesson: Lesson = {
  id: 'lesson-ch-08-benchmarking-profiling',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-08-basic-benchmark',
      type: 'markdown',
      level: 'basic',
      title: 'Benchmark Dasar',
      content: `## testing.B

Di Go, benchmark ditulis dalam file _test.go dengan signature:

\`\`\`go
func BenchmarkXxx(b *testing.B) {
  for i := 0; i < b.N; i++ {
    // kode yang akan diukur
  }
}
\`\`\`

"b.N" adalah jumlah iterasi yang dipilih oleh testing package untuk mendapatkan pengukuran yang cukup stabil.

## Menjalankan Benchmark

\`\`\`text
go test -bench=.
go test -bench=BenchmarkName -benchmem
\`\`\`

Flag "-benchmem" menampilkan informasi alokasi memori per operasi. Output umumnya berbentuk:

\`\`\`text
BenchmarkFib-8    1234567    1234 ns/op    128 B/op    3 allocs/op
\`\`\`

Ini menunjukkan waktu per operasi, byte per operasi, dan jumlah alokasi per operasi.

## ReportAllocs

Di dalam benchmark, kita bisa memanggil "b.ReportAllocs()" untuk selalu melaporkan alokasi meskipun flag -benchmem tidak digunakan.

\`\`\`go
func BenchmarkXxx(b *testing.B) {
  b.ReportAllocs()
  for i := 0; i < b.N; i++ {
    doWork()
  }
}
\`\`\``,
    },
    {
      id: 'sec-08-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'benchmark-js.mjs',
        language: 'javascript',
        code: `function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}

const start = performance.now();
for (let i = 0; i < 1000; i++) {
  fib(20);
}
const duration = performance.now() - start;
console.log(\`1000 calls took \${duration.toFixed(2)}ms\`);`,
        title: 'JavaScript: Benchmark Sederhana dengan performance.now',
        explanation:
          'JavaScript tidak memiliki benchmark runner bawaan seperti Go. Kita biasanya menggunakan performance.now atau library seperti benchmark.js.',
      },
    },
    {
      id: 'sec-08-intermediate-benchmark-patterns',
      type: 'markdown',
      level: 'intermediate',
      title: 'Alokasi Memori dan Reset Timer',
      content: `## Reset Timer

Jika benchmark membutuhkan setup yang tidak ingin diukur, gunakan "b.ResetTimer()" setelah setup selesai.

\`\`\`go
func BenchmarkPrepare(b *testing.B) {
  data := prepareLargeData()
  b.ResetTimer()
  for i := 0; i < b.N; i++ {
    process(data)
  }
}
\`\`\`

## Stop dan Start Timer

Untuk setup di dalam loop, kita bisa menghentikan dan memulai timer:

\`\`\`go
for i := 0; i < b.N; i++ {
  b.StopTimer()
  input := generateInput()
  b.StartTimer()
  process(input)
}
\`\`\`

## Memori dan Alokasi

Alokasi memori memengaruhi performa karena beban GC. Benchmark dengan "b.ReportAllocs()" atau "-benchmem" membantu mendeteksi alokasi yang tidak perlu.

## Sub-benchmark

Kita bisa menjalankan beberapa varian dalam satu fungsi benchmark:

\`\`\`go
func BenchmarkFib(b *testing.B) {
  for _, n := range []int{10, 20, 30} {
    b.Run(fmt.Sprintf("n=%d", n), func(b *testing.B) {
      for i := 0; i < b.N; i++ {
        fib(n)
      }
    })
  }
}
\`\`\`

Sub-benchmark memudahkan perbandingan performa untuk berbagai input.`,
    },
    {
      id: 'sec-08-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'benchmark-ts.ts',
        language: 'typescript',
        code: `function fib(n: number): number {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}

function benchmark(name: string, fn: () => void, iterations: number): void {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const duration = performance.now() - start;
  console.log(\`\${name}: \${duration.toFixed(2)}ms for \${iterations} iterations\`);
}

benchmark('fib(20)', () => fib(20), 1000);`,
        title: 'TypeScript: Benchmark Manual dengan Timer',
        explanation:
          'TypeScript/JavaScript sering menggunakan benchmark manual atau library seperti benchmark.js. Go menyediakan testing.B yang terintegrasi dengan toolchain.',
      },
    },
    {
      id: 'sec-08-advanced-profiling',
      type: 'markdown',
      level: 'advanced',
      title: 'pprof, Flame Graph, dan Benchmark Gotchas',
      content: `## Profil CPU

Profil CPU menunjukkan di mana waktu dihabiskan selama eksekusi. Untuk menghasilkan profil CPU:

\`\`\`text
go test -bench=. -cpuprofile=cpu.prof
\`\`\`

Kemudian analisis dengan:

\`\`\`text
go tool pprof cpu.prof
(pprof) top
(pprof) web
\`\`\`

## Profil Memori

Profil memori menunjukkan alokasi yang masih hidup pada saat profiling:

\`\`\`text
go test -bench=. -memprofile=mem.prof
\`\`\`

Gunakan flag "-memprofilerate=1" untuk merekam setiap alokasi, meskipun ini memperlambat benchmark.

## Flame Graph

Flame graph adalah visualisasi stack trace yang menunjukkan fungsi mana yang paling banyak memakan waktu. Sumbu x merepresentasikan populasi sample, sedangkan sumbu y menunjukkan kedalaman stack. Lebar baris berbanding lurus dengan waktu yang dihabiskan. Fungsi di puncak flame seringkali adalah hot path yang perlu dioptimasi.

## Benchmark Gotchas

- **Compiler optimization**: compiler dapat menghapus kode yang hasilnya tidak dipakai. Simpan hasil ke package-level variable untuk mencegah eliminasi.
- **Warm-up**: hasil pertama bisa terpengaruh cache. Jalankan benchmark beberapa kali.
- **Noise**: program lain di mesin yang sama dapat memengaruhi hasil. Gunakan environment yang tenang.
- **Microbenchmark vs real workload**: hasil benchmark mikro belum tentu mencerminkan performa di produksi.

## Trade-off Optimasi

Optimasi sering kali membutuhkan trade-off:

- Lebih cepat bisa berarti lebih banyak memori.
- Lebih sedikit alokasi bisa berarti kode yang lebih kompleks.
- Parallelisme bisa meningkatkan throughput tapi juga latency dan kompleksitas.

Selalu ukur sebelum dan sesudah optimasi, dan pastikan optimasi benar-benar diperlukan.`,
    },
    {
      id: 'sec-08-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'bench_test.go',
        language: 'go',
        title: 'Go: Benchmark dan Profil Memori',
        code: `package main

import (
	"fmt"
	"testing"
)

var result int

func fib(n int) int {
	if n < 2 {
		return n
	}
	return fib(n-1) + fib(n-2)
}

func BenchmarkFib(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		result = fib(20)
	}
}

func BenchmarkFibSub(b *testing.B) {
	for _, n := range []int{10, 20, 25} {
		b.Run(fmt.Sprintf("n=%d", n), func(b *testing.B) {
			b.ReportAllocs()
			for i := 0; i < b.N; i++ {
				result = fib(n)
			}
		})
	}
}

// Jalankan dengan:
// go test -bench=. -benchmem -memprofile=mem.prof`,
        explanation:
          'BenchmarkFib mengukur fib(20). Variabel result package-level mencegah compiler mengoptimalkan loop. BenchmarkFibSub menunjukkan sub-benchmark untuk beberapa input.',
      },
    },
    {
      id: 'sec-08-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** Benchmark di Go ditulis dengan testing.B dan dijalankan menggunakan go test -bench. Selalu pertimbangkan alokasi memori dan gunakan ResetTimer untuk setup yang tidak ingin diukur. pprof memungkinkan analisis CPU dan memori, sementara flame graph membantu mengidentifikasi hot path. Hindari benchmark gotchas seperti compiler optimization dan noise. Optimasi selalu memerlukan trade-off, jadi ukur sebelum mengubah kode.',
    },
  ],
}
