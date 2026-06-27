import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: "lesson-ch-05-nosql-lanjutan-mongodb-cassandra",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-05-01",
      type: 'markdown',
      level: 'basic',
      title: "MongoDB Document Model & MQL",
      content: `## Document Database

MongoDB menyimpan data dalam dokumen BSON (Binary JSON). Dokumen bersifat self-contained dan dapat memiliki struktur nested serta array.

## MongoDB Query Language (MQL)

MQL menggunakan sintaks JSON-like:

\`\`\`json
{ "status": "shipped", "total": { "$gt": 100 } }
\`\`\`

Operator umum:
- \`$eq\`, \`$ne\`, \`$gt\`, \`$gte\`, \`$lt\`, \`$lte\`
- \`$in\`, \`$nin\`
- \`$exists\`, \`$type\`
- \`$regex\`

## Cassandra Query Language (CQL)

CQL terlihat seperti SQL tetapi berbeda secara fundamental. Cassandra dioptimalkan untuk write dan query berdasarkan **partition key** dan **clustering columns**.

Contoh:

\`\`\`sql
CREATE TABLE orders_by_customer (
  customer_id UUID,
  order_date TIMESTAMP,
  order_id UUID,
  total DECIMAL,
  PRIMARY KEY ((customer_id), order_date, order_id)
) WITH CLUSTERING ORDER BY (order_date DESC);
\`\`\`

\`customer_id\` adalah partition key, sedangkan \`order_date\` dan \`order_id\` adalah clustering columns.

## Query-First Design

Cassandra tidak mendukung join dan query ad-hoc fleksibel. Oleh karena itu, tabel didesain berdasarkan query yang akan dijalankan, sering kali dengan denormalisasi dan duplikasi data.`,
    },
    {
      id: "sec-05-02",
      type: 'code-example',
      codeExample: {
        id: "code-05-js",
        filename: "document-query.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Dokumen dan Aggregation",
        code: "const orders = [\n  { customerId: 'c1', status: 'shipped', total: 150, items: [{ sku: 'A', qty: 2 }] },\n  { customerId: 'c1', status: 'pending', total: 80, items: [{ sku: 'B', qty: 1 }] },\n  { customerId: 'c2', status: 'shipped', total: 200, items: [{ sku: 'A', qty: 4 }] },\n]\n\n// Filter\nconst shipped = orders.filter((o) => o.status === 'shipped')\nconsole.log('shipped:', shipped.length)\n\n// Aggregate: total penjualan per customer\nconst revenueByCustomer = orders.reduce((acc, o) => {\n  acc[o.customerId] = (acc[o.customerId] || 0) + o.total\n  return acc\n}, {})\nconsole.log(revenueByCustomer)\n\n// Unwind items: satu order bisa menghasilkan beberapa baris item\nconst lineItems = orders.flatMap((o) =>\n  o.items.map((item) => ({ customerId: o.customerId, sku: item.sku, qty: item.qty }))\n)\nconsole.log(lineItems)",
        explanation: "Simulasi ini meniru konsep filter, group, dan unwind yang menjadi dasar MongoDB aggregation pipeline.",
      },
    },
    {
      id: "sec-05-03",
      type: 'markdown',
      level: 'intermediate',
      title: "MongoDB Aggregation Pipeline & Indexing",
      content: `## Aggregation Pipeline

Aggregation pipeline memproses dokumen melalui stages:

1. \`$match\`: filter dokumen.
2. \`$group\`: kelompokkan dan hitung aggregate.
3. \`$sort\`: urutkan hasil.
4. \`$project\`: pilih kolom.
5. \`$lookup\`: join dengan koleksi lain.
6. \`$unwind\`: deconstruct array menjadi dokumen terpisah.

Pipeline dieksekusi di server, sehingga lebih efisien daripada membawa semua data ke aplikasi.

## Indexing di MongoDB

- **Single field index**: index pada satu kolom.
- **Compound index**: index pada beberapa kolom, urutan penting (ESR: Equality, Sort, Range).
- **Multikey index**: index pada array.
- **Text index**: untuk full-text search.
- **Wildcard index**: untuk field dinamis.

## Covered Query

**Covered query** adalah query yang seluruhnya terpenuhi oleh index, sehingga tidak perlu membaca dokumen. Syaratnya: semua field dalam query, projection, dan sort harus ada di index.

## Cassandra Partition Key & Clustering

- **Partition key**: menentukan node dan partition mana yang menyimpan data.
- **Clustering columns**: mengurutkan data dalam partition.
- Query tanpa partition key menyebabkan **full cluster scan**, yang sangat tidak efisien.

## Write Path Cassandra

Write Cassandra sangat cepat karena:
- Setiap write ditulis ke commit log dan memtable di memory.
- Data di-flush ke SSTable di disk secara asynchronous.
- Compaction menggabungkan SSTable secara berkala.`,
    },
    {
      id: "sec-05-04",
      type: 'code-example',
      codeExample: {
        id: "code-05-ts",
        filename: "mongo-aggregate-builder.ts",
        language: 'typescript',
        title: "TypeScript: Typed Aggregation Pipeline Builder",
        code: "type Stage =\n  | { type: 'match'; predicate: Record<string, unknown> }\n  | { type: 'group'; id: string | Record<string, string>; fields: Record<string, unknown> }\n  | { type: 'sort'; spec: Record<string, 1 | -1> }\n  | { type: 'limit'; n: number }\n\nclass AggregationPipeline {\n  private stages: Stage[] = []\n\n  match(predicate: Record<string, unknown>) {\n    this.stages.push({ type: 'match', predicate })\n    return this\n  }\n\n  group(id: string | Record<string, string>, fields: Record<string, unknown>) {\n    this.stages.push({ type: 'group', id, fields })\n    return this\n  }\n\n  sort(spec: Record<string, 1 | -1>) {\n    this.stages.push({ type: 'sort', spec })\n    return this\n  }\n\n  limit(n: number) {\n    this.stages.push({ type: 'limit', n })\n    return this\n  }\n\n  build() {\n    return this.stages.map((stage) => {\n      if (stage.type === 'match') return { $match: stage.predicate }\n      if (stage.type === 'group') return { $group: { _id: stage.id, ...stage.fields } }\n      if (stage.type === 'sort') return { $sort: stage.spec }\n      if (stage.type === 'limit') return { $limit: stage.n }\n      return {}\n    })\n  }\n}\n\nconst pipeline = new AggregationPipeline()\n  .match({ status: 'shipped' })\n  .group('$customerId', { totalRevenue: { $sum: '$total' } })\n  .sort({ totalRevenue: -1 })\n  .limit(10)\n\nconsole.log(JSON.stringify(pipeline.build(), null, 2))",
        explanation: "Builder ini membuat pipeline MongoDB secara terstruktur dengan type safety, memudahkan pembuatan query aggregation kompleks.",
      },
    },
    {
      id: "sec-05-05",
      type: 'markdown',
      level: 'advanced',
      title: "Replica Set, Write Concern & Tunable Consistency",
      content: `## MongoDB Replica Set

Replica set MongoDB terdiri dari:
- **Primary**: menerima semua write.
- **Secondary**: mereplikasi oplog dari primary.
- **Arbiter**: memberikan vote saat election tanpa menyimpan data.

Saat primary gagal, secondary melakukan election untuk memilih primary baru.

## Write Concern

Write concern menentukan berapa node yang harus mengakui write sebelum dikembalikan ke client:

- \`w: 1\`: primary saja (default, cepat).
- \`w: majority\`: majority node, lebih aman.
- \`w: 0\`: fire-and-forget, tidak menunggu acknowledgment.

\`j: true\` memastikan write dijournal di disk sebelum acknowledgment.

## Read Concern

- \`local\`: data terbaru di node yang ditanya.
- \`majority\`: data yang telah diakui majority node.
- \`linearizable\`: baca data terbaru yang diakui majority sebelum write selesai.

## Cassandra Tunable Consistency

Cassandra memisahkan consistency level untuk read dan write:

- **ONE**: satu node.
- **QUORUM**: majority.
- **ALL**: semua node.
- **LOCAL_QUORUM**: quorum dalam datacenter lokal.

Rumus umum: untuk strong consistency, W + R > replication_factor.

## LSM-Tree Under The Hood

Cassandra dan MongoDB WiredTiger menggunakan struktur LSM-tree atau B-tree. LSM-tree mengoptimalkan write dengan append-only log dan merge asynchronous. Ini menghasilkan write throughput tinggi tetapi read bisa memerlukan pembacaan beberapa file (compaction mengurangi dampaknya).`,
    },
    {
      id: "sec-05-06",
      type: 'code-example',
      codeExample: {
        id: "code-05-go",
        filename: "mongo_driver.go",
        language: 'go',
        title: "Go: MongoDB Driver dengan Write Concern",
        code: "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"log\"\n\t\"time\"\n\n\t\"go.mongodb.org/mongo-driver/bson\"\n\t\"go.mongodb.org/mongo-driver/mongo\"\n\t\"go.mongodb.org/mongo-driver/mongo/options\"\n\t\"go.mongodb.org/mongo-driver/mongo/readconcern\"\n\t\"go.mongodb.org/mongo-driver/mongo/writeconcern\"\n)\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)\n\tdefer cancel()\n\n\tclient, err := mongo.Connect(ctx, options.Client().ApplyURI(\"mongodb://localhost:27017\"))\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer client.Disconnect(ctx)\n\n\twc := writeconcern.New(writeconcern.WMajority())\n\trc := readconcern.Majority()\n\tcoll := client.Database(\"shop\").Collection(\"orders\",\n\t\toptions.Collection().SetWriteConcern(wc).SetReadConcern(rc),\n\t)\n\n\tpipeline := mongo.Pipeline{\n\t\t{{Key: \"$match\", Value: bson.D{{Key: \"status\", Value: \"shipped\"}}}},\n\t\t{{Key: \"$group\", Value: bson.D{\n\t\t\t{Key: \"_id\", Value: \"$customer_id\"},\n\t\t\t{Key: \"total\", Value: bson.D{{Key: \"$sum\", Value: \"$total\"}}},\n\t\t}}},\n\t}\n\n\tcursor, err := coll.Aggregate(ctx, pipeline)\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer cursor.Close(ctx)\n\n\tvar results []bson.M\n\tif err := cursor.All(ctx, &results); err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tfmt.Println(results)\n}",
        explanation: "Driver Go menunjukkan cara mengatur write concern majority dan read concern majority untuk strong consistency di MongoDB.",
      },
    },
    {
      id: "sec-05-07",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Pilih MongoDB untuk data fleksibel, query rich, dan aggregasi kompleks. Pilih Cassandra untuk write throughput tinggi, skala besar, dan query pattern yang jelas. Sesuaikan write/read concern atau consistency level dengan kebutuhan durability dan availability.

Tools 2026: MongoDB Atlas, MongoDB Compass, Apache Cassandra, DataStax Astra, dan ScyllaDB sebagai alternatif C++ Cassandra-compatible.`,
    },
  ],
}
