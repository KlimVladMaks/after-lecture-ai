import { MessageSquareQuote } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell, PageHeader } from '../../components/Layout.jsx'
import { TeacherComment } from '../../components/TeacherComment.jsx'
import {
  Badge,
  Button,
  Card,
  ChatBubble,
  FeedbackCard,
  ProgressBar,
} from '../../components/ui.jsx'
import { MOCK_HISTORY } from '../../data/mockData.js'
import { useDemo } from '../../state/DemoContext.jsx'

export default function HistoryDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { history } = useDemo()

  const entry =
    history.find((item) => item.id === id) ?? history[0] ?? MOCK_HISTORY[0]

  return (
    <AppShell
      header={
        <PageHeader
          title={entry.title}
          subtitle={entry.date}
          backTo="/history"
        />
      }
      nav={false}
    >
      <div className="space-y-4">
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="green">Завершён</Badge>
            <Badge tone="indigo">{entry.understanding}% понимания</Badge>
            <Badge tone="amber">Оценка {entry.rating} из 5</Badge>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {entry.teacher} · {entry.completedAt}
          </p>
          <ProgressBar value={entry.understanding} className="mt-3" />
          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            Результат самопроверки, а не учебная оценка. Повторное открытие
            показывает сохранённый диалог.
          </p>
        </Card>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-900">
            Диалог по лекции
          </h2>
          <div className="space-y-4">
            {entry.dialog.map((item, index) => (
              <div key={`${item.question}-${index}`} className="space-y-2">
                <ChatBubble>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-500">
                    Вопрос {index + 1}
                  </p>
                  <p className="font-medium text-slate-900">{item.question}</p>
                </ChatBubble>

                <ChatBubble variant="student">{item.answer}</ChatBubble>

                <FeedbackCard
                  result={item.result}
                  text={item.explanation}
                />
              </div>
            ))}
          </div>
        </section>

        {entry.teacherComment ? (
          <TeacherComment
            text={entry.teacherComment}
            teacher={entry.teacher}
          />
        ) : (
          <div className="flex items-start gap-2 rounded-2xl border border-dashed border-slate-300 bg-white p-3.5 text-xs leading-relaxed text-slate-500">
            <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            Преподаватель пока не оставил комментарий. Если он появится, вы
            увидите его в конце диалога.
          </div>
        )}

        {entry.comment ? (
          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Ваш отзыв о лекции
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              {entry.comment}
            </p>
          </Card>
        ) : null}

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => navigate('/history')}
        >
          К истории
        </Button>
      </div>
    </AppShell>
  )
}
