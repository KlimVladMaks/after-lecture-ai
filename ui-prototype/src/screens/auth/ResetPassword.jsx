import { useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  MailCheck,
  ShieldCheck,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/Layout.jsx'
import { Button, Card, DemoHint, TextField } from '../../components/ui.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TITLES = {
  email: {
    title: 'Восстановление пароля',
    subtitle:
      'Укажите email аккаунта. Ответ не раскрывает, зарегистрирован ли такой адрес.',
  },
  sent: {
    title: 'Письмо отправлено',
    subtitle: 'Проверьте почту и перейдите по ссылке подтверждения.',
  },
  password: {
    title: 'Новый пароль',
    subtitle: 'Придумайте пароль от 4 символов и повторите его.',
  },
  done: {
    title: 'Пароль обновлён',
    subtitle: 'Теперь можно войти в приложение с новым паролем.',
  },
}

export default function ResetPassword() {
  const navigate = useNavigate()

  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submitEmail = (event) => {
    event.preventDefault()

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Введите корректный email.')
      return
    }

    setError('')
    setStep('sent')
  }

  const submitPassword = (event) => {
    event.preventDefault()

    if (password.length < 4) {
      setError('Пароль должен содержать не менее 4 символов.')
      return
    }

    if (password !== confirmation) {
      setError('Пароли не совпадают.')
      return
    }

    setError('')
    setStep('done')
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
    <AuthShell title={TITLES[step].title} subtitle={TITLES[step].subtitle}>
      <Link
        to="/login"
        className="mb-5 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-700"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Назад ко входу
      </Link>

      {error ? (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      {step === 'email' ? (
        <form className="space-y-4" onSubmit={submitEmail} noValidate>
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

          <Button type="submit" size="lg" className="w-full">
            Отправить ссылку
            <MailCheck className="h-4 w-4" />
          </Button>

          <DemoHint>
            В прототипе письмо не отправляется. Следующий шаг имитирует переход
            по ссылке подтверждения.
          </DemoHint>
        </form>
      ) : null}

      {step === 'sent' ? (
        <div className="space-y-4">
          <Card className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <MailCheck className="h-6 w-6" />
            </div>
            <p className="text-sm text-slate-600">
              Подтверждение отправлено на{' '}
              <span className="font-semibold text-slate-900">
                {email.trim()}
              </span>
              .
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Ссылка действует ограниченное время и может быть использована
              один раз.
            </p>
          </Card>

          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              setError('')
              setStep('password')
            }}
          >
            Имитировать подтверждение
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setStep('email')}
          >
            Изменить email
          </Button>
        </div>
      ) : null}

      {step === 'password' ? (
        <form className="space-y-4" onSubmit={submitPassword} noValidate>
          <TextField
            label="Новый пароль"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Не менее 4 символов"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            trailing={passwordToggle}
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
            Сохранить новый пароль
            <KeyRound className="h-4 w-4" />
          </Button>
        </form>
      ) : null}

      {step === 'done' ? (
        <div className="space-y-4">
          <Card className="border-emerald-200 bg-emerald-50 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-emerald-900">
              Старый пароль больше не подходит
            </p>
            <p className="mt-1 text-xs leading-relaxed text-emerald-800">
              В реальном приложении пароль сохранился бы в виде хеша. В
              прототипе изменения не сохраняются.
            </p>
          </Card>

          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Войти с новым паролем
          </Button>
        </div>
      ) : null}

    </AuthShell>
  )
}
