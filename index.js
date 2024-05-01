const l = ["a", "b", "c", "d", "e", "f", "g", "h"]
const n = [1, 2, 3, 4, 5, 6, 7, 8]

// const l = ["h", "g", "f", "e", "d", "c", "b", "a"]
// const n = [8, 7, 6, 5, 4, 3, 2, 1]

const initialPieces = [
  // PAWNS
  {
    side: "w",
    type: "p",
    positions: l.map((letter) => `${letter}2`)
  },
  {
    side: "b",
    type: "p",
    positions: l.map((letter) => `${letter}7`)
  },
  // HORSES
  {
    side: "w",
    type: "n",
    positions: ["g1", "b1"]
  },
  {
    side: "b",
    type: "n",
    positions: ["g8", "b8"],
  },
  // BISHOPS
  {
    side: "w",
    type: "b",
    positions: ["f1", "c1"]
  },
  {
    side: "b",
    type: "b",
    positions: ["f8", "c8"]
  },
  // ROOK
  {
    side: "w",
    type: "r",
    positions: ["a1", "h1"]
  },
  {
    side: "b",
    type: "r",
    positions: ["a8", "h8"]
  },
  // QUEEN
  {
    side: "w",
    type: "q",
    positions: ["d1"]
  },
  {
    side: "b",
    type: "q",
    positions: ["d8"]
  },
  // KING
  {
    side: "w",
    type: "k",
    positions: ["e1"]
  },
  {
    side: "b",
    type: "k",
    positions: ["e8"]
  },
]

class Piece {
  side = ""
  type = ""
  position = ""
  imageSrc = ""

  constructor(side, type, position) {
    this.side = side
    this.type = type
    this.position = position
    this.imageSrc = `${side}${type}.png`
  }

  getMovements(board) {
    const pieceRowBoard = n.reverse().findIndex((number) => number === Number(this.position[1]))

    const pieceColumnBoard = l.findIndex((letter) => letter === this.position[0])

    const element = board[pieceRowBoard][pieceColumnBoard]
    
    if(!element || element.length === 0) return

    const k = this.side === "w" ? 1 : -1;

    switch(this.type) {
      case "p":
        let possiblePositions = [`${pieceRowBoard-1*k}${pieceColumnBoard}`, `${pieceRowBoard-2*k}${pieceColumnBoard}`]

        let realPossiblePositions = []
        for (let index = 0; index < possiblePositions.length; index++) {
          const item = possiblePositions[index];
          
          let a = Number(item[0])
          let b = Number(item[1])
          let result = board[a][b]

          if (result.side === this.side) break
          if (result) return

          realPossiblePositions.push(`${l[Number(item[1])]}${n[Number(item[0])]}`)
        }

        if(board[pieceRowBoard-1*k][pieceColumnBoard-1]) {
          realPossiblePositions.push(`${l[pieceRowBoard-1*k]}${n[pieceColumnBoard-1]}`)
        }

        if(board[pieceRowBoard-1*k][pieceColumnBoard+1]) {
          console.log(`${l[pieceRowBoard-1*k]}${n[pieceColumnBoard+1]}`)
          realPossiblePositions.push(`${l[pieceColumnBoard+1]}${n[pieceRowBoard-1*k]}`)
        }
        
        return realPossiblePositions;
    }
  }
}

class Board {
  height = 8
  width = 8
  board = []
  pieces = []

  constructor() {
    for (let row = 0; row < this.height; row++) {
      this.board[row] = []
      for (let column = 0; column < this.width; column++) {
        let position = `${l[column]}${n[row]}`
        let piece = initialPieces.find((piece) => piece.positions.includes(position))
        this.board[row].push(piece ? new Piece(piece.side, piece.type, position) : 0)
        // this.board[row].push(`${column}${row}`)
      }
    }

    this.board = this.board.reverse() // TURN WHITE THE LAST ITEM OF THE ARRAY
  }
}

const chessGame = new Board()

const canvas = document.querySelector('#chessGame')

renderHtmlBoard(chessGame.board)

function renderHtmlBoard(board) {
  let html = '<div style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; scale: 0.7; position: absolute; top: 0px; cursor: pointer;">'
  board.map((row, rowIndex) => {
    html += '<div style="display: flex; max-height: 100%; max-width: 100%;">'
    row.map((item, itemIndex) => {
      let background = (itemIndex+1+(Number(rowIndex % 2))) % 2 ? "#CCDAE0" : "#7A9DB2";
      if(item) {
        html += `<div id="${item.position}" style="flex: 1; display: flex; justify-content: center; align-items: center; background: ${background}"><img src="/assets/${item.imageSrc}" /></div>`
        return
      }
      html += `<div style="flex: 1; height: 150px; width: 150px; background: ${background}"></div>`
    })
    html += '</div>'
  })
  html += '</div>'
  canvas.innerHTML = html
}
