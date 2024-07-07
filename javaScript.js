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

// פונקציה לטיפול בהזזת שחקן
function insert_X_Y(cellId) {
    let boardId = cellId[0]; // קבל את מזהה הלוח (A עד I)
    let index = parseInt(cellId.slice(1)) - 1; // קבל את אינדקס התא (0 עד 8)

    // בדוק אם התא ריק
    if (boardState[boardId][index] === '') {
        // עדכן את מצב הלוח
        boardState[boardId][index] = currentPlayer;

        // עדכן את ממשק המשתמש כדי להציג X או O בתא שלוחצים
        document.getElementById(cellId).innerText = currentPlayer;

        // בדוק אם יש מנצח לאחר כל מהלך
        let winner = checkWinner();
        if (winner) {
            // טפל בסיום המשחק על סמך המנצח
            if (winner === 'X') {
                xCounter++;
                document.getElementById('result-left').innerText = `X - ${xCounter}`;
            } else if (winner === 'O') {
                oCounter++;
                document.getElementById('result-right').innerText = `O - ${oCounter}`;
            }

            // איפוס את הלוח לאחר סיום המשחק
            resetBoard();
        } else {
            // שחקנים חלופיים
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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

// Function to reset the board
function resetBoard() {
    for (let boardId in boardState) {
        boardState[boardId] = ['', '', '', '', '', '', '', '', ''];
    }

    for (let boardId in boardState) {
        let cells = document.querySelectorAll(`#${boardId} td`);
        cells.forEach(cell => {
            cell.innerText = '';
        });
    }
    gamesCounter++;
    currentPlayer = 'X';
}

// פונקציה להשבית קליקים בלוח מסוים
function disableBoard(boardId) {
    let cells = document.querySelectorAll(`#${boardId} td`);
    cells.forEach(cell => {
        cell.onclick = null;
    });
}

// פונקציה לאפשר לחיצות על לוח ספציפי

function enableBoard(boardId) {
    let cells = document.querySelectorAll(`#${boardId} td`);
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
    let cells = document.querySelectorAll(`#${boardId} td`);
    cells.forEach(cell => {
        cell.classList.remove('bg-warning');
        cell.classList.add('bg-danger');
    });
}

// פונקציה לאיפוס צבע הרקע של לוח ספציפי

function resetBoardColor(boardId) {
    let cells = document.querySelectorAll(`#${boardId} td`);
    cells.forEach(cell => {
        cell.classList.remove('bg-danger');
        cell.classList.add('bg-warning');
    });
}
