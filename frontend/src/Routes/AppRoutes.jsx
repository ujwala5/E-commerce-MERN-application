import { BrowserRouter, Route, Routes } from 'react-router';

import React from 'react'
import LoginPage from '../Component/LoginPage';
import Home from '../pages/Home';

function AppRoutes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default AppRoutes
