import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: 'lesson-ch-02-authentication',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-02-basic-authentication',
      type: 'markdown',
      level: 'basic',
      title: 'Session vs Token dan JWT',
      content: `## Autentikasi di Backend

Autentikasi adalah proses memastikan identitas pengguna. Backend menerima kredensial, memverifikasinya, lalu mengeluarkan bukti yang dapat digunakan untuk request berikutnya. Dua pendekatan utama:

1. **Session-based**: server menyimpan state session di memory atau store seperti Redis. Client membawa session ID di cookie.
2. **Token-based**: server membuat token yang berisi klaim, client menyimpannya di cookie/local storage. JWT (JSON Web Token) adalah format token yang paling populer.

## Struktur JWT

JWT terdiri dari tiga bagian yang dipisahkan titik:

- **Header**: algoritma dan tipe token, contoh \`{"alg":"HS256","typ":"JWT"}\`.
- **Payload**: klaim seperti subjek, waktu kedaluwarsa, peran.
- **Signature**: hasil HMAC atau RSA atas string \`base64url(header) + "." + base64url(payload)\`.

## bcrypt Password Hashing

Password tidak boleh disimpan sebagai plain text. bcrypt melakukan:

- Menambahkan salt acak pada password.
- Menjalankan Blowfish-based key derivation sebanyak 2^cost kali.
- Menyimpan cost, salt, dan hash dalam satu string.

Cost factor yang lebih tinggi membuat brute-force lebih lambat tetapi juga memperlambat login.`,
    },
    {
      id: 'sec-02-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'auth-service.js',
        language: 'javascript',
        title: 'JavaScript: Login dengan bcrypt dan JWT',
        code: `const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = new Map()

async function register(email, password) {
  const hash = await bcrypt.hash(password, 12)
  users.set(email, { email, hash, id: users.size + 1 })
  return { id: users.size }
}

async function login(email, password) {
  const user = users.get(email)
  if (!user) {
    throw new Error('invalid credentials')
  }

  const valid = await bcrypt.compare(password, user.hash)
  if (!valid) {
    throw new Error('invalid credentials')
  }

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { sub: user.id, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

module.exports = { register, login }`,
        explanation:
          'bcrypt.hash menyimpan cost dan salt bersama hash. jwt.sign membuat token self-contained dengan klaim dan kedaluwarsa. Refresh token memiliki secret dan masa aktif tersendiri.',
      },
    },
    {
      id: 'sec-02-intermediate-auth',
      type: 'markdown',
      level: 'intermediate',
      title: 'Passport, NestJS Auth, OAuth2/PKCE, dan Refresh Token',
      content: `## Strategi Autentikasi

Framework seperti Express (Passport.js) dan NestJS menyediakan abstraction untuk strategi autentikasi:

- **Local strategy**: username/password.
- **JWT strategy**: memverifikasi access token dari header Authorization.
- **OAuth2 / OpenID Connect**: mempercayakan identitas ke provider eksternal seperti Google atau GitHub.

## OAuth2 dengan PKCE

PKCE (Proof Key for Code Exchange) ditujukan untuk client publik seperti mobile atau SPA:

1. Client membuat code verifier random.
2. Client mengirim code challenge (hash dari verifier) ke authorization server.
3. Authorization server mengembalikan authorization code.
4. Client menukar code dengan access token menggunakan code verifier.

PKCE mencegah attacker yang menyadap authorization code dari menukarnya menjadi token.

## Refresh Token Rotation

Access token umumnya berumur pendek. Refresh token yang berumur lebih panjang digunakan untuk mendapatkan access token baru. Praktik terbaik:

- Simpan hash refresh token di database, bukan plain text.
- Rotasi refresh token setiap kali digunakan: token lama dihapus, token baru diterbitkan.
- Invalidasi semua refresh token saat logout atau deteksi penyalahgunaan.`,
    },
    {
      id: 'sec-02-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'auth.service.ts',
        language: 'typescript',
        title: 'TypeScript: NestJS AuthService dengan Refresh Token',
        code: `import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

interface User {
  id: number
  email: string
  hash: string
}

@Injectable()
export class AuthService {
  private users: Map<number, User> = new Map()

  constructor(private jwtService: JwtService) {}

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 12)
    const id = this.users.size + 1
    this.users.set(id, { id, email, hash })
    return { id, email }
  }

  async login(email: string, password: string) {
    const user = Array.from(this.users.values()).find((u) => u.email === email)
    if (!user || !(await bcrypt.compare(password, user.hash))) {
      throw new UnauthorizedException('invalid credentials')
    }

    const payload = { sub: user.id, email: user.email }
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(
        { sub: user.id, type: 'refresh' },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }
      ),
    }
  }

  refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      })
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('invalid token type')
      }
      return {
        accessToken: this.jwtService.sign({ sub: payload.sub }),
      }
    } catch {
      throw new UnauthorizedException('invalid refresh token')
    }
  }
}`,
        explanation:
          'NestJS AuthService menyatukan hashing, signing, dan verification. Refresh token memiliki secret dan klaim tipe tersendiri agar tidak disalahgunakan sebagai access token.',
      },
    },
    {
      id: 'sec-02-advanced-auth-internals',
      type: 'markdown',
      level: 'advanced',
      title: 'JWT Signing, bcrypt Internals, dan Passkeys',
      content: `## Bagaimana JWT Ditandatangani dan Diverifikasi

Untuk algoritma HS256:

1. Header dan payload di-encode ke base64url (URL-safe base64 tanpa padding).
2. Dibentuk string \`base64url(header) + "." + base64url(payload)\`.
3. String tersebut di-hash dengan HMAC-SHA256 menggunakan secret key.
4. Hasil hash di-encode base64url menjadi signature.
5. Verifikasi mengulang langkah 1–3 dan membandingkan signature. Jika cocok, integritas dan asal token terjamin.

Algoritma RS256 menggunakan pasangan kunci RSA privat untuk sign dan publik untuk verify. Ini memungkinkan service lain memverifikasi token tanpa mengetahui private key.

## bcrypt Internals

bcrypt menggunakan varian Eksblowfish:

- **Salt**: 16 byte random di-encode menjadi 22 karakter base64.
- **Cost**: eksponen dari jumlah iterasi, misalnya cost 12 berarti 2^12 putaran.
- **Hash**: hasil 24 byte di-encode menjadi 31 karakter.
- Format hasil: \`$2b$cost$salthash\`.

Karena setiap password mendapat salt unik, rainbow table tidak efektif. Cost factor dapat dinaikkan seiring meningkatnya daya komputasi.

## MFA dan Passkeys

- **TOTP**: time-based one-time password yang dihasilkan dari secret bersama dan timestamp 30 detik.
- **Passkeys / WebAuthn**: menggunakan kunci privat di perangkat pengguna untuk menandatangani challenge dari server. Tidak ada password yang dapat dicuri atau dipishing.`,
    },
    {
      id: 'sec-02-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: JWT Sign dan Verify dengan golang-jwt',
        code: `package main

import (
	"fmt"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var secret = []byte("ganti-dengan-secret-yang-kuat-dari-env")

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func checkPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func createToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(15 * time.Minute).Unix(),
		"iat": time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secret)
}

func verifyToken(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secret, nil
	})
}

func main() {
	hash, _ := hashPassword("rahasia")
	fmt.Println("valid:", checkPassword("rahasia", hash))

	token, _ := createToken(42)
	parsed, err := verifyToken(token)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("valid token:", parsed.Valid)
}`,
        explanation:
          'golang-jwt memisahkan pembuatan token dan verifikasi. Verifikasi memeriksa algoritma agar tidak terjadi algoritm confusion attack. bcrypt menggunakan DefaultCost yang aman secara default.',
      },
    },
    {
      id: 'sec-02-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Autentikasi yang kuat menggabungkan hashing password yang lambat (bcrypt), token dengan masa hidup pendek, refresh token yang dirotasi, dan opsi modern seperti passkeys. Pahami internals JWT dan bcrypt agar tidak salah menganggap token sama dengan session server-side.',
    },
  ],
}
