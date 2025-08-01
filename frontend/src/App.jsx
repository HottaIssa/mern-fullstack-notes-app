import Login from './pages/Login/Login.jsx'
import Register from './pages/Login/Register.jsx'
import { Routes, Route } from 'react-router'
import RouterApp from './routes/RouterApp'
import Main from './pages/Main/Main.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path='/*' element={<RouterApp />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
