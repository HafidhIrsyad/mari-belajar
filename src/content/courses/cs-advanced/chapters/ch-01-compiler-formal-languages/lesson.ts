import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: 'lesson-ch-01-compiler-formal-languages',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'sec-01-basic-pipeline',
      type: 'markdown',
      level: 'basic',
      title: 'Pipeline Kompilasi dan Bahasa Formal',
      content: `## Apa itu Compiler?

**Compiler** adalah program yang menerjemahkan source code (bahasa tingkat tinggi) menjadi target executable: machine code, bytecode, atau Intermediate Representation (IR). Proses ini terstruktur dalam fase-fase yang masing-masing punya tanggung jawab jelas.

## Pipeline Kompilasi Klasik

\`\`\`text
Source Code
    ↓
Lexical Analysis (Lexer/Tokenizer)
    ↓
Syntax Analysis (Parser)
    ↓
Semantic Analysis
    ↓
Intermediate Code Generation
    ↓
Optimization
    ↓
Code Generation
    ↓
Target (Machine Code / Bytecode)
\`\`\`

Penjelasan singkat setiap fase:

1. **Lexical Analysis**: mengubah stream karakter menjadi **token** — unit lexical seperti \`if\`, \`42\`, \`+\`, \`myVariable\`.
2. **Syntax Analysis**: parser memeriksa apakah urutan token sesuai **grammar** bahasa, lalu membangun **parse tree** atau **AST**.
3. **Semantic Analysis**: memvalidasi makna — tipe data, deklarasi variabel, scope, dan aturan bahasa.
4. **Code Generation**: menerjemahkan representasi internal menjadi instruksi target.

## Bahasa Formal dan Grammar

Bahasa pemrograman didefinisikan secara formal dengan **grammar** — aturan produksi yang menentukan string mana yang valid.

Contoh grammar sederhana untuk ekspresi:

\`\`\`text
expr   → term (("+" | "-") term)*
term   → factor (("*" | "/") factor)*
factor → NUMBER | "(" expr ")"
\`\`\`

## Hierarki Chomsky

Noam Chomsky mengklasifikasikan grammar berdasarkan kekuatan ekspresif:

| Tipe | Nama | Contoh | Penggunaan |
|------|------|--------|------------|
| Type 3 | Regular | \`a*b\` | Lexer, pattern matching |
| Type 2 | Context-Free | \`expr → expr + term\` | Parser bahasa pemrograman |
| Type 1 | Context-Sensitive | aturan dependen konteks | Beberapa fitur bahasa lanjut |
| Type 0 | Unrestricted | Turing-complete | Teori komputabilitas |

Kebanyakan sintaks bahasa pemrograman modern termasuk **context-free (Type 2)**. Lexer menggunakan **regular (Type 3)** untuk mengenali token.`,
    },
    {
      id: 'sec-01-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go-basic',
        filename: 'lexer.go',
        language: 'go',
        title: 'Go: Lexer Sederhana untuk Angka dan Operator',
        code: `package main

import (
	"fmt"
	"strconv"
	"unicode"
)

type TokenType string

const (
	Number TokenType = "NUMBER"
	Plus   TokenType = "PLUS"
	Minus  TokenType = "MINUS"
	EOF    TokenType = "EOF"
)

type Token struct {
	Type  TokenType
	Value string
}

func tokenize(input string) []Token {
	var tokens []Token
	i := 0
	runes := []rune(input)

	for i < len(runes) {
		ch := runes[i]

		if unicode.IsSpace(ch) {
			i++
			continue
		}

		if unicode.IsDigit(ch) {
			start := i
			for i < len(runes) && unicode.IsDigit(runes[i]) {
				i++
			}
			num := string(runes[start:i])
			tokens = append(tokens, Token{Type: Number, Value: num})
			continue
		}

		switch ch {
		case '+':
			tokens = append(tokens, Token{Type: Plus, Value: "+"})
			i++
		case '-':
			tokens = append(tokens, Token{Type: Minus, Value: "-"})
			i++
		default:
			panic(fmt.Sprintf("karakter tidak dikenal: %c", ch))
		}
	}

	tokens = append(tokens, Token{Type: EOF})
	return tokens
}

func main() {
	tokens := tokenize("10 + 20 - 5")
	for _, t := range tokens {
		fmt.Printf("%s: %s\\n", t.Type, t.Value)
	}
	_ = strconv.Itoa // ilustrasi konversi angka di lexer nyata
}`,
        explanation:
          'Lexer membaca rune satu per satu dan mengelompokkannya menjadi token. Whitespace diabaikan; angka dan operator dikenali dengan unicode.IsDigit dan switch.',
      },
    },
    {
      id: 'sec-01-intermediate-parser-ast',
      type: 'markdown',
      level: 'intermediate',
      title: 'Parser Recursive Descent, AST, dan Analisis Semantik',
      content: `## Parser Recursive Descent

**Recursive descent** adalah teknik parsing top-down: setiap rule grammar direpresentasikan sebagai fungsi. Fungsi memanggil fungsi lain secara rekursif sesuai struktur grammar.

Untuk grammar ekspresi di atas:

- \`parseExpr()\` memanggil \`parseTerm()\` lalu menangani \`+\` dan \`-\`.
- \`parseTerm()\` memanggil \`parseFactor()\` lalu menangani \`*\` dan \`/\`.
- \`parseFactor()\` menangani angka atau ekspresi dalam tanda kurung.

Keuntungan: mudah dipahami, mudah di-debug, dan cukup untuk banyak subset bahasa. Kelemahan: grammar left-recursive tidak langsung bisa diparse tanpa transformasi.

## Abstract Syntax Tree (AST)

**AST** adalah representasi tree dari struktur program yang menyingkirkan detail sintaks permukaan (tanda kurung, titik koma, keyword redundan). Node AST merepresentasikan konstruksi semantik:

- \`BinaryExpr\`: operasi biner (mis. \`a + b\`)
- \`Literal\`: nilai konstanta
- \`VariableDecl\`: deklarasi variabel
- \`IfStmt\`: cabang kondisional

Compiler, linter, formatter, dan IDE semuanya bekerja dengan AST. Babel, TypeScript, ESLint, dan Prettier memanipulasi AST untuk transformasi kode.

## Analisis Semantik

Setelah AST dibangun, **semantic analyzer** memvalidasi:

- **Type checking**: apakah operasi \`+\` valid antara operand yang diberikan?
- **Scope resolution**: variabel \`x\` merujuk ke deklarasi mana?
- **Declaration checking**: fungsi dipanggil dengan jumlah argumen benar?
- **Control flow**: apakah \`return\` berada di fungsi yang valid?

Kesalahan semantik tidak selalu terdeteksi parser — contoh: \`let x: number = "hello"\` sintaksnya valid di TypeScript tetapi gagal type check.

## Konsep Parsing LL dan LR

| Aspek | LL (Top-Down) | LR (Bottom-Up) |
|-------|---------------|----------------|
| Arah | Left-to-right, Leftmost derivation | Left-to-right, Rightmost derivation |
| Contoh | Recursive descent, LL(1), ANTLR | Yacc, Bison, LALR |
| Kekuatan | Grammar sederhana, mudah ditulis manual | Lebih kuat, menangani lebih banyak grammar |
| Trade-off | Left recursion bermasalah | Tabel parsing lebih kompleks |

**LL(k)** melihat k token ke depan untuk memutuskan rule mana yang dipakai. **LR(k)** menggunakan stack shift-reduce: shift token ke stack, reduce sesuai rule grammar.

> **Praktik:** Untuk implementasi tooling di ekosistem JavaScript/TypeScript — Babel plugin, TypeScript Compiler API, ESLint custom rule — lihat bab [Compiler Internals & Build Tools](/courses/js-ts-advanced/ch-05-compiler-internals-build-tools). Bab ini fokus teori; bab tersebut fokus praktik.`,
    },
    {
      id: 'sec-01-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go-intermediate',
        filename: 'parser.go',
        language: 'go',
        title: 'Go: Recursive Descent Parser dan AST',
        code: `package main

import "fmt"

type TokenType string

const (
	NumToken TokenType = "NUMBER"
	PlusOp   TokenType = "PLUS"
	MinusOp  TokenType = "MINUS"
	EOFToken TokenType = "EOF"
)

type Token struct {
	Type  TokenType
	Value int
}

type ASTNode interface {
	String() string
}

type NumberLiteral struct {
	Value int
}

func (n NumberLiteral) String() string { return fmt.Sprintf("Num(%d)", n.Value) }

type BinaryExpr struct {
	Op             string
	Left, Right    ASTNode
}

func (b BinaryExpr) String() string {
	return fmt.Sprintf("(%s %s %s)", b.Left, b.Op, b.Right)
}

type Parser struct {
	tokens []Token
	pos    int
}

func (p *Parser) peek() Token { return p.tokens[p.pos] }

func (p *Parser) consume() Token {
	t := p.tokens[p.pos]
	p.pos++
	return t
}

func (p *Parser) parseExpr() ASTNode {
	node := p.parseTerm()
	for p.peek().Type == PlusOp || p.peek().Type == MinusOp {
		op := p.consume().Type
		right := p.parseTerm()
		sym := "+"
		if op == MinusOp {
			sym = "-"
		}
		node = BinaryExpr{Op: sym, Left: node, Right: right}
	}
	return node
}

func (p *Parser) parseTerm() ASTNode {
	tok := p.consume()
	if tok.Type != NumToken {
		panic("diharapkan angka")
	}
	return NumberLiteral{Value: tok.Value}
}

func main() {
	tokens := []Token{
		{Type: NumToken, Value: 10},
		{Type: PlusOp},
		{Type: NumToken, Value: 5},
		{Type: EOFToken},
	}
	ast := (&Parser{tokens: tokens}).parseExpr()
	fmt.Println(ast) // (Num(10) + Num(5))
}`,
        explanation:
          'Parser recursive descent membangun AST secara top-down. Setiap level grammar (expr, term) menjadi method. AST yang dihasilkan siap untuk evaluasi, type check, atau code generation.',
      },
    },
    {
      id: 'sec-01-advanced-semantic-ir',
      type: 'markdown',
      level: 'advanced',
      title: 'Semantic Analysis Lanjut, IR, dan Optimasi',
      content: `## Symbol Table dan Scope

**Symbol table** menyimpan informasi tentang identifier: nama, tipe, scope, dan lokasi di memori. Semantic analyzer membangun symbol table saat traversal AST:

- **Global scope**: variabel dan fungsi top-level.
- **Function scope**: parameter dan variabel lokal.
- **Block scope**: variabel dalam \`{ }\`.

Nested scope membutuhkan chain lookup: cari di scope saat ini, jika tidak ada naik ke parent scope.

## Type System dan Inference

Compiler modern melakukan **type inference** — deduksi tipe tanpa anotasi eksplisit. Hindley-Milner (dipakai ML, Haskell, sebagian TypeScript) dan constraint-based inference (TypeScript, Rust) adalah pendekatan umum.

**Gradual typing** (TypeScript, Python + mypy) memungkinkan campuran typed dan untyped code; type checker berjalan pada compile time tanpa mengubah runtime.

## Intermediate Representation (IR)

Setelah semantic analysis, compiler menghasilkan **IR** — representasi program yang independen dari sintaks source dan target machine:

- **Three-address code (TAC)**: setiap instruksi paling banyak tiga operand.
- **SSA (Static Single Assignment)**: setiap variabel di-assign tepat sekali; memudahkan optimasi.
- **LLVM IR**: format populer yang dipakai Clang, Rust, Swift.

IR memungkinkan **retargeting**: satu front-end (mis. TypeScript) bisa menarget banyak back-end (WASM, x64, ARM).

## Optimasi Compiler

Fase optimasi bekerja pada IR atau AST:

- **Constant folding**: \`2 + 3\` → \`5\` saat compile time.
- **Dead code elimination**: hapus kode yang tidak pernah dieksekusi.
- **Loop invariant code motion**: pindahkan perhitungan yang tidak berubah di dalam loop ke luar loop.
- **Inlining**: substitusi panggilan fungsi kecil dengan body fungsi.

Trade-off: optimasi agresif meningkatkan waktu compile dan ukuran binary, tetapi mempercepat runtime.

## Transpiler vs Compiler

- **Transpiler**: source → source (TypeScript → JavaScript, ES2024 → ES2015).
- **Compiler**: source → machine code atau bytecode (C → x64, Java → JVM bytecode).
- **Interpreter**: eksekusi langsung tanpa fase code generation terpisah (Python REPL, Node.js untuk JS).

Batasnya kabur: V8 "compiles" JavaScript ke machine code saat runtime (JIT). Babel "transpiles" tetapi melalui fase parse → transform AST → generate.`,
    },
    {
      id: 'sec-01-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go-advanced',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Evaluator AST Sederhana',
        code: `package main

import "fmt"

type Node interface {
	Eval() int
}

type Number struct {
	Value int
}

func (n Number) Eval() int { return n.Value }

type Add struct {
	Left, Right Node
}

func (a Add) Eval() int { return a.Left.Eval() + a.Right.Eval() }

type Sub struct {
	Left, Right Node
}

func (s Sub) Eval() int { return s.Left.Eval() - s.Right.Eval() }

func main() {
	// AST untuk: (10 + 5) - 3
	ast := Sub{
		Left: Add{Left: Number{10}, Right: Number{5}},
		Right: Number{3},
	}

	fmt.Printf("Hasil evaluasi: %d\\n", ast.Eval())
}`,
        explanation:
          'Pola interface + struct di Go memodelkan AST dengan elegan. Setiap node implement Eval(); compiler nyata akan generate bytecode atau assembly alih-alih evaluasi langsung.',
      },
    },
    {
      id: 'sec-01-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Compiler menerjemahkan source code melalui pipeline terstruktur: lexer menghasilkan token, parser membangun AST, semantic analyzer memvalidasi makna, lalu IR dan code generation menghasilkan target executable. Hierarki Chomsky mengklasifikasikan kekuatan grammar. Recursive descent adalah parser top-down yang intuitif; LL dan LR adalah kerangka teoretis untuk parsing. Untuk praktik tooling JS/TS, lanjut ke bab Compiler Internals & Build Tools di js-ts-advanced.',
    },
  ],
}
