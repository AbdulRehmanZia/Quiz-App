import React, { useContext, useEffect, useState } from 'react';
import { LuSun } from "react-icons/lu";
import { GoMoon } from "react-icons/go";
import bgLightPattern from "../assets/pattern-background-desktop-light.svg";
import bgDarkPattern from "../assets/pattern-background-desktop-dark.svg";
import htmlIcon from "../assets/icon-html.svg";
import cssIcon from "../assets/icon-css.svg";
import jsIcon from "../assets/icon-js.svg";
import accessIcon from "../assets/icon-accessibility.svg";
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Custom Hooks/ThemeContext';

const MainPage = () => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode])

    return (
        <div
            className={`min-h-screen bg-no-repeat bg-cover py-16 bg-[#f4f6fa] dark:bg-[#313e51] transition-all delay-75 duration-100`}
            style={{
                backgroundImage: `url(${isDarkMode ? bgDarkPattern : bgLightPattern})`
            }}
        >
            <nav className="Navbar w-[93%] lg:w-[80%] mx-auto flex justify-between">
                <div className=""></div>
                <div className='flex items-center gap-4'>
                    <LuSun className='text-gray-500 dark:text-white w-[24px] h-[24px]' />
                    <button
                        onClick={toggleDarkMode}
                        className='themeSwitcher w-[48px] h-[30px] rounded-2xl bg-[#979797] dark:bg-[#A729f5] flex items-center px-[0.15rem] cursor-pointer hover:bg-[#A729f5] transition-colors delay-50'
                    >
                        <div
                            className={`w-[20px] h-[20px] bg-[#f4f4f4] rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-[1.2rem]' : 'translate-x-0'}`}
                        ></div>
                    </button>
                    <GoMoon className='text-gray-500 dark:text-white w-[24px] h-[24px]' />
                </div>
            </nav>

            <div className="contentDiv w-[93%] lg:w-[80%] mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 mt-20">
                <div className="flex-1">
                    <h3 className='text-[#313e51] dark:text-white text-[40px] lg:text-[64px]'>
                        Welcome to the
                    </h3>
                    <h2 className='text-[#313e51] dark:text-white text-[40px] lg:text-[64px] font-bold'>
                        Frontend Quiz!
                    </h2>

                    <p className='text-[#626c7f] dark:text-white text-[20px] italic mt-6'>
                        Pick a subject to get started.
                    </p>
                </div>

                <div className='flex-1'>
                    <Link to={"/HTML"} className='bg-white dark:bg-[#3b4d66] w-full rounded-[22px] py-4 px-6 flex items-center gap-4 cursor-pointer hover:shadow-xl dark:hover:shadow-2xl transition-all delay-75'>
                        <img className='bg-[#fff1e9] p-1 rounded-md' src={htmlIcon} alt="HTML Icon" />
                        <p className='text-[28px] text-[#313e51] dark:text-white font-semibold'>
                            HTML
                        </p>
                    </Link>

                    <Link to={"/CSS"} className='bg-white dark:bg-[#3b4d66] w-full rounded-[22px] py-4 px-6 flex items-center gap-4 mt-6 cursor-pointer hover:shadow-xl dark:hover:shadow-2xl transition-all delay-75'>
                        <img className='bg-[#e0fdef] p-1 rounded-md' src={cssIcon} alt="CSS Icon" />
                        <p className='text-[28px] text-[#313e51] dark:text-white font-semibold'>
                            CSS
                        </p>
                    </Link>

                    <Link to={"/JavaScript"} className='bg-white dark:bg-[#3b4d66] w-full rounded-[22px] py-4 px-6 flex items-center gap-4 mt-6 cursor-pointer hover:shadow-xl dark:hover:shadow-2xl transition-all delay-75'>
                        <img className='bg-[#ebf0ff] p-1 rounded-md' src={jsIcon} alt="JavaScript Icon" />
                        <p className='text-[28px] text-[#313e51] dark:text-white font-semibold'>
                            Javascript
                        </p>
                    </Link>

                    <Link to={"/Accessibility"} className='bg-white dark:bg-[#3b4d66] w-full rounded-[22px] py-4 px-6 flex items-center gap-4 mt-6 cursor-pointer hover:shadow-xl dark:hover:shadow-2xl transition-all delay-75'>
                        <img className='bg-[#f6e7ff] p-1 rounded-md' src={accessIcon} alt="Accessibility Icon" />
                        <p className='text-[28px] text-[#313e51] dark:text-white font-semibold'>
                            Accessibility
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
