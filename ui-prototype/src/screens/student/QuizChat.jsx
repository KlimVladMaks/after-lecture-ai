import { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  RotateCcw,
  Send,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppShell, PageHeader } from '../../components/Layout.jsx'
import {
  Button,
  Card,
  ChatBubble,
  ChoiceOption,
  FeedbackCard,
  ProgressBar,
  Spinner,
} from '../../components/ui.jsx'
import { QUIZ_QUESTIONS } from '../../data/mockData.js'
import { formatAnswer, useDemo } from '../../state/DemoContext.jsx'

const TYPE_LABELS = {
  single: 'один вариант',
  multiple: 'несколько вариантов',
  short: 'короткий ответ',
}

export default function QuizChat() {
  const navigate = useNavigate()
  const { user, attempt, startAttempt, saveAnswer, retryAnswer } = useDemo()
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!attempt) startAttempt()
    // Запускаем один раз при открытии экрана.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const answers = attempt?.answers ?? {}
  const unresolvedIndex = QUIZ_QUESTIONS.findIndex(
    (question) => !answers[question.id]?.result,
  )
  const allResolved = unresolvedIndex === -1
  const checkedCount = QUIZ_QUESTIONS.filter(
    (question) => answers[question.id]?.result,
  ).length
  const currentNumber = Math.min(checkedCount + 1, QUIZ_QUESTIONS.length)
  const visibleQuestions = QUIZ_QUESTIONS.slice(
    0,
    allResolved ? QUIZ_QUESTIONS.length : unresolvedIndex + 1,
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [attempt?.answers])

  if (!attempt) {
    return (
      <AppShell
        header={<PageHeader title="Опрос по лекции" backTo="/home" />}
        nav={false}
      >
        <div className="flex justify-center py-16">
          <Spinner className="h-6 w-6" />
        </div>
      </AppShell>
    )
  }

  if (attempt.status === 'completed') {
    return (
      <AppShell
        header={
          <PageHeader
            title="Опрос по лекции"
            subtitle={attempt.lecture.title}
            backTo="/home"
          />
        }
        nav={false}
      >
        <Card className="border-emerald-200 bg-emerald-50 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-emerald-900">
            Этот опрос уже завершён
          </p>
          <p className="mt-1 text-xs leading-relaxed text-emerald-800">
            Ответы и объяснения сохранены в истории. Новый опрос открывается по
            коду с лекции.
          </p>
        </Card>

        <div className="mt-4 space-y-2">
          <Button className="w-full" onClick={() => navigate('/result')}>
            Посмотреть результат
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate('/join')}
          >
            Ввести новый код
          </Button>
        </div>
      </AppShell>
    )
  }

  const firstName = user.name.split(' ')[0]

  return (
    <AppShell
      header={
        <PageHeader
          title="Опрос по лекции"
          subtitle={attempt.lecture.title}
          backTo="/home"
        />
      }
      nav={false}
    >
      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
            <span>
              {allResolved
                ? `Все ${QUIZ_QUESTIONS.length} вопросов проверены`
                : `Вопрос ${currentNumber} из ${QUIZ_QUESTIONS.length}`}
            </span>
            <span>
              Проверено {checkedCount} из {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <ProgressBar value={(checkedCount / QUIZ_QUESTIONS.length) * 100} />
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            Доступно до {attempt.lecture.deadline}
          </p>
        </div>

        <ChatBubble>
          <p>
            Здравствуйте, {firstName}! Это короткий опрос по лекции «
            {attempt.lecture.title}».
          </p>
          <p className="mt-2">
            Отвечайте по порядку: после каждого ответа ИИ объяснит результат.
            Набор вопросов закреплён за попыткой и не меняется.
          </p>
        </ChatBubble>

        {visibleQuestions.map((question, index) => {
          const answer = answers[question.id]

          if (!answer) {
            return (
              <QuestionCard
                key={question.id}
                question={question}
                number={index + 1}
                onSubmit={(value) => saveAnswer(question, value)}
              />
            )
          }

          return (
            <AnswerBlock
              key={question.id}
              question={question}
              number={index + 1}
              answer={answer}
              onRetry={retryAnswer}
            />
          )
        })}

        {allResolved ? (
          <Card className="border-indigo-200 bg-indigo-50">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
              <CheckCircle2 className="h-5 w-5 text-indigo-600" />
              Все вопросы пройдены
            </div>
            <p className="mt-2 text-xs leading-relaxed text-indigo-800">
              Остался обязательный шаг — отзыв о лекции. Без него попытка не
              считается завершённой, а участие не отмечается.
            </p>
            <Button
              className="mt-4 w-full"
              onClick={() => navigate('/feedback')}
            >
              К отзыву о лекции
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        ) : null}

        <div ref={bottomRef} />
      </div>
    </AppShell>
  )
}

