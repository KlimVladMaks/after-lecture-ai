import { Bell, MessageSquareQuote } from 'lucide-react'

export function TeacherComment({ text, teacher }) {
  return (
    <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-indigo-700">
        <MessageSquareQuote className="h-4 w-4" />
        Комментарий преподавателя
      </div>
      <p className="mt-2 text-sm leading-relaxed text-indigo-950">{text}</p>
      <p className="mt-2 text-xs font-medium text-indigo-700">{teacher}</p>
      <p className="mt-3 flex items-start gap-1.5 border-t border-indigo-200 pt-2.5 text-[11px] leading-relaxed text-indigo-600">
        <Bell className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Приходит push-уведомлением, но доступен в истории даже без него.
      </p>
    </section>
  )
}
