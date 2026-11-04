import {
  AlertCircle,
  Check,
  CheckCircle2,
  Info,
  Loader2,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { RESULT_LABELS } from '../data/mockData.js'

const BUTTON_VARIANTS = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 disabled:hover:bg-indigo-600',
  light: 'bg-white text-indigo-700 hover:bg-indigo-50',
  secondary:
    'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
  ghost: 'text-slate-600 hover:bg-slate-100',
  dangerGhost: 'text-rose-600 hover:bg-rose-50',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
}

const BUTTON_SIZES = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-5 py-3.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
      {...props}
    />
  )
}

export function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 ${className}`}
    >
      {children}
    </div>
  )
}

const BADGE_TONES = {
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200',
  slate: 'bg-slate-100 text-slate-600 ring-slate-200',
}

export function Badge({ tone = 'slate', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${BADGE_TONES[tone] ?? BADGE_TONES.slate} ${className}`}
    >
      {children}
    </span>
  )
}

export function ProgressBar({ value = 0, className = '' }) {
  const safeValue = Math.min(100, Math.max(0, value))

  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(safeValue)}
    >
      <div
        className="h-full rounded-full bg-indigo-600 transition-all duration-500"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}

export function Spinner({ className = 'h-5 w-5' }) {
  return (
    <Loader2
      className={`animate-spin text-indigo-600 ${className}`}
      aria-hidden="true"
    />
  )
}

export function DemoHint({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 p-3.5 text-xs leading-relaxed text-amber-900 ${className}`}
    >
      <div className="mb-1 flex items-center gap-1.5 font-semibold">
        <Info className="h-3.5 w-3.5" />
        Демо-подсказка
      </div>
      {children}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      {Icon ? (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      {text ? (
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{text}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

export function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        checked ? 'bg-indigo-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}

const FIELD_BASE =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2'
const FIELD_OK = 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-200'
const FIELD_ERROR = 'border-rose-300 focus:border-rose-400 focus:ring-rose-200'

export function TextField({
  label,
  hint,
  error,
  id,
  trailing,
  className = '',
  ...props
}) {
  const inputId = id || props.name

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        <input
          id={inputId}
          className={`${FIELD_BASE} ${error ? FIELD_ERROR : FIELD_OK} ${
            trailing ? 'pr-14' : ''
          }`}
          {...props}
        />
        {trailing ? (
          <div className="absolute inset-y-0 right-1 flex items-center">
            {trailing}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  )
}

export function Textarea({ label, hint, error, id, className = '', ...props }) {
  const inputId = id || props.name

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={inputId}
        className={`${FIELD_BASE} resize-none ${error ? FIELD_ERROR : FIELD_OK}`}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  )
}

export function ChoiceOption({
  selected = false,
  multiple = false,
  disabled = false,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      role={multiple ? 'checkbox' : 'radio'}
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-60 ${
        selected
          ? 'border-indigo-500 bg-indigo-50 text-indigo-950'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 ${
          multiple ? 'rounded-md' : 'rounded-full'
        } ${
          selected
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 bg-white'
        }`}
      >
        {selected ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
      </span>
      <span className="leading-snug">{children}</span>
    </button>
  )
}

export function Rating({ value, onChange }) {
  return (
    <div>
      <div className="flex gap-2" role="radiogroup" aria-label="Оценка лекции">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={`Оценка ${score} из 5`}
            onClick={() => onChange(score)}
            className={`flex h-12 flex-1 items-center justify-center rounded-xl border text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              value === score
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
        <span>Совсем не понятно</span>
        <span>Всё понятно</span>
      </div>
    </div>
  )
}

export function ChatBubble({ variant = 'bot', className = '', children }) {
  if (variant === 'student') {
    return (
      <div
        className={`ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-indigo-600 px-4 py-3 text-sm leading-relaxed text-white ${className}`}
      >
        {children}
      </div>
    )
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
        {children}
      </div>
    </div>
  )
}

const FEEDBACK_STYLES = {
  correct: {
    icon: CheckCircle2,
    label: 'Верно',
    box: 'border-emerald-200 bg-emerald-50',
    title: 'text-emerald-800',
    iconColor: 'text-emerald-600',
    text: 'text-emerald-900/80',
  },
  partial: {
    icon: AlertCircle,
    label: 'Частично верно',
    box: 'border-amber-200 bg-amber-50',
    title: 'text-amber-800',
    iconColor: 'text-amber-600',
    text: 'text-amber-900/80',
  },
  incorrect: {
    icon: XCircle,
    label: 'Есть неточность',
    box: 'border-rose-200 bg-rose-50',
    title: 'text-rose-800',
    iconColor: 'text-rose-600',
    text: 'text-rose-900/80',
  },
}

export function FeedbackCard({ result = 'incorrect', text, className = '' }) {
  const meta = FEEDBACK_STYLES[result] ?? FEEDBACK_STYLES.incorrect
  const Icon = meta.icon

  return (
    <div className={`rounded-2xl border p-3.5 ${meta.box} ${className}`}>
      <div
        className={`flex items-center gap-2 text-sm font-semibold ${meta.title}`}
      >
        <Icon className={`h-4 w-4 ${meta.iconColor}`} />
        {meta.label}
      </div>
      <p className={`mt-1.5 text-xs leading-relaxed ${meta.text}`}>{text}</p>
    </div>
  )
}

const RESULT_TONES = {
  correct: 'green',
  partial: 'amber',
  incorrect: 'rose',
}

export function ResultBadge({ result }) {
  return (
    <Badge tone={RESULT_TONES[result] ?? 'slate'}>
      {RESULT_LABELS[result] ?? 'Нет результата'}
    </Badge>
  )
}


