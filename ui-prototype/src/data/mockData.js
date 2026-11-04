// Все данные вымышленные и нужны только для демонстрации интерфейса.

export const DEMO_STUDENT = {
  name: 'Анна Смирнова',
  email: 'student@example.com',
  role: 'Студент',
}

export const DEMO_CREDENTIALS = {
  email: 'student@example.com',
  password: '1234',
}

// Демонстрационные коды доступа: разные состояния опроса.
export const ACCESS_CODES = {
  '4821': { ok: true },
  '1111': {
    ok: false,
    reason: 'Код не найден. Проверьте четыре цифры и попробуйте снова.',
  },
  '0000': {
    ok: false,
    reason: 'Опрос закрыт преподавателем. Новые ответы больше не принимаются.',
  },
  '2222': {
    ok: false,
    reason: 'Срок прохождения истёк. Опрос был доступен до 4 ноября, 23:59.',
  },
}

export const MOCK_LECTURE = {
  id: 'algorithms-lists',
  title: 'Списки, стек и очередь',
  course: 'Прикладная информатика · 4 курс',
  teacher: 'Иван Петрович Петров',
  date: '4 ноября 2026, 12:00',
  deadline: '4 ноября 2026, 23:59',
}

export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    type: 'single',
    text: 'Что хранит каждый узел связного списка?',
    options: [
      'Значение и ссылку на следующий узел',
      'Только значение элемента',
      'Индекс элемента в массиве',
      'Хеш-код элемента',
    ],
    correct: [0],
    explanation:
      'Узел связного списка хранит значение и ссылку на следующий узел. Поэтому элементы не обязаны располагаться в памяти подряд.',
  },
  {
    id: 'q2',
    type: 'multiple',
    text: 'Какие операции относятся к стеку?',
    options: [
      'push — добавить элемент',
      'pop — извлечь элемент',
      'enqueue — поставить в очередь',
      'dequeue — извлечь из очереди',
    ],
    correct: [0, 1],
    explanation:
      'Стек работает по принципу LIFO: элементы добавляются и извлекаются с одного конца. enqueue и dequeue — операции очереди.',
  },
  {
    id: 'q3',
    type: 'short',
    text: 'Объясните своими словами, чем очередь отличается от стека.',
    placeholder: 'Например: стек — это…, а очередь — это…',
    explanation:
      'Стек работает по принципу LIFO («последним пришёл — первым вышел»), а очередь — по принципу FIFO («первым пришёл — первым вышел»).',
  },
  {
    id: 'q4',
    type: 'single',
    text: 'Какой принцип работы использует очередь?',
    options: ['LIFO', 'FIFO', 'Случайный доступ', 'Обратный обход'],
    correct: [1],
    explanation:
      'Очередь обслуживает элементы в порядке поступления: первым пришёл — первым вышел (FIFO).',
  },
  {
    id: 'q5',
    type: 'multiple',
    text: 'Где обычно применяется стек?',
    options: [
      'Отмена действий (undo)',
      'Обход графа в глубину',
      'Обработка задач в порядке поступления',
      'Проверка парности скобок',
    ],
    correct: [0, 1, 3],
    explanation:
      'Стек применяют для отмены действий, обхода в глубину и проверки парности скобок. Обработка задач в порядке поступления — типичный сценарий очереди.',
  },
]

export const RESULT_LABELS = {
  correct: 'Верно',
  partial: 'Частично',
  incorrect: 'Неверно',
}

// Результат по текущей лекции. Показывается, если открыть /#/result напрямую.
export const DEMO_RESULT = {
  id: 'demo-algorithms-lists',
  title: MOCK_LECTURE.title,
  teacher: MOCK_LECTURE.teacher,
  date: MOCK_LECTURE.date,
  lecture: MOCK_LECTURE,

  completedAt: '4 ноября 2026, 12:24',
  understanding: 70,
  rating: 4,
  comment:
    'Понравилось, что было много примеров. Хотелось бы больше практики со связными списками.',
  teacherComment: null,
  dialog: [
    {
      question: QUIZ_QUESTIONS[0].text,
      answer: 'Значение и ссылку на следующий узел',
      result: 'correct',
      explanation: `Верно. ${QUIZ_QUESTIONS[0].explanation}`,
    },
    {
      question: QUIZ_QUESTIONS[1].text,
      answer: 'push — добавить элемент; pop — извлечь элемент',
      result: 'correct',
      explanation: `Верно. ${QUIZ_QUESTIONS[1].explanation}`,
    },
    {
      question: QUIZ_QUESTIONS[2].text,
      answer: 'Стек — последним пришёл, первым вышел, а очередь — наоборот.',
      result: 'partial',
      explanation: `Частично верно: мысль правильная, но её стоит раскрыть подробнее. ${QUIZ_QUESTIONS[2].explanation}`,
    },
    {
      question: QUIZ_QUESTIONS[3].text,
      answer: 'FIFO',
      result: 'correct',
      explanation: `Верно. ${QUIZ_QUESTIONS[3].explanation}`,
    },
    {
      question: QUIZ_QUESTIONS[4].text,
      answer:
        'Отмена действий (undo); Обход графа в глубину; Обработка задач в порядке поступления',
      result: 'incorrect',
      explanation: `Неверно: обработка задач в порядке поступления — это очередь. ${QUIZ_QUESTIONS[4].explanation}`,
    },
  ],
}

