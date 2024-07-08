let currentPlayer = 'X';
let boardState = {
    A: ['', '', '', '', '', '', '', '', ''],
    B: ['', '', '', '', '', '', '', '', ''],
    C: ['', '', '', '', '', '', '', '', ''],
    D: ['', '', '', '', '', '', '', '', ''],
    E: ['', '', '', '', '', '', '', '', ''],
    F: ['', '', '', '', '', '', '', '', ''],
    G: ['', '', '', '', '', '', '', '', ''],
    H: ['', '', '', '', '', '', '', '', ''],
    I: ['', '', '', '', '', '', '', '', ''],
};
let gamesCounter = 0;
let xCounter = 0;
let oCounter = 0;
// let player1Name = prompt('שם שחקן של ה - X :');
// let player2Name = prompt('שם שחקן של ה - O :');
// if (player1Name === '') {
//     document.getElementById('player-X').innerText = `X - Player`
//     document.getElementById('player-O').innerText = `O - Player`
// } else {
//     document.getElementById('player-X').innerText = player1Name
//     document.getElementById('player-O').innerText = player2Name
// }



// פונקציה לטיפול בהזזת שחקן
function insert_X_Y(cellId) {
    let boardId = cellId[0]; // קבל את מזהה הלוח (A עד I)
    let index = parseInt(cellId.slice(1)) - 1; // קבל את אינדקס התא (0 עד 8)

    // בדוק אם התא ריק
    if (boardState[boardId][index] === '') {
        // עדכן את מצב הלוח
        boardState[boardId][index] = currentPlayer;
        if (currentPlayer === 'X') {
            document.getElementById(cellId).style.backgroundColor = '#6CD4FF'
            checkWinner();
        } else if (currentPlayer === 'O') {
            document.getElementById(cellId).style.backgroundColor = '#D36135'
            checkWinner();
        }


        // עדכן את ממשק המשתמש כדי להציג X או O בתא שלוחצים
        document.getElementById(cellId).innerText = currentPlayer;

        // בדוק אם יש מנצח לאחר כל מהלך
        let winner = checkWinner();

        if (winner) {
            // טפל בסיום המשחק על סמך המנצח
            if (winner === 'X') {
                xCounter++;
                document.getElementById('result-left').innerText = xCounter;
                disableBoard(boardId)
            } else if (winner === 'O') {
                oCounter++;
                document.getElementById('result-right').innerText = oCounter;
                disableBoard(boardId)
            }
            // איפוס את הלוח לאחר סיום המשחק
            disableBoard(boardId);
            setBoardColorRed(boardId)
            resetBoard()

        } else {
            // החלפת שחקנים
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            let xOChecker = setTimeout(function () {
                document.getElementById('turn').innerHTML = `${currentPlayer}`
            }, 300)
            return xOChecker
        }
    }
}

// פונקציה לבדיקת זוכה
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // שורות
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // עמודות
        [0, 4, 8], [2, 4, 6] // אלכסונים
    ];

    // חזור על כל לוח
    for (let boardId in boardState) {
        let cells = boardState[boardId];

        // בדוק כל שילוב מנצח
        for (let combination of winningCombinations) {
            let [a, b, c] = combination;
            if (cells[a] !== '' && cells[a] === cells[b] && cells[b] === cells[c]) {
                return cells[a]; // החזר את המנצח ('X' או 'O')
            }
        }
    }
    return null; // החזר null אם אין זוכה
}

// פונקציה לאיפוס הלוח

function resetBoard() {
    for (boardId in boardState) {
        boardState[boardId] = ['', '', '', '', '', '', '', '', ''];
    }
    for (let boardId in boardState) {
        let cells = document.querySelectorAll(`#${boardId} .a`);
        cells.forEach(cell => {
            cell.innerText = '';
        });
    }
    setBoardColorRed()
    gamesCounter++;
    currentPlayer = 'X';
    document.querySelector('#result-center').innerHTML = `${gamesCounter}`
}

// פונקציה להשבתת קליקים בלוח מסוים
function disableBoard(boardId) {
    let cells = document.querySelectorAll(`#${boardId} .a`);
    cells.forEach(cell => {
        cell.onclick = null;
    });
}

// פונקציה לאפשר לחיצות על כל הלוחות

function enableBoard() {
    let cells = document.querySelectorAll(`.a`);
    cells.forEach(cell => {
        if (cell.innerHTML === '') {
            cell.onclick = function () {
                insert_X_Y(cell.id);
            };
        }
    });
}

// פונקציה להגדיר את צבע הרקע של לוח ספציפי לאדום

function setBoardColorRed(boardId) {

    let cells = document.querySelectorAll(`#${boardId} .a`);
    cells.forEach(cell => {
        cell.classList.remove('bg-warning');
        cell.classList.add('bg-danger');
    });
}

function resetBoardColor(boardId) {

    let cells = document.querySelectorAll(`#${boardId} .a`);
    cells.forEach(cell => {
        cell.classList.remove('bg-danger');
        cell.classList.add('bg-success');
    });
}

function resetGame() {
    let cells = document.querySelectorAll(`.a`);
    resetBoardColor()
    gamesCounter = 0;
    xCounter = 0;
    oCounter = 0;
    cells.innerHTML = ''
    enableBoard(boardId)
} 
