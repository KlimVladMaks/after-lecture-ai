import {
  ArrowRight,
  CheckCircle2,
  Info,
  MessageSquareQuote,
  Star,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppShell, PageHeader } from '../../components/Layout.jsx'
import { TeacherComment } from '../../components/TeacherComment.jsx'
import {
  Button,
  Card,
  ProgressBar,
  ResultBadge,
} from '../../components/ui.jsx'
import { DEMO_RESULT } from '../../data/mockData.js'
import { useDemo } from '../../state/DemoContext.jsx'

export default function Result() {
  const navigate = useNavigate()
  const { lastResult } = useDemo()

  const result = lastResult ?? DEMO_RESULT

  return (
    <AppShell
      header={
        <PageHeader
          title="Результат"
          subtitle={result.lecture.title}
          backTo="/home"
        />
      }
      nav={false}
    >
      <div className="space-y-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-200">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-xl font-bold">Опрос завершён</h1>
          <p className="mt-1 text-sm leading-relaxed text-emerald-50">
            Участие отмечено. Это результат самопроверки, а не учебная оценка.
          </p>
          <p className="mt-3 text-xs text-emerald-100">{result.completedAt}</p>
        </div>

        <Card>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Уровень понимания
              </p>
              <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
                {result.understanding == null
                  ? '—'
                  : `${result.understanding}%`}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {result.understanding == null
                  ? 'Недостаточно данных'
                  : 'По проверенным вопросам'}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500">Оценка лекции</p>
              <div className="mt-1 flex justify-end gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= result.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <ProgressBar value={result.understanding ?? 0} className="mt-4" />

          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            Понимание = сумма результатов по вопросам ÷ число вопросов.
            Частично верный ответ даёт 0,5 балла. Показатель не влияет на
            учебные оценки.
          </p>
        </Card>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-900">
            Разбор ответов
          </h2>
          <div className="space-y-2">
            {result.dialog.map((item, index) => (
              <Card key={`${item.question}-${index}`} className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-snug text-slate-900">
                    {index + 1}. {item.question}
                  </p>
                  <ResultBadge result={item.result} />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Ваш ответ:{' '}
                  <span className="text-slate-700">{item.answer}</span>
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {item.explanation}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {result.teacherComment ? (
          <TeacherComment
            text={result.teacherComment}
            teacher={result.lecture.teacher}
          />
        ) : (
          <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-white p-3.5 text-xs leading-relaxed text-slate-500">
            <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            Преподаватель может добавить комментарий позже — он появится здесь и
            в истории.
          </div>
        )}

        {result.comment ? (
          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Ваш отзыв
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              {result.comment}
            </p>
          </Card>
        ) : null}

        <div className="flex items-start gap-2 rounded-2xl border border-sky-200 bg-sky-50 p-3.5 text-xs leading-relaxed text-sky-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
          Итоговая справка не содержит учебной отметки. Завершённая попытка
          остаётся завершённой независимо от результата.
        </div>

        <div className="space-y-2">
          <Button className="w-full" onClick={() => navigate('/history')}>
            Открыть историю
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate('/home')}
          >
            На главную
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
