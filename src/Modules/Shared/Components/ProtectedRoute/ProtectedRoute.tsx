
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom'
interface ProtectedRouteProps {
  children: ReactNode; // Specify the type for children
}
export default function ProtectedRoute({children}:ProtectedRouteProps) {
  if (localStorage.getItem("token")) return children
  else return <Navigate to="/login" />
}
