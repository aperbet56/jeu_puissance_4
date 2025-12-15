/** GAME : PUISSANCE 4
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// HTML5 elements retrieval
const statusPlayer = document.querySelector(".status__player");
const copyrightYear = document.querySelector(".footer__copyright__year");

// Constants
const WIDTH = 7;
const HEIGHT = 6;

// Variables
let currentPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let gameOver = false;

/** makeBoard function: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
const makeBoard = () => {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(new Array(WIDTH).fill(null));
  }
};

/** makeHtmlBoard function: make HTML table and row of column tops. */
const makeHtmlBoard = () => {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // create top row
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // add cells to top row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" variable
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");
      // add an id, y-x, to the above table cell element
      cell.setAttribute("id", `${y}-${x}`);
      // you'll use this later, so make sure you use y-x

      // append the table cell to the table row
      row.append(cell);
    }
    // append the row to the html board
    htmlBoard.append(row);
  }
};

/** findSpotForCol function: given column x, return top empty y (null if filled) */
const findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
  //find lowest empty spot and returns y otherwise return null
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
};

/** placeInTable function: update DOM to place piece into HTML table of board */
const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  const cell = document.getElementById(`${y}-${x}`);
  piece.classList.add("piece");
  piece.classList.add(`p${currentPlayer}`);
  // Add to the DOM
  cell.appendChild(piece);
};

// playerTurn function which indicates which player should play
const playerTurn = () => `C'est au tour du joueur ${currentPlayer} !`;

// We display which player starts
statusPlayer.innerHTML = playerTurn(); // function playerTurn() call

// replay function will allow us to reset the game
const replay = () => {
  window.location.reload();
  currentPlayer = 1;
  statusPlayer.innerHTML = playerTurn(); // playerTurn() function call
  board = [];
  gameOver = false;
};

/** endGame function: announce game end */
const endGame = () => {
  gameOver = true;
  setTimeout(() => {
    alert(`Victoire du joueur ${currentPlayer} !`);
    // replay() function call
    replay();
  }, 0);
};

/** handleClick function: handle click of column top to play piece */
const handleClick = (e) => {
  // get x from ID of clicked cell
  let x = +e.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  board[y][x] = currentPlayer;

  placeInTable(y, x); //function call

  // check for win
  // function call
  if (checkForWin()) {
    return endGame(`Victoire du joueur ${currentPlayer} !`); // function call
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  for (let column of board) {
    if (column.every((cell) => cell === 1 || 2)) {
      endGame; // function call
    }
  }

  // switch players
  // TODO: switch currentPlayer 1 <-> 2
  currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
  statusPlayer.innerHTML = playerTurn(); // playerTurn() function call
};

/** checkForWin function: check board cell-by-cell for "does a win start here?" */
const checkForWin = () => {
  /** win function:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  const win = (cells) => {
    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    //make sure cells are in range
    //return true if all true

    //---------------- will need to be adjusted for cells
    for (let coord in cells) {
      let y = cells[coord][0];
      let x = cells[coord][1];
      let validCheck =
        y >= 0 &&
        y <= HEIGHT - 1 &&
        x >= 0 &&
        x <= WIDTH - 1 &&
        board[y][x] === currentPlayer;
      if (!validCheck) {
        return false;
      }
    }
    return true;
  };

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];

      // find winner (only checking each win-possibility as needed)
      // function call
      if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
        return true;
      }
    }
  }
};

// Functions call
makeBoard();
makeHtmlBoard();

// Declaration of the getCurrentYear function which will allow us the dynamic display of the year
const getCurrentYear = () => {
  const date = new Date();
  //console.log(date);

  const year = date.getFullYear();
  //console.log(year);

  copyrightYear.textContent = `${year}`;
};
// getCurrentYear function call
getCurrentYear();
