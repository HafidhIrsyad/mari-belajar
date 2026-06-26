import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'
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
    <figure className="my-6 overflow-hidden rounded-lg border border-code-border bg-code-bg">
      <figcaption className="flex items-center justify-between border-b border-code-border px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-code-fg/80">
          <span className="font-mono font-medium">{displayTitle}</span>
          <span className="text-code-fg/50">({displayLanguage})</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-code-fg/80 hover:bg-code-border hover:text-code-fg"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </figcaption>
      <div className="overflow-x-auto p-4">
        <SyntaxHighlighter
          language={language === 'text' ? 'text' : language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '0.8125rem',
            lineHeight: '1.7',
          }}
          codeTagProps={{
            style: {
              fontFamily:
                '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {explanation && (
        <figcaption className="border-t border-code-border px-4 py-3 text-sm text-code-fg/70">
          {explanation}
        </figcaption>
      )}
    </figure>
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
