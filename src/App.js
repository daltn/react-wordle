import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gameMessage, setGameMessage] = useState("");
  const [winner, setWinner] = useState("");
  const [word, setWord] = useState("");
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const winnerList = [
      "fixed",
      "empty",
      "piper",
      "shelf",
      "shirt",
      "ratio",
      "worth",
      "truth",
      "until",
    ];
    if (!winner) {
      setWinner(winnerList[Math.floor(Math.random() * winnerList.length)]);
    }
  }, [winner]);

  useEffect(() => {
    if (attempts.length === 6) {
      setGameMessage("Game Over");
    }
  }, [attempts]);

  const handleSubmitWord = () => {
    const wordLowercase = word.toLowerCase();
    const winnerArray = Array.from(winner);

    let wordState = {
      word: wordLowercase,
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
    };

    setWord("");

    Array.from(wordLowercase).forEach((letter, idx) => {
      if (letter === winner[idx]) {
        wordState[idx] = "correct";
      } else if (winnerArray.includes(letter)) {
        wordState[idx] = "present";
      } else {
        wordState[idx] = "absent";
      }
    });

    if (winner === wordLowercase) {
      setGameMessage("You Won!!");
    }

    setAttempts([...attempts, wordState]);
  };

  const handleRefreshGame = () => {
    setWord("");
    setAttempts([]);
    setGameMessage("");
    setWinner("");
  };

  const fillInGrid = () => {
    const remainder = 6 - attempts.length;
    if (attempts.length < 6) {
      return Array.from({ length: remainder }, (v, i) => i).map((i, idx) => {
        if (word && idx === 0) {
          return (
            <div className="row" key={`row-${idx}`}>
              <div className={`cell`}>{word[0]}</div>
              <div className={`cell`}>{word[1]}</div>
              <div className={`cell`}>{word[2]}</div>
              <div className={`cell`}>{word[3]}</div>
              <div className={`cell`}>{word[4]}</div>
            </div>
          );
        }
        return (
          <div className="row" key={`row-${idx}`}>
            <div className={`cell`}></div>
            <div className={`cell`}></div>
            <div className={`cell`}></div>
            <div className={`cell`}></div>
            <div className={`cell`}></div>
          </div>
        );
      });
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Wordle</h1>
      </header>
      <section className="grid-container">
        {attempts.map((attempt, idx) => {
          return (
            <div className="row" key={`row-${idx}`}>
              <div className={`cell ${attempt[0]}`}>{attempt.word[0]}</div>
              <div className={`cell ${attempt[1]}`}>{attempt.word[1]}</div>
              <div className={`cell ${attempt[2]}`}>{attempt.word[2]}</div>
              <div className={`cell ${attempt[3]}`}>{attempt.word[3]}</div>
              <div className={`cell ${attempt[4]}`}>{attempt.word[4]}</div>
            </div>
          );
        })}
        {fillInGrid()}
      </section>
      {gameMessage ? (
        <button className="button" onClick={() => handleRefreshGame()}>
          Refresh Game
        </button>
      ) : (
        <>
          <input
            className="word-input"
            maxLength="5"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            disabled={word.length < 5}
            className="button"
            onClick={() => handleSubmitWord()}
          >
            Submit Word
          </button>
        </>
      )}
      <p className="message">{gameMessage}</p>
    </div>
  );
}

export default App;
