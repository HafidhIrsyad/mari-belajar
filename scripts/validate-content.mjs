#!/usr/bin/env node
/**
 * Validates content chapter files for structural correctness.
 *
 * Checks:
 * - Each chapter directory has index.ts, lesson.ts, quiz.ts, references.ts
 * - Quiz has exactly 8 questions
 * - passingScore matches question count
 * - Each question has 4 options
 * - References has exactly 5 items
 * - Brace and backtick balance in lesson.ts, quiz.ts, references.ts
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const chaptersDir = path.resolve(__dirname, '../src/content/courses/cs-fundamentals/chapters')

const EXPECTED_QUESTION_COUNT = 8
const EXPECTED_REFERENCE_COUNT = 5
const EXPECTED_OPTION_COUNT = 4

function walkChapterDirectories() {
  const entries = fs.readdirSync(chaptersDir, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('ch-'))
    .map((entry) => path.join(chaptersDir, entry.name))
}

function checkRequiredFiles(chapterDir) {
  const errors = []
  const required = ['index.ts', 'lesson.ts', 'quiz.ts', 'references.ts']
  for (const file of required) {
    const filePath = path.join(chapterDir, file)
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing required file: ${file}`)
    }
  }
  return errors
}

function parseQuiz(source) {
  const questionMatches = source.match(/id:\s*'q-\d{2}-\d{2}'/g)
  const questionCount = questionMatches ? questionMatches.length : 0

  const passingScoreMatch = source.match(/passingScore:\s*(\d+)/)
  const passingScore = passingScoreMatch ? Number(passingScoreMatch[1]) : null

  // Count options arrays and their items
  const optionArrayRegex = /options:\s*\[([\s\S]*?)\]/g
  let optionArrayMatch
  const optionCounts = []
  while ((optionArrayMatch = optionArrayRegex.exec(source)) !== null) {
    const items = optionArrayMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s.startsWith("'"))
    optionCounts.push(items.length)
  }

  return { questionCount, passingScore, optionCounts }
}

function parseReferences(source) {
  const refMatches = source.match(/id:\s*'ref-\d{2}(?:-\d{2})?'/g)
  return refMatches ? refMatches.length : 0
}

function checkBalance(source, fileName) {
  const errors = []
  const counts = { '(': 0, ')': 0, '[': 0, ']': 0, '{': 0, '}': 0 }
  let templateDepth = 0

  let inString = false
  let stringChar = ''
  let escaped = false

  for (const char of source) {
    const wasEscaped = escaped

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === stringChar) {
        inString = false
        if (stringChar === '`') {
          templateDepth--
        }
      }
    } else {
      if (char === '"' || char === "'") {
        inString = true
        stringChar = char
      } else if (char === '`') {
        inString = true
        stringChar = '`'
        templateDepth++
      } else if (char in counts) {
        counts[char]++
      }
    }

    // Skip structural counting for escaped backticks (they are just text)
    if (stringChar === '`' && char === '`' && wasEscaped) {
      // This was an escaped backtick inside a template literal.
      // It closed and reopened the template literal in TS semantics, but our
      // simple scanner treats it as staying inside. We already incremented
      // templateDepth when we saw the opening backtick, and we will not
      // decrement for this escaped one because we stay inString.
      // No action needed.
    }
  }

  if (counts['('] !== counts[')']) {
    errors.push(`${fileName}: unbalanced parentheses`)
  }
  if (counts['['] !== counts[']']) {
    errors.push(`${fileName}: unbalanced brackets`)
  }
  if (counts['{'] !== counts['}']) {
    errors.push(`${fileName}: unbalanced braces`)
  }
  if (templateDepth !== 0) {
    errors.push(`${fileName}: unbalanced template literals`)
  }

  return errors
}

function validateChapter(chapterDir) {
  const chapterName = path.basename(chapterDir)
  const errors = []

  errors.push(...checkRequiredFiles(chapterDir).map((e) => `${chapterName}: ${e}`))

  const quizPath = path.join(chapterDir, 'quiz.ts')
  if (fs.existsSync(quizPath)) {
    const quizSource = fs.readFileSync(quizPath, 'utf8')
    const quiz = parseQuiz(quizSource)
    if (quiz.questionCount !== EXPECTED_QUESTION_COUNT) {
      errors.push(
        `${chapterName}: quiz has ${quiz.questionCount} questions, expected ${EXPECTED_QUESTION_COUNT}`
      )
    }
    if (quiz.passingScore !== quiz.questionCount) {
      errors.push(
        `${chapterName}: passingScore (${quiz.passingScore}) does not match question count (${quiz.questionCount})`
      )
    }
    if (quiz.optionCounts.length !== quiz.questionCount) {
      errors.push(
        `${chapterName}: ${quiz.optionCounts.length} option arrays found, expected ${quiz.questionCount}`
      )
    }
    for (let i = 0; i < quiz.optionCounts.length; i++) {
      if (quiz.optionCounts[i] !== EXPECTED_OPTION_COUNT) {
        errors.push(
          `${chapterName}: question ${i + 1} has ${quiz.optionCounts[i]} options, expected ${EXPECTED_OPTION_COUNT}`
        )
      }
    }
  }

  const referencesPath = path.join(chapterDir, 'references.ts')
  if (fs.existsSync(referencesPath)) {
    const referencesSource = fs.readFileSync(referencesPath, 'utf8')
    const referenceCount = parseReferences(referencesSource)
    if (referenceCount !== EXPECTED_REFERENCE_COUNT) {
      errors.push(
        `${chapterName}: references has ${referenceCount} items, expected ${EXPECTED_REFERENCE_COUNT}`
      )
    }
  }

  for (const file of ['lesson.ts', 'quiz.ts', 'references.ts']) {
    const filePath = path.join(chapterDir, file)
    if (fs.existsSync(filePath)) {
      const source = fs.readFileSync(filePath, 'utf8')
      errors.push(...checkBalance(source, `${chapterName}/${file}`))
    }
  }

  return errors
}

function main() {
  const chapterDirs = walkChapterDirectories()
  const allErrors = []

  for (const chapterDir of chapterDirs) {
    allErrors.push(...validateChapter(chapterDir))
  }

  if (allErrors.length > 0) {
    console.error('Content validation failed:')
    for (const error of allErrors) {
      console.error(`  - ${error}`)
    }
    process.exit(1)
  }

  console.log(`✓ Validated ${chapterDirs.length} chapters. All checks passed.`)
}

main()
