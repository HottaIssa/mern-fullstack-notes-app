import { useContext, useState } from 'react'
import { AuthContext } from '../../context/useAuth.jsx'
import ChangePass from '../../components/ChangePass'

function Profile() {
  const { user } = useContext(AuthContext)
  const [showChangePass, setShowChangePass] = useState(false)

  return (
    <div className='flex flex-col items-center gap-4'>
      <h2 className='text-4xl font-bold'>Perfil</h2>
      <div className=''>
        <p className='flex gap-2'>
          <span className='font-bold'>Username:</span>
          {user}
        </p>
      </div>
      {showChangePass ? (
        <ChangePass />
      ) : (
        <button
          className='bg-[#3A445D] p-2 rounded-md text-white hover:bg-[#1A2A3F] transition-colors duration-300'
          onClick={() => setShowChangePass(true)}
        >
          Cambiar contraseña
        </button>
      )}
    </div>
  )
}

export default Profile
