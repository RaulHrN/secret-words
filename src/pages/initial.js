import React from "react";

export const InitialPage = ({gameStart}) => {
  return (
    <section className="container">
      <h1 className="title">Secret Words</h1>
      <button className="general-button" onClick={gameStart}>Play</button>
    </section>
  );
};
