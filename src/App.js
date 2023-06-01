import './App.css';
import React from "react";
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const Home = () => {
    return (
        <div>Home</div>
    );
};

const Contact = () => {
    return (
        <div>Contact</div>
    );
};


const App = () => {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <div id="main">
                <Routes>
                    <Route path="" element={<Home/>}/>
                    <Route path="contact" element={<Contact/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
