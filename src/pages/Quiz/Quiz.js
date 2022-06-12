import React, { useState, useEffect } from "react";
import Header from "../../components/Others/Header/Header";
import "./Quiz.css";
import { Badge } from "@mantine/core";
import { Modal, useMantineTheme } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import Timer from "../../assets/Timer.png";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getQuizes } from "../../feature/quiz/quizSlice";
import { useSelector } from "react-redux";
import { useCountdown } from "../../Hooks/CountDown";
import axios from "axios";
import { API_URL, getToken } from "../../Helper/helper";

const Quiz = () => {
  const [curQues, setCurQues] = useState(0);
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const data = useLocation();
  const [totalPoints, setTotalPoints] = useState(0);
  const quiz = useSelector((state) => state?.quiz);
  let questions = [];
  if (quiz?.quiz?.questions) {
    questions = quiz.quiz?.questions;
  }

  const { quizId } = data.state;
  const [savedAnswer, setSavedAnswer] = useState({});
  const navigate = useNavigate();

  const time = useCountdown();

  if (time < 0) {
    navigate("/dashboard");
  }

  useEffect(() => {
    dispatch(getQuizes(quizId));
  }, []);

  const handleNext = () => {
    if (curQues < questions.length - 1) {
      setCurQues(curQues + 1);
    }
  };

  const formatTime = (time) => {
    let hour = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    return `${hour}:${sec}`;
  };

  const selectAns = (e, option, ans, point, id) => {
    console.log(ans, option, point);

    if (option === ans) {
      setTotalPoints((prev) => prev + point);
      e.target.style.backgroundColor = "#DFF8F2";
    } else {
      e.target.style.backgroundColor = "#ee203b";
    }
    setSavedAnswer((prev) => {
      return {
        ...prev,
        [id]: ans,
      };
    });
  };

  const handleSubmit = () => {
    axios({
      url: `${API_URL}/submit-answer/${quiz?.quiz?.id}`,
      method: "post",
      data: {
        point: totalPoints,
      },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };

  console.log(savedAnswer);

  return (
    <div className="quiz">
      <Header />
      <div className="quiz-info">
        <div
          className="d-flex"
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <p id="quiz-title">Quiz #{quiz?.quiz?.name}</p>
          <Badge
            size="lg"
            sx={{
              backgroundColor: "#DFF8F2",
              color: "#24927A",
              fontWeight: "500",
            }}
          >
            {totalPoints}pts
          </Badge>
        </div>
        <div
          className="d-flex"
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            margin: "1rem 0",
          }}
        >
          <p>Quiz Progress</p>
          <div className="d-flex">
            <img src={Timer} alt="timer" style={{ marginRight: "0.3rem" }} />
            <p style={{ color: "#EB5757" }}>{formatTime(time)}</p>
          </div>
        </div>
        <div
          className="d-flex"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {Array.isArray(questions) &&
            questions.map((question, index) => {
              return (
                <div
                  className={`dot ${index === curQues ? "active" : ""}`}
                  key={question?.id}
                ></div>
              );
            })}
        </div>
      </div>
      {quiz.isError && (
        <p>
          {quiz.message}
          <NavLink to="/dashboard">Go Back</NavLink>
        </p>
      )}
      {}. {/* Quiz Body */}
      <div className="quiz-body">
        {Array.isArray(questions) &&
          questions.map(
            (
              {
                id,
                title,
                point,
                option_a,
                option_b,
                option_c,
                option_d,
                answer,
                answerValue,
                status,
              },
              index
            ) => {
              return (
                <div
                  className={`${curQues === index ? "d-block" : "d-none"}`}
                  key={id}
                >
                  <div
                    className="d-flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="qes-no">
                      <p>Q{index + 1}</p>
                    </div>
                    <Badge
                      size="lg"
                      sx={{
                        backgroundColor: "#FFF0C1",
                        color: "#F1B31C",
                        fontWeight: "500",
                        fontSize: "0.9rem",
                        padding: "1rem",
                      }}
                    >
                      {point}
                      <span style={{ textTransform: "capitalize" }}>Coins</span>
                    </Badge>
                  </div>
                  <p className="ques">{title}</p>
                  <div className="ans">
                    <button
                      className="option"
                      disabled={savedAnswer.hasOwnProperty(id)}
                      onClick={(e) =>
                        selectAns(e, option_a, answerValue, point, id)
                      }
                    >
                      <p>{option_a}</p>
                    </button>
                    <button
                      className="option"
                      disabled={savedAnswer[id]}
                      onClick={(e) =>
                        selectAns(e, option_b, answerValue, point, id)
                      }
                    >
                      {/* <img src={option.img} alt="luna" /> */}
                      <p>{option_b}</p>
                    </button>
                    <button
                      className="option"
                      disabled={savedAnswer[id]}
                      onClick={(e) =>
                        selectAns(e, option_c, answerValue, point, id)
                      }
                    >
                      {/* <img src={option.img} alt="luna" /> */}
                      <p>{option_c}</p>
                    </button>
                    <button
                      className="option"
                      disabled={savedAnswer[id]}
                      onClick={(e) =>
                        selectAns(e, option_d, answerValue, point, id)
                      }
                    >
                      <p>{option_d}</p>
                    </button>
                  </div>
                </div>
              );
            }
          )}
      </div>
      <div className="btns">
        {Array.isArray(questions) && curQues === questions.length - 1 ? (
          <button
            id="next"
            onClick={() => {
              setOpened(true);
              handleSubmit();
            }}
          >
            Submit
          </button>
        ) : (
          <button id="next" onClick={handleNext}>
            Next
          </button>
        )}
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
        closeOnClickOutside={false}
        closeOnEscape={false}
        onClose={() => setOpened(false)}
        withCloseButton={false}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "#EE203B", fontWeight: "500" }}>Quiz Over</h1>
          <p style={{ margin: "0.5rem 0" }}>You’ve Earned </p>
          <h2>{totalPoints}pts</h2>
          <NavLink to="/dashboard" style={{ width: "90%" }}>
            <button
              className="red-btn"
              style={{ width: "100%", padding: "0.6rem", marginTop: "1rem" }}
            >
              Go Home
            </button>
          </NavLink>
        </div>
      </Modal>
    </div>
  );
};

export default Quiz;
