import React, { useState, useRef } from "react";
import "./Game.css";

export const Game = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");

    letterInputRef.current.focus();
  };

  const revealedWord = letters.map((letter, i) =>
    guessedLetters.includes(letter) ? (
      <p className="letter" key={i}>
        {letter}
      </p>
    ) : (
      <p className="blank-square" key={i}></p>
    )
  );

  return (
    <div className="container">
      <h1 className="title">Game</h1>

      <p className="points">
        <span>Points</span>: {score}
      </p>
      <h2>Guess the word: </h2>
      <p className="tip">
        Word's tip: <span>{pickedCategory}</span>
      </p>
      <p>You still have {guesses} guess(es).</p>

      <div className="word-container">{revealedWord}</div>

      <div className="letter-container">
        <p>Try to guess a letter of the word:</p>
        <form onSubmit={handleSubmit}>
          <input
            className="general-input"
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
          />
          <button className="general-button">Play</button>
        </form>
      </div>

      <div className="wrong-letters-container">
        <p>Used letters:</p>
        {wrongLetters.map((letter, i) => (
          <p key={i}>{letter}, </p>
        ))}
      </div>
    </div>
  );
};