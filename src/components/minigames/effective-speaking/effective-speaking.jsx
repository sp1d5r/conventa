import React, { useState } from "react";
import "./effective-speaking.css";
import StartMinigame from "../minigame-components/start-screen/start-screen";
import MinigameLanding from "../minigame-components/minigame-landing/minigame-landing";
import { Form } from "react-bootstrap";
import EffectiveSpeakingGame from "./effective-speaking-game/effective-speaking-game";
import GameOverScreen from "../minigame-components/game-over-screen/game-over-screen";
import FormRange from "react-bootstrap/FormRange";
import { getArrayOfWords } from "../../../cloud-infrastructure/openai/openai";

function EffectiveSpeaking() {
  const [state, setState] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [topic, setTopic] = useState("Something");
  const [topicTime, setTopicTime] = useState(60);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const setGameState = (gameState) => {
    if (gameState === 1) {
      setLoading(true);
      getArrayOfWords(topic, difficulty).then((res) => {
        setTopics(res);
        setState(gameState);
        setLoading(false);
      });
    } else {
      setState(gameState);
    }
  };

  const from_minigame_state = () => {
    if (state === 0) {
      /* This is the intro state */
      return (
        <StartMinigame
          setState={setGameState}
          setDifficulty={setDifficulty}
          minigameId={"catch-a-liar"}
          title={"Effective Speaking"}
          text1={
            "Generate a speech on a topic of your choice - we'll throw in random words that you have to incorporate into yoru speech. Stay calm and be clear!"
          }
          example={"A topic on Cloud Infrastructure."}
        >
          {loading ? (
            <div
              className={"loading-effective-speaking"}
              style={{ backgroundColor: "#b8b7ff" }}
            >
              <p className={"loading-main-text "}>
                AI Generating Related Words...
              </p>
              <p> This might take a while... </p>
              <div className="loader">
                <div className="bar skeleton-loading-color"></div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <Form>
            <Form.Label>Select Topic Name</Form.Label>
            <Form.Control
              type="email"
              placeholder="Plants in the Garden"
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Be as specific as you want!
            </Form.Text>
            <br />
            <Form.Label>Speech Time: {topicTime} seconds</Form.Label>
            <FormRange
              defaultValue={60}
              min="30"
              max="300"
              step="5"
              onChange={(e) => {
                setTopicTime(parseInt(e.target.value));
              }}
            ></FormRange>
          </Form>
        </StartMinigame>
      );
    } else if (state === 1) {
      /* This is the game state */
      return (
        <EffectiveSpeakingGame
          setGameState={setState}
          difficulty={difficulty}
          timer={topicTime}
          topics={topics}
          topicName={topic}
        />
      );
      // <CatchALiarGame setGameState={setState} difficulty={difficulty} />;
      // <FirstImpressionsGame setGameState={setState} difficulty={difficulty}/>;
    } else {
      /* This is the game complete state */
      return (
        <GameOverScreen
          timeSpent={"don't worry bout it sweetheart..."}
          resetGame={() => {
            setState(0);
          }}
          leaveGame={() => {
            setState(0);
          }}
        />
      );
    }
  };

  return (
    <MinigameLanding color={"#b8b7ff"}>{from_minigame_state()}</MinigameLanding>
  );
}

export default EffectiveSpeaking;
