import React, {useEffect} from "react";
import Logo from "../../../assets/Logo.png";
import "./Header.css";
import Question from "../../../assets/question_mark.png";
import { useState } from "react";
import { Modal, useMantineTheme, Divider } from "@mantine/core";
import signout from "../../../assets/signout.png";
import { logoutUser } from "../../../feature/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onClickConnect } from "../../../Helper/helper";

const Header = () => {
  const [opened, setOpened] = useState(false);
  const [openedP, setOpenedP] = useState(false);
  const [device, setDevice] = useState(false);
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const connectWallet = async () => {
    await onClickConnect();
  }
  useEffect(()=>{
      /* Storing user's device details in a variable*/
      let details = navigator.userAgent;

      /* Creating a regular expression
      containing some mobile devices keywords
      to search it in details string*/
      let regexp = /android|iphone|kindle|ipad/i;

      /* Using test() method to search regexp in details
      it returns boolean value*/
      let isMobileDevice = regexp.test(details);

      if (isMobileDevice) {
          setDevice(true);
          console.log("You are using a Mobile Device");
      } else {
          setDevice(false);
          console.log("You are using Desktop");
      }
  },[0])
    const gotoHome = () => {
        navigate('/')
    }
  return (
    <div className="header">
      <div className="left" onClick={gotoHome}>
        <img src={Logo} alt="logo" />
        <h3 className="neo-fan">NEOFANTSY</h3>
      </div>
      <div className="right">
        <img src={Question} alt="?" style={{ marginRight: ".5rem"}}  onClick={() => setOpenedP(true)} />
        <div className="avatar" onClick={() => setOpened(true)}>
            <img
                src={user?.avatar}
                className="avatar"
            />
        </div>
      </div>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[8]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-2rem",
          }}
        >
          <img
            src={user?.avatar}
            className="avatar"
            style={{ width: "5rem", height: "5rem" }}
          />
          <h4 style={{ margin: "0.5rem 0" }}>@{user?.name}</h4>
          <h3>{user?.name}</h3>
          <h4 className="silent-text" style={{ margin: "0.5rem 0" }}>
            {user?.phone}
          </h4>
          <h4 className="silent-text">{user?.email}</h4>
        </div>
        <Divider my="md" size="xs" />
         <div style={{ textAlign: "center" }}>
             {device?(
                 <a style={{ textAlign: "center" , color: "#767676", textDecoration: "none"}} href="https://metamask.app.link/dapp/21by72.neofantasy.io" target="_blank">Connect Wallet</a>
             ): (
                 <div  style={{ textAlign: "center" , color: "#767676", textDecoration: "none", cursor: 'pointer'}}  onClick={connectWallet}>Connect Wallet</div>
             )}
         </div>

        <Divider my="md" size="xs" />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            setOpened(false);
            dispatch(logoutUser()).then((res) => navigate("/"));
          }}
        >
          <img
            src={signout}
            alt="signout"
            style={{ marginRight: "0.5rem" }}
            loading="lazy"
          />
          <p style={{ textAlign: "center", color: "red", cursor: "pointer" }}>
            Sign out
          </p>
        </div>

        <Divider my="md" size="xs" />
      </Modal>

        <Modal
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[8]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            centered
            opened={openedP}
            onClose={() => setOpenedP(false)}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    padding: "1rem",
                    marginTop: "-3rem",
                }}
            >
                <h1>Guide</h1>
                <ul style={{
                    padding: 0,
                    margin: 0,
                    listStyle: 'auto',
                    marginLeft: "15px"
                }}>
                    <li style={{ paddingBottom: ".5rem"}}> Search for Beacons/QR codes in the event area</li>
                    <li style={{ paddingBottom: ".5rem"}}> Scan the QRs within the Application using the “Scan QR” button.</li>
                    <li style={{ paddingBottom: ".5rem"}}> Answer the questions and earn points</li>
                    <li style={{ paddingBottom: ".5rem"}}> As per the leaderboard you will be receiving the NFT rewards once the event comes to an end!</li>
                    <li style={{ paddingBottom: ".5rem"}}> Good Luck!</li>
                </ul>
            </div>
        </Modal>

    </div>
  );
};

export default Header;
