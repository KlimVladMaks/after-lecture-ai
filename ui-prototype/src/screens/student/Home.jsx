import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  KeyRound,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppShell } from '../../components/Layout.jsx'
import { Badge, Button, Card, ProgressBar } from '../../components/ui.jsx'
import { QUIZ_QUESTIONS } from '../../data/mockData.js'
import { useDemo } from '../../state/DemoContext.jsx'

export default function Home() {
  const navigate = useNavigate()
  const { user, history, attempt, demo, lastResult } = useDemo()

  const firstName = user.name.split(' ')[0]
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  const today = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  const recent = demo.emptyHistory ? [] : history.slice(0, 2)
  const checkedCount = attempt
    ? QUIZ_QUESTIONS.filter((question) => attempt.answers[question.id]?.result)
        .length
    : 0
  const inProgress = Boolean(attempt && attempt.status !== 'completed')
  const completed = Boolean(
    attempt && attempt.status === 'completed' && lastResult,
  )

  return (
    <AppShell>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600">
            ПослеЛекции
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Здравствуйте, {firstName}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">Сегодня, {today}</p>
        </div>

        <Link
          to="/profile"
          aria-label="Профиль"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 ring-2 ring-white transition hover:bg-indigo-200"
        >
          {initials}
        </Link>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-5 text-white shadow-lg shadow-indigo-200">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <KeyRound className="h-5 w-5" />
        </div>
        <h2 className="mt-3 text-lg font-semibold">Есть код с лекции?</h2>
        <p className="mt-1 text-sm leading-relaxed text-indigo-100">
          Введите четыре цифры, чтобы открыть короткий опрос и проверить себя по
          материалу.
        </p>
        <Button
          variant="light"
          className="mt-4 w-full"
          onClick={() => navigate('/join')}
        >
          Ввести код
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {inProgress ? (
        <Card className="mt-4 border-indigo-200">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Badge tone="indigo">Попытка в процессе</Badge>
              <p className="mt-2 truncate text-sm font-semibold text-slate-900">
                {attempt.lecture.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Проверено {checkedCount} из {QUIZ_QUESTIONS.length} вопросов
              </p>
            </div>
            <BookOpenCheck className="h-8 w-8 shrink-0 text-indigo-500" />
          </div>

          <ProgressBar
            value={(checkedCount / QUIZ_QUESTIONS.length) * 100}
            className="mt-3"
          />

          <Button
            size="sm"
            className="mt-3 w-full"
            onClick={() => navigate('/quiz')}
          >
            Продолжить опрос
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      ) : null}

      {completed ? (
        <Card className="mt-4 border-emerald-200 bg-emerald-50">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Опрос завершён
          </div>
          <p className="mt-1 text-xs leading-relaxed text-emerald-800">
            {attempt.lecture.title}: участие отмечено, результат сохранён в
            истории.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3 w-full"
            onClick={() => navigate('/result')}
          >
            Посмотреть результат
          </Button>
        </Card>
      ) : null}

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Недавние опросы
          </h2>
          <Link
            to="/history"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            Вся история
          </Link>
        </div>

        {recent.length > 0 ? (
          <div className="space-y-2">
            {recent.map((item) => (
              <Link
                key={item.id}
                to={`/history/${item.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-3.5 transition hover:border-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <BookOpenCheck className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {item.date} · {item.teacher}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Badge tone="green">{item.understanding}% понимания</Badge>
                  <span className="inline-flex items-center gap-0.5 text-xs font-medium text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-center text-xs leading-relaxed text-slate-500">
            Пройденные опросы появятся здесь. Начните с кода доступа.
          </p>
        )}
      </section>

      <Card className="mt-6">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Без влияния на оценки
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Опрос нужен для самопроверки и отметки об участии. Низкий
              результат не отменяет завершённую попытку.
            </p>
          </div>
        </div>
      </Card>

    </AppShell>
  )
}
