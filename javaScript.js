let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '',];
let xCounter = 0;
let oCounter = 0;




function insert_X_Y(id) {
    let cell = document.getElementById(id);

    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;
        boardState[parseInt(id.substring(1)) - 1] = currentPlayer;

        let winner = checkWinner();
        if (winner === 'X') {
            xCounter++;
            document.getElementById('result-left').innerHTML = `X - ${xCounter}`;
        } else if (winner === 'O') {
            oCounter++;
            document.getElementById('result-right').innerHTML = `O - ${oCounter}`;
        }

        if (xCounter + oCounter === 9) {
            document.querySelector('.results').innerHTML = `نتائج اللاعب X: ${xCounter} فوز, اللاعب O: ${oCounter} فوز`;
        } else {
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
        if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}



function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    let cells = document.querySelectorAll('.a');
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    currentPlayer = 'X';
    xCounter = 0;
    oCounter = 0;
    document.getElementById('result-left').innerHTML = 'X - 0';
    document.getElementById('result-right').innerHTML = 'O - 0';
    document.querySelector('.results').innerHTML = '';
    enableAllClicks();
}


function disableAllClicks() {
        let cells = document.querySelectorAll('.a');
        cells.forEach(cell => {
            cell.onclick = null;
        });
    };



function enableAllClicks() {
    let cells = document.querySelectorAll('.a');
    cells.forEach(cell => {
        if (cell.innerHTML === '') {
            cell.onclick = function () {
                insert_X_Y(this.id);
            };
        }
    });
}


