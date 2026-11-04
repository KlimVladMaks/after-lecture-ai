import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './screens/auth/Login.jsx'
import Register from './screens/auth/Register.jsx'
import ResetPassword from './screens/auth/ResetPassword.jsx'
import Home from './screens/student/Home.jsx'
import JoinQuiz from './screens/student/JoinQuiz.jsx'
import QuizChat from './screens/student/QuizChat.jsx'
import Feedback from './screens/student/Feedback.jsx'
import Result from './screens/student/Result.jsx'
import History from './screens/student/History.jsx'
import HistoryDetail from './screens/student/HistoryDetail.jsx'
import Profile from './screens/Profile.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />

      <Route path="/home" element={<Home />} />
      <Route path="/join" element={<JoinQuiz />} />
      <Route path="/quiz" element={<QuizChat />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/result" element={<Result />} />
      <Route path="/history" element={<History />} />
      <Route path="/history/:id" element={<HistoryDetail />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
