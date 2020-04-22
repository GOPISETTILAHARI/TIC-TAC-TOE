import React, { Component } from "react";
import "./App.css";
import Counter from "./components/box";
// import { wait } from "@testing-library/react";

class App extends Component {
  state = {
    player: 1,
    game: false,
    boxes: [
      { id: 1, value: "" },
      { id: 2, value: "" },
      { id: 3, value: "" },
      { id: 4, value: "" },
      { id: 5, value: "" },
      { id: 6, value: "" },
      { id: 7, value: "" },
      { id: 8, value: "" },
      { id: 9, value: "" },
    ],
    winList: [
      [0, 1, 2],
      [0, 3, 6],
      [3, 4, 5],
      [1, 4, 7],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
  };
  reset() {
    const boxes = this.state.boxes.map((box) => {
      box.value = "";
      return box;
    });
    this.setState({ boxes });
    this.setState({ player: 1 });
    this.setState({ game: false });
    document.getElementById("winner").innerHTML = "";
  }
  handleGame = (box) => {
    if (box.value !== "" || this.state.game === true) {
      alert("Invalid - Try Again!");
    } else {
      const boxes = [...this.state.boxes];
      const ind = boxes.indexOf(box);
      boxes[ind] = { ...box };
      if (this.state.player === 1) {
        this.setState({ player: 2 });
        boxes[ind].value = "X";
      } else {
        this.setState({ player: 1 });
        boxes[ind].value = "O";
      }
      this.setState({ boxes });
      const boxes1 = this.state.boxes.filter((box) => box.value === "");
      let str = "";
      for (var x = 0; x < this.state.winList.length; x++) {
        let count = 0;
        for (var y = 0; y < this.state.winList[x].length; y++) {
          if (boxes[this.state.winList[x][y]].id === box.id) {
            if (this.state.player === 1) count = count + 1;
            else count = count - 1;
          } else if (boxes[this.state.winList[x][y]].value === "X")
            count = count + 1;
          else if (boxes[this.state.winList[x][y]].value === "O")
            count = count - 1;
        }
        console.log(count);
        if (count === 3) {
          document.getElementById("winner").innerHTML = "Player 1 is Winner";
          this.setState({ game: true });
          break;
        } else if (count === -3) {
          document.getElementById("winner").innerHTML = "Player 2 is Winner";
          this.setState({ game: true });
          break;
        }
      }
      if (boxes1.length === 1 && str === "") {
        document.getElementById("winner").innerHTML = "Draw";
        this.setState({ game: true });
      }
    }
  };
  set = () => {
    this.reset();
  };
  render() {
    return (
      <div>
        <h1 className="heading">Tic-Tac-Toe</h1>

        <h4 className="usage">
          Player - {this.state.player}
          <button onClick={this.set} className="button">
            reset
          </button>
        </h4>
        <div id="winner"></div>
        <div className="main-box">
          {this.state.boxes.map((box) => (
            <Counter key={box.id} box={box} click={this.handleGame}></Counter>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
