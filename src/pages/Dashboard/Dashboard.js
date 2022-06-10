import React from 'react'
import Header from '../../components/Others/Header/Header'
import { Tabs } from '@mantine/core';
import './Dashboard.css'
import Trophy from '../../assets/green_trophy.png'
import Position from '../../assets/position.png'
import QR from '../../assets/scan.png'
import { NavLink } from 'react-router-dom';
import { Badge } from '@mantine/core';

const Dashboard = () => {
    return (
        <div className='dash'>
            <Header />
            <div className="prog-lead" style={{ maxHeight: "50vh", overflow: "auto" }}>
                <Tabs color="dark" variant="pills">
                    <Tabs.Tab label="My Progess" >
                        <div className="tab-con">
                            <div className="block1 d-flex-column">
                                <div className='d-flex'>
                                    <h1 style={{ marginRight: "0.3rem" }}>24</h1>
                                    <p>pts</p>
                                </div>
                                <img src={Trophy} alt="trophy" />
                            </div>
                            <div className="block2 d-flex-column">
                                <div className='d-flex'>
                                    <h1 style={{ marginRight: "0.3rem" }}>24</h1>
                                    <p>pts</p>
                                </div>
                                <img src={Position} alt="position" />
                            </div>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab label="Leaderboard" >
                        <div className="d-flex-column lead">
                            <div className="first top-ranks">
                                <div className='d-flex'>
                                    <h2>#1</h2>
                                    <p style={{ marginLeft: "1rem" }}>@Deepkh</p>
                                </div>
                                <Badge size="lg" style={{ borderRadius: "5px", textTransform: "capitalize", color: "white", backgroundColor: "#ffb636", padding: "0.8rem 0.3rem" }}>124pts</Badge>
                            </div>
                            <div className="second top-ranks">
                                <div className='d-flex'>
                                    <h2>#2</h2>
                                    <p style={{ marginLeft: "1rem" }}>@Smith</p>
                                </div>
                                <Badge size="lg" style={{ borderRadius: "5px", textTransform: "capitalize", color: "white", backgroundColor: "#a8a5a5", padding: "0.8rem 0.3rem" }}>124pts</Badge>
                            </div>
                            <div className="third top-ranks">
                                <div className='d-flex'>
                                    <h2>#3</h2>
                                    <p style={{ marginLeft: "1rem" }}>@Maharsh <Badge size="md" style={{ textTransform: "capitalize", marginLeft: "0.5rem", backgroundColor: "#3c3c3c", padding: "0.5rem 0.8rem", color: "#fff" }}>you</Badge></p>
                                </div>
                                <Badge size="lg" style={{ borderRadius: "5px", textTransform: "capitalize", color: "white", backgroundColor: "#fa7234", padding: "0.8rem 0.3rem" }}>124pts</Badge>
                            </div>
                            <div className="top-ranks others">
                                <div className='d-flex'>
                                    <p>#4</p>
                                    <p style={{ marginLeft: "0.5rem" }}> User123</p>
                                </div>
                                <Badge size="lg" style={{ borderRadius: "5px", textTransform: "capitalize", color: "black", backgroundColor: "rgb(234, 234, 234)", padding: "0.8rem 0.3rem", fontWeight: "400" }}>96pts</Badge>
                            </div>
                            <div className="top-ranks others">
                                <div className='d-flex'>
                                    <p>#5</p>
                                    <p style={{ marginLeft: "0.5rem" }}> User123</p>
                                </div>
                                <Badge size="lg" style={{ borderRadius: "5px", textTransform: "capitalize", color: "black", backgroundColor: "rgb(234, 234, 234)", padding: "0.8rem 0.3rem", fontWeight: "400" }}>96pts</Badge>
                            </div>
                            <div className="top-ranks others">
                                <div className='d-flex'>
                                    <p>#6</p>
                                    <p style={{ marginLeft: "0.5rem" }}> User123</p>
                                </div>
                                <Badge size="lg" style={{ borderRadius: "5px", textTransform: "capitalize", color: "black", backgroundColor: "rgb(234, 234, 234)", padding: "0.8rem 0.3rem", fontWeight: "400" }}>96pts</Badge>
                            </div>
                            <div className="top-ranks others">
                                <div className='d-flex'>
                                    <p>#7</p>
                                    <p style={{ marginLeft: "0.5rem" }}> User123</p>
                                </div>
                                <Badge size="lg" style={{ borderRadius: "5px", textTransform: "capitalize", color: "black", backgroundColor: "rgb(234, 234, 234)", padding: "0.8rem 0.3rem", fontWeight: "400" }}>96pts</Badge>
                            </div>
                            <div className="top-ranks others">
                                <div className='d-flex'>
                                    <p>#8</p>
                                    <p style={{ marginLeft: "0.5rem" }}> User123</p>
                                </div>
                                <Badge size="lg" style={{ borderRadius: "5px", textTransform: "capitalize", color: "black", backgroundColor: "rgb(234, 234, 234)", padding: "0.8rem 0.3rem", fontWeight: "400" }}>96pts</Badge>
                            </div>
                        </div>
                    </Tabs.Tab>
                </Tabs>
                <p className='text-center' style={{ opacity: "0.4", marginTop: "1.2rem", fontSize: "0.8rem" }} > <i> How do i earn more points ?</i></p>
            </div>

            {/* Rewards */}
            <div className="prog-lead" style={{ marginTop: "1rem" }}>
                <Tabs color="dark" variant="pills">
                    <Tabs.Tab label="My rewards" >
                        <div className="tab-con">
                            <h2>Coming Soon...</h2>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab label="Explore rewards" >
                        <h2>Coming Soon...</h2>
                    </Tabs.Tab>
                </Tabs>
            </div>
            <div className="qr-div">
                <NavLink to="/quiz" style={{ textDecoration: "none" }}>
                    <button className='red-btn'> <img src={QR} alt="scan" /> SCAN QR</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Dashboard