import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-database-integration',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-01-basic-db-integration',
      type: 'markdown',
      level: 'basic',
      title: 'ORM, Query Builder, dan Raw SQL',
      content: `## Cara Berkomunikasi dengan Database

Aplikasi backend hampir selalu perlu menyimpan data. Ada tiga pendekatan utama untuk berbicara dengan relational database:

1. **Raw SQL**: menulis query \`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\` secara manual. Memberikan kontrol penuh tetapi membutuhkan disiplin untuk menghindari SQL injection dan duplikasi kode.
2. **Query Builder**: menyusun query secara terprogram (contoh: Knex, Kysely). Lebih terstruktur daripada raw SQL tetapi masih memperlihatkan struktur query.
3. **ORM (Object-Relational Mapping)**: memetakan tabel ke class/object (contoh: Prisma, TypeORM, Sequelize). Produktivitas tinggi untuk CRUD, namun sering menyembunyikan query yang kompleks.

## Repository Pattern

Repository pattern memisahkan logika akses data dari logika bisnis. Domain layer hanya mengenal interface repository, sedangkan implementasi detailnya berada di infrastructure layer. Keuntungannya:

- Mudah mengganti database atau library tanpa mengubah kode bisnis.
- Lebih mudah diuji karena repository dapat di-mock.
- Konsistensi cara membaca dan menulis data.

## Transaksi, Migrasi, dan Seeding

- **Transaksi**: sekumpulan query yang diperlakukan sebagai satu unit kerja. Jika satu gagal, semua dibatalkan (rollback).
- **Migrasi**: perubahan schema yang terversioning sehingga environment development, staging, dan production selalu sinkron.
- **Seeding**: memasukkan data awal yang diperlukan untuk development atau demo.`,
    },
    {
      id: 'sec-01-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'user-repository.js',
        language: 'javascript',
        title: 'JavaScript: Raw SQL Repository dengan pg',
        code: `const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
})

async function createUser(email, name) {
  const result = await pool.query(
    'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name',
    [email, name]
  )
  return result.rows[0]
}

async function getUserById(id) {
  const result = await pool.query(
    'SELECT id, email, name FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

async function transferBalance(fromId, toId, amount) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, fromId])
    await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, toId])
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

module.exports = { createUser, getUserById, transferBalance }`,
        explanation:
          'Driver pg menggunakan parameterized query ($1, $2) untuk mencegah SQL injection. Transaksi memastikan kedua update balance berhasil atau gagal bersamaan.',
      },
    },
    {
      id: 'sec-01-intermediate-db-patterns',
      type: 'markdown',
      level: 'intermediate',
      title: 'Transaksi ACID, Migrasi, dan Connection Pool',
      content: `## ACID di Dalam Transaksi

- **Atomicity**: semua perubahan dalam transaksi diterapkan seluruhnya atau tidak sama sekali.
- **Consistency**: database berpindah dari satu state valid ke state valid berikutnya.
- **Isolation**: transaksi yang berjalan bersamaan tidak saling mengganggu sesuai level isolasi yang dipilih.
- **Durability**: setelah commit, data bertahan meski server crash.

## Level Isolasi

Database menawarkan beberapa level isolasi yang merupakan trade-off antara konsistensi dan performa:

- **Read Uncommitted**: transaksi bisa membaca data yang belum di-commit oleh transaksi lain.
- **Read Committed**: hanya membaca data yang sudah di-commit.
- **Repeatable Read**: membaca yang sama berkali-kali dalam satu transaksi menghasilkan hasil sama.
- **Serializable**: isolasi paling kuat, seolah-olah transaksi berjalan secara serial.

## Migrasi yang Aman

- Setiap perubahan schema disimpan sebagai file versioned.
- Jalankan migrasi di transaction jika memungkinkan agar bisa rollback otomatis.
- Uji migrasi di staging dengan data yang mirip production.
- Hindari migrasi yang memerlukan exclusive lock lama selama jam sibuk.

## Mengukur Ukuran Connection Pool

Ukuran pool tidak boleh terlalu kecil (request mengantre) atau terlalu besar (database kelebihan beban). Aturan praktis:

- \`max_connections\` database dikurangi koneksi untuk maintenance/admin.
- Bagi sisa koneksi dengan jumlah instance aplikasi.
- Pertimbangkan beban puncak dan durasi query.`,
    },
    {
      id: 'sec-01-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'user-repository.ts',
        language: 'typescript',
        title: 'TypeScript: Repository Bertipe dengan Transaksi',
        code: `import type { Pool, PoolClient } from 'pg'

interface User {
  id: number
  email: string
  name: string
}

interface Repository<T> {
  findById(id: number): Promise<T | undefined>
  create(data: Omit<T, 'id'>): Promise<T>
}

class UserRepository implements Repository<User> {
  constructor(private pool: Pool) {}

  async findById(id: number): Promise<User | undefined> {
    const result = await this.pool.query<User>(
      'SELECT id, email, name FROM users WHERE id = $1',
      [id]
    )
    return result.rows[0]
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const result = await this.pool.query<User>(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name',
      [data.email, data.name]
    )
    return result.rows[0]
  }
}

class TransactionManager {
  constructor(private pool: Pool) {}

  async run<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      const result = await work(client)
      await client.query('COMMIT')
      return result
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }
}

export { UserRepository, TransactionManager }
export type { User }`,
        explanation:
          'Interface Repository<T> membuat kode bisnis bergantung pada kontrak, bukan implementasi pg. TransactionManager menangani commit/rollback secara konsisten.',
      },
    },
    {
      id: 'sec-01-advanced-db-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'Connection Pool, Prepared Statements, dan Query Optimization',
      content: `## Bagaimana Connection Pool Bekerja

Connection pool menyimpan sekumpulan koneksi TCP yang sudah diautentikasi ke database. Alur penggunaannya:

1. Aplikasi meminta koneksi dari pool.
2. Jika ada koneksi idle, pool memberikannya segera.
3. Jika semua koneksi sibuk, request masuk ke antrean (atau timeout).
4. Setelah query selesai, koneksi dikembalikan ke pool, bukan ditutup.

Parameter penting:

- **max**: jumlah koneksi maksimum. Biasanya 10–30 per instance.
- **min**: jumlah koneksi idle minimum.
- **idleTimeoutMillis**: berapa lama koneksi idle dipertahankan.
- **acquireTimeoutMillis**: batas tunggu saat meminjam koneksi.

## Prepared Statement Cache

Driver seperti pg dapat menyimpan parsed query plan di server melalui prepared statements. Query yang sama dengan parameter berbeda dapat dieksekusi lebih cepat karena planner tidak perlu dijalankan ulang. Namun, terlalu banyak prepared statement dapat memboroskan memory.

## Query Optimization Dasar

- Gunakan \`EXPLAIN\` dan \`EXPLAIN ANALYZE\` untuk melihat execution plan.
- Hindari \`SELECT *\` jika hanya beberapa kolom yang dibutuhkan.
- Pastikan kolom yang sering difilter atau di-join memiliki indeks.
- Waspadai **N+1 query**: satu query induk diikuti N query anak. Selesaikan dengan JOIN atau eager loading.

## Database per Service

Pada arsitektur microservice, setiap service memiliki database sendiri. Integrasi antar service dilakukan melalui API atau event, bukan query langsung ke database orang lain. Pola ini meningkatkan autonomy tetapi menambah kompleksitas konsistensi data.`,
    },
    {
      id: 'sec-01-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: sqlx Repository dengan Context',
        code: `package main

import (
	"context"
	"fmt"
	"log"
	"time"

	_ "github.com/lib/pq"
	"github.com/jmoiron/sqlx"
)

type User struct {
	ID    int    \`db:"id"\`
	Email string \`db:"email"\`
	Name  string \`db:"name"\`
}

type UserRepository struct {
	db *sqlx.DB
}

func (r *UserRepository) FindByID(ctx context.Context, id int) (*User, error) {
	var user User
	err := r.db.GetContext(ctx, &user, "SELECT id, email, name FROM users WHERE id = $1", id)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func main() {
	db, err := sqlx.Connect("postgres", "host=localhost user=dev dbname=belajar sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(10)
	db.SetConnMaxLifetime(30 * time.Minute)

	repo := &UserRepository{db: db}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	user, err := repo.FindByID(ctx, 1)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\\n", user)
}`,
        explanation:
          'sqlx mempermudah scanning row ke struct dengan tag db. SetMaxOpenConns, SetMaxIdleConns, dan SetConnMaxLifetime mengontrol connection pool secara eksplisit. Context memastikan query tidak berjalan selamanya.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Pilih abstraksi database sesuai kebutuhan. ORM untuk kecepatan prototyping, query builder/raw SQL untuk kontrol query, dan repository pattern untuk keberlanjutan. Selalu pantau connection pool, transaksi, dan execution plan agar aplikasi tetap responsif.',
    },
  ],
}
