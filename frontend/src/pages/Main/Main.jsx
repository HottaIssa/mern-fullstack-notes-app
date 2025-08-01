import { Navigate, Outlet } from 'react-router'
import { isAuthenticated } from './auth.js' // función anterior

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute
