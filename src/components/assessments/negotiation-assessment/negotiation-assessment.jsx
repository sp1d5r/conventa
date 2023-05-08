import React, { useEffect, useState, useRef } from "react";
import AssessmentLanding from "../shared/assessment-landing";
import { change_color } from "../../../cloud-infrastructure/utils/color";
import "./negotiation-assessment.css";
import LandingImg from "../../../assets/assessments/negotiation.svg";
import {
  getChatConversationFeedback,
  getNextChatConversation,
} from "../../../cloud-infrastructure/openai/openai";
import SpeechToTextInput from "../shared/speech-to-input";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NEGOTIATION_ASSESSMENT_COLOUR = "rgb(248, 184, 184)";

function NegotiationAssessmentLanding({ image, subtext, maintext, onPress }) {
  return (
    <div className={"negotiation-assessment-landing-div"}>
      <img
        src={image}
        alt={"Negotiation Against and AI?"}
        className={"negotiation-landing-img"}
      />
      <div className={"negotiation-instructions"}>
        <p className={"assessment-landing-intro-subheading"}>{subtext}</p>
        <p className={"assessment-landing-text"}>{maintext}</p>
        <Button
          className={"assessment-landing-intro-button"}
          variant={"danger"}
          onClick={() => {
            onPress();
          }}
        >
          Begin Assessment
        </Button>
      </div>
    </div>
  );
}

const EASY = 0;
const MEDIUM = 1;
const HARD = 2;
const USER = "user";
const MACHINE = "AI";

function NegotiationAssessmentMain({ setEvaluation, setFeedback }) {
  const [chatFlag, setChatFlag] = useState(false);
  /* Initialisation Variables */
  const [negotiatorName, setNegotiatorName] = useState("");
  const [userName, setUserName] = useState("");
  const [context, setContext] = useState("");
  const [difficulty, setDifficulty] = useState(EASY);
  const [goal, setGoal] = useState("");

  /* Game Chat */
  const [conversation, setConversation] = useState([]);
  const containerRef = useRef();
  const [showIcon, setShowIcon] = useState(false);

  /* Recording Section */
  const [currentSession, setCurrentSession] = useState("");

  const initialiseConversation = () => {
    setConversation([
      {
        type: "introduction",
        subHeading:
          "Begin the negotiation by pressing the record button and initiating the negotiation.",
        goal: goal,
      },
    ]);
  };

  const handleScroll = () => {
    console.log("here");
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    console.log(
      `scroll top ${scrollTop}, client height: ${clientHeight} scroll height ${scrollHeight}`
    );
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    setShowIcon(!isAtBottom);
  };

  const addChat = (elem) => {
    const chat = [...conversation];
    chat.push(elem);
    setConversation([...chat]);
    scrollToBottomChat();
    getNextChatConversation(
      context,
      negotiatorName,
      userName,
      goal,
      difficulty,
      chat
    )
      .then((res) => {
        const newElem = { type: "chat", sender: MACHINE, data: res };
        console.log(newElem);
        chat.push(newElem);
        setConversation([...chat]);
        scrollToBottomChat();
      })
      .catch((err) => {
        console.log(err);
        chat.push({
          type: "error",
          sender: MACHINE,
          data: `machine error: ${err}`,
        });
        setConversation([...chat]);
        scrollToBottomChat();
      });
  };

  const addChatUser = (user, data) => {
    const chatElem = { type: "chat", sender: user, data: data };
    addChat(chatElem);
  };

  const handleSubmitInitialsation = (e) => {
    initialiseConversation();
    e.preventDefault();
    setChatFlag(true);
  };

  const sendUserMessage = () => {
    const _currentSesh = (" " + currentSession).slice(1);
    addChatUser(USER, _currentSesh);
    setCurrentSession("");
  };

  const scrollToBottomChat = () => {
    const lastIndex = conversation.length - 1;
    console.log(`${lastIndex}-message`);
    var element = document.getElementById(`${lastIndex}-message`);
    if (element) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const getEvaluation = () => {
    getChatConversationFeedback(
      context,
      negotiatorName,
      userName,
      goal,
      difficulty,
      conversation
    ).then((res) => {
      setFeedback(res);
      setEvaluation(true);
    });
  };

  if (chatFlag) {
    /* Chat has begun */
    return (
      <div className="chat-container">
        <div className={"chat-main-div"}>
          <p className={"initialisation-muted"}>
            Hit the microphone, to initiate the conversation. Then when you're
            happy with your recording hit send.
          </p>
          <b className={"initialisation-bold"}>Context: {context}</b>
          <div className={"chat-container-main"}>
            <div
              className={"chat-area-main"}
              ref={containerRef}
              onWheel={handleScroll}
            >
              {conversation.map((elem, index) => {
                if (elem.type === "chat") {
                  return (
                    <div
                      className={`test1 message ${elem.sender}-message`}
                      id={`${index}-message`}
                    >
                      <p>{elem.data}</p>
                      <p className={`chat-sender ${elem.sender}-sender`}>
                        {elem.sender === MACHINE ? negotiatorName : userName}
                      </p>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
            {showIcon && (
              <div
                className="scroll-icon"
                onClick={() => {
                  scrollToBottomChat();
                }}
              >
                Scroll to Bottom
              </div>
            )}
            <div
              className={"messages-left"}
              style={{ position: "absolute", top: 0, left: "50%" }}
            >
              <p className={"initialisation-muted messages-left-text"}>
                Conversation Elements: {conversation.length} / {10}{" "}
              </p>
            </div>
          </div>
          {conversation.length < 10 ? (
            <div className={"recording-button"}>
              <SpeechToTextInput
                onTextChange={setCurrentSession}
                sendButton={
                  <button
                    className={"button-primary-green send-button"}
                    onClick={() => {
                      sendUserMessage();
                    }}
                  >
                    send
                  </button>
                }
                evalButton={
                  <button
                    className={"button-primary-blue send-button"}
                    onClick={() => {
                      getEvaluation();
                    }}
                  >
                    Evaluate
                  </button>
                }
              />
              <textarea
                className={
                  "initilisation-input-voice initialisation-audio-text"
                }
                type="text"
                value={currentSession.toLocaleUpperCase()}
                onChange={(e) => setCurrentSession(e.target.value)}
                id={"user-input-field"}
              />
            </div>
          ) : (
            <div className={"recording-button"}>
              <p> Max Conversation Length Achieved: {conversation.length} </p>
              <button
                className={"button-primary-blue leave-button"}
                onClick={() => {
                  getEvaluation();
                }}
              >
                Evaluate the Conversation
              </button>
            </div>
          )}
          <p>{/*{JSON.stringify(conversation)}*/}</p>
        </div>
      </div>
    );
  } else {
    /* Initialising the Chat */
    return (
      <div className={"initialisation-chat-div"}>
        <form
          className={"initialisation-form"}
          onSubmit={handleSubmitInitialsation}
        >
          <label className={"initilisation-label"}>
            Negotiator Name:
            <input
              className={"initilisation-input"}
              type="text"
              value={negotiatorName}
              onChange={(e) => setNegotiatorName(e.target.value)}
            />
          </label>
          <br />
          <label className={"initilisation-label"}>
            Your Name:
            <input
              className={"initilisation-input"}
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <br />
          <label className={"initilisation-label"}>
            Context:
            <textarea
              className={"initilisation-input"}
              type="text"
              rows="4"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </label>
          <br />
          <label className={"initilisation-label"}>
            Goal:
            <input
              className={"initilisation-input"}
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </label>
          <br />
          <br />
          <div className={"initilisation-button-group"}>
            <button
              className={"button-primary-green"}
              onClick={() => {
                setDifficulty(EASY);
              }}
            >
              Easy Chat
            </button>
            <button
              className={"button-primary-blue"}
              onClick={() => {
                setDifficulty(MEDIUM);
              }}
            >
              Medium Chat
            </button>
            <button
              className={"button-primary-red"}
              onClick={() => {
                setDifficulty(HARD);
              }}
            >
              Hard Chat
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function NegotiationEvaluation({ feedback }) {
  return (
    <div className={"initialisation-chat-div eval-div"}>
      <b>Feedback: {feedback}</b>
      <Link to={"/academy"} className={"button-primary-blue leave-button"}>
        Leave
      </Link>
    </div>
  );
}

function NegotiationAssessment() {
  useEffect(() => {
    change_color(NEGOTIATION_ASSESSMENT_COLOUR);
  });

  const [landing, setLanding] = useState(false);
  const [evaluation, setEvaluation] = useState(false);
  const [feedback, setFeedback] = useState(
    "This is feedback for your assessment"
  );

  return (
    <AssessmentLanding
      landing={landing}
      setLanding={setLanding}
      feedback={feedback}
      evalFlag={evaluation}
      color={NEGOTIATION_ASSESSMENT_COLOUR}
      title={"Negotiation Assessment"}
      intro={
        <NegotiationAssessmentLanding
          image={LandingImg}
          subtext={
            "Simulate negotiations and perfect them, before they even happen."
          }
          maintext={
            "Have an important assessment coming up? Test our the skills you\n" +
            "          learned in an assessment negotiation. Enter in specific information\n" +
            "          around the context of your negotiation. We’ll try to replicate"
          }
          onPress={() => {
            setLanding(!landing);
          }}
        />
      }
      main={
        <NegotiationAssessmentMain
          setEvaluation={setEvaluation}
          setFeedback={setFeedback}
        />
      }
      evaluation={<NegotiationEvaluation feedback={feedback} />}
    />
  );
}

export default NegotiationAssessment;
