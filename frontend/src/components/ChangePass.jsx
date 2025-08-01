import { useContext, useState } from 'react'
import { AuthContext } from '../context/useAuth'
import api from '../api/apiNotes'

function ChangePass() {
  const { id } = useContext(AuthContext)

  const [password, setPassword] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [repeatPassword, setRepeatPassword] = useState(null)
  const [error, setError] = useState(null)

  const handleChangePass = async (e) => {
    e.preventDefault()
    if (newPassword != repeatPassword) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
      return
    }
    try {
      const changePassword = {
        newPassword,
        password
      }
      const res = await api.patch(`/update-pass/${id}`, changePassword)
      console.log(res.data)
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div>
      <form className='flex flex-col items-center gap-2'>
        <label htmlFor='password'>Actual Password</label>
        <input
          id='password'
          type='password'
          value={password || ''}
          className='bg-[#928779] p-2 rounded-md text-white border-2 border-[#5E5768]'
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='given-name'
        />
        <label htmlFor='new-password'>New Password</label>
        <input
          id='new-password'
          type='password'
          value={newPassword || ''}
          className='bg-[#928779] p-2 rounded-md text-white border-2 border-[#5E5768]'
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete='given-name'
        />
        <label htmlFor='repeat-password'>Confirm New Password</label>
        <input
          id='repeat-password'
          type='password'
          value={repeatPassword || ''}
          className='bg-[#928779] p-2 rounded-md text-white border-2 border-[#5E5768]'
          onChange={(e) => setRepeatPassword(e.target.value)}
          autoComplete='given-name'
        />
        {error ? (
          <p className='text-red-500 font-bold'>The passwords doesn't match</p>
        ) : (
          <></>
        )}
        <button
          onClick={(e) => handleChangePass(e)}
          className='bg-[#3A445D] p-2 rounded-md text-white hover:bg-[#1A2A3F] transition-colors duration-300'
        >
          Cambiar contraseña
        </button>
      </form>
    </div>
  )
}

export default ChangePass
