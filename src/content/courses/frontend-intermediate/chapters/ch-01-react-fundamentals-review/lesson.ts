import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-react-fundamentals-review',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'sec-01-basic-jsx',
      type: 'markdown',
      level: 'basic',
      title: 'JSX, Komponen, dan Props',
      content: `## Dari JSX ke React Element

JSX bukanlah HTML di dalam JavaScript. JSX adalah syntactic sugar yang dikompilasi menjadi pemanggilan fungsi seperti \`React.createElement\` atau \`_jsx\` dari transform modern. Hasilnya adalah objek JavaScript biasa yang disebut **React element**.

\`\`\`jsx
// JSX yang kita tulis
const element = <h1 className="title">Halo, React!</h1>

// Hasil kompilasi (sederhana)
const element = React.createElement('h1', { className: 'title' }, 'Halo, React!')
\`\`\`

React element memiliki struktur seperti:

- \`type\`: string tag HTML atau referensi komponen.
- \`props\`: objek properti termasuk \`children\`.
- \`key\`: nilai khusus untuk reconciliation.

## Komponen Fungsional

Komponen di React adalah fungsi yang menerima props dan mengembalikan elemen. Aturan penting:

1. Nama komponen harus diawali huruf besar.
2. Props bersifat read-only di dalam komponen.
3. Komponen tidak boleh memodifikasi props yang diterimanya.

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Selamat datang, {name}</h1>
}
\`\`\`

## Children sebagai Props

Elemen yang dibuka dengan tag penutup akan menerima children melalui props. Children bisa berupa teks, elemen, array elemen, atau fungsi.

\`\`\`jsx
<Card>
  <p>Ini konten children.</p>
</Card>

// Di dalam Card, props.children berisi elemen <p> di atas.
\`\`\``,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'ProfileCard.jsx',
        language: 'javascript',
        title: 'JavaScript: Komponen dengan Props dan Event Handler',
        code: `function ProfileCard({ user, onEdit }) {
  return (
    <article className="card">
      <img
        src={user.avatarUrl}
        alt={\`Foto profil \${user.name}\`}
        className="avatar"
      />
      <h2>{user.name}</h2>
      <p>{user.bio || 'Belum ada bio.'}</p>
      <button
        type="button"
        onClick={() => onEdit(user.id)}
        className="btn-primary"
      >
        Edit Profil
      </button>
    </article>
  )
}

function App() {
  const user = {
    id: 42,
    name: 'Rina',
    bio: 'Frontend engineer yang suka React.',
    avatarUrl: '/rina.png',
  }

  function handleEdit(id) {
    console.log('Edit user dengan id:', id)
  }

  return <ProfileCard user={user} onEdit={handleEdit} />
}

export default App`,
        explanation:
          'Komponen ProfileCard menerima objek user dan callback onEdit melalui props. Event handler di-pass sebagai fungsi, bukan sebagai hasil pemanggilan fungsi, agar tidak dieksekusi saat render.',
      },
    },
    {
      id: 'sec-01-intermediate-vdom',
      type: 'markdown',
      level: 'intermediate',
      title: 'Virtual DOM, Reconciliation, dan Key',
      content: `## Virtual DOM

Virtual DOM adalah representasi ringan dari UI dalam bentuk objek JavaScript. React menyimpan dua tree: tree sebelumnya (current) dan tree berikutnya (work-in-progress). Dengan membandingkan kedua tree, React dapat menentukan perubahan minimal yang perlu diterapkan ke DOM nyata.

## Proses Reconciliation

Reconciliation adalah algoritma yang digunakan React untuk membandingkan dua tree dan menemukan perbedaan. Beberapa prinsip utama:

1. **Elemen dengan tipe berbeda**: React menghancurkan subtree lama dan membuat yang baru.
2. **Elemen DOM dengan tipe sama**: React hanya memperbarui atribut yang berubah.
3. **Komponen dengan tipe sama**: React mempertahankan instance, memperbarui props, dan menjalankan lifecycle.

## Pentingnya Key

Ketika merender daftar, React membutuhkan \`key\` unik untuk mengidentifikasi elemen di antara render. Key yang stabil memungkinkan React:

- Menjaga state komponen saat urutan berubah.
- Menghindari re-render yang tidak perlu.
- Menangani penambahan, penghapusan, dan perpindahan item secara efisien.

\`\`\`jsx
<ul>
  {todos.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>
\`\`\`

Menggunakan indeks array sebagai key dapat menyebabkan bug tersembunyi jika urutan item berubah.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'TodoList.tsx',
        language: 'typescript',
        title: 'TypeScript: Daftar dengan Key Stabil dan Tipe Props',
        code: `interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
}

