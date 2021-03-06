import React, { Component } from 'react';
import Modal from './Modal.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      board: ["","","","","","","","",""],
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
    let { board, userSymbol, winner } = this.state;
    if(!winner && board.indexOf("") !== -1)
      {
        if(board[index] === ""){
          board[index] = userSymbol;
          this.setState({board});
          this.checkForWinner();
          if(board.indexOf("") !== -1 && !winner){

              this.computerTurn();

          }
        }
      }
    else{
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
        userSymbol: "X",
        computerSymbol: "O",
        modalOpen: false,
        winner: null
      });
    }
    else {
      this.setState({
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
    winningCombos.find(combo => {
      if(board[combo[1]] === board[combo[2]] && board[combo[0]] === board[combo[1]] && board[combo[0]] !== ""){
        this.setState({winningCells: combo, winner: board[combo[0]]});

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
  computerTurn(){
    const { board, computerSymbol, userSymbol } = this.state;
    const winningCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    let firstTurn = 0;
    while(board[firstTurn] !== ""){
      firstTurn =  Math.floor(Math.random() * 9);
    }
    //  let move = winningCombo.find(combo => {
    //
    //  if(board[combo[0]] === computerSymbol || board[combo[1]] === computerSymbol || board[combo[2]] === computerSymbol){
    //     if(board[combo[0]] === board[combo[1]] && board[combo[2]] !== userSymbol){
    //       return combo[2];
    //     }
    //     else if(board[combo[1]] === board[combo[2]] && board[combo[0]] !== userSymbol){
    //       return combo[0];
    //     }
    //     else if(board[combo[0]] === computerSymbol && board[combo[1]] !== userSymbol){
    //       return combo[1];
    //     }
    //     else if (board[combo[1]] === computerSymbol && board[combo[2]] !== userSymbol) {
    //       return combo[2];
    //     }
    //     else if (board[combo[2]] === computerSymbol && board[combo[1]] !== userSymbol){
    //       return combo[1];
    //     }
    //   }
    // });
    // console.log(move);


    board[firstTurn] = computerSymbol;

    this.setState({board});

    this.checkForWinner();


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
          <h1 className="title"> Tic - Tac - Toe </h1>
          <div className="board">
            {generatedBoard}
          </div>
        </div>
      </div>

    );
  }
}

export default App;
