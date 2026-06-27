import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-design-patterns-js-ts',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-02-basic-patterns',
      type: 'markdown',
      level: 'basic',
      title: 'Singleton, Factory, Observer, dan Strategy',
      content: `## Singleton

Singleton memastikan sebuah kelas hanya memiliki satu instance dan menyediakan titik akses global ke instance tersebut. Berguna untuk resource yang mahal, seperti koneksi database atau logger.

\`\`\`javascript
class Logger {
  static #instance;
  #logs = [];

  static getInstance() {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }
    return Logger.#instance;
  }

  log(message) {
    this.#logs.push(message);
  }
}
\`\`\`

## Factory

Factory memisahkan logika pembuatan objek dari kode yang menggunakannya. Kita bisa membuat objek berdasarkan konfigurasi atau tipe tanpa mengekspos constructor secara langsung.

\`\`\`javascript
function createPaymentProcessor(type) {
  if (type === 'paypal') return new PayPalProcessor();
  if (type === 'stripe') return new StripeProcessor();
  throw new Error('Unknown payment type');
}
\`\`\`

## Observer

Observer mendefinisikan hubungan one-to-many: ketika satu objek berubah, semua subscriber-nya diberitahu. Pola ini mendasari EventEmitter Node.js dan event handling di browser.

## Strategy

Strategy mengenkapsulasi algoritma yang dapat dipertukarkan. Client memilih strategi saat runtime tanpa mengubah kode inti.

\`\`\`javascript
const strategies = {
  fastest: (a, b) => a.duration - b.duration,
  cheapest: (a, b) => a.cost - b.cost,
};
\`\`\``,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'event-emitter.js',
        language: 'javascript',
        title: 'JavaScript: Observer Pattern dengan EventEmitter',
        code: `class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(listener);
  }

  off(event, listener) {
    const list = this.#listeners.get(event) || [];
    const idx = list.indexOf(listener);
    if (idx >= 0) list.splice(idx, 1);
  }

  emit(event, data) {
    const list = this.#listeners.get(event) || [];
    for (const listener of list) {
      listener(data);
    }
  }
}

const bus = new EventEmitter();

bus.on('user:login', (user) => console.log('Login:', user.id));
bus.on('user:login', (user) => console.log('Audit:', user.id));

bus.emit('user:login', { id: 42 });
// Output:
// Login: 42
// Audit: 42`,
        explanation:
          'EventEmitter adalah implementasi Observer pattern. Publisher mengirim event, dan subscriber yang terdaftar menerima data tanpa keduanya saling bergantung secara langsung.',
      },
    },
    {
      id: 'sec-02-intermediate-patterns',
      type: 'markdown',
      level: 'intermediate',
      title: 'Module, Decorator, Proxy, dan Mediator',
      content: `## Module / Revealing Module

Pola Module membatasi eksposur variabel dan fungsi dengan IIFE atau ES modules. Hanya API publik yang diekspor, sehingga internal state terlindungi.

\`\`\`javascript
const counterModule = (function () {
  let count = 0;
  return {
    increment() { count++; },
    get() { return count; },
  };
})();
\`\`\`

## Decorator

Decorator menambahkan perilaku ke objek secara dinamis. Di TypeScript, decorator adalah fitur eksperimental untuk class, method, property, dan parameter.

\`\`\`typescript
function log(target, propertyKey, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    console.log(\`Calling \${propertyKey}\`);
    return original.apply(this, args);
  };
}
\`\`\`

## Proxy

Proxy menyediakan interceptor untuk operasi pada objek, seperti property access, assignment, dan function call. Sangat berguna untuk validasi, logging, dan reactive state.

\`\`\`javascript
const handler = {
  get(target, prop) {
    console.log('getting', prop);
    return target[prop];
  },
};
const proxy = new Proxy({}, handler);
\`\`\`

## Mediator

Mediator memusatkan komunikasi antar komponen melalui satu objek perantara, mengurangi ketergantungan langsung antar komponen. Pola ini sering muncul di chat room, air traffic control, atau state management central.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'di-container.ts',
        language: 'typescript',
        title: 'TypeScript: Dependency Injection Container Sederhana',
        code: `type Constructor<T> = new (...args: unknown[]) => T;

class Container {
  private registrations = new Map<string | symbol, Constructor<unknown>>();
  private instances = new Map<string | symbol, unknown>();

  register<T>(token: string | symbol, ctor: Constructor<T>): this {
    this.registrations.set(token, ctor);
    return this;
  }

  resolve<T>(token: string | symbol): T {
    if (this.instances.has(token)) {
      return this.instances.get(token) as T;
    }
    const ctor = this.registrations.get(token);
    if (!ctor) {
      throw new Error(\`No registration for \${String(token)}\`);
    }
    const instance = new ctor();
    this.instances.set(token, instance);
    return instance as T;
  }
}

class Database {
  query(sql: string): string[] {
    return [\`result for \${sql}\`];
  }
}

class UserService {
  constructor(private db: Database) {}
  findAll() {
    return this.db.query('SELECT * FROM users');
  }
}

const container = new Container();
container.register('db', Database);
container.register('userService', UserService);

// Di production, resolve dari container. Di test, kita bisa memasukkan mock Database.
const db = container.resolve<Database>('db');
const service = new UserService(db);
console.log(service.findAll());`,
        explanation:
          'DI container mendaftarkan dan menyelesaikan dependensi berdasarkan token. Dengan tipe generic, hasil resolve tetap type-safe. Dependensi dapat disuntikkan secara manual untuk memudahkan unit test.',
      },
    },
    {
      id: 'sec-02-advanced-patterns',
      type: 'markdown',
      level: 'advanced',
      title: 'Dependency Injection, Circuit Breaker, Event Sourcing, dan Ports & Adapters',
      content: `## Dependency Injection Lanjutan

DI tidak harus menggunakan framework. Yang penting adalah prinsip **Inversion of Control**: modul tingkat tinggi tidak bergantung pada modul tingkat rendah, melainkan pada abstraksi. Constructor injection adalah bentuk paling umum.

## Circuit Breaker

Circuit Breaker melindungi sistem saat layanan eksternal gagal. Terdapat tiga state:

1. **Closed**: permintaan dilewatkan seperti biasa.
2. **Open**: permintaan langsung gagal tanpa memanggil layanan yang bermasalah.
3. **Half-Open**: beberapa permintaan diizinkan untuk menguji apakah layanan sudah pulih.

Implementasi biasanya melacak failure rate dan waktu terakhir kegagalan.

## Event Sourcing

Event Sourcing menyimpan perubahan state sebagai urutan event, bukan state akhir. Keuntungannya:

- Audit trail lengkap.
- Bisa memutar ulang event untuk debugging atau rebuild state.
- Memudahkan integrasi dengan sistem lain lewat event stream.

Tantangannya adalah kompleksitas konsistensi dan evolusi schema event.

## Ports & Adapters (Hexagonal Architecture)

Domain logic berada di pusat. **Ports** adalah interface yang domain sediakan atau butuhkan. **Adapters** adalah implementasi konkret, seperti repository database, REST controller, atau message broker. Dengan cara ini, teknologi eksternal dapat diganti tanpa mengubah domain.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'strategy.go',
        language: 'go',
        title: 'Go: Strategy Pattern dengan Interface',
        code: `package main

import (
\t"fmt"
\t"sort"
)

type Route struct {
\tName     string
\tDuration int // minutes
\tCost     int // rupiah
}

type Strategy interface {
\tSort([]Route)
}

type Fastest struct{}

func (Fastest) Sort(routes []Route) {
\tsort.Slice(routes, func(i, j int) bool {
\t\treturn routes[i].Duration < routes[j].Duration
\t})
}

type Cheapest struct{}

func (Cheapest) Sort(routes []Route) {
\tsort.Slice(routes, func(i, j int) bool {
\t\treturn routes[i].Cost < routes[j].Cost
\t})
}

type Navigator struct {
\tstrategy Strategy
}

func (n *Navigator) FindBest(routes []Route) Route {
\tn.strategy.Sort(routes)
\treturn routes[0]
}

func main() {
\troutes := []Route{
\t\t{Name: "A", Duration: 60, Cost: 50000},
\t\t{Name: "B", Duration: 45, Cost: 75000},
\t}
\tnav := Navigator{strategy: Fastest{}}
\tbest := nav.FindBest(routes)
\tfmt.Println(best.Name) // B
}`,
        explanation:
          'Go mengandalkan interface untuk Strategy pattern. Navigator bergantung pada interface Strategy, sehingga strategi sorting dapat diganti tanpa mengubah kode Navigator.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Info:** Pilih pola desain berdasarkan masalah yang Anda hadapi, bukan karena pola tersebut terdengar canggih. Singleton sering disalahgunakan; pertimbangkan dependency injection terlebih dahulu. Circuit breaker dan ports & adapters sangat berharga di sistem terdistribusi.',
    },
  ],
}
