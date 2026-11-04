import { useState } from 'react'
import { AlertCircle, ArrowRight, KeyRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppShell, PageHeader } from '../../components/Layout.jsx'
import { Button, Card, DemoHint } from '../../components/ui.jsx'
import { ACCESS_CODES } from '../../data/mockData.js'
import { useDemo } from '../../state/DemoContext.jsx'

export default function JoinQuiz() {
  const navigate = useNavigate()
  const { startAttempt } = useDemo()

  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (code.length !== 4) {
      setError('Введите четыре цифры кода.')
      return
    }

    const access = ACCESS_CODES[code]

    if (!access) {
      setError('Код не найден. Проверьте четыре цифры и попробуйте снова.')
      return
    }

    if (!access.ok) {
      setError(access.reason)
      return
    }

    setError('')
    startAttempt()
    navigate('/quiz')
  }

  return (
    <AppShell
      header={
        <PageHeader
          title="Ввод кода"
          subtitle="Код выдаёт преподаватель после лекции"
          backTo="/home"
        />
      }
      nav={false}
    >
      <Card>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <KeyRound className="h-6 w-6" />
        </div>
        <h2 className="text-center text-base font-semibold text-slate-900">
          Код доступа к опросу
        </h2>
        <p className="mt-1 text-center text-xs leading-relaxed text-slate-500">
          Четыре цифры, которые преподаватель показал в конце лекции.
        </p>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            autoComplete="one-time-code"
            aria-label="Код доступа"
            placeholder="••••"
            value={code}
            onChange={(event) => {
              setCode(event.target.value.replace(/\D/g, '').slice(0, 4))
              setError('')
            }}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 text-center text-3xl font-bold tracking-[0.45em] text-slate-900 placeholder:tracking-[0.45em] placeholder:text-slate-300 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          {error ? (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs text-rose-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={code.length !== 4}
          >
            Открыть опрос
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </Card>

      <Card className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Что будет дальше
        </p>
        <ol className="mt-2 space-y-2 text-sm text-slate-600">
          <li>1. Пять коротких вопросов по материалу лекции.</li>
          <li>2. Объяснение ИИ после каждого ответа.</li>
          <li>3. Отзыв о лекции и отметка об участии.</li>
        </ol>
      </Card>

      <DemoHint className="mt-4">
        <p>
          Коды для проверки: <span className="font-semibold">4821</span> —
          успех, <span className="font-semibold">1111</span> — неверный код,{' '}
          <span className="font-semibold">0000</span> — опрос закрыт,{' '}
          <span className="font-semibold">2222</span> — дедлайн истёк.
        </p>
      </DemoHint>
    </AppShell>
  )
}
