import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoginPage } from '../Routes';

const ProtectedRoute = ({children,isAuthenticated}) => {
  return (
    <>
        {isAuthenticated ? (
            <div>{children}</div>
        ) : (<LoginPage />)
        }
    </>
  )
}

export default ProtectedRoute;