import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const PrivateRoute = () => {
    const [auth] = useContext(AuthContext)
    // const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth?.user?.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
    

}

export default PrivateRoute
