import './App.css';
import React, {useEffect} from "react";
import NavigationBar from "./components/NavigationBar";
import {HashRouter, Route, Routes, useLocation} from 'react-router-dom';
import CustomDateRangePicker from "./components/CustomDateRangePicker";
import Stays from "./components/Stays";
import Properties from "./components/Properties";
import ContactForm from "./components/ContactForm";

// todo fixed nav

const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [pathname]);

    return null;
}

const App = () => {
    return (
        <HashRouter basename="/">
            <ScrollToTop/>
            <NavigationBar/>
            <main className="container flex flex-col justify-center items-center mx-auto max-w-6xl px-2">
                <Routes>
                    <Route path="" element={<Properties/>}/>
                    <Route path="stays" element={<Stays/>}/>
                    <Route path="book/*" element={<CustomDateRangePicker/>}/>
                    <Route path="contact" element={<ContactForm/>}/>
                </Routes>
            </main>
        </HashRouter>
    );
}

export default App;
