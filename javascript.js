
//One of: Module
//Multiple of (players): Function Factories

//Display Board Function

let gamegrid = document.querySelector('.gamegrid');

//creates cells NodeList / adds click eventlistener
let cells = document.querySelectorAll('.cell').forEach(item => {
    item.addEventListener('click', function() {
        console.log('hello world');
    });
});