import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function calculateWinner(squares, x, y, currentPlayer) {
  //横向
  var count = 0
  for (let i = 0; i < 5; i++) {
    if (x - i >= 0) {
      if (squares[x - i][y] === currentPlayer) {
        count++
      } else {
        break
      }
    } else {
      break
    }
  }
  for (let i = 1; i < 5; i++) {
    if (x + i < 20) {
      if (squares[x + i][y] === currentPlayer) {
        count++
      } else {
        break
      }
    } else {
      break
    }
  }
  if (count >= 5) {
    return currentPlayer
  }
  count = 0
  for (let i = 0; i < 5; i++) {
    if (y - i >= 0) {
      if (squares[x][y - i] === currentPlayer) {
        count++
      } else {
        break
      }
    } else {
      break
    }
  }
  for (let i = 1; i < 5; i++) {
    if (y + i < 20) {
      if (squares[x][y + i] === currentPlayer) {
        count++
      } else {
        break
      }
    } else {
      break
    }
  }
  if (count >= 5) {
    return currentPlayer
  }
  count = 0
  for (let i = 0; i < 5; i++) {
    if (y - i >= 0 && x - i >= 0) {
      if (squares[x - i][y - i] === currentPlayer) {
        count++
      } else {
        break
      }
    } else {
      break
    }
  }
  for (let i = 1; i < 5; i++) {
    if (y + i < 20 && x + i < 20) {
      if (squares[x + i][y + i] === currentPlayer) {
        count++
      } else {
        break
      }
    } else {
      break
    }
  }
  if (count >= 5) {
    return currentPlayer
  }
  count = 0
  for (let i = 0; i < 5; i++) {
    if (y - i >= 0 && x + i < 20) {
      if (squares[x + i][y - i] === currentPlayer) {
        count++
      } else {
        break
      }
    } else {
      break
    }
  }
  for (let i = 1; i < 5; i++) {
    if (y + i < 20 && x - i >= 0) {
      if (squares[x - i][y + i] === currentPlayer) {
        count++
      } else {
        break
      }
    } else {
      break
    }
  }
  if (count >= 5) {
    return currentPlayer
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(20).fill(Array(20).fill(null)),
      nextPlayer: 'X',
      winner: null
    }
  }
  handleClick(x, y) {
    if (this.state.winner) {
      return
    }
    const rows = this.state.squares.slice()
    const row = rows[x].slice()
    const nextPlayer = this.state.nextPlayer === 'X' ? 'O' : 'X'
    if (rows[x][y]) {
      return
    }
    row[y] = this.state.nextPlayer
    rows[x] = row
    const winner = calculateWinner(rows, x, y, this.state.nextPlayer)

    this.setState({ squares: rows, nextPlayer: nextPlayer, winner: winner })
  }
  renderSquare(x, y) {
    return <Square key={x * 20 + y} value={this.state.squares[x][y]} onClick={() => this.handleClick(x, y)} />;
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Winner player: ' + this.state.winner;
    } else {
      status = 'Next player: ' + this.state.nextPlayer;
    }
    return (
      <div>
        <div className="status">{status}</div>
        {
          this.state.squares.map((item, x) => (
            <div key={x} className="board-row">
              {item.map((wa, y) => this.renderSquare(x, y))}
            </div>
          ))
        }
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
