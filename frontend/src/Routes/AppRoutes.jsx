import { BrowserRouter, Route, Routes } from 'react-router';

import React from 'react'
import LoginPage from '../Component/LoginPage';
import Home from '../pages/Home';
import SignUp from '../Component/SignUp';
import Forgot_password from '../pages/Forgot_password';
import ResetPassword from '../pages/Reset_password';

function AppRoutes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/forgotPassword' element={<Forgot_password />} />
                    <Route path='/resetPassword' element={<ResetPassword />} />

                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default AppRoutes
