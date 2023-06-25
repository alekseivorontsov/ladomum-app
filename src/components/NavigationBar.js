import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {HiBookOpen, HiEnvelope, HiHomeModern, HiOutlineBars3BottomLeft} from "react-icons/hi2";
import './NavigationBar.css';

const NavigationBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [touchPosition, setTouchPosition] = useState(null);
    const SWIPE_THRESHOLD = 100;
    const location = useLocation();

    const openSidebar = () => {
        setIsSidebarOpen(true);
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    useEffect(() => {
        const handleTouchStart = (e) => {
            if (isSidebarOpen) {
                setTouchPosition(e.touches[0].clientX);
            } else {
                // Only start the swipe if touch is on the left half of the screen
                if (e.touches[0].clientX < window.innerWidth / 2) {
                    setTouchPosition(e.touches[0].clientX);
                }
            }
        };

        const handleTouchEnd = () => {
            setTouchPosition(null);
        };

        const handleTouchMove = (e) => {
            if (!touchPosition) {
                return false;
            }

            let currentTouchPosition = e.touches[0].clientX;

            if (isSidebarOpen) {
                if (touchPosition - currentTouchPosition > SWIPE_THRESHOLD) {
                    setIsSidebarOpen(false);
                    setTouchPosition(null);
                }
            } else {
                if (currentTouchPosition - touchPosition > SWIPE_THRESHOLD) {
                    setIsSidebarOpen(true);
                    setTouchPosition(null);
                }
            }
        };

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        }
    }, [touchPosition, isSidebarOpen]);

    return (
        <React.Fragment>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 py-4">
                    <button onClick={openSidebar} data-collapse-toggle="navbar-default" type="button"
                            className="inline-flex items-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <HiOutlineBars3BottomLeft size={30}/>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to=""
                                      className={location.pathname === '/' ? 'md:p-0 text-blue-700' : 'md:p-0'}
                                >
                                    Home1
                                </Link>
                            </li>
                            <li>
                                <Link to="bookings"
                                      className={location.pathname === '/bookings' ? 'md:p-0 text-blue-700' : 'md:p-0'}
                                >
                                    Bookings
                                </Link>
                            </li>
                            <li>
                                <Link to="contact"
                                      className={location.pathname === '/contact' ? 'md:p-0 text-blue-700' : 'md:p-0'}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/" onClick={() => {
                        closeSidebar();
                    }}>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LADOMUM</span>
                    </Link>
                </div>
            </nav>
            <div className="sidenav">
                <aside style={isSidebarOpen ? {width: "250px"} : {width: "0"}} id="sidebar-multi-level-sidebar"
                       className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0">
                    <div style={isSidebarOpen ?
                        {width: "250px", paddingLeft: "1rem", paddingRight: "1rem"} :
                        {width: "0", paddingLeft: "0", paddingRight: "0"}}
                         className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to=""
                                      onClick={() => closeSidebar()}
                                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <HiHomeModern size={25}/>
                                    <span className="ml-3">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="bookings"
                                      onClick={() => closeSidebar()}
                                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <HiBookOpen size={25}/>
                                    <span className="ml-3">Bookings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="contact"
                                      onClick={() => closeSidebar()}
                                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <HiEnvelope size={25}/>
                                    <span className="ml-3">Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div id="overlay" className={isSidebarOpen ? "overlay active" : "overlay"} onClick={closeSidebar}></div>
            </div>
        </React.Fragment>
    );
}

export default NavigationBar;
