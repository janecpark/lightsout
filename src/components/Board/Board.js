import React, { useState } from "react";
import Cell from "../Cell/Cell";
import "./Board.css";


function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());
  
  function createBoard() {
    let initialBoard = [];
    
    for(let y = 0; y < nrows; y++){
      let rows = []
      for(let x=0; x < ncols; x++){
        rows.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(rows)
    }
    return initialBoard;
  }
    function reset(){
      setBoard(createBoard())
    }

  function hasWon() {
    return board.every(row=>row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

        const copy = oldBoard.map(r=>[...r])
        flipCell(y, x, copy)
        flipCell(y+1, x, copy)
        flipCell(y-1, x, copy)
        flipCell(y, x+1, copy)
        flipCell(y, x-1, copy)
        return copy;
    });
  }
    if(hasWon()){
      return(
        <div>
          <h1>You win!</h1>
        </div>
      )
    }

    let tableBoard = []
    for(let y= 0; y < nrows; y++){
      let row = []
      for(let x=0; x < ncols; x++){
        let coord = `${y}-${x}`
        row.push(
          <Cell 
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        )
      } 
      tableBoard.push(<tr key={y}>{row}</tr>)
    
  }
  return(
    <div className="Board">
      <h1 className="Board-title">Lights Out</h1>
      <div className="Board-rulesContainer">
      <p className="Board-rules">How to Play: 
      <br/>
      When the game starts, a random stored pattern of these lights is switched on. 
      <br />
      Pressing any of the lights will toggle it and the four adjacent lights. 
      <br />
      The goal of the puzzle is to switch all the lights off.</p>
      </div>
      <table className="Board-table">
      <tbody>{tableBoard}</tbody>
    </table>
    <button onClick={() => reset()}>New Game</button>
   
    </div>
  )
}


export default Board;
