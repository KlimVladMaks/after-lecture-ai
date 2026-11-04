import {
  BookOpenCheck,
  ChevronRight,
  History as HistoryIcon,
  Star,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppShell, PageHeader } from '../../components/Layout.jsx'
import { Badge, Button, EmptyState } from '../../components/ui.jsx'
import { useDemo } from '../../state/DemoContext.jsx'

export default function History() {
  const navigate = useNavigate()
  const { history, demo } = useDemo()

  const items = demo.emptyHistory ? [] : history

  return (
    <AppShell
      header={<PageHeader title="История" subtitle="Пройденные опросы" />}
    >
      {items.length > 0 ? (
        <>
          <div className="space-y-2">
            {items.map((item) => (
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

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <Badge tone="green">Завершён</Badge>
                  <Badge tone="indigo">{item.understanding}% понимания</Badge>
                  <span className="inline-flex items-center gap-0.5 text-xs font-medium text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                  {item.teacherComment ? (
                    <Badge tone="amber">есть комментарий</Badge>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400">
            История сохраняется после повторного входа. Чужие диалоги
            недоступны.
          </p>
        </>
      ) : (
        <EmptyState
          icon={HistoryIcon}
          title="История пока пуста"
          text="Пройдите первый опрос по коду с лекции — он появится здесь вместе с ответами, объяснениями и комментарием преподавателя."
          action={
            <Button size="sm" onClick={() => navigate('/join')}>
              Ввести код
            </Button>
          }
        />
      )}
    </AppShell>
  )
}
