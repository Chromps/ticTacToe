import React, { Component } from 'react';
import Modal from './Modal.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      board: ["","","","","","","","",""],
      currentTurn: "X",
      winner: null,
      winningCells: [],
      userSymbol: "",
      computerSymbol: "",
      modalOpen: true
    }
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSymbolSelection = this.handleSymbolSelection.bind(this);

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
      console.log("we're Here")
      this.setState({
        board: ["","","","","","","","",""],
        winningCells: [],
        currentTurn: "",
        modalOpen: true,
        userSymbol: "",
        computerSymbol: ""
      })
    }
  }
  handleSymbolSelection(symbol){
    if(symbol === "X"){
      this.setState({
        currentTurn: "X",
        userSymbol: "X",
        computerSymbol: "Y",
        modalOpen: false,
        winner: null
      });
    }
    else {
      this.setState({
        currentTurn: "O",
        userSymbol: "O",
        computerSymbol: "X",
        modalOpen: false,
        winner: null
      })
    }
  }

  checkForWinner(){
    const {board} = this.state;
    const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    return winningCombos.find(combo => {
      console.log()
      if(board[combo[1]] === board[combo[2]] && board[combo[0]] === board[combo[1]] && board[combo[0]] !== ""){
        this.setState({winningCells: combo});
        return this.state.currentTurn;
      }
      else{
        return false;
      }
    });

  }
  generateClasses(cell, index){
    const { winningCells } = this.state;
    if(cell === ""){
      return "cell usable"
    }
    else if(cell !== "" && winningCells.indexOf(index) !== -1){
      return "cell winner"
    }
    else{
      return "cell"
    }
  }
  computerTurn(board){


  }

  render() {
    const { board, winner } = this.state;
    const generatedBoard = board.map((cell, index) =>{
      let className = this.generateClasses(cell, index);
      return (
        <div className={className}
          key={index}
          onClick={() => this.handleOnClick(index)}>
          {cell}
        </div>
      )
    });
    return (
      <div>
        {this.state.modalOpen ? <Modal winner={winner} onClick={this.handleSymbolSelection}/>: ""}
        <div className="container">
          <h1 className="title"> Tic Tac Toe </h1>
          <div className="board">
            {generatedBoard}
          </div>
        </div>
      </div>

    );
  }
}

export default App;
