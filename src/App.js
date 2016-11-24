import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      board: ["","","","","","","","",""],
      currentTurn: "X",
      winner: null
    }
    this.handleOnClick = this.handleOnClick.bind(this);

  }

  handleOnClick(index){
    let { board, currentTurn, winner } = this.state;
    if(!winner && board.indexOf("") !== -1)
      {
        if(board[index] === ""){
        board[index] = currentTurn;
        if(this.checkForWinner()){
          this.setState({
            winner: currentTurn
          })
        }
        else if(currentTurn === "X"){
          this.setState({currentTurn: "O" , board});
        }
        else{
          this.setState({currentTurn: "X", board});
        }
      }
    }
    else{
      this.setState({
        board: ["","","","","","","","",""],
        winner: null,
        currentTurn: "X"
      })
    }
  }

  checkForWinner(){
    const {board} = this.state;
    const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    return winningCombos.find(combo => {
      console.log()
      if(board[combo[1]] === board[combo[2]] && board[combo[0]] === board[combo[1]] && board[combo[0]] !== ""){
        return this.state.currentTurn;
      }
      else{
        return false;
      }
    });

  }

  render() {
    const { board, winner } = this.state;
    const generatedBoard = board.map((cell, index) =>{
      return (
        <div className={cell === "" ? "cell usable" : "cell"}
          key={index}
          onClick={() => this.handleOnClick(index)}>
          {cell}
        </div>
      )
    });
    return (
      <div className="container">
        <h1 className="title"> Tic Tac Toe. </h1>
        <div>{winner ? `${winner} has won!` : "Keep Playing!"}</div>
        <div className="board">
          {generatedBoard}
        </div>


      </div>


    );
  }
}

export default App;