import type { Lesson } from '@/content/types'

export const ch06Lesson: Lesson = {
  id: "lesson-ch-06-key-value-graph-databases",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-06-01",
      type: 'markdown',
      level: 'basic',
      title: "Key-Value Store dan Redis Data Structures",
      content: `## Key-Value Store

Key-value store adalah database paling sederhana: setiap item disimpan sebagai pasangan key dan value. Cocok untuk:

- Session store.
- Caching.
- Rate limiting.
- Real-time leaderboard.
- Feature flags.

## Redis Data Structures

Redis bukan hanya string; ia menyediakan struktur data berikut:

- **String**: nilai biner, integer, atau counter.
- **Hash**: mapping field-value, cocok untuk object.
- **List**: linked list, cocok untuk queue/timeline.
- **Set**: kumpulan unik, cocok untuk tag dan membership.
- **Sorted Set**: set dengan score, cocok untuk ranking.
- **Stream**: log append-only, cocok untuk event sourcing.
- **Bitmap & HyperLogLog**: untuk analytics ringan.

## Graph Database

Graph database menyimpan data sebagai **node** (entitas) dan **edge** (relasi). Relasi adalah first-class citizen, sehingga query traversal lebih efisien daripada join berulang di RDBMS.

Contoh use case:
- Social network.
- Fraud detection.
- Recommendation engine.
- Knowledge graph.

## Cypher Basics

Cypher adalah query language Neo4j. Contoh:

\`\`\`cypher
CREATE (alice:Person {name: 'Alice'})
CREATE (bob:Person {name: 'Bob'})
CREATE (alice)-[:FOLLOWS]->(bob)
\`\`\`

Query untuk mencari follower:

\`\`\`cypher
MATCH (follower:Person)-[:FOLLOWS]->(target:Person {name: 'Bob'})
RETURN follower.name
\`\`\``, 
    },
    {
      id: "sec-06-02",
      type: 'code-example',
      codeExample: {
        id: "code-06-js",
        filename: "redis-patterns.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Cache-Aside Pattern",
        code: "const cache = new Map()\nconst database = new Map([\n  ['user:1', { name: 'Alice', role: 'admin' }],\n  ['user:2', { name: 'Bob', role: 'user' }],\n])\n\nconst TTL_MS = 60_000\n\nfunction getUser(id) {\n  const key = `user:${id}`\n  const cached = cache.get(key)\n  if (cached && cached.expiresAt > Date.now()) {\n    console.log('cache hit', key)\n    return cached.value\n  }\n\n  console.log('cache miss', key)\n  const value = database.get(key)\n  if (value) {\n    cache.set(key, { value, expiresAt: Date.now() + TTL_MS })\n  }\n  return value\n}\n\nconsole.log(getUser(1))\nconsole.log(getUser(1))",
        explanation: "Cache-aside memeriksa cache terlebih dahulu; jika tidak ada, membaca dari database lalu menulis ke cache dengan TTL.",
      },
    },
    {
      id: "sec-06-03",
      type: 'markdown',
      level: 'intermediate',
      title: "Redis Persistence, Caching Patterns & Redis Cluster",
      content: `## Redis Persistence

Redis menawarkan dua mode persistence:

- **RDB (Redis Database Backup)**: snapshot periodik ke disk. Cocok untuk backup dan recovery cepat, tetapi bisa kehilangan data antar snapshot.
- **AOF (Append-Only File)**: mencatat setiap write operation. Lebih aman terhadap data loss tetapi file lebih besar dan recovery lebih lambat.

Kombinasi RDB + AOF sering digunakan untuk keseimbangan.

## Caching Patterns

- **Cache-aside**: aplikasi mengelola cache secara manual.
- **Write-through**: setiap write ke database juga menulis ke cache.
- **Write-behind**: write ke cache, lalu di-flush ke database secara asynchronous.
- **Cache-aside dengan invalidation**: update database lalu hapus cache (bukan update cache).

## Cache Stampede

Cache stampede terjadi ketika banyak request bersamaan menemukan cache miss dan mengakses database secara bersamaan. Solusi:

- **Lock**: hanya satu request yang mengisi cache.
- **Probabilistic early expiration**: refresh cache sebelum TTL habis secara probabilistik.
- **Circuit breaker**: mengurangi beban saat database down.

## Redis Cluster

Redis Cluster menyediakan:

- **Sharding**: data didistribusikan ke 16.384 hash slots.
- **High availability**: setiap master memiliki replica; failover otomatis.
- **No proxy**: client langsung berkomunikasi dengan node yang tepat.

Tantangan:
- Multi-key operation harus berada dalam hash tag yang sama.
- Transaksi (MULTI/EXEC) terbatas pada satu node.

## Graph Model Neo4j

- **Node**: memiliki label dan properties.
- **Relationship**: memiliki type dan direction, juga bisa memiliki properties.
- **Path**: urutan node dan relationship.

Graph database menggunakan index-free adjacency: setiap node menyimpan pointer ke relationship, sehingga traversal tidak memerlukan index lookup global.`,
    },
    {
      id: "sec-06-04",
      type: 'code-example',
      codeExample: {
        id: "code-06-ts",
        filename: "typed-cache.ts",
        language: 'typescript',
        title: "TypeScript: Typed Redis Cache Wrapper",
        code: "type CacheEntry<T> = { value: T; expiresAt: number }\n\nclass TypedCache<T> {\n  private store = new Map<string, CacheEntry<T>>()\n\n  constructor(private ttlMs: number) {}\n\n  get(key: string): T | undefined {\n    const entry = this.store.get(key)\n    if (!entry) return undefined\n    if (entry.expiresAt < Date.now()) {\n      this.store.delete(key)\n      return undefined\n    }\n    return entry.value\n  }\n\n  set(key: string, value: T): void {\n    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs })\n  }\n\n  delete(key: string): void {\n    this.store.delete(key)\n  }\n\n  async getOrSet(key: string, factory: () => Promise<T>): Promise<T> {\n    const cached = this.get(key)\n    if (cached !== undefined) return cached\n    const value = await factory()\n    this.set(key, value)\n    return value\n  }\n}\n\ninterface User { id: string; name: string }\n\nconst userCache = new TypedCache<User>(60_000)\nuserCache.set('u1', { id: '1', name: 'Alice' })\nconsole.log(userCache.get('u1'))",
        explanation: "Wrapper typed ini menyediakan get, set, dan getOrSet dengan TTL, yang dapat dipetakan ke perintah Redis GET/SET/EXPIRE.",
      },
    },
    {
      id: "sec-06-05",
      type: 'markdown',
      level: 'advanced',
      title: "Graph Algorithms & Vector Search Intro",
      content: `## Graph Algorithms

Neo4j Graph Data Science (GDS) menyediakan algoritma:

- **Shortest path**: menemukan jalur terpendek antar node.
- **Centrality (PageRank, Betweenness)**: menemukan node paling berpengaruh.
- **Community detection (Louvain, WCC)**: mengelompokkan node berdasarkan koneksi.
- **Similarity (Jaccard, Cosine)**: menemukan node serupa.

## Use Case: Fraud Detection

Dalam fraud detection, graph query dapat menemukan:
- Akun yang berbagi informasi identitas (email, telepon, perangkat).
- Transaksi melingkar atau layering.
- Hubungan tidak wajar antar merchant dan cardholder.

## Vector Search

Vector search menyimpan embedding (representasi numerik) dan mencari nearest neighbors. Redis menyediakan Redis Stack dengan RedisSearch untuk vector search.

Use case:
- Semantic search.
- Recommendation.
- Anomaly detection.

## Redis Under The Hood

Redis adalah in-memory data structure store. Semua data disimpan di RAM, sehingga latency sangat rendah (sub-millisecond). Data structures diimplementasikan secara efisien:

- Sorted set menggunakan skip list + hash table.
- Hash menggunakan hash table dengan incremental rehashing.
- Streams menggunakan rax tree.

Karena data di RAM, kapasitas terbatas oleh memori. Solusi: Redis Cluster untuk sharding dan eviction policy (LRU/LFU) untuk mengelola memori penuh.`,
    },
    {
      id: "sec-06-06",
      type: 'code-example',
      codeExample: {
        id: "code-06-go",
        filename: "redis_go.go",
        language: 'go',
        title: "Go: Redis Client dengan Cache-Aside",
        code: "package main\n\nimport (\n\t\"context\"\n\t\"encoding/json\"\n\t\"fmt\"\n\t\"time\"\n\n\t\"github.com/redis/go-redis/v9\"\n)\n\ntype User struct {\n\tID   string `json:\"id\"`\n\tName string `json:\"name\"`\n}\n\nfunc getUser(ctx context.Context, rdb *redis.Client, id string) (*User, error) {\n\tkey := \"user:\" + id\n\tcached, err := rdb.Get(ctx, key).Result()\n\tif err == nil {\n\t\tvar user User\n\t\tif err := json.Unmarshal([]byte(cached), &user); err == nil {\n\t\t\treturn &user, nil\n\t\t}\n\t} else if err != redis.Nil {\n\t\treturn nil, err\n\t}\n\n\t// Simulasi fetch dari database\n\tuser := &User{ID: id, Name: \"Alice\"}\n\tdata, _ := json.Marshal(user)\n\trdb.Set(ctx, key, data, 5*time.Minute)\n\treturn user, nil\n}\n\nfunc main() {\n\trdb := redis.NewClient(&redis.Options{Addr: \"localhost:6379\"})\n\tdefer rdb.Close()\n\n\tctx := context.Background()\n\tuser, err := getUser(ctx, rdb, \"1\")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Printf(\"user: %+v\\n\", user)\n}",
        explanation: "Implementasi Go ini menggabungkan cache-aside dengan Redis: cek cache, deserialize jika ada, atau fetch dari database lalu serialize dan simpan ke Redis.",
      },
    },
    {
      id: "sec-06-07",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Gunakan Redis untuk caching, session, leaderboard, dan real-time data structures. Gunakan Neo4j atau graph database ketika relasi antar entitas menjadi pusat query dan analisis. Pertimbangkan Redis Cluster untuk skala horizontal, tetapi ingat keterbatasan multi-key operation.

Tools 2026: Redis Stack, RedisInsight, Neo4j Aura, Neo4j GDS, dan vector search di RedisSearch.`,
    },
  ],
}
