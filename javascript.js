const GameBoard = (() => {

    let currentPlayer;
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    gameboard.length = 9;

    function checkWin() {

        console.log('checkwin running');
        //X
        //Horizontal
        if (gameboard[0] === 'X' && gameboard[1] === 'X' && gameboard[2] == 'X') {
            return 'XWins';
        } else if (gameboard[3] === 'X' && gameboard[4] === 'X' && gameboard[5] == 'X') {
            return 'XWins';
        } else if (gameboard[6] === 'X' && gameboard[7] === 'X' && gameboard[8] == 'X') {
            return 'XWins';
        }

        //Vertical
        else if (gameboard[0] === 'X' && gameboard[3] === 'X' && gameboard[6] == 'X') {
            return 'XWins';
        } else if (gameboard[1] === 'X' && gameboard[4] === 'X' && gameboard[7] == 'X') {
            return 'XWins';
        } else if (gameboard[2] === 'X' && gameboard[5] === 'X' && gameboard[8] == 'X') {
            return 'XWins';
        }

        //Diagnol
        else if (gameboard[0] === 'X' && gameboard[4] === 'X' && gameboard[8] == 'X') {
            return 'XWins';
        } else if (gameboard[2] === 'X' && gameboard[4] === 'X' && gameboard[6] == 'X') {
            return 'XWins';
        }

        //O
        //Horizontal
        if (gameboard[0] === 'O' && gameboard[1] === 'O' && gameboard[2] == 'O') {
            return 'OWins';
        } else if (gameboard[3] === 'O' && gameboard[4] === 'O' && gameboard[5] == 'O') {
            return 'OWins';
        } else if (gameboard[6] === 'O' && gameboard[7] === 'O' && gameboard[8] == 'O') {
            return 'OWins';
        }

        //Vertical
        else if (gameboard[0] === 'O' && gameboard[3] === 'O' && gameboard[6] == 'O') {
            return 'OWins';
        } else if (gameboard[1] === 'O' && gameboard[4] === 'O' && gameboard[7] == 'O') {
            return 'OWins';
        } else if (gameboard[2] === 'O' && gameboard[5] === 'O' && gameboard[8] == 'O') {
            return 'OWins';
        }

        //Diagnol
        else if (gameboard[0] === 'O' && gameboard[4] === 'O' && gameboard[8] == 'O') {
            return 'OWins';
        } else if (gameboard[2] === 'O' && gameboard[4] === 'O' && gameboard[6] == 'O') {
            return 'OWins';
        }
        return '';
    }

    return {
        gameboard,
        checkWin,
    };
})();

const DisplayController = ((container)=>{
    
    let turnDisplay = document.querySelector('.displayTurn');
    let body = document.querySelector('.body');
    let grid = document.createElement('div');

    let x;
    grid.className = 'gamegrid';
    body.append(grid);
    
    let DOMBoard = [];

    for (let i = 0; i < 9; i++) {
        let newCell = document.createElement('div');
        grid.append(newCell);

        newCell.className = 'cell';
        newCell.id = i;
        DOMBoard[i] = newCell;
    }

    //This is here so that I don't have listeners until gamestarts
    function addListeners() {
        //when I had item => function()... it didn't work!

        DOMBoard.forEach(item => {
            item.addEventListener('click', function(){
                GameTracker.makeMove(this);
            }, false);
        });
    }

    // function removeEventListener() {
    //     console.log({DOMBoard});
    //     DOMBoard.forEach(item => {
    //         console.log('remove is runining');
    //         item.removeEventListener('click', GameTracker.tracker);
    //     });
    // }

    function updateBoard (gameboard) {
       for (i = 0; i < gameboard.length; i++) {
        DOMBoard[i].innerHTML = gameboard[i];
       }
    }

    function updateTitle(player) {
        if (player === GameTracker.playerX) {
            turnDisplay.innerHTML = 'Player X\'s turn';
        } else if (player === GameTracker.playerO) {
            turnDisplay.innerHTML = 'Player O\'s Turn';
        } else if (player === 'XWins') {
            turnDisplay.innerHTML = 'X Wins!';
        } else if (player === 'OWins') {
            turnDisplay.innerHTML = 'O wins!';
        }
    }

    return {
        updateTitle,
        updateBoard,
        addListeners,
        removeEventListener,
    }
})();

const Player = () => {
    return {}
}

const GameTracker = ((state, view, Player) => {    
    let playerX = Player();
    let playerO = Player();
    document.querySelector('.start').addEventListener('click', _startGame);

    function _startGame() {
        
        //Delete Start Button
        document.querySelector('.start').remove(); 
        
        //Setup current player
        currentPlayer = GameTracker.playerX;

        view.updateTitle(currentPlayer);
        view.addListeners();
    };

    //add try catch?
    function makeMove(cell) {

        let index = cell.id;
        //Checks to see if Cell is empty
        if (state.gameboard[cell.id] === '') {
            if (currentPlayer === GameTracker.playerX) {
                state.gameboard[cell.id] = 'X';
            } else if (currentPlayer === GameTracker.playerO) {
                state.gameboard[cell.id] = 'O';
            }

            //Update board and check win
            view.updateBoard(state.gameboard);
            let gameOver = state.checkWin();

            //If game continues
            if (gameOver !== 'XWins' && gameOver !== 'OWins') {
                changePlayer();
                view.updateTitle(currentPlayer);
            
            //If game is over
            } else if (gameOver === 'XWins') {
                view.updateTitle('XWins');
                // view.removeEventListener();
            } else if (gameOver === 'OWins') {
                view.updateTitle('OWins');
                // view.removeEventListener();
            }
        }
    }

    function changePlayer() {
        
        if (currentPlayer === GameTracker.playerX) {
            currentPlayer = GameTracker.playerO;
        } else if (currentPlayer === GameTracker.playerO) {
            currentPlayer = GameTracker.playerX;
        }
    }

    return {
        playerX,
        playerO,
        makeMove,
    }

})(GameBoard, DisplayController, Player);