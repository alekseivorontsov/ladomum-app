import './App.css';
import React from "react";
import NavigationBar from "./components/NavigationBar";
import {HashRouter, Route, Routes} from 'react-router-dom';

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
        <HashRouter basename="/">
            <NavigationBar/>
            <div id="main">
                <Routes>
                    <Route path="" element={<Home/>}/>
                    <Route path="contact" element={<Contact/>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
