import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import api from '../../api/apiNotes.js'
import { AuthContext } from '../../context/useAuth'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUser, setToken, setId } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    const dataUser = {
      username: username,
      password: password
    }

    try {
      const { data } = await api.post('/login', dataUser)

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', data.username)
      localStorage.setItem('id', data.user_id)
      setUser(data.username)
      setId(data.user_id)
      setToken(data.token)
      navigate('/')
    } catch (err) {
      console.error('Credenciales incorrectas')
    }
  }

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }, [])

  return (
    <>
      <div className='bg-[#D4D2A5] p-8 rounded-md flex flex-col items-center gap-2 text-[#3A445D] shadow-lg'>
        <h2 className='text-2xl font-bold'>Login</h2>
        <form className='flex flex-col gap-4' onSubmit={handleLogin}>
          <label htmlFor='username' className='text-lg font-semibold'>
            Username
          </label>
          <input
            className='bg-[#928779] p-2 rounded-md text-white border-2 border-[#5E5768]'
            type='text'
            id='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='password' className='text-lg font-semibold'>
            Password
          </label>
          <input
            className='bg-[#928779] p-2 rounded-md text-white border-2 border-[#5E5768]'
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='bg-[#3A445D] p-2 rounded-md text-white hover:bg-[#1A2A3F] transition-colors duration-300'
            type='submit'
          >
            Login
          </button>
        </form>
        <Link
          to='/register'
          className='pt-4 hover:text-[#1A2A3F] hover:underline'
        >
          Registrate
        </Link>
      </div>
    </>
  )
}

export default Login
