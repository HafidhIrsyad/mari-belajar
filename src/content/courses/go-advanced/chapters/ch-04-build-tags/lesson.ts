import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: 'lesson-ch-04-build-tags',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-go-adv-04-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Build Constraints dan File Suffix',
      content: `## Build Constraints

**Build constraints** adalah kondisi yang menentukan apakah sebuah file Go ikut dikompilasi. Constraint paling umum ditulis sebagai komentar di awal file:

\`\`\`go
//go:build linux
\`\`\`

File dengan constraint di atas hanya akan dikompilasi ketika target platform adalah Linux.

## File Suffix

Go juga mendukung file suffix sebagai cara lama untuk conditional compilation:

- \`foo_linux.go\` hanya dikompilasi untuk Linux.
- \`foo_windows.go\` hanya dikompilasi untuk Windows.
- \`foo_unix.go\` dikompilasi untuk platform Unix-like.

Cara ini masih didukung dan sering digunakan bersama \`//go:build\` untuk kejelasan.

## Ekspresi Boolean

\`//go:build\` mendukung ekspresi boolean:

\`\`\`go
//go:build linux && amd64
//go:build (linux || darwin) && !windows
\`\`\`

Gunakan tanda kurung untuk mengelompokkan ekspresi kompleks.`,
    },
    {
      id: 'sec-go-adv-04-js',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-04-js',
        filename: 'env-config.js',
        language: 'javascript',
        title: 'JavaScript: Environment-based Conditional Config',
        code: `const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
};

if (config.nodeEnv === 'production') {
  config.logLevel = 'warn';
} else {
  config.logLevel = 'debug';
}

module.exports = { config };`,
        explanation:
          'JavaScript tidak memiliki build constraint di level compiler. Kondisionalitas didasarkan pada environment variables saat runtime, berbeda dengan Go yang bisa memilih file saat compile time.',
      },
    },
    {
      id: 'sec-go-adv-04-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Cross Compilation dengan GOOS/GOARCH',
      content: `## Cross Compilation

Go mendukung cross compilation secara native melalui environment variables:

\`\`\`text
GOOS=windows GOARCH=amd64 go build -o app.exe
GOOS=linux GOARCH=arm64 go build -o app
\`\`\`

Target platform yang didukung bisa dilihat dengan \`go tool dist list\`.

## Build Tags Kustom

Selain tag platform, kita bisa membuat tag sendiri:

\`\`\`go
//go:build premium
\`\`\`

Kemudian aktifkan dengan:

\`\`\`text
go build -tags premium
\`\`\`

Tag kustom berguna untuk fitur opsional, mode debug, atau build enterprise vs community.

## Perbedaan Build Tag dan File Suffix

- Build tag lebih fleksibel karena mendukung ekspresi boolean.
- File suffix lebih ringkas untuk pemisahan platform.
- Keduanya bisa digunakan bersamaan.`,
    },
    {
      id: 'sec-go-adv-04-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-04-ts',
        filename: 'conditional-types.ts',
        language: 'typescript',
        title: 'TypeScript: Conditional Types sebagai Compile-time Branch',
        code: `type IsString<T> = T extends string ? true : false;

type PlatformConfig<T extends 'web' | 'node'> = T extends 'web'
  ? { browser: string }
  : { process: NodeJS.Process };

const webConfig: PlatformConfig<'web'> = { browser: 'Chrome' };

console.log(webConfig);`,
        explanation:
          'TypeScript conditional types memungkinkan branching di level tipe saat compile time. Ini analogi terdekat dengan build constraints, meskipun Go menggunakan pemilihan file dan TS menggunakan tipe.',
      },
    },
    {
      id: 'sec-go-adv-04-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Embedding, Reproducible Builds, dan Supply Chain Signing',
      content: `## go:embed

Directive \`//go:embed\` memungkinkan kita menyematkan file statis ke dalam binary:

\`\`\`go
import "embed"

//go:embed templates/*.html
var templates embed.FS
\`\`\`

Keuntungan:
- Binary menjadi self-contained.
- Tidak perlu membaca file system saat runtime.
- Deployment lebih sederhana karena tidak perlu menyalin aset terpisah.

## Reproducible Builds

**Reproducible build** adalah build yang menghasilkan binary bit-for-bit identik dari sumber yang sama. Faktor yang bisa mengganggu:
- Timestamp build.
- Path sumber yang berbeda.
- Versi toolchain yang berbeda.
- Dependency yang tidak terkunci.

Go mendukung reproducible builds melalui:
- \`-trimpath\` untuk menghapus path sumber dari binary.
- Penggunaan module proxy dan go.sum.
- Mengunci versi Go dengan \`toolchain\` di go.mod.

## Supply Chain Signing

Setelah build, binary bisa ditandatangani untuk memastikan integritas dan asal-usul:

- **Checksum**: SHA-256 dari binary dan modul.
- **GPG signature**: menandatangani checksum atau binary langsung.
- **SLSA/SBOM**: dokumentasi provenance dan daftar dependency.
- **Sigstore/cosign**: tanda tangan tanpa key management tradisional.

Di Go, kita juga bisa memverifikasi module dengan \`go mod verify\`.`,
    },
    {
      id: 'sec-go-adv-04-go',
      type: 'code-example',
      codeExample: {
        id: 'code-go-adv-04-go',
        filename: 'platform_reader.go',
        language: 'go',
        title: 'Go: Platform-specific Reader dan Embed',
        code: `//go:build linux || darwin

package main

import (
\t"fmt"
\t"io"
\t"os"
)

func readInput() ([]byte, error) {
\tfmt.Println("using posix reader")
\treturn io.ReadAll(os.Stdin)
}

// File: reader_windows.go
//go:build windows

package main

import (
\t"fmt"
\t"io"
\t"os"
)

func readInput() ([]byte, error) {
\tfmt.Println("using windows reader")
\treturn io.ReadAll(os.Stdin)
}

// File: main.go
//go:build ignore

package main

import (
\t"embed"
\t"fmt"
\t"log"
)

//go:embed version.txt
var version string

func main() {
\tfmt.Println("version:", version)
\tdata, err := readInput()
\tif err != nil {
\t\tlog.Fatal(err)
\t}
\tfmt.Printf("read %d bytes\\n", len(data))
}`,
        explanation:
          'reader_unix.go dan reader_windows.go menyediakan implementasi berbeda berdasarkan platform. //go:embed menyematkan version.txt ke variabel string, membuat binary self-contained.',
      },
    },
    {
      id: 'sec-go-adv-04-callout',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesalahan umum:** menulis `// go:build` dengan spasi sehingga tidak dikenali; lupa menyertakan file fallback untuk platform tanpa build tag; atau meng-embed file besar tanpa pertimbangan ukuran binary. Selalu verifikasi build dengan `go build -tags` dan `go tool dist list`. Untuk production, gunakan `-trimpath`, kunci toolchain, dan tandatangani binary dengan checksum/GPG/cosign.',
    },
  ],
}
