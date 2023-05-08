import React, { useEffect, useState } from "react";
import Microphone from "../../../assets/assessments/microphone.svg";
import "./speed-to-input.css";

function SpeechToTextInput({ onTextChange, sendButton, evalButton }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  function requestMicrophonePermission() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log("Microphone permission granted");
      })
      .catch(function (err) {
        console.error("Microphone permission denied: ", err);
      });
  }

  useEffect(() => {
    requestMicrophonePermission();
    if ("webkitSpeechRecognition" in window) {
      const webkitRecognition = new window.webkitSpeechRecognition();
      webkitRecognition.interimResults = true;
      webkitRecognition.lang = "en-US";
      webkitRecognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        onTextChange(result);
      };
      setRecognition(webkitRecognition);
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  }, [onTextChange]);

  const handleStartRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    }
  };

  const handleStopRecording = () => {
    if (recognition) {
      setIsRecording(false);
      recognition.stop();
    }
  };

  return (
    <div className={"recording-buttons"}>
      {isRecording ? (
        <button className={"microphone-button"} onClick={handleStopRecording}>
          Stop Recording
        </button>
      ) : (
        <>
          <button
            className={"microphone-button"}
            onClick={handleStartRecording}
          >
            <img
              src={Microphone}
              alt={"start Recording"}
              className={"microphone-image"}
            />
          </button>
          {sendButton}
          {evalButton}
        </>
      )}
    </div>
  );
}

export default SpeechToTextInput;
