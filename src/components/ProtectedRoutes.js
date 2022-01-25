import React from 'react';
import { Outlet } from 'react-router'
import SignInForm from './account/SignInForm';


const useAuth = () => {
    const user = { loggedIn: false }
    return user && user.loggedIn;
}


const ProtectedRoutes = () => {

    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <SignInForm />
}

export default ProtectedRoutes