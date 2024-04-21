let currentPlayer='X';/*set the start player sign "X"*/
let playerXMoves=[];/*initiate player X moves array*/
let playerOMoves=[];/*initiate player O moves array*/
let board=[];/*initiate clicked square array*/
let winnerArray=[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9], // NOTE: Horizontal winning combos
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9], // NOTE: Vertical winning combos
    [1, 5, 9],
    [3, 5, 7], //Diagonal winning combos
]
let gameOver=false;/*initiate the condition for the game to start*/

for (let i=1; i<10; i++){
    let square = document.getElementById(i);/*call each square*/
    let current= document.getElementById('current');/*call the Current Player banner to show whose turn*/
    
    square.addEventListener('click',()=>{/*add event listener so each square can have response at every click*/
        if (square.innerHTML === '' && gameOver===false){/*only run when the square is empty and the game isnt over yet*/
        square.innerHTML=currentPlayer;/*show the current player sign*/
        current.innerHTML=`Current Player: ${currentPlayer}`;/*show whose turn on banner*/
        currentPlayer=currentPlayer==='X'?'O':'X';/*alternate turn between X and O*/
        currentPlayer==='X'? playerXMoves.push(i): playerOMoves.push(i);/*add each player move to their move array*/
        board.push(i);/*push all the square index that has been clicked into board array*/
        console.log('Player O moves: ',playerOMoves);/*console log for checking*/
        console.log('player X moves: ',playerXMoves);
        console.log('Board moved: ',board);
        gameResult();/*show result of the game*/
        clearRestart();/*restart the game whenever hit the button*/
        }
    })
}

function gameResult() {/*function to determine the game result*/
    for (let i=0; i<8; i++){/*iterate through all the winning combos*/
        if(playerXMoves.includes(winnerArray[i][0]) &&  playerXMoves.includes(winnerArray[i][1]) &&playerXMoves.includes(winnerArray[i][2])){/*check if X moves array has every number, by calling each id index in a specific winning combo*/
            displayAlert `O wins!`;/*display alert that O wins*/
            gameOver=true;/*change the gameOver to true to stop the game*/
            return; /*exit the function */
        }else if (playerOMoves.includes(winnerArray [i][0]) && playerOMoves.includes(winnerArray [i][1]) && playerOMoves.includes(winnerArray [i][2])){
            displayAlert `X wins!`;
            gameOver=true;
            return;
        }else if (board.length=== 9){/*if the board is full*/
            displayAlert `It's a tie! Let's play again!`;
            gameOver=true;
            return;
        }
    
    }
}
function clearRestart() { //create function for the clear and restart button
    let button= document.getElementById('clear'); /*call the clear button */
    button.addEventListener('click', () =>{/*add what happen when click the restart button*/
        board=[];/*reset everything (board, moves, current player, game over and square content) */
        playerOMoves=[];
        playerXMoves=[];
        currentPlayer='X';
        gameOver=false;
        for (let i = 1; i < 10; i++) {
            document.getElementById(i).innerHTML = '';
        }
        console.clear();/*clear console */
    })
}

function displayAlert(message) {
    // Create Bootstrap alert element
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', 'alert-primary', 'text-center', 'position-fixed', 'top-50', 'start-50', 'translate-middle');
    alertElement.setAttribute('role', 'alert');
    alertElement.style.zIndex = '9999';
    alertElement.style.padding = '2rem';
    alertElement.style.fontSize = '5rem';
    alertElement.innerText = message;

    // Append alert to document body
    document.body.appendChild(alertElement);

    // Automatically dismiss the alert after 4 seconds
    setTimeout(() => {
        alertElement.remove();
    }, 4000);
}
