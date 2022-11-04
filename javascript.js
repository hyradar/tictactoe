
renderGameboard();



//Game Tracker Module
const game = (() => {
    'use strict';

    let checkWin;
    let currentPlayer;
    let titleCard = document.querySelector('.displayTurn');

    function _startGame() {
        
        //Delete Start Button
        let x = document.querySelector('.start').remove();
        
        //Update Onscreen Player Tracker
        titleCard.innerHTML = 'Player Xs Turn';

        //Add makeMove function to GameboardCells
        board.gameboard.forEach(item => {
            item.addEventListener('click', function() {    
            makeMove(this);
            });
});

    currentPlayer = playerX;
    }

    function updateTitle() {
        //this function will update the title to show current player turn
    }

    //Problem: I don't want to update the innerHTML Directly
    //I need to update the array
    //and then just have a function that updates the board based
    //on the array after every turn
    function makeMove(cell) {
        if (currentPlayer === playerX) {
            cell.innerHTML = 'X';
        }
        else {
            cell.innerHTML = 'O';
        }
        game.changePlayer();
    }

    function changePlayer() {
        
        if (currentPlayer === playerX) {
            currentPlayer = playerO;
            console.log('player changing to O');
            titleCard.innerHTML = 'Player Os Turn'
        }
        else {
            currentPlayer = playerX;
            console.log('player changing to X');
            titleCard.innerHTML = 'Player Xs Turn';
        }
    }

    return {
        checkWin,
        _startGame,
        changePlayer,
    };
})();

//Game Board Module
const board = (() => {

    //Creates gameboard array from DOM cells
    let gameboard = document.querySelectorAll('.cell');
    gameboard = Array.from(gameboard);

    return {
        gameboard,
    };
})();

function renderGameboard () {
    let grid = document.createElement('div');
    let body = document.querySelector('.body');
    grid.className = 'gamegrid';
    body.append(grid);

    for (let i = 0; i < 9; i++) {
        let newCell = document.createElement('div');
        newCell.className = 'cell';
        grid.append(newCell);
    }
}

// const GameBoard = (() => {

// })();

// const DisplayController = ((container)=>{

// })();

// const GameTracker = ((state, view, Player) => {
    
// })(Gameboard, DisplayController, Player);

//Player Factory Function
const Player = (name, symbol) => {

    return {
        name,
        symbol,
    }
}

let startButton = document.querySelector('.start').addEventListener('click', game._startGame);

//Create Players
let playerX = Player('Player 1', 'X');
let playerO = Player('Player 2', 'O');

