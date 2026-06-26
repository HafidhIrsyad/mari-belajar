import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './code-block'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-lesson">
      <ReactMarkdown
        components={{
          p({ children }) {
            return <p className="mb-5 leading-[1.7] text-foreground">{children}</p>
          },
          ul({ children }) {
            return <ul className="mb-5 list-disc space-y-2 pl-6 text-foreground">{children}</ul>
          },
          ol({ children }) {
            return <ol className="mb-5 list-decimal space-y-2 pl-6 text-foreground">{children}</ol>
          },
          strong({ children }) {
            return <strong className="font-semibold text-foreground">{children}</strong>
          },
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : 'text'
            const codeString = String(children).replace(/\n$/, '')

            if (className && match) {
              return (
                <CodeBlock
                  code={codeString}
                  language={language}
                  title={language}
                />
              )
            }

            return (
              <code
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
