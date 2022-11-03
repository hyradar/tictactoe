

//Render Board Function
renderGameboard();

//Creates gameboard array from DOM cells
let gameboard = document.querySelectorAll('.cell');
gameboard = Array.from(gameboard);

console.log({gameboard});

//Adds click event listener
gameboard.forEach(item => {
    item.addEventListener('click', function() {    
    console.log('you clicked a square');
    });
});



//Object to control the flow of the game - Use a module

//Player Factory Function
const Player = (name) => {
    
    let isTurn = false;
    // const makeChoice 

}

//Create and Append Elements 
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