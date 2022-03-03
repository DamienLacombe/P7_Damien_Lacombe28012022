import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Auth from './Auth';
import Home from './Home';
import Error from './Error';



function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route exact path="" element={<Auth/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/error" element={<Error/>}/>
            </Routes>
        </Router>
    )
}

export default AppRouter;