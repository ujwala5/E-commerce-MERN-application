import { BrowserRouter, Route, Routes } from 'react-router';

import React from 'react'
import LoginPage from '../Component/LoginPage';
import Home from '../pages/Home';
import SignUp from '../Component/SignUp';

function AppRoutes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default AppRoutes
