import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Others/Header/Header";
import { Tabs } from "@mantine/core";
import "./Dashboard.css";
import Trophy from "../../assets/green_trophy.png";
import Position from "../../assets/position.png";
import QR from "../../assets/scan.png";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mantine/core";
import QRScan from "../../components/QRCode/QRScan";
import { useDispatch, useSelector } from "react-redux";
import { getLeadingUsers } from "../../feature/user/userSlice";
import { getToken } from "../../Helper/helper";

const Dashboard = () => {
  const [openQR, setOpenQR] = useState(false);
  const [qrData, setQrData] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lead = useSelector((state) => state?.user?.lead);
  const qrRef = useRef(null);

  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
    dispatch(getLeadingUsers());
  }, []);

  const handleOpenQRCode = () => {
    setQrData("");
    setOpenQR(true);
  };

  const handleScan = (data) => {
    if (!!data) {
      setQrData(data);
      setOpenQR(false);

      navigate("/quiz", {
        state: {
          quizId: data,
        },
      });
      qrRef.current.stopCamera();
    }
  };

  return (
    <div className="dash">
      <Header />
      <div
        className="prog-lead"
        style={{ maxHeight: "50vh", overflow: "auto" }}
      >
        <Tabs color="dark" variant="pills">
          <Tabs.Tab label="My Progess">
            <div className="tab-con">
              <div className="block1 d-flex-column">
                <div className="d-flex">
                  <h1 style={{ marginRight: "0.3rem" }}>24</h1>
                  <p>pts</p>
                </div>
                <img src={Trophy} alt="trophy" />
              </div>
              <div className="block2 d-flex-column">
                <div className="d-flex">
                  <h1 style={{ marginRight: "0.3rem" }}>24</h1>
                  <p>pts</p>
                </div>
                <img src={Position} alt="position" />
              </div>
            </div>
          </Tabs.Tab>
          <Tabs.Tab label="Leaderboard">
            <div className="d-flex-column lead">
              {Array.isArray(lead) &&
                lead.map((user, index) => {
                  let rankStyle = "";
                  if (index === 0) {
                    rankStyle = "first";
                  }
                  if (index === 1) {
                    rankStyle = "second";
                  }
                  if (index === 2) {
                    rankStyle = "third";
                  }

                  return (
                    <div className={`${rankStyle} top-ranks`}>
                      <div className="d-flex">
                        <h2>#{index + 1}</h2>
                        <p style={{ marginLeft: "1rem" }}>@{user.name}</p>
                      </div>
                      <Badge
                        size="lg"
                        style={{
                          borderRadius: "5px",
                          textTransform: "capitalize",
                          color: "white",
                          backgroundColor: "#ffb636",
                          padding: "0.8rem 0.3rem",
                        }}
                      >
                        {user.point ? user.point : 0}pts
                      </Badge>
                    </div>
                  );
                })}
            </div>
          </Tabs.Tab>
        </Tabs>
        <p
          className="text-center"
          style={{ opacity: "0.4", marginTop: "1.2rem", fontSize: "0.8rem" }}
        >
          {" "}
          <i> How do i earn more points ?</i>
        </p>
      </div>

      {/* Rewards */}
      <div className="prog-lead" style={{ marginTop: "1rem" }}>
        <Tabs color="dark" variant="pills">
          <Tabs.Tab label="My rewards">
            <div className="tab-con">
              <h2>Coming Soon...</h2>
            </div>
          </Tabs.Tab>
          <Tabs.Tab label="Explore rewards">
            <h2>Coming Soon...</h2>
          </Tabs.Tab>
        </Tabs>
      </div>
      <div className="qr-div">
        <button onClick={handleOpenQRCode} className="red-btn">
          <img src={QR} alt="scan" /> SCAN QR
        </button>
      </div>
      {openQR && <QRScan ref={qrRef} handleScan={handleScan} />}
    </div>
  );
};

export default Dashboard;
