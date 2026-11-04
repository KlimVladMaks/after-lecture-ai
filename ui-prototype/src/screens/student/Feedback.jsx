import { useEffect, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Info,
  MessageSquareQuote,
  Send,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppShell, PageHeader } from '../../components/Layout.jsx'
import {
  Badge,
  Button,
  Card,
  Rating,
  Textarea,
} from '../../components/ui.jsx'
import { MOCK_LECTURE } from '../../data/mockData.js'
import { useDemo } from '../../state/DemoContext.jsx'

export default function Feedback() {
  const navigate = useNavigate()
  const { attempt, startAttempt, submitFeedback } = useDemo()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!attempt) startAttempt()
    // Создаём попытку только при прямом открытии экрана.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lecture = attempt?.lecture ?? MOCK_LECTURE

  const handleSubmit = (event) => {
    event.preventDefault()

    if (rating === 0) {
      setError('Поставьте оценку лекции от 1 до 5.')
      return
    }

    setError('')
    submitFeedback(rating, comment.trim())
    navigate('/result')
  }

  if (attempt?.status === 'completed') {
    return (
      <AppShell
        header={
          <PageHeader
            title="Отзыв о лекции"
            subtitle={lecture.title}
            backTo="/home"
          />
        }
        nav={false}
      >
        <Card className="border-emerald-200 bg-emerald-50 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-emerald-900">
            Опрос уже завершён
          </p>
          <p className="mt-1 text-xs leading-relaxed text-emerald-800">
            Повторная отправка не создаёт вторую завершённую попытку.
          </p>
        </Card>

        <Button
          className="mt-4 w-full"
          onClick={() => navigate('/result')}
        >
          Посмотреть результат
        </Button>
      </AppShell>
    )
  }

  return (
    <AppShell
      header={
        <PageHeader
          title="Отзыв о лекции"
          subtitle={lecture.title}
          backTo="/quiz"
        />
      }
      nav={false}
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Card>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <Badge tone="indigo">Последний шаг</Badge>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                Как прошла лекция?
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {lecture.teacher} · {lecture.date}
              </p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <MessageSquareQuote className="h-5 w-5" />
            </div>
          </div>

          <Rating
            value={rating}
            onChange={(value) => {
              setRating(value)
              setError('')
            }}
          />
        </Card>

        <Card>
          <Textarea
            label="Комментарий (необязательно)"
            name="comment"
            rows={4}
            maxLength={2000}
            placeholder="Что было понятно? Что стоит объяснить подробнее?"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <p className="mt-1.5 text-right text-[11px] text-slate-400">
            {comment.length} / 2000
          </p>
        </Card>

        {error ? (
          <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs text-rose-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900">
          <div className="mb-1 flex items-center gap-1.5 font-semibold">
            <Info className="h-3.5 w-3.5" />
            Без отзыва опрос не завершён
          </div>
          Отправка отзыва обязательна для отметки об участии. Оценка лекции и
          результаты ответов не влияют на учебные баллы.
        </div>

        <Button type="submit" size="lg" className="w-full">
          Отправить отзыв
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </AppShell>
  )
}