export function TodoList({ todos, onToggle }: TodoListProps) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={todo.completed ? 'completed' : ''}
        >
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            {todo.text}
          </label>
        </li>
      ))}
    </ul>
  )
}

// Penggunaan
const items: Todo[] = [
  { id: 'todo-1', text: 'Belajar reconciler', completed: false },
  { id: 'todo-2', text: 'Memahami fiber', completed: true },
]

<TodoList todos={items} onToggle={(id) => console.log(id)} />`,
        explanation:
          'Interface TodoListProps memastikan props todos dan onToggle memiliki tipe yang benar. Key menggunakan todo.id yang stabil, bukan indeks array, sehingga React dapat melacak perpindahan item dengan akurat.',
      },
    },
    {
      id: 'sec-01-advanced-fiber',
      type: 'markdown',
      level: 'advanced',
      title: 'Fiber Architecture dan Reconciler Internals',
      content: `## React Reconciler

React reconciler bertanggung jawab untuk menentukan perubahan apa yang perlu diterapkan ke DOM. Sejak React 16, reconciler baru bernama **Fiber** menggantikan stack-based reconciler. Fiber memodelkan setiap unit pekerjaan sebagai node linked-list yang memiliki:

- \`child\`: referensi ke child pertama.
- \`sibling\`: referensi ke sibling berikutnya.
- \`return\`: referensi ke parent.
- \`alternate\`: referensi ke fiber pada tree lawan (current vs work-in-progress).

Struktur ini memungkinkan React untuk:

1. **Menjeda dan melanjutkan pekerjaan**: rendering dapat diinterupsi untuk menangani input pengguna.
2. **Prioritaskan update**: update dapat dibagi menjadi kategori seperti synchronous, interactive, atau deferred.
3. **Menggunakan double buffering**: ada dua tree fiber yang saling berlomba, current dan work-in-progress.

## Render Phase vs Commit Phase

React membagi kerja menjadi dua fase besar:

- **Render phase**: fase dimana React membangun tree baru, membandingkan dengan current, dan menghasilkan daftar efek. Fase ini bersifat side-effect-free dan dapat dijeda.
- **Commit phase**: fase dimana React menerapkan perubahan ke DOM dan menjalankan efek seperti useLayoutEffect dan useEffect. Fase ini bersifat synchronous dan tidak dapat diinterupsi.

## Diffing Algorithm

Algoritma diffing React mengasumsikan bahwa:

1. Dua elemen dengan tipe berbeda menghasilkan tree yang berbeda.
2. Key dapat memberi petunjuk kepada React elemen mana yang stabil di antara anak-anak.

Ketika key berubah, React menganggap elemen lama telah dihapus dan elemen baru dibuat. Itulah sebabnya key harus stabil dan tidak boleh dibuat dari indeks array atau nilai acak.`,
    },
    {
      id: 'sec-01-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-advanced',
        filename: 'TodoList.tsx',
        language: 'typescript',
        title: 'React: Key Stabil dan Reconciliation pada Daftar',
        code: `type Todo = { id: string; label: string }

function TodoItem({ todo }: { todo: Todo }) {
  const [done, setDone] = useState(false)
  return (
    <li>
      <label>
        <input type="checkbox" checked={done} onChange={() => setDone(!done)} />
        {todo.label}
      </label>
    </li>
  )
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

// Key stabil (todo.id) mempertahankan state checkbox saat urutan berubah.
// Tanpa key atau key dari index, React bisa salah mengasosiasikan fiber
// dan state TodoItem tertukar antar item.`,
        explanation:
          'Contoh ini menunjukkan mengapa key harus stabil dan unik. React reconciler menggunakan key untuk mencocokkan elemen lama dengan elemen baru; key dari index atau nilai acak dapat menyebabkan state komponen anak tertukar atau hilang.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Key insight:** Jangan pernah mengabaikan aturan key di daftar React. Key yang salah tidak hanya memicu re-render berlebihan, tetapi juga dapat menyebabkan state komponen tertukar atau hilang karena reconciler salah mengasosiasikan fiber lama dengan fiber baru.',
    },
  ],
}
