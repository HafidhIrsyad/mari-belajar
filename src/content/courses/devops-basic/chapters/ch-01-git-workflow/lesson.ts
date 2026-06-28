import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-git-workflow',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-01-basic-git-areas',
      type: 'markdown',
      level: 'basic',
      title: 'Tiga Area Kerja Git',
      content: `## Version Control dan Git

Version control system (VCS) mencatat setiap perubahan pada file sehingga tim dapat berkolaborasi, mengembalikan versi lama, dan melacak siapa yang mengubah apa. Git adalah distributed VCS: setiap kontributor memiliki salinan repository lengkap beserta history.

## Tiga Area Utama

Setiap perubahan di Git melewati tiga area:

1. **Working directory**: salinan file yang sedang Anda edit di filesystem.
2. **Staging area (index)**: daftar perubahan yang akan dimasukkan ke commit berikutnya.
3. **Repository (.git)**: database yang menyimpan snapshot commit secara permanen.

## Perintah Dasar

- \`git init\`: membuat repository baru.
- \`git clone <url>\`: menyalin repository remote ke lokal.
- \`git status\`: melihat status working directory dan staging area.
- \`git add <file>\`: memindahkan perubahan dari working directory ke staging area.
- \`git commit -m "pesan"\`: menyimpan snapshot staging area sebagai commit.
- \`git push\`: mengirim commit lokal ke remote.
- \`git pull\`: mengambil dan menggabungkan perubahan dari remote.
- \`git log\`: menampilkan history commit.

## Branching Dasar

- \`git branch <nama>\`: membuat branch baru.
- \`git checkout <nama>\` atau \`git switch <nama>\`: berpindah branch.
- \`git merge <nama>\`: menggabungkan branch target ke branch aktif.

Branch memungkinkan pengembangan fitur atau perbaikan bug tanpa mengganggu branch utama.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'git-areas.js',
        language: 'javascript',
        title: 'JavaScript: Simulasi Tiga Area Kerja Git',
        code: `const workingDirectory = new Map()
const stagingArea = new Map()
const repository = []

