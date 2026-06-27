import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-database-access',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-07-basic-database-sql',
      type: 'markdown',
      level: 'basic',
      title: 'database/sql Dasar',
      content: `## Membuka Koneksi

Package "database/sql" menyediakan abstraction untuk database relational. Untuk menggunakannya, kita perlu mengimpor driver database tertentu, seperti "_ "github.com/lib/pq"" untuk PostgreSQL atau "_ "github.com/mattn/go-sqlite3"" untuk SQLite.

\`\`\`go
db, err := sql.Open("postgres", dsn)
if err != nil {
  log.Fatal(err)
}
defer db.Close()
\`\`\`

"sql.Open" hanya memvalidasi argument, tidak benar-benar membuat koneksi. Koneksi pertama dibuat saat query pertama dijalankan. Gunakan "db.Ping()" untuk memverifikasi koneksi.

## Query, QueryRow, dan Exec

- **Query**: untuk perintah SELECT yang mengembalikan banyak baris.
- **QueryRow**: untuk perintah SELECT yang menghasilkan satu baris.
- **Exec**: untuk INSERT, UPDATE, DELETE, atau DDL.

\`\`\`go
rows, err := db.Query("SELECT id, name FROM users")
row := db.QueryRow("SELECT name FROM users WHERE id = $1", id)
res, err := db.Exec("INSERT INTO users(name) VALUES ($1)", name)
\`\`\`

Selalu tutup "Rows" dengan "defer rows.Close()" untuk mengembalikan koneksi ke pool.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'in-memory-store.js',
        language: 'javascript',
        code: `class UserStore {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  create(name) {
    const id = this.nextId++;
    this.users.set(id, { id, name });
    return { id, name };
  }

  findById(id) {
    return this.users.get(id) || null;
  }

  list() {
    return Array.from(this.users.values());
  }
}

const store = new UserStore();
store.create('Budi');
console.log(store.list());`,
        title: 'JavaScript: In-Memory Store Sederhana',
        explanation:
          'In-memory store ini mensimulasikan repository. Di aplikasi nyata, store diganti dengan akses database melalui database/sql.',
      },
    },
    {
      id: 'sec-07-intermediate-pool-transactions',
      type: 'markdown',
      level: 'intermediate',
      title: 'Connection Pool dan Transaksi',
      content: `## Connection Pool

"sql.DB" sebenarnya adalah pool koneksi. Go mengelola beberapa koneksi secara otomatis dan meminjamkannya saat dibutuhkan. Konfigurasi pool penting untuk performa:

