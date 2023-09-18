import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const PrivateRoute = () => {
    const [auth] = useContext(AuthContext)

    return auth?.user?.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
    

}

export default PrivateRoute
