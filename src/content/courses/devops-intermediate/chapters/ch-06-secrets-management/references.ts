import type { Reference } from '@/content/types'

export const ch06SecretsManagementReferences: Reference[] = [
  {
    id: 'ref-06-01',
    title: "HashiCorp Vault Documentation",
    url: "https://developer.hashicorp.com/vault/docs",
    description: "Dokumentasi resmi Vault untuk secrets management dan dynamic credentials.",
    type: "documentation",
  },
  {
    id: 'ref-06-02',
    title: "Mozilla SOPS",
    url: "https://github.com/getsops/sops",
    description: "Tool untuk mengenkripsi file YAML/JSON dengan KMS sehingga dapat disimpan di Git.",
    type: "interactive",
  },
  {
    id: 'ref-06-03',
    title: "AWS Secrets Manager Documentation",
    url: "https://docs.aws.amazon.com/secretsmanager/",
    description: "Dokumentasi managed secret manager di AWS.",
    type: "documentation",
  },
  {
    id: 'ref-06-04',
    title: "Sealed Secrets",
    url: "https://github.com/bitnami-labs/sealed-secrets",
    description: "Kubernetes CRD untuk menyimpan secret terenkripsi di Git.",
    type: "interactive",
  },
  {
    id: 'ref-06-05',
    title: "GitHub — Secret scanning",
    url: "https://docs.github.com/en/code-security/secret-scanning",
    description: "Fitur GitHub untuk mendeteksi secret yang tidak sengaja ter-commit.",
    type: "article",
  },
]
