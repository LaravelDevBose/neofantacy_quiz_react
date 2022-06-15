import React from "react";
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
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const connectWallet = async () => {
    await onClickConnect();
  }
  return (
    <div className="header">
      <div className="left">
        <img src={Logo} alt="logo" />
        <h3 className="neo-fan">NEOFANTSY</h3>
      </div>
      <div className="right">
        <img src={Question} alt="?" />
        <div className="avatar" onClick={() => setOpened(true)}></div>
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
        <p style={{ textAlign: "center" }} onClick={connectWallet}>Connect Wallet</p>
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
    </div>
  );
};

export default Header;
