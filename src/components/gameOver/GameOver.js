import "./GameOver.css";

export const GameOver = ({ score, retry, word }) => {
  return (
    <div className="container">
      <h1 className="title">Game over</h1>
      <p>The word was: {word}</p>
      <h2>
        Final points: <span>{score}</span>
      </h2>
      <button className="general-button" onClick={retry}>Retry</button>
    </div>
  );
};
