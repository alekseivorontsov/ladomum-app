import './App.css';
import React, {useEffect, useState} from "react";
import NavigationBar from "./components/NavigationBar";
import {HashRouter, Route, Routes, useLocation} from 'react-router-dom';
import CustomDateRangePicker from "./components/CustomDateRangePicker";
import Bookings from "./components/Bookings";
import Properties from "./components/Properties";
import ContactForm from "./components/ContactForm";
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from "simplebar-react";

// todo logos

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
    const [hideScrollbar, setHideScrollbar] = useState(false);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768; // Adjust the breakpoint if needed
        setHideScrollbar(isMobile);
    }, []);

    const renderApp = () => (
        <HashRouter basename="/">
            <ScrollToTop/>
            <NavigationBar/>
            <main className="container flex flex-col justify-center items-center mx-auto max-w-6xl px-2 pt-16 pb-16">
                <Routes>
                    <Route path="" element={<Properties/>}/>
                    <Route path="bookings" element={<Bookings/>}/>
                    <Route path="book/*" element={<CustomDateRangePicker/>}/>
                    <Route path="contact" element={<ContactForm/>}/>
                </Routes>
            </main>
        </HashRouter>
    );

    const renderScrollableContent = () => {
        if (hideScrollbar) {
            return renderApp();
        } else {
            return (
                <SimpleBar style={{maxHeight: '100vh'}}>
                    {renderApp()}
                </SimpleBar>
            );
        }
    };

    return (renderScrollableContent());
}

export default App;
