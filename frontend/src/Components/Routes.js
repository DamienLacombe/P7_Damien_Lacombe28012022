import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Auth from './Auth';
import Home from './Home';
import Profil from './Profil';



function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path='/profil' element={<Profil/>}/>
            </Routes>
        </Router>
    )
}

export default AppRouter;