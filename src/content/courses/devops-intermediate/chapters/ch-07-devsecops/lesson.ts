import type { Lesson } from '@/content/types'

export const ch07DevsecopsLesson: Lesson = {
  id: "lesson-ch-07-devsecops",
  estimatedMinutes: 45,
  sections: [
    {
      id: "sec-07-basic-shift-left",
      type: 'markdown',
      level: "basic",
      title: "Shift-Left Security",
      content: "## Shift-Left\n\nShift-left berarti memindahkan aktivitas security ke awal siklus pengembangan. Semakin cepat kerentanan ditemukan, semakin murah biaya perbaikannya.\n\n## Dependency Scanning\n\nAplikasi modern bergantung pada ratusan library. Dependency scanner memeriksa library yang digunakan terhadap database CVE seperti NVD dan OSV. Contoh tool: Snyk, npm audit, OWASP Dependency-Check.\n\n## Secret Scanning\n\nSecret scanning memeriksa source code dan history untuk mendeteksi API key, password, token, atau credential. Integrasikan di pre-commit dan CI.\n\n## Security adalah Tanggung Jawab Bersama\n\nDevSecOps menghilangkan silo antara development, security, dan operations. Security bukan hanya tugas tim security; setiap engineer bertanggung jawab menulis kode yang aman dan mengamankan pipeline.",
    },
    {
      id: "sec-07-js-example",
      type: 'code-example',
      codeExample: {
        id: "code-07-js",
        filename: "audit-parser.js",
        language: "javascript",
        title: "JavaScript: Parser Output npm audit",
        code: "const auditOutput = {\n  vulnerabilities: {\n    lodash: { severity: 'high', via: ['CVE-2021-23337'] },\n    express: { severity: 'moderate', via: ['CVE-2022-24999'] },\n  },\n}\n\nfunction summarizeAudit(output) {\n  const counts = { low: 0, moderate: 0, high: 0, critical: 0 }\n  for (const [pkg, info] of Object.entries(output.vulnerabilities)) {\n    counts[info.severity] = (counts[info.severity] || 0) + 1\n    console.log(`${pkg}: ${info.severity} - ${info.via.join(', ')}`)\n  }\n  return counts\n}\n\nconst counts = summarizeAudit(auditOutput)\nif (counts.high + counts.critical > 0) {\n  console.error('Terdapat kerentanan tinggi/kritis, build harus dihentikan')\n  process.exit(1)\n}\nconsole.log('Audit summary:', counts)",
        explanation: "Parser ini mengkategorikan severity kerentanan dari npm audit. Pipeline CI dapat menggunakan hasilnya untuk memutuskan apakah build boleh lanjut.",
      },
    },
    {
      id: "sec-07-intermediate-sast-dast",
      type: 'markdown',
      level: "intermediate",
      title: "SAST, DAST, dan Container Image Scanning",
      content: "## SAST\n\nStatic Application Security Testing menganalisis source code tanpa menjalankan aplikasi. SAST dapat mendeteksi SQL injection, XSS, insecure deserialization, dan pola kode berbahaya. Contoh tool: SonarQube, Semgrep, Bandit, CodeQL.\n\n## DAST\n\nDynamic Application Security Testing menguji aplikasi yang sedang berjalan. DAST mensimulasikan serangan seperti fuzzing input dan pemindaian endpoint. Contoh tool: OWASP ZAP, Burp Suite.\n\n## Container Image Scanning\n\nImage scanner memeriksa layer container terhadap database CVE. Tool seperti Trivy, Snyk Container, dan Clair dapat diintegrasikan saat build image dan sebelum deploy.\n\n## CI Pipeline Integration\n\nTahapan security di CI/CD:\n\n1. Secret scanning dan linting pada setiap commit.\n2. Dependency scanning setelah install.\n3. SAST setelah build/compile.\n4. Image scanning setelah docker build.\n5. DAST di staging environment.\n\nGagalkan build jika ditemukan kerentanan kritis atau policy violation.",
    },
    {
      id: "sec-07-ts-example",
      type: 'code-example',
      codeExample: {
        id: "code-07-ts",
        filename: "vulnerability-aggregator.ts",
        language: "typescript",
        title: "TypeScript: Aggregator Laporan Vulnerability",
        code: "type Severity = 'low' | 'medium' | 'high' | 'critical'\n\ninterface Vulnerability {\n  id: string\n  package: string\n  severity: Severity\n  source: 'sast' | 'dast' | 'container' | 'dependency'\n}\n\nconst reports: Vulnerability[] = [\n  { id: 'CVE-2023-0001', package: 'lodash', severity: 'high', source: 'dependency' },\n  { id: 'CVE-2023-0002', package: 'openssl', severity: 'critical', source: 'container' },\n  { id: 'SQL-001', package: 'auth.ts', severity: 'medium', source: 'sast' },\n]\n\nfunction aggregate(reports: Vulnerability[]) {\n  const bySeverity: Record<Severity, number> = { low: 0, medium: 0, high: 0, critical: 0 }\n  for (const r of reports) {\n    bySeverity[r.severity]++\n  }\n  return bySeverity\n}\n\nconsole.log(aggregate(reports))\nif (reports.some((r) => r.severity === 'critical')) {\n  console.error('Ditemukan kerentanan kritis')\n}",
        explanation: "Aggregator ini menggabungkan temuan dari berbagai sumber scanning. Tim security dapat menggunakannya untuk memprioritaskan perbaikan berdasarkan severity.",
      },
    },
    {
      id: "sec-07-advanced-supply-chain",
      type: 'markdown',
      level: "advanced",
      title: "SBOM, Supply Chain Security, dan Signing Artifacts",
      content: "## SBOM\n\nSoftware Bill of Materials (SBOM) adalah daftar komponen yang membentuk software: library, package, licensi, dan versi. Format populer: SPDX dan CycloneDX. SBOM membantu organisasi merespons CVE dengan cepat.\n\n## Supply Chain Security\n\nSupply chain attack menargetkan dependency, build system, atau distribution channel. Contoh: kompromi package registry, malicious dependency, atau modifikasi artifact.\n\n## Signing Artifacts\n\nMenandatangani artifact seperti image container dan binary memastikan integritas dan asal usul. Tool:\n\n- **Sigstore/cosign**: signing image container dengan transparency log.\n- **Notary**: signing image untuk Docker Content Trust.\n- **Gitsign**: signing commit dengan Sigstore.\n\n## SLSA\n\nSLSA (Supply-chain Levels for Software Artifacts) mendefinisikan empat level keandalan build:\n\n- Level 1: SBOM dan provenance dasar.\n- Level 2: Build signed dan hermetic.\n- Level 3: Build isolated dan audited.\n- Level 4: Reproducible build dan two-person review.\n\n## Reproducible Builds\n\nReproducible build menghasilkan binary yang identik bit-for-bit dari source yang sama. Ini memungkinkan verifikasi independen bahwa artifact yang dideploy benar-benar berasal dari source code yang di-review.\n\n## Runtime Security\n\nSelain scanning, pantau runtime dengan tools seperti Falco untuk mendeteksi perilaku anomali di container dan host.",
    },
    {
      id: "sec-07-go-example",
      type: 'code-example',
      codeExample: {
        id: "code-07-go",
        filename: "image-scan.go",
        language: "go",
        title: "Go: Menjalankan Container Image Scan",
        code: "package main\n\nimport (\n\t\"fmt\"\n\t\"os/exec\"\n)\n\nfunc scanImage(image string) error {\n\tcmd := exec.Command(\"trivy\", \"image\", \"--severity\", \"HIGH,CRITICAL\", \"--exit-code\", \"1\", image)\n\tout, err := cmd.CombinedOutput()\n\tfmt.Println(string(out))\n\treturn err\n}\n\nfunc main() {\n\tif err := scanImage(\"myapp:latest\"); err != nil {\n\t\tfmt.Println(\"Scan menemukan kerentanan kritis\")\n\t} else {\n\t\tfmt.Println(\"Image lolos scanning\")\n\t}\n}",
        explanation: "Pipeline CI dapat memanggil scanner seperti Trivy dari Go atau shell. Exit code non-zero menghentikan build jika ditemukan kerentanan dengan severity tinggi.",
      },
    },
    {
      id: "sec-07-summary",
      type: 'callout',
      calloutType: "info",
      content: "**Kesimpulan:** DevSecOps membuat security menjadi bagian dari alur kerja sehari-hari. Shift-left scanning, SAST/DAST, image scanning, SBOM, dan signing artifact membantu melindungi aplikasi dari kode hingga production.",
    },
  ],
}
