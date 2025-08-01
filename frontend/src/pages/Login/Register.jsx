import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    const data = {
      username: username,
      email: email,
      password: password
    }

    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((result) => {
        navigate('/login')
      })
      .catch((error) => console.error(error))
  }

  return (
    <>
      <div className='bg-[#D4D2A5] p-8 rounded-md flex flex-col items-center gap-2 text-[#3A445D] shadow-lg'>
        <h2 className='text-2xl font-bold'>Register</h2>
        <form className='flex flex-col gap-4' onSubmit={handleRegister}>
          <label htmlFor='username' className='text-lg font-semibold'>
            Username
          </label>
          <input
            className='bg-[#928779] p-2 rounded-md text-white border-2 border-[#5E5768]'
            type='text'
            id='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='email' className='text-lg font-semibold'>
            Email
          </label>
          <input
            className='bg-[#928779] p-2 rounded-md text-white border-2 border-[#5E5768]'
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
        </form>
        <Link to='/login' className='pt-4 hover:text-[#1A2A3F] hover:underline'>
          Login
        </Link>
      </div>
    </>
  )
}

export default Register
