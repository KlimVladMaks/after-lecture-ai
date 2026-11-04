import { ArrowLeft, BookOpenCheck, Home, History, UserRound } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/home', label: 'Главная', icon: Home },
  { to: '/history', label: 'История', icon: History },
  { to: '/profile', label: 'Профиль', icon: UserRound },
]

export function AppShell({ header, nav = true, children }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-slate-50 shadow-2xl">
      {header}
      <main className={`flex-1 px-4 pt-5 ${nav ? 'pb-28' : 'pb-8'}`}>
        {children}
      </main>
      {nav ? <BottomNav /> : null}
    </div>
  )
}

export function PageHeader({ title, subtitle, backTo, right }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/95 backdrop-blur">
      <div className="flex min-h-14 items-center gap-1 px-2 py-1.5">
        {backTo ? (
          <Link
            to={backTo}
            aria-label="Назад"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : (
          <span className="w-2" />
        )}

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-slate-900">
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-xs text-slate-500">{subtitle}</p>
          ) : null}
        </div>

        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
    </header>
  )
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-slate-200 bg-white/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      <div className="flex">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-1 text-[11px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive ? 'text-indigo-600' : 'text-slate-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className="h-5 w-5"
                  strokeWidth={isActive ? 2.4 : 1.9}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white shadow-2xl">
      <div className="flex flex-1 flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-12">
        <div className="mb-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <BookOpenCheck className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {subtitle}
            </p>
          ) : null}
        </div>

        {children}
      </div>
    </div>
  )
}
