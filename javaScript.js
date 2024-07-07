let currentPlayer = 'X';
let boardState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let centerCounter = 0;
let xCounter = 0;
let oCounter = 0;

function insert_X_Y(id) {
    let cell = document.getElementById(id);

    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;
        boardState[parseInt(id.substring(1)) - 1] = currentPlayer;

        let winner = checkWinner();
        if (winner == 'X' || winner == 'O') {
            setTheElementRed('A');
            document.getElementById('result-center').innerHTML = `games - ${centerCounter}`;
            console.log(winner);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';


        }
        if (winner === 'X') {
            xCounter++;
            document.getElementById('result-left').innerHTML = `X - ${xCounter}`;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        } else if (winner === 'O') {
            oCounter++;
            document.getElementById('result-right').innerHTML = `O - ${oCounter}`;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}


function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c] && boardState[a] !== '') {
            centerCounter++;
            return boardState[a];
        }
    }
    return null;
}

function resetGame() {
    boardState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let cells = document.querySelectorAll('.a');
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    currentPlayer = 'X';
    xCounter = 1;
    oCounter = 1;
    totalMoves = 0;
    document.getElementById('result-left').innerHTML = `X - ${xCounter}`;
    document.getElementById('result-right').innerHTML = `O - ${oCounter}`;
}

function disableAllClicks(disableId) {
    let cells = document.querySelectorAll(disableId);
    cells.forEach(cell => {
        cell.onclick = null;
    });
}

function enableAllClicks(enableId) {
    let cells = document.querySelectorAll(enableId);
    cells.forEach(cell => {
        if (cell.innerHTML === '') {
            cell.onclick = function () {
                insert_X_Y(this.id);
            };
        }
    });
}

function setTheElementRed(id) {
    document.getElementById(id).className = 'col-md-3 m-1 bg-danger border-black';
}

function setTheElementGreen(id) {
    document.getElementById(id).className = 'col-md-3 m-1 bg-primary border-black';
}
