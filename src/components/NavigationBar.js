import React, {useEffect, useState} from "react";
import './NavigationBar.css';
import {Link} from "react-router-dom";
import {HiHomeModern, HiOutlineBars3BottomLeft, HiUserGroup} from "react-icons/hi2";

const NavigationBar = () => {
    const [activeItem, setActiveItem] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [touchPosition, setTouchPosition] = useState(null);
    const SWIPE_THRESHOLD = 100;

    const openSidebar = () => {
        setIsOpen(true);
    }

    const closeSidebar = () => {
        setIsOpen(false);
    }

    const handleTouchStart = (e) => {
        if (isOpen) {
            setTouchPosition(e.touches[0].clientX);
        } else {
            // Only start the swipe if touch is on the left half of the screen
            if (e.touches[0].clientX < window.innerWidth / 2) {
                setTouchPosition(e.touches[0].clientX);
            }
        }
    };

    const handleTouchMove = (e) => {
        if (!touchPosition) {
            return false;
        }

        let currentTouchPosition = e.touches[0].clientX;

        if (isOpen) {
            if (touchPosition - currentTouchPosition > SWIPE_THRESHOLD) {
                setIsOpen(false);
                setTouchPosition(null);
            }
        } else {
            if (currentTouchPosition - touchPosition > SWIPE_THRESHOLD) {
                setIsOpen(true);
                setTouchPosition(null);
            }
        }
    };

    const handleTouchEnd = () => {
        setTouchPosition(null);
    };

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        }
    }, [touchPosition, isOpen]);

    return (
        <React.Fragment>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
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
                                <Link to="/"
                                      className={activeItem === '' ? 'md:p-0 text-blue-700' : 'md:p-0'}
                                      onClick={() => setActiveItem('')}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact"
                                      className={activeItem === 'contact' ? 'md:p-0 text-blue-700' : 'md:p-0'}
                                      onClick={() => setActiveItem('contact')}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/"
                          onClick={() => {
                              closeSidebar();
                              setActiveItem('');
                          }}
                    >
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LADOMUM</span>
                    </Link>
                </div>
            </nav>
            <div className="sidenav">
                <aside style={isOpen ? {width: "250px"} : {width: "0"}} id="sidebar-multi-level-sidebar"
                       className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0">
                    <div style={isOpen ?
                        {width: "250px", paddingLeft: "1rem", paddingRight: "1rem"} :
                        {width: "0", paddingLeft: "0", paddingRight: "0"}}
                         className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to="/"
                                      onClick={() => {
                                          closeSidebar();
                                          setActiveItem('');
                                      }}
                                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <HiHomeModern size={25}/>
                                    <span className="ml-3">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact"
                                      onClick={() => {
                                          closeSidebar();
                                          setActiveItem('contact');
                                      }}
                                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <HiUserGroup size={25}/>
                                    <span className="ml-3">Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div id="overlay" className={isOpen ? "overlay active" : "overlay"} onClick={closeSidebar}></div>
            </div>
        </React.Fragment>
    );
}

export default NavigationBar;