function editFile(name, content) {
  workingDirectory.set(name, content)
  console.log(\`\${name} dimodifikasi di working directory\`)
}

function stageFile(name) {
  if (!workingDirectory.has(name)) {
    throw new Error(\`\${name} tidak ditemukan di working directory\`)
  }
  stagingArea.set(name, workingDirectory.get(name))
  console.log(\`\${name} ditambahkan ke staging area\`)
}

function commit(message) {
  if (stagingArea.size === 0) {
    throw new Error('Tidak ada perubahan yang di-staging')
  }
  const snapshot = Object.fromEntries(stagingArea)
  repository.push({ message, snapshot, committedAt: new Date().toISOString() })
  stagingArea.clear()
  console.log(\`Commit dibuat: \${message}\`)
}

editFile('README.md', '# DevOps Basic')
editFile('package.json', '{"name":"devops-basic"}')
stageFile('README.md')
stageFile('package.json')
commit('feat: initial project setup')

console.log('Total commit:', repository.length)`,
        explanation:
          'Simulasi ini meniru siklus edit → stage → commit. Working directory menyimpan perubahan terbaru, staging area menyiapkan snapshot, dan repository menyimpan commit beserta metadata waktu serta pesan.',
      },
    },
    {
      id: 'sec-01-intermediate-branching',
      type: 'markdown',
      level: 'intermediate',
      title: 'Branching Model, Merge, dan Rebase',
      content: `## Branching Strategy

Tim biasanya memilih salah satu model berikut:

- **Git Flow**: \`main\`, \`develop\`, \`feature/*\`, \`release/*\`, \`hotfix/*\`. Cocok untuk release berkala.
- **GitHub Flow**: hanya \`main\` dan \`feature/*\`, pull request kemudian merge. Sederhana dan cocok untuk continuous deployment.
- **GitLab Flow**: menambahkan \`environment/*\` seperti \`staging\` dan \`production\` untuk alur deploy.

Pilihan model bergantung pada frekuensi release, ukuran tim, dan kebutuhan rollback.

## Merge vs Rebase

**Merge** membuat commit penggabungan yang menyatukan dua branch. Keuntungannya adalah history asli tetap terjaga. Kerugiannya: history bisa terlihat bercabang dan rumit.

**Rebase** menulis ulang commit dari branch fitur agar dibangun di atas commit terbaru target branch. Hasilnya history linear. Risikonya: mengubah history bersama dapat membingungkan tim jika commit sudah di-push.

## Fast-Forward Merge

Jika target branch tidak memiliki perubahan baru sejak branch fitur dibuat, Git dapat melakukan fast-forward: pointer branch target maju ke commit fitur tanpa membuat merge commit.

## Interactive Rebase

\`git rebase -i HEAD~N\` membuka editor untuk menyusun ulang N commit terakhir. Anda dapat:

- **pick**: mempertahankan commit.
- **reword**: mengubah pesan commit.
- **squash**: menggabungkan commit dengan commit sebelumnya.
- **drop**: menghapus commit.
- **fixup**: menggabungkan tanpa menyimpan pesan commit.

## Pull Request / Merge Request

Pull request adalah mekanisme kolaborasi untuk mereview kode, menjalankan CI, dan mendiskusikan perubahan sebelum merge. PR harus kecil, fokus, dan dilengkapi deskripsi serta tes.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'git-graph.ts',
        language: 'typescript',
        title: 'TypeScript: Traversal Graph Commit Sederhana',
        code: `interface CommitNode {
  id: string
  message: string
  parents: string[]
  author: string
}

class CommitGraph {
  private commits = new Map<string, CommitNode>()

  addCommit(node: CommitNode): void {
    this.commits.set(node.id, node)
  }

  *ancestors(commitId: string, visited = new Set<string>()): Generator<CommitNode> {
    const node = this.commits.get(commitId)
    if (!node || visited.has(commitId)) return
    visited.add(commitId)
    yield node
    for (const parentId of node.parents) {
      yield* this.ancestors(parentId, visited)
    }
  }

  findMergeBase(branchA: string, branchB: string): CommitNode | undefined {
    const ancestorsA = new Set<string>()
    for (const node of this.ancestors(branchA)) {
      ancestorsA.add(node.id)
    }
    for (const node of this.ancestors(branchB)) {
      if (ancestorsA.has(node.id)) return node
    }
    return undefined
  }
}

const graph = new CommitGraph()
graph.addCommit({ id: 'a1', message: 'init', parents: [], author: 'deva' })
graph.addCommit({ id: 'b2', message: 'feat: auth', parents: ['a1'], author: 'devb' })
graph.addCommit({ id: 'c3', message: 'fix: validation', parents: ['a1'], author: 'devc' })
graph.addCommit({ id: 'd4', message: 'merge auth+validation', parents: ['b2', 'c3'], author: 'deva' })

const mergeBase = graph.findMergeBase('b2', 'c3')
console.log('Merge base:', mergeBase?.message)`,
        explanation:
          'Commit graph di Git adalah DAG. Fungsi findMergeBase menemukan ancestor bersama terdekat, konsep yang sama digunakan Git untuk menentukan common ancestor sebelum melakukan three-way merge.',
      },
    },
    {
      id: 'sec-01-advanced-git-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Internalitas Git: Object Database dan Packfile',
      content: `## Content-Addressable Storage

Git menyimpan semua data di direktori \`.git/objects\`. Setiap object diidentifikasi oleh SHA-1 hash dari isinya. Terdapat empat tipe object utama:

1. **Blob**: menyimpan konten file tanpa metadata nama atau mode.
2. **Tree**: menyimpan daftar blob dan subtree beserta nama file serta mode permission.
3. **Commit**: menyimpan referensi ke tree root, parent commit, author, committer, dan pesan.
4. **Tag**: menyimpan referensi ke commit dengan nama tag dan pesan.

Setiap object diserialisasi dengan header \`<tipe> <ukuran>\\0<konten>\`. Hash SHA-1 dihitung dari serialisasi tersebut. Inilah sebabnya mengapa file yang identik di banyak commit hanya disimpan sekali.

## Ref dan HEAD

- **Ref**: file teks sederhana di \`.git/refs\` yang berisi hash commit. Contoh: \`.git/refs/heads/main\`.
- **HEAD**: ref simbolis yang menunjuk ke ref branch aktif, misalnya \`ref: refs/heads/main\`.
- **Detached HEAD**: ketika HEAD menunjuk langsung ke commit, bukan ke branch.

## Reflog

\`.git/logs/HEAD\` dan \`.git/logs/refs/heads/<branch>\` mencatat setiap perubahan ref. Reflog menyelamatkan commit yang "hilang" setelah rebase atau reset keras, asalkan garbage collection belum berjalan.

## Packfile dan Delta Compression

Setelah banyak commit, object database menjadi besar. \`git gc\` mengompresi object yang tidak direferensikan menjadi packfile. Packfile menyimpan object basis secara utuh dan object lain sebagai delta (perbedaan) dari object lain yang mirip. Delta compression menghemat ruang penyimpanan secara signifikan.

## Merge Strategies

Git mendukung beberapa strategi merge:

- **recursive**: default, menangani merge dengan beberapa common ancestor.
- **resolve**: hanya untuk satu common ancestor.
- **octopus**: menggabungkan lebih dari dua branch sekaligus.
- **ours/theirs**: menjaga tree satu sisi dan mengabaikan perubahan sisi lain.

## Plumbing vs Porcelain

Perintah seperti \`git commit\` dan \`git log\` disebut porcelain (antarmuka tingkat tinggi). Perintah seperti \`git cat-file\`, \`git hash-object\`, \`git update-ref\`, dan \`git write-tree\` disebut plumbing (primitif object database). Memahami plumbing membantu troubleshooting history yang rusak.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'git-hash.go',
        language: 'go',
        title: 'Go: Menghitung Git-Style SHA-1 Object Hash',
        code: `package main

import (
	"crypto/sha1"
	"fmt"
	"io"
)

func gitHashObject(objectType string, content []byte) string {
	header := fmt.Sprintf("%s %d\\x00", objectType, len(content))
	h := sha1.New()
	io.WriteString(h, header)
	h.Write(content)
	return fmt.Sprintf("%x", h.Sum(nil))
}

func main() {
	blobContent := []byte("hello devops\\n")
	blobHash := gitHashObject("blob", blobContent)
	fmt.Println("blob hash:", blobHash)

	commitContent := []byte("tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904\\n" +
		"author Dev <dev@example.com> 1710000000 +0700\\n" +
		"committer Dev <dev@example.com> 1710000000 +0700\\n\\n" +
		"initial commit\\n")
	commitHash := gitHashObject("commit", commitContent)
	fmt.Println("commit hash:", commitHash)
}`,
        explanation:
          'Git tidak menghitung hash dari konten file saja, melainkan dari header "tipe ukuran\\0" diikuti konten. Program Go ini mereplika perhitungan SHA-1 yang sama dengan perintah git hash-object.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Git lebih dari sekadar alat commit. Memahami tiga area kerja, model branching, merge/rebase, dan internalitas object database memungkinkan tim mengelola history yang bersih, melakukan troubleshooting, serta mengoptimalkan kolaborasi dalam pipeline DevOps.',
    },
  ],
}
