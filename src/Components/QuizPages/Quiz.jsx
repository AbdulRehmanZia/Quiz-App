import React, { useContext, useEffect, useState } from 'react';
import { LuSun } from "react-icons/lu";
import { GoMoon } from "react-icons/go";
import bgLightPattern from "../../assets/pattern-background-desktop-light.svg";
import bgDarkPattern from "../../assets/pattern-background-desktop-dark.svg";
import htmlIcon from "../../assets/icon-html.svg";
import cssIcon from "../../assets/icon-css.svg";
import jsIcon from "../../assets/icon-js.svg";
import accessIcon from "../../assets/icon-accessibility.svg";
import { ThemeContext } from '../../Custom Hooks/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Quiz = () => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [quizData, setQuizData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [result, setResult] = useState({ correct: 0, total: 0 });
    const [showResult, setShowResult] = useState(false);

    let location = useLocation();

    let pathLocation = location.pathname.substring(1);

    useEffect(() => {
        fetch('./data.json')
            .then((response) => response.json())
            .then((data) => {
                const foundQuizPath = data.quizzes.find((quiz) => quiz.title === `${pathLocation}`);
                setQuizData(foundQuizPath);
            })
            .catch((error) => {
                console.error("Error fetching quiz data:", error);
            });
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleOptionClick = (index) => {
        if (!isSubmitted) {
            setSelectedOption(index);
        }
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        setIsSubmitted(true);

        const correctAnswer = quizData.questions[currentQuestionIndex].answer;
        const selectedAnswer = quizData.questions[currentQuestionIndex].options[selectedOption];

        if (selectedAnswer === correctAnswer) {
            setResult((prev) => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
        } else {
            setResult((prev) => ({ ...prev, total: prev.total + 1 }));
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
        } else {
            setShowResult(true);
        }
    };

    if (!quizData) {
        return <div>Loading...</div>;
    }

    if (showResult) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#3b4d66] flex items-center justify-center">
                <div className="p-10 rounded-lg shadow-lg text-center">
                    <h2 className="text-4xl font-bold text-[#313e51] dark:text-white mb-4">Quiz Completed!</h2>
                    <p className="text-2xl text-[#313e51] dark:text-white mb-10">
                        You got {result.correct} out of {quizData.questions.length} correct.
                    </p>

                    <Link to={"/"}

                        className='w-full py-6 px-6 rounded-[22px] text-[28px] font-bold text-white bg-[#a729f5] hover:opacity-50 mt-6'
                    >
                        Play Again
                    </Link>
                </div>
            </div>
        );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
        <div
            className={`min-h-screen bg-no-repeat bg-cover py-16 bg-[#f4f6fa] dark:bg-[#313e51] transition-all delay-75 duration-100`}
            style={{
                backgroundImage: `url(${isDarkMode ? bgDarkPattern : bgLightPattern})`
            }}
        >
            <nav className="Navbar w-[80%] mx-auto flex justify-between">
                <div className="flex gap-4 items-center">
                    <img
                        className='bg-transparent p-1 rounded-xl'
                        src={pathLocation === 'HTML' ? htmlIcon
                            : pathLocation === 'CSS' ? cssIcon
                                : pathLocation === 'JavaScript' ? jsIcon
                                    : pathLocation === 'Accessibility' ? accessIcon
                                        : defaultIcon
                        }
                        
                    />
                    <p className='font-bold text-[28px] text-[#313e51] dark:text-white'>
                        {pathLocation}
                    </p>
                </div>
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

            <div className="contentDiv w-[80%] mx-auto flex flex-col lg:flex-row justify-between gap-8 mt-20">
                <div className="flex-1">
                    <p className='text-[#313e51] dark:text-white text-[22px] italic'>
                        Question {currentQuestionIndex + 1} of {quizData.questions.length}
                    </p>
                    <h3 className='text-[#313e51] dark:text-white text-[36px] font-semibold mt-10'>
                        {currentQuestion.question}
                    </h3>
                </div>

                <div className='flex-1'>
                    {currentQuestion.options.map((option, index) => {
                        const correctAnswer = currentQuestion.answer;
                        const isCorrect = isSubmitted && option === correctAnswer;
                        const isWrong = isSubmitted && selectedOption === index && option !== correctAnswer;

                        return (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                className={`bg-white dark:bg-[#3b4d66] w-full rounded-[22px] py-4 px-6 flex items-center gap-8 cursor-pointer
                                    ${selectedOption === index ? 'border-[#A729f5] border-[3px]' : 'border-transparent'} 
                                    ${isCorrect ? 'border-green-500 dark:border-green-500' : ''} 
                                    ${isWrong ? 'border-red-500 dark:border-red-500' : ''} 
                                    hover:shadow-xl dark:hover:shadow-2xl transition-all delay-75 group mt-6`}
                            >
                                <div
                                    className={`text-[36px] py-1 px-4 bg-gray-200 dark:bg-white rounded-lg font-bold
                                        ${selectedOption === index ? 'bg-[#f6e7ff] text-[#a729f5]' : ''} 
                                        ${isCorrect ? 'bg-green-500 text-white dark:text-green-500' : ''} 
                                        ${isWrong ? 'bg-red-500 text-white dark:text-red-500' : ''}`}
                                >
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <p className='text-[24px] text-[#313e51] dark:text-white font-medium'>
                                    {option}
                                </p>
                            </div>
                        );
                    })}
                    <button
                        onClick={isSubmitted ? handleNextQuestion : handleSubmit}
                        className='w-full py-6 px-6 rounded-[22px] text-[28px] font-bold text-white bg-[#a729f5] hover:opacity-50 mt-6'
                    >
                        {isSubmitted ? (currentQuestionIndex < quizData.questions.length - 1 ? 'Next Question' : 'See Result') : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
