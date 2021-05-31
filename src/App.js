import React, { useState } from "react";
import './App.css';

function Square({ value, onClick }) {
  
  return (
    <button className="square" onClick={onClick}>
    {value}
  </button>
  );
};

function Restart({ onClick }) {

  return (
    <button className="restart" onClick={onClick}>
      Restart
    </button>
  );
};

// App is the Game
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);

  function getStatus() {
    if (winner) {
      return "Winner: " + winner;
    } else if (isBoardFull(squares)) {//Full but no winner
      return "Draw!";
    } else {
      return "Next player: " + (isXNext ? "X" : "O");
    }
  }
  function renderSquare(i) {
    return <Square
      value={squares[i]}
       onClick={() => {
        if (squares[i] != null || winner != null) { //if current square already has a value it can't be changed & if there's already a winner a value can't be added to anymore squares
          return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = isXNext ? "X" : "O"; //keep track of whose turn it is
        setSquares(nextSquares);

        setIsXNext(!isXNext); // toggle turns
      }}
      
     
    />
  };

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  };
  return (
    
    <div className="container">
     <h1>Tic Tac Toe</h1>
      <div className="game">
        
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
      
      <div className="game-info">{getStatus()}</div>
      <br></br>
      <div className="restart-button">{renderRestartButton()}</div>
    </div>
  );
}

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2], //[a, b ,c]
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//To determine if there's a draw
//null is the absence of a value
function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}

export default App;
