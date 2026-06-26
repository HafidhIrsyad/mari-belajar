import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
  title?: string
  explanation?: string
}

const languageLabels: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  go: 'Go',
  text: 'Text',
}

export function CodeBlock({
  code,
  language,
  filename,
  title,
  explanation,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Silently fail if clipboard is unavailable.
    }
  }

  const displayLanguage = languageLabels[language] ?? language
  const displayTitle = title || filename || displayLanguage

  return (
    <div className="my-6 overflow-hidden rounded-lg bg-[#1E293B] text-[#E2E8F0]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {displayTitle}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
      {explanation && (
        <div className="border-t border-white/10 px-5 py-3 text-sm text-slate-400">
          {explanation}
        </div>
      )}
    </div>
  )
}

export function InlineCode({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <code
      className={cn(
        'rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground',
        className
      )}
    >
      {children}
    </code>
  )
}
