import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({loginData, children}) {
  // console.log(loginData)
  if (localStorage.getItem("token") || loginData) return children
  else return <Navigate to="/login" />
}
