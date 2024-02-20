import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { InitialPage } from "./pages/initial";
import { Game } from "./components/game/Game";
import { GameOver } from "./components/gameOver/GameOver";

import { wordList } from "./store/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  // States
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(10);
  const [score, setScore] = useState(0);

  const pickWordAndCartegory = useCallback(() => {
    const categories = Object.keys(words);
    // Pick a random category
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Pick a random word from the selected category
    const wordsInCategory = words[category];
    const word =
      wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];

    return { category, word };
  }, [words]);

  // Start the game
  const startGame = useCallback(() => {
    clearLettersStates();

    const { category, word } = pickWordAndCartegory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLocaleLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCartegory]);

  // Process letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLocaleLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // Restart the game
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  // clear letters state
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // UseEffects

  useEffect(() => {
    if (guesses === 0) {
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (pickedWord && guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore + 100);
      startGame();
    }
  }, [pickedWord, guessedLetters, letters, startGame]);

  return (
    <div className="App">
      {gameStage === "start" && <InitialPage startGame={startGame()} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && (
        <GameOver retry={retry} score={score} word={pickedWord} />
      )}
    </div>
  );
}

export default App;
