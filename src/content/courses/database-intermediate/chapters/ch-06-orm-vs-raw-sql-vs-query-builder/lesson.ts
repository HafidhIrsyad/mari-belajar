import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: "lesson-ch-06-orm-vs-raw-sql-vs-query-builder",
  estimatedMinutes: 55,
  sections: [
    {
      id: "sec-06-$1",
      type: 'markdown',
      level: 'basic',
      title: "Pengantar ORM vs Raw SQL vs Query Builder",
      content: `## ORM (Object-Relational Mapping)

ORM memetakan table database ke class/object di kode aplikasi. Contoh: TypeORM, Prisma, Sequelize, GORM, Hibernate.

Kelebihan:

- Produktivitas tinggi: CRUD dan relasi otomatis.
- Type safety dan autocompletion.
- Migrasi dan model terpusat.

Kekurangan:

- Query yang dihasilkan terkadang tidak optimal.
- Risiko N+1 query.
- Abstraction leak saat query kompleks.

## Raw SQL

Raw SQL menulis query langsung sebagai string. Kelebihan:

- Kontrol penuh atas query dan execution plan.
- Mudah mengoptimalkan query spesifik.

Kekurangan:

- Lebih rentan terhadap typo dan SQL injection jika tidak parameterized.
- Maintenance lebih sulit saat skema berubah.

## Query Builder

Query builder seperti Knex.js atau sqlc menyediakan API fluent untuk membangun SQL. Memberikan keseimbangan antara keamanan, type safety, dan kontrol.`,
    },
    {
      id: "sec-06-$1",
      type: 'code-example',
      codeExample: {
        id: "code-06-js",
        filename: "n-plus-one.js",
        language: 'javascript',
        title: "JavaScript: Demonstrasi N+1 Problem",
        code: "// Simulasi ORM-like loop yang memicu N+1\nasync function getUsersWithOrdersNPlus1(userRepo, orderRepo) {\n  const users = await userRepo.findAll() // 1 query\n  for (const user of users) {\n    user.orders = await orderRepo.findByUserId(user.id) // N query\n  }\n  return users\n}\n\n// Solusi dengan single JOIN\nasync function getUsersWithOrdersOptimized(db) {\n  return db.query(`\n    SELECT u.id, u.name, o.id AS order_id, o.total\n    FROM users u\n    LEFT JOIN orders o ON o.user_id = u.id\n  `)\n}",
        explanation: "Loop yang memicu query per object menghasilkan N+1 query. Solusinya adalah JOIN atau eager loading.",
      },
    },
    {
      id: "sec-06-$1",
      type: 'markdown',
      level: 'intermediate',
      title: "Konsep Menengah ORM vs Raw SQL vs Query Builder",
      content: `## Eager Loading dan Batch Loading

ORM menyediakan eager loading untuk menghindari N+1:

\`const users = await prisma.user.findMany({ include: { orders: true } })\`

Di balik layar, Prisma dapat menggunakan JOIN atau query terpisah dengan \`IN\` clause (batched loading).

## Lazy Loading

Lazy loading memuat relasi hanya saat diakses. Ini nyaman tetapi berisiko N+1 jika tidak hati-hati. Di production, lazy loading sering dinonaktifkan atau diberi warning.

## Query Builder

Contoh Knex:

\`knex.select('*').from('users').leftJoin('orders', 'users.id', 'orders.user_id')\`

Query builder memungkinkan komposisi query dinamis tanpa kehilangan kontrol. Namun tetap perlu memahami SQL yang dihasilkan.

## Parameterized Queries

Baik ORM, query builder, maupun raw SQL modern harus menggunakan parameterized queries untuk mencegah SQL injection. Contoh raw SQL yang aman:

\`db.query('SELECT * FROM users WHERE id = $1', [userId])\``,
    },
    {
      id: "sec-06-$1",
      type: 'code-example',
      codeExample: {
        id: "code-06-ts",
        filename: "orm-typed.ts",
        language: 'typescript',
        title: "TypeScript: Typed Query Builder Pattern",
        code: "type User = { id: number; name: string }\ntype Order = { id: number; userId: number; total: number }\n\ninterface QueryBuilder<T> {\n  select<K extends keyof T>(...cols: K[]): QueryBuilder<Pick<T, K>>\n  where(column: keyof T, op: string, value: unknown): this\n  join<U>(other: string, on: string): QueryBuilder<T & U>\n  toSQL(): { text: string; params: unknown[] }\n}\n\nfunction createQueryBuilder<T>(table: string): QueryBuilder<T> {\n  const state = {\n    table,\n    selects: [] as string[],\n    wheres: [] as string[],\n    params: [] as unknown[],\n  }\n  return {\n    select(...cols) {\n      state.selects.push(...(cols as string[]))\n      return this as QueryBuilder<Pick<T, typeof cols[number]>>\n    },\n    where(column, op, value) {\n      state.wheres.push(`${String(column)} ${op} $${state.params.length + 1}`)\n      state.params.push(value)\n      return this\n    },\n    join() { return this }\n    toSQL() {\n      return {\n        text: `SELECT ${state.selects.join(\", \")} FROM ${state.table} ${state.wheres.length ? \"WHERE \" + state.wheres.join(\" AND \") : \"\"}`,\n        params: state.params,\n      }\n    },\n  }\n}\n\nconst qb = createQueryBuilder<User>(\"users\")\nconsole.log(qb.select(\"id\", \"name\").where(\"id\", \"=\", 5).toSQL())",
        explanation: "Query builder bertipe memberikan autocompletion sambil tetap menghasilkan parameterized SQL.",
      },
    },
    {
      id: "sec-06-$1",
      type: 'markdown',
      level: 'advanced',
      title: "Internal Lanjutan ORM vs Raw SQL vs Query Builder",
      content: `## Internal ORM: Unit of Work dan Identity Map

ORM seperti Hibernate/Entity Framework mengimplementasikan **Unit of Work** dan **Identity Map**:

- **Unit of Work**: melacak perubahan object selama transaction dan mengirimkan perubahan dalam satu batch saat commit.
- **Identity Map**: memastikan satu baris database dipetakan ke satu object di memori, menghindari duplikasi dan inconsistency.

Keuntungan: konsistensi, batching update, optimistic locking.
Biaya: object tracking membutuhkan overhead memori dan kompleksitas debugging.

## Data Mapper vs Active Record

- **Active Record**: model menangani query dan persistence sendiri (Ruby on Rails, Eloquent).
- **Data Mapper**: entitas murni, repository menangani persistence (Hibernate, TypeORM mode data mapper).

Data mapper lebih fleksibel untuk domain kompleks; active record lebih cepat dipahami untuk aplikasi kecil.

## ORM N+1 Detection

Tools seperti Prisma logging, Hibernate SQL logging, atau APM dapat mendeteksi N+1. Strategi:

- Gunakan \`include\` atau \`join fetch\`.
- Gunakan batch loading dengan DataLoader.
- Audit query log secara berkala.

## Kapan Turun ke Raw SQL?

- Query kompleks dengan window functions, CTE, atau custom aggregate.
- Query yang membutuhkan hint optimizer.
- Bulk operation jauh lebih cepat dengan raw SQL.
- Reporting/analytics dengan query yang tidak cocok model object.`,
    },
    {
      id: "sec-06-$1",
      type: 'code-example',
      codeExample: {
        id: "code-06-go",
        filename: "main.go",
        language: 'go',
        title: "Go: GORM vs sqlx vs Raw SQL",
        code: "package main\n\nimport (\n\t\"fmt\"\n\n\t\"gorm.io/driver/postgres\"\n\t\"gorm.io/gorm\"\n)\n\ntype User struct {\n\tID    uint\n\tName  string\n\tOrders []Order\n}\n\ntype Order struct {\n\tID     uint\n\tUserID uint\n\tTotal  float64\n}\n\nfunc main() {\n\tdb, err := gorm.Open(postgres.Open(\"user=postgres password=pass dbname=shop\"), &gorm.Config{})\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\n\t// Eager loading dengan Preload untuk menghindari N+1\n\tvar users []User\n\tdb.Preload(\"Orders\").Find(&users)\n\tfmt.Println(len(users))\n}",
        explanation: "GORM menyediakan Preload untuk eager loading. Namun tetap perlu memeriksa query yang dihasilkan.",
      },
    },
    {
      id: "sec-06-$1",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Pilih ORM untuk produktivitas, query builder untuk keseimbangan, dan raw SQL untuk kontrol maksimal. Selalu waspadai N+1 dan audit query yang dihasilkan di production.`,
    },
  ],
}
