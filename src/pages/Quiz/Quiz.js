import React, { useState } from 'react'
import Header from '../../components/Others/Header/Header'
import './Quiz.css'
import { Badge } from '@mantine/core';
import { Modal, useMantineTheme } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import Timer from '../../assets/Timer.png'
import Luna from '../../assets/luna.png'
import Polka from '../../assets/polka.png'
import Adana from '../../assets/adana.png'
import Cosmos from '../../assets/cosmos.png'


const Quiz = () => {
    const [curQues, setCurQues] = useState(0)
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();

    const questions = [
        {
            question: "Which cryptocurrency overtook Ether as the second-largest staked crypto?",
            options: [
                {
                    text: "Luna",
                    img: Luna
                },
                {
                    text: "Polka Dot",
                    img: Polka
                },
                {
                    text: "Cosmos",
                    img: Cosmos
                },
                {
                    text: "Adana",
                    img: Adana
                },
            ]
        },
        {
            question: "Which cryptocurrency overtook Ether as the second-largest staked crypto?",
            options: [
                {
                    text: "Polka Dot",
                    img: Polka
                },
                {
                    text: "Luna",
                    img: Luna
                },
                {
                    text: "Cosmos",
                    img: Cosmos
                },
                {
                    text: "Adana",
                    img: Adana
                },
            ]
        },
        {
            question: "Which cryptocurrency overtook Ether as the second-largest staked crypto?",
            options: [
                {
                    text: "Luna",
                    img: Luna
                },
                {
                    text: "Polka Dot",
                    img: Polka
                },
                {
                    text: "Adana",
                    img: Adana
                },
                {
                    text: "Cosmos",
                    img: Cosmos
                },
            ]
        },
        {
            question: "Which cryptocurrency overtook Ether as the second-largest staked crypto?",
            options: [
                {
                    text: "Polka Dot",
                    img: Polka
                },
                {
                    text: "Luna",
                    img: Luna
                },
                {
                    text: "Adana",
                    img: Adana
                },
                {
                    text: "Cosmos",
                    img: Cosmos
                },
            ]
        },

    ]

    const handleNext = () => {
        if (curQues < questions.length - 1) {
            setCurQues(curQues + 1)
        }
    }

    const handlePrev = () => {
        if (curQues > 0) {
            setCurQues(curQues - 1)
        }
    }

    const selectAns = (e) => {
        e.target.style.backgroundColor = "#DFF8F2"
    }

    return (
        <div className='quiz'>
            <Header />
            <div className="quiz-info">
                <div className="d-flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
                    <p id='quiz-title'>Quiz #21</p>
                    <Badge size="lg" sx={{ backgroundColor: "#DFF8F2", color: "#24927A", fontWeight: "500" }}>20pts</Badge>
                </div>
                <div className="d-flex" style={{ alignItems: "center", justifyContent: "space-between", margin: "1rem 0" }}>
                    <p >Quiz Progress</p>
                    <div className="d-flex">
                        <img src={Timer} alt="timer" style={{ marginRight: "0.3rem" }} />
                        <p style={{ color: "#EB5757" }}>5:10</p>
                    </div>
                </div>
                <div className="d-flex" style={{ alignItems: "center", justifyContent: "center" }}>
                    {questions.map((question, index) => {
                        return (
                            <div className={`dot ${index === curQues ? "active" : ""}`} key={index}></div>
                        )
                    })}
                </div>
            </div>

            {/* Quiz Body */}
            <div className="quiz-body">
                {questions.map((data, index) => {
                    const { question } = data
                    return (
                        <div className={`${curQues === index ? "d-block" : "d-none"}`} key={index}>
                            <div className="d-flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
                                <div className="qes-no">
                                    <p>Q{index + 1}</p>
                                </div>
                                <Badge size="lg" sx={{ backgroundColor: "#FFF0C1", color: "#F1B31C", fontWeight: "500", fontSize: "0.9rem", padding: "1rem" }}>5 <span style={{ textTransform: "capitalize" }}>Coins</span></Badge>
                            </div>
                            <p className='ques'>{question}</p>
                            <div className="ans">
                                {data.options.map((option, index) => {
                                    return (
                                        <div className="option" id={index + 1} key={index} onClick={selectAns}>
                                            <img src={option.img} alt="luna" />
                                            <p>{option.text}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="btns">
                <button id='prev' onClick={handlePrev}>Previous</button>
                {curQues === questions.length - 1 ? <button id='next' onClick={() => { setOpened(true) }}>Submit</button> : <button id='next' onClick={handleNext}>Next</button>}
            </div>
            <Modal
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[8]}
                overlayOpacity={0.55}
                overlayBlur={3}
                centered
                opened={opened}
                closeOnClickOutside={false}
                closeOnEscape={false}
                onClose={() => setOpened(false)}
                withCloseButton={false}
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h1 style={{ color: "#EE203B", fontWeight: "500" }}>Quiz Over</h1>
                    <p style={{ margin: "0.5rem 0" }}>You’ve Earned </p>
                    <h2>14pts</h2>
                    <NavLink to="/dashboard" style={{ width: "90%" }}>
                        <button className='red-btn' style={{ width: "100%", padding: "0.6rem", marginTop: "1rem" }}>Go Home</button>
                    </NavLink>
                </div>
            </Modal >
        </div >
    )
}

export default Quiz