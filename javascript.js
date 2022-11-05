const GameBoard = (() => {

    let gameboard = ['', '', '', '', '', '', '', '', ''];
    gameboard.length = 9;

    function checkWin() {

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
    
    //Initialize variables for HTML Elements + Create Grid
    let _turnDisplay = document.querySelector('.displayTurn');
    let _body = document.querySelector('.body');
    let _grid = document.createElement('div');
    
    _grid.className = 'gamegrid';
    _body.append(_grid);
    
    //Array to store DOM grid
    let _DOMBoard = [];

    //Populate Grid with new cells
    for (let i = 0; i < 9; i++) {
        let newCell = document.createElement('div');
        _grid.append(newCell);

        newCell.className = 'cell';
        newCell.id = i;
        _DOMBoard[i] = newCell;
    }

    //This is here so that I don't have listeners until gamestarts
    function addListeners() {
        _DOMBoard.forEach(item => {
            item.addEventListener('click', function(){
                GameTracker.makeMove(this);
            }, false);
        });
    }

    //Removes event listeners by replacing old cells with new ones
    function removeEventListener() {
        console.log({_DOMBoard});
        for (let i = 0; i < _DOMBoard.length; i++) {
            let new_cell = _DOMBoard[i].cloneNode(true);
            _DOMBoard[i] = new_cell;
        }
    }

    function updateBoard (gameboard) {
       for (i = 0; i < gameboard.length; i++) {
        _DOMBoard[i].innerHTML = gameboard[i];
       }
    }

    function updateTitle(player) {
        if (player === GameTracker.playerX) {
            _turnDisplay.innerHTML = 'Player X\'s turn';
        } else if (player === GameTracker.playerO) {
            _turnDisplay.innerHTML = 'Player O\'s Turn';
        } else if (player === 'XWins') {
            _turnDisplay.innerHTML = 'X Wins!';
        } else if (player === 'OWins') {
            _turnDisplay.innerHTML = 'O wins!';
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
    //Add StartGame Listener to Start Button
    document.querySelector('.start').addEventListener('click', _startGame);

    function _startGame() {
        
        //Delete Start Button
        document.querySelector('.start').remove(); 
        
        //Setup current player + Title + EventListeners
        currentPlayer = playerX;
        view.updateTitle(currentPlayer);
        view.addListeners();
    };

    //add try catch?
    function makeMove(cell) {

        let index = cell.id;
        //Checks to see if Cell is empty
        if (state.gameboard[index] === '') {
            if (currentPlayer === playerX) {
                state.gameboard[index] = 'X';
            } else if (currentPlayer === playerO) {
                state.gameboard[index] = 'O';
            }

            //Update board and check win
            view.updateBoard(state.gameboard);
            let gameOver = state.checkWin();

            //If game continues
            if (gameOver !== 'XWins' && gameOver !== 'OWins') {
                _changePlayer();
                view.updateTitle(currentPlayer);
            
            //If game is over
            } else if (gameOver === 'XWins') {
                view.updateTitle('XWins');
                view.removeEventListener();
            } else if (gameOver === 'OWins') {
                view.updateTitle('OWins');
                view.removeEventListener();
            }
        }
    }

    function _changePlayer() {
        if (currentPlayer === playerX) {
            currentPlayer = playerO;
            
        } else if (currentPlayer === playerO) {
            currentPlayer = playerX;
        }
    }

    return {
        playerX,
        playerO,
        makeMove,
    }

})(GameBoard, DisplayController, Player);