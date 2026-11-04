import { useState } from 'react'
import { AlertCircle, Eye, EyeOff, LogIn, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/Layout.jsx'
import { Button, DemoHint, TextField } from '../../components/ui.jsx'
import { DEMO_CREDENTIALS } from '../../data/mockData.js'
import { useDemo } from '../../state/DemoContext.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const navigate = useNavigate()
  const { login } = useDemo()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

    setError('')
    login(normalizedEmail)
    navigate('/home')
  }

  const handleDemoLogin = () => {
    setError('')
    login(DEMO_CREDENTIALS.email)
    navigate('/home')
  }

  const passwordToggle = (
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
  )

  return (
    <AuthShell
      title="Вход в приложение"
      subtitle="Проверяйте себя после лекций и отмечайтесь об участии. Результаты опроса не влияют на учебные оценки."
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {error ? (
          <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs text-rose-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

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
          autoComplete="current-password"
          placeholder="Не менее 4 символов"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          trailing={passwordToggle}
        />

        <Button type="submit" size="lg" className="w-full">
          Войти
          <LogIn className="h-4 w-4" />
        </Button>
      </form>

      <div className="mt-3 flex items-center justify-between text-xs">
        <Link
          to="/reset"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Забыли пароль?
        </Link>
        <Link
          to="/register"
          className="font-medium text-slate-600 hover:text-slate-800"
        >
          Создать аккаунт
        </Link>
      </div>

      <DemoHint className="mt-6">
        <p>
          Демо-вход: <span className="font-semibold">student@example.com</span> /{' '}
          <span className="font-semibold">1234</span>. В прототипе принимается
          любой корректный email и пароль от 4 символов.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-2.5 w-full"
          onClick={handleDemoLogin}
        >
          <Mail className="h-4 w-4" />
          Войти в демо-режиме
        </Button>
      </DemoHint>

      <p className="mt-auto pt-8 text-center text-[11px] leading-relaxed text-slate-400">
        Учебный прототип. Все данные вымышленные.
      </p>
    </AuthShell>
  )
}
