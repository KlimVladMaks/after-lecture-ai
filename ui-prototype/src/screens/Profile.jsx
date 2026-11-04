import { useState } from 'react'
import {
  GraduationCap,
  Info,
  LogOut,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppShell, PageHeader } from '../components/Layout.jsx'
import { Badge, Button, Card, Switch } from '../components/ui.jsx'
import { useDemo } from '../state/DemoContext.jsx'

export default function Profile() {
  const navigate = useNavigate()
  const { user, demo, setDemoOption, resetDemo, logout } = useDemo()
  const [notice, setNotice] = useState('')

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  const handleReset = () => {
    resetDemo()
    setNotice('Демо-состояние сброшено.')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppShell
      header={<PageHeader title="Профиль" subtitle="Демо-аккаунт" />}
    >
      <Card>
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-slate-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
            <div className="mt-1.5">
              <Badge tone="indigo">
                <GraduationCap className="h-3 w-3" />
                {user.role}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Демо-настройки
        </p>

        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Имитировать ошибку ИИ
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                Следующий ответ не будет проверен. Ответ сохранится, проверку
                можно повторить.
              </p>
            </div>
            <Switch
              checked={demo.aiError}
              onChange={(value) => setDemoOption('aiError', value)}
              label="Имитировать ошибку ИИ"
            />
          </div>

          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Показать пустую историю
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                  На экране истории появится состояние «История пока пуста».
                </p>
              </div>
              <Switch
                checked={demo.emptyHistory}
                onChange={(value) => setDemoOption('emptyHistory', value)}
                label="Показать пустую историю"
              />
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="mt-4 w-full"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4" />
          Сбросить демо-состояние
        </Button>

        {notice ? (
          <p className="mt-2 text-center text-[11px] text-emerald-600">
            {notice}
          </p>
        ) : null}
      </Card>

      <Card className="mt-4">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              О прототипе
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Это интерактивный макет мобильного приложения. Авторизация,
              проверка ИИ, push-уведомления и сохранение данных имитируются.
              Все персональные данные и лекции вымышлены.
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              Версия 1.0 · ноябрь 2026
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs leading-relaxed text-emerald-900">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        Данные не отправляются на сервер. После перезагрузки страницы
        демо-состояние вернётся к исходному.
      </div>

      <Button
        variant="dangerGhost"
        className="mt-4 w-full"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Выйти из аккаунта
      </Button>
    </AppShell>
  )
}
