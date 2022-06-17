import { Badge, Modal, Tabs, useMantineTheme } from '@mantine/core';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Trophy from '../../assets/green_trophy.png';
import Position from '../../assets/position.png';
import QR from '../../assets/scan.png';
import Header from '../../components/Others/Header/Header';
import QRCodeReader from '../../components/QRCode/QRScan';
import { getLeadingUsers, getMe } from '../../feature/user/userSlice';
import { API_URL, getToken } from '../../Helper/helper';
import './Dashboard.css';
const Dashboard = () => {
	const [openQR, setOpenQR] = useState(false);
	const [showLB, setShowLb] = useState(0);
	const [qrData, setQrData] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const lead = useSelector((state) => state?.user?.lead);
	const qrRef = useRef(null);
	const [point, setPoint] = useState(0);
	const [position, setPosition] = useState(0);
	const [openedP, setOpenedP] = useState(false);
	const [exReward, setExReward] = useState([]);
	const [myReward, setMyReward] = useState('');

	const theme = useMantineTheme();
	useEffect(() => {
		if (!getToken()) {
			navigate('/');
		}
		dispatch(getLeadingUsers());
		dispatch(getMe());
		axios({
			method: 'get',
			url: `${API_URL}/get/my_position`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				setPoint(res?.data?.data?.point);
				setPosition(res?.data?.data?.position);
			}
		});
	}, [0]);

	useEffect(() => {
		axios({
			method: 'get',
			url: `${API_URL}/explorer`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					setExReward(res?.data?.data);
				}
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});
	}, [0]);

	useEffect(() => {
		// MY reward
		axios({
			method: 'get',
			url: `${API_URL}/position`,
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					setMyReward(res?.data?.data);
				}
			})
			.catch((error) => {
				// handle error
				console.log(error);
			});
	}, [0]);
	// console.log(myReward);
	// console.log(showLB);
	const handleOpenQRCode = () => {
		setQrData('');
		setOpenQR(true);
	};

	const handleScan = (data) => {
		console.log(data);
		if (!!data) {
			setQrData(data);
			setOpenQR(false);

			navigate('/quiz', {
				state: {
					quizId: data,
				},
			});
			qrRef.current.stopCamera();
		}
	};
	const changeTab = (active) => {
		setShowLb(active);
	};

	return (
		<div className="dash">
			<Header />
			<div
				className="prog-lead"
				style={{ maxHeight: '50vh', overflow: 'auto' }}>
				<Tabs
					color="dark"
					variant="pills"
					active={showLB}
					onTabChange={changeTab}>
					<Tabs.Tab label="My Progess">
						<div className="tab-con">
							<div className="block1 d-flex-column">
								<div className="d-flex">
									<h1 style={{ marginRight: '0.3rem' }}>{point}</h1>
									<p>pts</p>
								</div>
								<img src={Trophy} alt="trophy" />
							</div>
							<div
								onClick={() => setShowLb(1)}
								className="block2 d-flex-column">
								<div className="d-flex">
									<h1 style={{ marginRight: '0.3rem' }}>{position}</h1>
									<p>position</p>
								</div>
								<img src={Position} alt="position" />
							</div>
						</div>
					</Tabs.Tab>
					<Tabs.Tab label="Leaderboard">
						{showLB ? (
							<div className="d-flex-column lead">
								{Array.isArray(lead) &&
									lead.map((user, index) => {
										let rankStyle = '';
										if (index === 0) {
											rankStyle = 'first';
										}
										if (index === 1) {
											rankStyle = 'second';
										}
										if (index === 2) {
											rankStyle = 'third';
										}

										return (
											<div className={`${rankStyle} top-ranks`}>
												<div className="d-flex">
													<h2>#{index + 1}</h2>
													<p style={{ marginLeft: '1rem' }}>@{user.name}</p>
												</div>
												<Badge
													size="lg"
													style={{
														borderRadius: '5px',
														textTransform: 'capitalize',
														color: 'white',
														backgroundColor: '#ffb636',
														padding: '0.8rem 0.3rem',
													}}>
													{user.total_point ? user.total_point : 0} pts
												</Badge>
											</div>
										);
									})}
							</div>
						) : (
							<div></div>
						)}
					</Tabs.Tab>
				</Tabs>
				<p
					className="text-center"
					style={{ opacity: '0.4', marginTop: '1.2rem', fontSize: '0.8rem' }}
					onClick={() => setOpenedP(true)}>
					{' '}
					<i> How do i earn more points ?</i>
				</p>
			</div>

			{/* Rewards */}
			<div className="prog-lead" style={{ marginTop: '1rem' }}>
				<Tabs color="dark" variant="pills">
					<Tabs.Tab label="My rewards">
						<div className="rewards_items">
							{myReward ? (
								<div className="reward_item">
									<div className="reward_icon">
										<img src={`${myReward?.image}`} alt={myReward?.title} />
									</div>
									<div className="reward_info">
										<div className="reward_name">
											<h3>Reward #{myReward?.id}</h3>
											<p>{myReward?.title}</p>
										</div>
										<a href={myReward?.url} target="_blank">
											Hello
										</a>
									</div>
								</div>
							) : (
								<div>
									<p style={{ textAlign: 'center', padding: '10px 0' }}>
										<strong>You Don't Have Any Rewards.</strong>
									</p>
								</div>
							)}
						</div>
						<div className="tab-con">
							<div>
								<h2>Scan more QRs to win exciting rewards!</h2>
							</div>
						</div>
					</Tabs.Tab>
					<Tabs.Tab label="Explore rewards">
						<div className="rewards_items">
							{exReward.map((reward) => {
								return (
									<div className="reward_item">
										<div className="reward_icon">
											<img src={`${reward?.image}`} alt={reward?.title} />
										</div>
										<div className="reward_info">
											<div className="reward_name">
												<h3>Reward #{reward.id}</h3>
												<p>{reward.title}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</Tabs.Tab>
				</Tabs>
			</div>
			<div className="qr-div">
				<button onClick={handleOpenQRCode} className="red-btn">
					<img src={QR} alt="scan" /> SCAN QR
				</button>
			</div>
			{openQR && <QRCodeReader ref={qrRef} handleScan={handleScan} />}

			<Modal
				overlayColor={
					theme.colorScheme === 'dark'
						? theme.colors.dark[9]
						: theme.colors.gray[8]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
				centered
				opened={openedP}
				onClose={() => setOpenedP(false)}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '14px',
						padding: '1rem',
						marginTop: '-3rem',
					}}>
					<h1>Guide</h1>
					<ul
						style={{
							padding: 0,
							margin: 0,
							listStyle: 'auto',
							marginLeft: '15px',
						}}>
						<li style={{ paddingBottom: '.5rem' }}>
							{' '}
							Search for Beacons/QR codes in the event area
						</li>
						<li style={{ paddingBottom: '.5rem' }}>
							{' '}
							Scan the QRs within the Application using the “Scan QR” button.
						</li>
						<li style={{ paddingBottom: '.5rem' }}>
							{' '}
							Answer the questions and earn points
						</li>
						<li style={{ paddingBottom: '.5rem' }}>
							{' '}
							As per the leaderboard you will be receiving the NFT rewards once
							the event comes to an end!
						</li>
						<li style={{ paddingBottom: '.5rem' }}> Good Luck!</li>
					</ul>
				</div>
			</Modal>
		</div>
	);
};

export default Dashboard;
