const board = document.querySelectorAll('#gameBoard span');
let vBoard = []
let turnPlayer = '';

function updateTittle() {
    const playerInput = document.getElementById(turnPlayer);
    document.getElementById('turnPlayer').innerText = playerInput.value;
}

function initializeGame() {
    vBoard = [["","",""], ["","",""], ["","",""]];
    turnPlayer = "player1"
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTittle();
    board.forEach( function (element)  {
        element.classList.remove('win');
        element.innerText = '';
        element.addEventListener('click', handleBoardClick);
    });
}

function getWinRegion() {
    const winRegion = [];
    if (vBoard[0][0] === vBoard[0][1] && vBoard[0][1] === vBoard[0][2] && vBoard[0][0] !== '') {
        winRegion.push('0.0', '0.1', '0.2');
    }
    if (vBoard[1][0] === vBoard[1][1] && vBoard[1][1] === vBoard[1][2] && vBoard[1][0] !== '') {
        winRegion.push('1.0', '1.1', '1.2');
    }
    if (vBoard[2][0] === vBoard[2][1] && vBoard[2][1] === vBoard[2][2] && vBoard[2][0] !== '') {
        winRegion.push('2.0', '2.1', '2.2');
    }
    if (vBoard[0][0] === vBoard[1][0] && vBoard[1][0] === vBoard[2][0] && vBoard[0][0] !== '') {
        winRegion.push('0.0', '1.0', '2.0');
    }
    if (vBoard[0][1] === vBoard[1][1] && vBoard[1][1] === vBoard[2][1] && vBoard[0][1] !== '') {
        winRegion.push('0.1', '1.1', '2.1');
    }
    if (vBoard[0][2] === vBoard[1][2] && vBoard[1][2] === vBoard[2][2] && vBoard[0][2] !== '') {
        winRegion.push('0.2', '1.2', '2.2');
    }
    if (vBoard[0][0] === vBoard[1][1] && vBoard[1][1] === vBoard[2][2] && vBoard[0][0] !== '') {
        winRegion.push('0.0', '1.1', '2.2');
    }
    if (vBoard[0][2] === vBoard[1][1] && vBoard[1][1] === vBoard[2][0] && vBoard[0][2] !== '') {
        winRegion.push('0.2', '1.1', '2.0');
    }
    return winRegion;
}

function disableBoard(element) {
    element.style.cursor = 'default';
    element.removeEventListener('click', handleBoardClick);
    updateTittle();
}

function handleBoardClick(event) {
    const span = event.currentTarget;
    const boardRegion = span.dataset.region;
    const boardRow = boardRegion.split('.');
    const row = boardRow[0];
    const col = boardRow[1];
    if (turnPlayer === 'player1') {
        span.innerText = 'X';
        vBoard[row][col] = 'X';
        turnPlayer = 'player2';
        updateTittle()
    } else {
        span.innerText = 'O';
        vBoard[row][col] = 'O';
        turnPlayer = 'player1';
        updateTittle()
    }
    console.clear();
    console.table(vBoard);
    disableBoard(span);
    const winBoard = getWinRegion();
    
    if (winBoard.length > 0) {
        winBoard.forEach( function (element) {
            document.querySelector(`[data-region="${element}"]`).classList.add('win');
        });
        const playerInput = document.getElementById(turnPlayer);
        document.querySelector('h2').innerHTML = `O vencedor é: <span id="turnPlayer">${playerInput.value}</span>`
        board.forEach( function (element)  {
            element.removeEventListener('click', handleBoardClick);
        });
    } else {
        const isFull = vBoard.every( function (element) {
            return element.every( function (element) {
                return element !== '';
            });
        });
        if (isFull) {
            document.querySelector('h2').innerHTML = 'Deu velha!'
        }
    }
}

document.getElementById('start').addEventListener('click', initializeGame);