function QuestionCard({ question, number, onSubmit }) {
  const [selected, setSelected] = useState([])
  const [text, setText] = useState('')

  const multiple = question.type === 'multiple'
  const canSubmit =
    question.type === 'short' ? text.trim().length > 0 : selected.length > 0

  const toggleOption = (index) => {
    if (multiple) {
      setSelected((prev) =>
        prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index],
      )
      return
    }

    setSelected([index])
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit(question.type === 'short' ? text.trim() : selected)
  }

  return (
    <div className="space-y-2">
      <ChatBubble>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-500">
          Вопрос {number} · {TYPE_LABELS[question.type]}
        </p>
        <p className="font-medium text-slate-900">{question.text}</p>
      </ChatBubble>

      <div className="space-y-2 pl-10">
        {question.type === 'short' ? (
          <>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={3}
              maxLength={600}
              placeholder={question.placeholder}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">
                {text.length} / 600
              </span>
              <Button size="sm" onClick={handleSubmit} disabled={!canSubmit}>
                <Send className="h-4 w-4" />
                Ответить
              </Button>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              В прототипе ИИ оценивает короткий ответ по длине текста: чем
              подробнее объяснение, тем выше результат.
            </p>
          </>
        ) : (
          <>
            {question.options.map((option, index) => (
              <ChoiceOption
                key={option}
                multiple={multiple}
                selected={selected.includes(index)}
                onClick={() => toggleOption(index)}
              >
                {option}
              </ChoiceOption>
            ))}

            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-slate-400">
                {multiple
                  ? 'Можно выбрать несколько'
                  : 'Выберите один вариант'}
              </span>
              <Button size="sm" onClick={handleSubmit} disabled={!canSubmit}>
                <Send className="h-4 w-4" />
                Ответить
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function AnswerBlock({ question, number, answer, onRetry }) {
  return (
    <div className="space-y-2">
      <ChatBubble>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-500">
          Вопрос {number} · {TYPE_LABELS[question.type]}
        </p>
        <p className="font-medium text-slate-900">{question.text}</p>
      </ChatBubble>

      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-indigo-600 px-4 py-3 text-sm leading-relaxed text-white">
        {formatAnswer(question, answer.value)}
      </div>

      {answer.pending ? (
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5">
          <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-indigo-500" />
          <div>
            <p className="text-sm font-medium text-slate-800">
              ИИ проверяет ответ…
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Ответ уже сохранён. Дождитесь объяснения.
            </p>
          </div>
        </div>
      ) : answer.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-800">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            Не удалось проверить ответ
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-rose-700">
            {answer.error}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-rose-600">
            Это не неверный ответ и не завершение опроса. Ошибку ИИ можно
            отключить в профиле.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => onRetry(question)}
          >
            <RotateCcw className="h-4 w-4" />
            Повторить проверку
          </Button>
        </div>
      ) : (
        <FeedbackCard result={answer.result} text={answer.explanation} />
      )}
    </div>
  )
}


