import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  DEMO_RESULT,
  DEMO_STUDENT,
  MOCK_HISTORY,
  MOCK_LECTURE,
  QUIZ_QUESTIONS,
} from '../data/mockData.js'

const DemoContext = createContext(null)

const RESULT_SCORE = { correct: 1, partial: 0.5, incorrect: 0 }

export function formatAnswer(question, value) {
  if (!value) return 'Нет ответа'
  if (question.type === 'short') return value
  return value.map((index) => question.options[index]).join('; ')
}

// Учебная имитация проверки: короткий ответ оценивается по длине текста,
// тестовые вопросы — по совпадению выбранных вариантов.
function evaluateAnswer(question, value) {
  if (question.type === 'short') {
    const text = String(value ?? '').trim()

    if (text.length >= 30) {
      return {
        result: 'correct',
        explanation: `ИИ сравнил смысл ответа с материалом лекции. ${question.explanation}`,
      }
    }

    if (text.length >= 10) {
      return {
        result: 'partial',
        explanation: `ИИ отметил частичное понимание: мысль есть, но её стоит раскрыть подробнее. ${question.explanation}`,
      }
    }

    return {
      result: 'incorrect',
      explanation: `Ответ слишком короткий, чтобы подтвердить понимание темы. ${question.explanation}`,
    }
  }

  const correct = [...question.correct].sort((a, b) => a - b)
  const selected = [...value].sort((a, b) => a - b)
  const exact =
    correct.length === selected.length &&
    correct.every((item, index) => item === selected[index])

  if (exact) {
    return { result: 'correct', explanation: `Верно. ${question.explanation}` }
  }

  const onlyKnownOptions =
    selected.length > 0 && selected.every((item) => correct.includes(item))

  if (question.type === 'multiple' && onlyKnownOptions) {
    return {
      result: 'partial',
      explanation: `Частично верно: выбрана только часть правильных вариантов. ${question.explanation}`,
    }
  }

  const correctText = question.correct
    .map((index) => question.options[index])
    .join('; ')

  return {
    result: 'incorrect',
    explanation: `Неверно. Правильный ответ: ${correctText}. ${question.explanation}`,
  }
}

function calcUnderstanding(answers) {
  const checked = QUIZ_QUESTIONS.map((question) => answers[question.id]).filter(
    (answer) => answer?.result,
  )

  if (checked.length === 0) return null

  const total = checked.reduce(
    (sum, answer) => sum + (RESULT_SCORE[answer.result] ?? 0),
    0,
  )

  return Math.round((total / checked.length) * 100)
}

function formatNow() {
  return new Date().toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function buildResult(answers, rating, comment) {
  const dialog = QUIZ_QUESTIONS.map((question) => {
    const answer = answers[question.id]

    return {
      question: question.text,
      answer: answer ? formatAnswer(question, answer.value) : 'Нет ответа',
      result: answer?.result ?? 'incorrect',
      explanation: answer?.explanation || question.explanation,
    }
  })

  return {
    id: `attempt-${Date.now()}`,
    title: MOCK_LECTURE.title,
    teacher: MOCK_LECTURE.teacher,
    date: MOCK_LECTURE.date,
    lecture: MOCK_LECTURE,

    completedAt: formatNow(),
    understanding: calcUnderstanding(answers),
    rating,
    comment,
    teacherComment: null,
    dialog,
  }
}

function createAttempt() {
  return {
    lecture: MOCK_LECTURE,
    status: 'in_progress',
    answers: {},
    feedback: null,
    startedAt: Date.now(),
  }
}

export function DemoProvider({ children }) {
  const [user, setUser] = useState(DEMO_STUDENT)
  const [attempt, setAttempt] = useState(null)
  const [history, setHistory] = useState(MOCK_HISTORY)
  const [lastResult, setLastResult] = useState(null)
  const [demo, setDemo] = useState({ aiError: false, emptyHistory: false })

  const timersRef = useRef([])
  const demoRef = useRef(demo)

  useEffect(() => {
    demoRef.current = demo
  }, [demo])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const login = useCallback((email) => {
    const normalized = email?.trim()
    setUser((prev) => ({ ...prev, email: normalized || prev.email }))
  }, [])

  const logout = useCallback(() => {
    setUser(DEMO_STUDENT)
    setAttempt(null)
    setLastResult(null)
  }, [])

  const startAttempt = useCallback(() => {
    setAttempt((prev) =>
      prev && prev.status !== 'completed' ? prev : createAttempt(),
    )
  }, [])

  const runCheck = useCallback((question) => {
    const timer = window.setTimeout(() => {
      setAttempt((prev) => {
        if (!prev) return prev

        const saved = prev.answers[question.id]
        if (!saved) return prev

        if (demoRef.current.aiError) {
          return {
            ...prev,
            answers: {
              ...prev.answers,
              [question.id]: {
                ...saved,
                pending: false,
                error:
                  'Сервис ИИ временно недоступен. Ответ сохранён — проверку можно повторить.',
              },
            },
          }
        }

        const evaluation = evaluateAnswer(question, saved.value)

        return {
          ...prev,
          answers: {
            ...prev.answers,
            [question.id]: {
              ...saved,
              ...evaluation,
              pending: false,
              error: null,
            },
          },
        }
      })
    }, 1100)

    timersRef.current.push(timer)
  }, [])

  const saveAnswer = useCallback(
    (question, value) => {
      setAttempt((prev) => {
        if (!prev) return prev

        return {
          ...prev,
          answers: {
            ...prev.answers,
            [question.id]: {
              value,
              result: null,
              explanation: '',
              pending: true,
              error: null,
            },
          },
        }
      })

      runCheck(question)
    },
    [runCheck],
  )

  const retryAnswer = useCallback(
    (question) => {
      setAttempt((prev) => {
        if (!prev) return prev

        const saved = prev.answers[question.id]
        if (!saved) return prev

        return {
          ...prev,
          answers: {
            ...prev.answers,
            [question.id]: { ...saved, pending: true, error: null },
          },
        }
      })

      runCheck(question)
    },
    [runCheck],
  )

  const submitFeedback = useCallback(
    (rating, comment) => {
      const hasCheckedAnswers = attempt
        ? Object.values(attempt.answers).some((answer) => answer?.result)
        : false

      const result = hasCheckedAnswers
        ? buildResult(attempt.answers, rating, comment)
        : {
            ...DEMO_RESULT,
            id: `attempt-${Date.now()}`,
            completedAt: formatNow(),
            rating,
            comment,
          }

      setHistory((prev) => [result, ...prev])
      setLastResult(result)
      setAttempt((prev) =>
        prev ? { ...prev, status: 'completed', feedback: { rating, comment } } : prev,
      )

      return result
    },
    [attempt],
  )

  const setDemoOption = useCallback((key, value) => {
    setDemo((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetDemo = useCallback(() => {
    setDemo({ aiError: false, emptyHistory: false })
    setAttempt(null)
    setLastResult(null)
    setHistory(MOCK_HISTORY)
    setUser(DEMO_STUDENT)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      attempt,
      startAttempt,
      saveAnswer,
      retryAnswer,
      submitFeedback,
      history,
      lastResult,
      demo,
      setDemoOption,
      resetDemo,
    }),
    [
      user,
      login,
      logout,
      attempt,
      startAttempt,
      saveAnswer,
      retryAnswer,
      submitFeedback,
      history,
      lastResult,
      demo,
      setDemoOption,
      resetDemo,
    ],
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const context = useContext(DemoContext)

  if (!context) {
    throw new Error('useDemo должен использоваться внутри DemoProvider')
  }

  return context
}

