import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
// (later you'll add Login, Dashboard, etc.)

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      {/* more routes coming soon */}
    </Routes>
  )
}

export default App