\`\`\`go
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(25)
db.SetConnMaxLifetime(5 * time.Minute)
db.SetConnMaxIdleTime(1 * time.Minute)
\`\`\`

- **MaxOpenConns**: batas koneksi terbuka ke database.
- **MaxIdleConns**: batas koneksi yang tetap terbuka tapi tidak dipakai.
- **ConnMaxLifetime**: batas umur koneksi sebelum ditutup dan diganti.
- **ConnMaxIdleTime**: batas waktu koneksi idle sebelum ditutup.

## Prepared Statements

"Prepare" membuat query yang sudah dikompilasi di database, meningkatkan performa untuk query yang dijalankan berulang kali.

\`\`\`go
stmt, err := db.Prepare("INSERT INTO users(name) VALUES ($1)")
defer stmt.Close()
res, err := stmt.Exec(name)
\`\`\`

## Transaksi

Transaksi menggunakan "sql.Tx". Semua operasi dalam satu tx bersifat atomic.

\`\`\`go
tx, err := db.Begin()
if err != nil {
  return err
}
defer tx.Rollback()

_, err = tx.Exec("INSERT INTO accounts(user_id, balance) VALUES ($1, $2)", userID, 100)
if err != nil {
  return err
}

if err := tx.Commit(); err != nil {
  return err
}
\`\`\`

Pola "defer tx.Rollback()" memastikan transaksi dibatalkan jika ada error sebelum commit.`,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'repository-interface.ts',
        language: 'typescript',
        title: 'TypeScript: Repository Interface',
        code: `interface User {
  id: number;
  name: string;
  email: string;
}

interface UserRepository {
  create(user: Omit<User, 'id'>): Promise<User>;
  findById(id: number): Promise<User | null>;
  list(): Promise<User[]>;
  update(id: number, user: Partial<User>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
}

class InMemoryUserRepository implements UserRepository {
  private users = new Map<number, User>();
  private nextId = 1;

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { ...user, id: this.nextId++ };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async findById(id: number): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async list(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    const existing = this.users.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...user };
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    return this.users.delete(id);
  }
}`,
        explanation:
          'Repository interface mendefinisikan kontrak akses data. Implementasi bisa diganti dari in-memory ke database nyata tanpa mengubah kode bisnis.',
      },
    },
    {
      id: 'sec-07-advanced-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Repository Pattern, Context-Aware Queries, dan Internals',
      content: `## Repository Pattern

Repository pattern memisahkan logika akses data dari logika bisnis. Di Go, biasanya didefinisikan sebagai interface:

\`\`\`go
type UserRepository interface {
  Create(ctx context.Context, u *User) error
  GetByID(ctx context.Context, id int64) (*User, error)
  List(ctx context.Context) ([]User, error)
}
\`\`\`

Interface memudahkan testing dengan mock dan mengganti implementasi database.

## Context-Aware Queries

Metode "QueryContext", "ExecContext", dan "BeginTx" menerima context. Jika context dibatalkan, operasi database ikut dibatalkan. Ini penting untuk graceful shutdown dan timeout request.

\`\`\`go
row := db.QueryRowContext(ctx, "SELECT name FROM users WHERE id = $1", id)
\`\`\`

## Graceful Connection Handling

Jika database sementara tidak tersedia, program harus menangani error dengan baik. Jangan memanggil "log.Fatal" saat inisialisasi database gagal di production; sebaiknya kembalikan error dan biarkan caller memutuskan. Selalu panggil "db.Ping()" dan monitor kesehatan koneksi.

## Internals database/sql

Di balik layar, database/sql mengelola queue request dan pool koneksi. Ketika goroutine membutuhkan koneksi:

1. Cek koneksi idle yang tersedia.
2. Jika tidak ada dan belum mencapai MaxOpenConns, buat koneksi baru.
3. Jika sudah mencapai batas, goroutine menunggu sampai koneksi dikembalikan.

Setiap koneksi memiliki siklus hidup dan dapat ditutup ketika melebihi ConnMaxLifetime. Driver mengimplementasikan interface driver.Conn yang dipanggil oleh database/sql. Memahami mekanisme ini membantu mendiagnosis masalah seperti connection leak atau pool exhaustion.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'user_repository.go',
        language: 'go',
        title: 'Go: Repository Pattern dengan database/sql',
        code: `package main

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	ID        int64
	Name      string
	Email     string
	CreatedAt time.Time
}

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(ctx context.Context, u *User) error {
	res, err := r.db.ExecContext(ctx,
		"INSERT INTO users(name, email, created_at) VALUES (?, ?, ?)",
		u.Name, u.Email, u.CreatedAt)
	if err != nil {
		return err
	}
	u.ID, _ = res.LastInsertId()
	return nil
}

func (r *UserRepository) GetByID(ctx context.Context, id int64) (*User, error) {
	row := r.db.QueryRowContext(ctx,
		"SELECT id, name, email, created_at FROM users WHERE id = ?", id)
	u := &User{}
	err := row.Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("user not found")
	}
	return u, err
}

func main() {
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	db.Exec(\`CREATE TABLE users (
		id INTEGER PRIMARY KEY,
		name TEXT,
		email TEXT,
		created_at DATETIME
	)\`)

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)

	repo := NewUserRepository(db)
	ctx := context.Background()
	u := &User{Name: "Budi", Email: "budi@example.com", CreatedAt: time.Now()}
	if err := repo.Create(ctx, u); err != nil {
		panic(err)
	}

	found, err := repo.GetByID(ctx, u.ID)
	if err != nil {
		panic(err)
	}
	fmt.Printf("found user: %+v\\n", found)
}`,
        explanation:
          'Repository menyembunyikan detail query SQL. Method-method menerima context untuk mendukung cancellation. Connection pool dikonfigurasi untuk membatasi koneksi aktif.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Ringkasan:** database/sql adalah abstraction standar untuk database relational di Go. sql.DB adalah connection pool yang dapat dikonfigurasi. Gunakan Query, QueryRow, dan Exec sesuai kebutuhan, dan selalu gunakan versi Context-aware untuk mendukung timeout dan cancellation. Transaksi dengan sql.Tx menjamin atomicitas. Repository pattern memisahkan akses data dari logika bisnis dan memudahkan testing.',
    },
  ],
}
