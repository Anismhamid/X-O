let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '',];
let counter = 0;




function insert_X_Y(id) {
    let cell = document.getElementById(id);

    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;
        boardState[parseInt(id.substring(1)) - 1] = currentPlayer;

        let winner = checkWinner();
        if (winner === 'X') {
            let result = document.querySelector('#result-right');
            result.innerHTML = `${--counter}`;
        }
        else if (winner === 'O') {
            let result = document.querySelector('#result-left');
            result.innerHTML = `${++counter}`;
            //     disableAllClicks();
            // } else if (boardState.every(cell => cell !== '')) {
            //     document.querySelector('.result').innerHTML = "לא נצחתם";
            //     disableAllClicks();
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
            if (boardState[a] === 'X') {
                document.getElementById('result-left').innerText = ++counter
                return boardState[a];
            } else {
                console.log('O is winner');
                return boardState[a];
            }
        }
    }
    return null;
}



function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    let cells = document.querySelectorAll('.a');
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    document.querySelector('.result').innerHTML = '';
    currentPlayer = 'X';
    enableAllClicks();
}


let disables = {
    disableA: ['#A'],
    disableB: ['#A', '#B'],
    disableC: ['#A', '#B', '#C'],
    disableD: ['#A', '#B', '#C', '#D'],
    disableE: ['#A', '#B', '#C', '#D', '#E'],
    disableF: ['#A', '#B', '#C', '#D', '#E', '#F'],
    disableG: ['#A', '#B', '#C', '#D', '#E', '#F', '#G'],
    disableH: ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H'],
    disableI: ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I']
}



function disableAllClicks() {
    disables.disableA.forEach(id => {
        let cells = document.querySelectorAll(id);
        cells.forEach(cell => {
            cell.onclick = null;
        });
    });
}

function enableAllClicks() {
    let cells = document.querySelectorAll(id);
    cells.forEach(cell => {
        if (cell.innerHTML === '') {
            cell.onclick = function () {
                insert_X_Y(this.id);
            };
        }
    });
};

