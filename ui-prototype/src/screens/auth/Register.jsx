import { useState } from 'react'
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  UserPlus,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/Layout.jsx'
import { Badge, Button, DemoHint, TextField } from '../../components/ui.jsx'
import { useDemo } from '../../state/DemoContext.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Register() {
  const navigate = useNavigate()
  const { login } = useDemo()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const normalizedEmail = email.trim()

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError('Введите корректный email.')
      return
    }

    if (password.length < 4) {
      setError('Пароль должен содержать не менее 4 символов.')
      return
    }

    if (password !== confirmation) {
      setError('Пароли не совпадают.')
      return
    }

    setError('')
    login(normalizedEmail)
    navigate('/home')
  }

  return (
    <AuthShell
      title="Регистрация"
      subtitle="Один аккаунт — одна роль. В этом прототипе доступен только сценарий студента."
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {error ? (
          <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs text-rose-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-700">Роль</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-pressed="true"
              className="flex items-center gap-2 rounded-xl border border-indigo-500 bg-indigo-50 px-3 py-3 text-left text-sm font-medium text-indigo-900"
            >
              <GraduationCap className="h-5 w-5 shrink-0 text-indigo-600" />
              <span className="flex-1">Студент</span>
              <Check className="h-4 w-4 text-indigo-600" />
            </button>
            <button
              type="button"
              disabled
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left text-sm font-medium text-slate-400"
            >
              <UserRound className="h-5 w-5 shrink-0" />
              <span className="flex-1">Преподаватель</span>
              <Badge tone="slate">позже</Badge>
            </button>
          </div>
        </div>

        <TextField
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="student@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <TextField
          label="Пароль"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Не менее 4 символов"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        <TextField
          label="Повторите пароль"
          name="confirmation"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Ещё раз"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
        />

        <Button type="submit" size="lg" className="w-full">
          Создать аккаунт
          <UserPlus className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-600">
        Уже есть аккаунт?{' '}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Войти
        </Link>
      </p>

      <DemoHint className="mt-6">
        Интерфейс преподавателя появится в следующих версиях прототипа. Сейчас
        регистрация доступна только с ролью «Студент».
      </DemoHint>

      <p className="mt-auto pt-8 text-center text-[11px] leading-relaxed text-slate-400">
        Учебный прототип. Все данные вымышленные.
      </p>
    </AuthShell>
  )
}
