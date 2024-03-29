import "./App.css"
import Board from "./components/Board";
import React, { useState } from 'react'

const App = () => {

  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0); //현재 어떤 스탭인지 기록용
  
  const calculateWiner = (squares) => {
    const winList = [
       [0,1,2],
       [3,4,5],
       [6,7,8],
       [0,3,6],
       [1,4,7],
       [2,5,8],
       [0,4,8],
       [2,4,6]
    ]

    for (let index = 0; index < winList.length; index++) {
       const [a,b,c] = winList[index];

       if(squares[a] && squares[a] === squares[b]
           && squares[b] === squares[c])
       {
          return squares[a]; //승자 리턴
       }
    }      
    return null;
 }

 //const current = history[history.length - 1];
 const current = history[stepNumber];
 const winner = calculateWiner(current.squares);

 let status = `Next Player ${xIsNext ? 'X' : 'O'}`;   

   if(winner){
      status = `Winner: ${winner}`;
   }else{
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
   }

  const handleClick = (i) => {
      const newHistory = history.slice(0, stepNumber + 1); // 시점 이동 후, history 갱신
      const newCurrent = newHistory[newHistory.length - 1];

      const newSquares = newCurrent.squares.slice();

      if(calculateWiner(newSquares) || newSquares[i]){
        return;
      }

      newSquares[i] = xIsNext? 'X' : 'O';

      setHistory([...newHistory, {squares : newSquares}]);
      setXIsNext(prev => !prev);

      setStepNumber(newHistory.length);
   }

   const jumpTo = (step) => {
      setStepNumber(step);
      setXIsNext((step % 2) === 0);


   }
   const moves = history.map((step, move) => {
      const dest = move ? 'GO TO move #' + move :
      'GO TO game start';

      return(
        <li key={move}>
          <button className="move-button" onClick={() => jumpTo(move)}>{dest}</button>
        </li>
      )
   });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol style={{listStyle: 'none'}}>
          {moves}
        </ol>
      </div>
    </div>
  );
}

export default App;
