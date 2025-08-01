import { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../context/useAuth'

function NavBar() {
  const navigate = useNavigate()
  const { user, setUser, setToken, setIsLoggedIn } = useContext(AuthContext)
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setToken(null)
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <nav className='absolute top-0 w-full'>
      <div className='flex justify-between items-center p-4 bg-[#D4D2A5] shadow-lg'>
        <div className='text-xl font-bold text-blue-600'>{user}</div>
        <div className='flex items-center gap-4'>
          <Link to='/' className='hover:text-blue-600'>
            Home
          </Link>
          <Link to='/profile' className='hover:text-blue-600'>
            Perfil
          </Link>
          <Link to='/new-note' className='hover:text-blue-600'>
            New Note
          </Link>
          <button
            className='bg-[#D7263D] p-2 rounded-md text-white hover:bg-[#B7161D] transition-colors duration-300'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
