import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Others/Header/Header";
import { Tabs } from "@mantine/core";
import "./Dashboard.css";
import Trophy from "../../assets/green_trophy.png";
import Position from "../../assets/position.png";
import QR from "../../assets/scan.png";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mantine/core";
import QRCodeReader from "../../components/QRCode/QRScan";
import { useDispatch, useSelector } from "react-redux";
import { getLeadingUsers, getMe } from "../../feature/user/userSlice";
import { API_URL, getToken } from "../../Helper/helper";
import axios from "axios";

const Dashboard = () => {
  const [openQR, setOpenQR] = useState(false);
  const [qrData, setQrData] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lead = useSelector((state) => state?.user?.lead);
  const qrRef = useRef(null);
  const [point, setPoint] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
    dispatch(getLeadingUsers());
    dispatch(getMe());
    axios({
      method: "get",
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
  }, []);

  const handleOpenQRCode = () => {
    setQrData("");
    setOpenQR(true);
  };

  const handleScan = (data) => {
    console.log(data);
    if (!!data) {
      setQrData(data);
      setOpenQR(false);

      navigate("/quiz", {
        state: {
          quizId: data.text,
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
                  <h1 style={{ marginRight: "0.3rem" }}>{point}</h1>
                  <p>pts</p>
                </div>
                <img src={Trophy} alt="trophy" />
              </div>
              <div className="block2 d-flex-column">
                <div className="d-flex">
                  <h1 style={{ marginRight: "0.3rem" }}>{position}</h1>
                  <p>position</p>
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
                        {user.total_point ? user.total_point : 0} pts
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
              <div>
                <h2>Scan more QRs to win exciting rewards!</h2>
              </div>
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
      {openQR && <QRCodeReader ref={qrRef} handleScan={handleScan} />}
    </div>
  );
};

export default Dashboard;
