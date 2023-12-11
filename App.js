import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function App() {
  const [dice, setDice] = React.useState(newDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You Won!");
    }
  }, [dice]);
  function newDice() {
    const NewArray = [];
    for (let i = 0; i < 10; i++) {
      let x = Math.floor(Math.random() * 6 + 1);
      NewArray.push({ value: x, isHeld: false, id: nanoid() });
    }
    return NewArray;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.floor(Math.random() * 6 + 1),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(newDice());
    }
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">
        {dice.map((die) => (
          <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "Reset Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
