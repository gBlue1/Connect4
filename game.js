/*////////////////////////////////////
File Name: game.js
Author: George Blue
Description: This file contains the methods used to print the connect 4 graphics and run the game
Date: 5/5/2021
EECS 368 Project
*///////////////////////////////////

//variables used, some were taken from Professor Gill's tic-tac toe example
let canvas;
let context;
const width = 740; //width of the board
const length = 640;//length of the board

//assigns an empty slot for each [row][column] pair. There are 42 total slots because there are 6 rows and 7 columns
let model = {
 board: [[".",".",".",".",".",".","."], [".",".",".",".",".",".","."],
        [".",".",".",".",".",".","."], [".",".",".",".",".",".","."],
        [".",".",".",".",".",".","."], [".",".",".",".",".",".","."]],
  next: "X",
}
//--------------------------------------------



//function that uses check functions to see if red or yellow is the winner or if the result is a draw
function checkWinnerboard(board)
{
    //win condition for red
    if(model.next == 'O'){
        if(verticalCheck(board)||horizontalCheck(board)||diagonalCheck1(board)||diagonalCheck2(board))//checks to see if red has met the conditions to win
       {
         return(alert('Red is the Winner! Click the reset button to play again!'));
         
       }
        else if(fullCheck(board))//checks to see if there are any remaining moves on the board
       {
        window.location.reload();//resets the game if there are no remaining moves
         return(alert('Game is a draw. Game will now reset'));
       }
       else
       {
           return;
       }
    }
  
    //win condition for yellow
    else if(model.next == 'X'){
        if(verticalCheck(board)||horizontalCheck(board)||diagonalCheck1(board)||diagonalCheck2(board))//checks to see if yellow has met the conditions to win
        {
        return(alert('Yellow is the winner! Click the reset button to play again!'));
       }
       else if(fullCheck(board))//checks to see if there are any remaining moves on the board
       {
        window.location.reload();//resets the game if there are no remaining moves
        return(alert('Game is a draw. Game will now reset'));
       }
       else
       {
           return;
       }
    }
 }
   
   
 
    


//---------------------------------- win conditions adapted from https://stackoverflow.com/questions/33181356/connect-four-game-checking-for-wins-js for connect 4
function chkLine(a,b,c,d) {
    // Check first cell to see if non-zero and then check to see if 3 other concurrent cells are non-zero
    return ((a != '.') && (a ==b) && (a == c) && (a == d));
}


//--------------------------------------function that checks if there are 4 vertically aligned matching cells either from top to bottom or bottom to top
function verticalCheck(board) {

    for(let row = 0; row < 3; row++)
    {
        for(let col = 0; col < 7; col++)
        {
            if (chkLine(board[row][col], board[row+1][col], board[row+2][col], board[row+3][col]))
            {
              return true;
             
            }     
        }
    }
}
//-------------------------------------- end of function that checks if there are 4 vertically aligned matching cells

//------------------------------------- function that checks if there are 4 horizontally aligned matching cells from left to right or right to left
function horizontalCheck(board){
    // Check right
    for(let row = 0; row < 6; row++)
    {
        for(let col = 0; col< 4; col++)
        {
            if (chkLine(board[row][col], board[row][col+1], board[row][col+2], board[row][col+3])){
              return true;
            }
        }
    }  
}
//--------------------------------------end of function that checks if there are 4 horizontally aligned matching cells from left to right or right to left

//-------------------------------------function that checks if there are 4 diagonally aligned matching cells from top right to bottom left
function diagonalCheck1(board) 
{
    for(let row = 0; row < 3; row++)
    {
        for(let col = 0; col < 4; col++){

            if(chkLine(board[row][col], board[row+1][col+1], board[row+2][col+2], board[row+3][col+3]))
            {
                return true;
            }
       } 
    }     
}
//-------------------------------------function that checks if there are 4 diagonally aligned matching cells from top right to bottom left

//-------------------------------------------------------- function that checks if there are 4 diagonally aligned matching cells from top left to bottom right
function diagonalCheck2(board) 
{
    for(let row = 3; row < 6; row++)
    {
       for(let col = 0; col < 4; col++){
            if(chkLine(board[row][col], board[row-1][col+1], board[row-2][col+2], board[row-3][col+3]))
            {
                return true;
            }
        }
        
    }
}
//-------------------------------------------------------- function that checks if there are 4 diagonally aligned matching cells from top left to bottom right




//-------------------------------------------------------- function that checks if the board is filled which results in a draw
function fullCheck(board)
{
    for(let row = 0; row <6; row++)
    {
        for(let col=0 ; col <5; col++)
        {
            if(board[row][col] == ["."])//iterates through each slot and checks if it's empty, if it comes across an empty slot, it returns false.
            {
                return false; 
            }
            
        }
    }
   return true;
}
//-------------------------------------------------------- end of function that checks if the board is filled which results in a draw



//------------------------------------------end of adapted win conditions


//taken from professor Gill's slides
function tick() {
    window.requestAnimationFrame(splat);
  }
  
  // Taken from https://www.html5canvastutorials.com/tutorials/html5-canvas-lines/
  //--------------------prints canvas to screen  with respective colors
  function splat() {
    context.clearRect(0,0,canvas.width,canvas.height)
    for(var k= 1; k< 7; k++){
        context.moveTo(0.5 + (k*104), 1);
        context.lineTo(0.5 +(k*104), length);
    }
  
    for (var k = 1; k<=5; k++){
        context.moveTo(1, 0.5 + (k*104));
        context.lineTo(width, 0.5 +(k*104));
    }
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();

for(let i = 0; i <6; i ++){
    for(let j =0; j<7; j++){
        let me = model.board[i][j];
        if(me !='.'){
            context.beginPath();
            if(me == 'X'){
                context.fillStyle = "#c82124";
            }
            else{
                context.fillStyle = "#c8c821";
            }
            context.arc((j*104)+53, (i*104)+53,40,0,2*Math.PI);
            context.closePath();
            context.fill();
        }
     }
  }
    tick();
}
//----------------------------------

function roundMe(x){ return Math.ceil((x-20)/105)-1}//taken from tic tac toe example and adapted for connect 4, 
//used in the map method on line 213 to streamline the clicking interaction on the board


//------function that handles the interaction when selecting a slot and switching between player turns
document.addEventListener("click", e => {
    const [i,j] = [e.x,e.y].map(roundMe);
    if (i < 0 || i > 6){
        return;
    } 
    if (j < 0 || j > 5){
        return;
    } 
    if (model.board[j][i] != '.') {
      return;
    }
  //  console.log(i,j,ix)
   for(var x =5; x>= 0; x--)
   {
       if(model.board[x][i] == '.'){
           model.board[x][i] = model.next;
           break
       }
   }
   //changes made when the current player is red
   if(model.next == 'X'){
       model.next ='O'
       document.getElementsByClassName('red_Player')[0].style.display = "none"
       document.getElementsByClassName('yellow_Player')[0].style.display = "block"
       checkWinnerboard(model.board);
      
  
   }
   //changes made when the current player is yellow
   else if(model.next == 'O'){
       model.next = 'X'
       document.getElementsByClassName('red_Player')[0].style.display = "block"
       document.getElementsByClassName('yellow_Player')[0].style.display ="none"
       checkWinnerboard(model.board);
    
   }
})

//taken from Professor Gills tic tac toe example and adapted for connect 4
document.addEventListener("DOMContentLoaded", () => { 
    canvas = document.querySelector("#myCanvas");
    console.log("Got here");
    context = canvas.getContext("2d");
    console.log(context);
    splat();
});