export const MOCK_HISTORY = [
  {
    id: 'db-normalization',
    title: 'Базы данных: нормальные формы',
    teacher: 'Мария Сергеевна Орлова',
    date: '28 октября 2026',
    completedAt: '28 октября 2026, 14:20',
    understanding: 83,
    rating: 5,
    comment: 'Спасибо, стало понятнее. Особенно помог разбор составного ключа.',
    teacherComment:
      'Анна, спасибо за подробный ответ про третью нормальную форму. Обратите внимание на пример с составным ключом — разберём его на семинаре.',
    dialog: [
      {
        question: 'Что означает первая нормальная форма?',
        answer:
          'Все значения в ячейках атомарны, без списков и повторяющихся групп.',
        result: 'correct',
        explanation:
          'Верно. 1НФ требует, чтобы в каждом столбце хранилось одно неделимое значение.',
      },
      {
        question: 'Зачем нужна вторая нормальная форма?',
        answer:
          'Чтобы убрать частичную зависимость неключевых атрибутов от части составного ключа.',
        result: 'correct',
        explanation:
          'Верно. 2НФ устраняет частичные зависимости от составного первичного ключа.',
      },
      {
        question: 'Что проверяет третья нормальная форма?',
        answer: 'Отсутствие транзитивных зависимостей.',
        result: 'partial',
        explanation:
          'Ответ верный, но стоит добавить: неключевой атрибут не должен зависеть от другого неключевого атрибута.',
      },
    ],
  },
  {
    id: 'networks-http',
    title: 'Сетевые протоколы: HTTP и HTTPS',
    teacher: 'Сергей Александрович Волков',
    date: '21 октября 2026',
    completedAt: '21 октября 2026, 15:05',
    understanding: 67,
    rating: 4,
    comment: 'Хорошая лекция, но хотелось бы больше примеров реальных запросов.',
    teacherComment: null,
    dialog: [
      {
        question: 'Чем HTTPS отличается от HTTP?',
        answer: 'HTTPS шифрует трафик с помощью TLS.',
        result: 'correct',
        explanation:
          'Верно. HTTPS — это HTTP поверх TLS: содержимое соединения защищено от перехвата.',
      },
      {
        question: 'Что означает код ответа 404?',
        answer: 'Ошибка сервера.',
        result: 'incorrect',
        explanation:
          'Неверно. 404 означает, что ресурс не найден. Ошибки сервера — это коды 5xx.',
      },
      {
        question: 'Для чего нужен заголовок Content-Type?',
        answer: 'Он сообщает формат тела сообщения.',
        result: 'correct',
        explanation:
          'Верно. Content-Type описывает тип и кодировку передаваемых данных.',
      },
    ],
  },
  {
    id: 'os-processes',
    title: 'Процессы и потоки в операционных системах',
    teacher: 'Ольга Викторовна Соколова',
    date: '14 октября 2026',
    completedAt: '14 октября 2026, 13:40',
    understanding: 100,
    rating: 5,
    comment: 'Всё понятно, примеры очень помогли.',
    teacherComment: null,
    dialog: [
      {
        question: 'Чем поток отличается от процесса?',
        answer:
          'Поток — единица выполнения внутри процесса, он разделяет память процесса с другими потоками.',
        result: 'correct',
        explanation:
          'Верно. Потоки одного процесса используют общее адресное пространство, но имеют собственный стек и регистры.',
      },
      {
        question: 'Что такое состояние гонки?',
        answer:
          'Ситуация, когда результат зависит от порядка доступа к общим данным.',
        result: 'correct',
        explanation:
          'Верно. Состояние гонки возникает при несинхронизированном доступе к общим данным.',
      },
    ],
  },
]


