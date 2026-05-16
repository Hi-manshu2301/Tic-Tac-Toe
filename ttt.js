let player1 = "";
let player2 = "";
let currentPlayer = "x";
let gameMode = "single";
let gameOver = false;


let board = ["","","","","","","","",""];

//these are the winning patterns
const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restartBtn");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const mode = document.getElementById("mode");
const player2Input = document.getElementById("player2");

player2Input.style.display = "none";   //chnage css from JS

//mode change event we use chnage here means when dorpdown value changes
mode.addEventListener("change",function(){
    if(mode.value === "single"){
        player2Input.style.display = "none";
    }else{
        player2Input.style.display = "block";
    }
});


submitBtn.addEventListener("click", function(){

    player1 = document.getElementById("player1").value;
    gameMode = document.getElementById("mode").value;
    if(gameMode === "single"){
        player2 = "Computer";
    }else{
        player2 = document.getElementById("player2").value;    //change css from js
    }
  
    document.getElementById("game").style.display = "block";
  
    message.textContent = `${player1}, you're up`;
});
cells.forEach((cell,index)=>{                                   //cells.for each means run this code for every cell || board array also uses same index 
    cell.addEventListener("click",function(){
        if(gameOver) return;
        if(board[index] !== "" || gameOver){
            return;
        }
        // filling values in cell as well as in board array
        if(currentPlayer ==="x"){
            cell.textContent ="x";
            board[index]="x"
        }else{
            cell.textContent="o"
            board[index]="o"
        }

        //storing winning pattern
        let winningPattern = checkWinner();
        if(winningPattern){
            gameOver = true;
            highlightWinner(winningPattern);
            let winner = currentPlayer === "x"? player1:player2;
            // alert(`${winner} Congratulations You Won!`);
            message.textContent=`${winner} won!`;
            return;
        }
        if(checkDraw()){
            alert("Match Draw!")
            message.textContent="Match Draw";
            gameOver = true;
            return;
        }
        //switch player
        if(currentPlayer ==="x"){
            currentPlayer = "o";
            if(gameMode === "single"){
                message.textContent= "Computer is thinking...";
                setTimeout(()=>{                                    //means run code after delay otherwise it will run instantly
                    aiMove();
                },500);
            }else{
                message.textContent= `${player2}, you're up`;
            }
            
        }else{
            currentPlayer="x";
            message.textContent = `${player1}, you're up`;
        }
            
        
    });
});
function checkWinner(){

    for(let pattern of winPatterns){
      //take one winning pattern at one time and extract its indexes  
      let a = pattern[0];
      let b = pattern[1];
      let c = pattern[2];
      
      //checking for the pattern at the indexed position - winning consition 
      if(
        board[a] !== "" &&
        board[a] === board[b] &&
        board[b] === board[c]
      ){
        return pattern;
      }
    }
  
    return null;
}
function checkDraw(){

    for(let value of board){
  
      if(value === ""){
        return false;
      }
    }
  
    return true;
}
function aiMove(){
    
    let emptyCells = [];
    board.forEach((value,index)=>{     //find empty indexes from board and add them into empty cell index 
        if(value === ""){
            emptyCells.push(index);
        }
    });
    let randomIndex = emptyCells [Math.floor(Math.random() * emptyCells.length)];    //math.random return random decimal floor removes decimal making it an index
    board[randomIndex] = "o";
    cells[randomIndex].textContent = "o";      //placing ai move

    let winningPattern = checkWinner();        //calling these functions here because ai may fill the empty places after winning
    if(winningPattern){
        gameOver = true;
        highlightWinner(
            winningPattern
        );
        alert("Computer won!");
        return;
    }
    if(checkDraw()){
        gameOver = true;
        alert("Match Draw!");
        return;
    }
    currentPlayer = "x";
    message.textContent = `${player1}, you're up`;
}
restartBtn.addEventListener("click", function(){

    board = ["","","","","","","","",""];
  
    currentPlayer = "x";
    gameOver = false;
  
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("winner"); //removing winner class
    });
  
    message.textContent = `${player1}, you're up`;
});

//taking number for pattern index
function highlightWinner(pattern){
    pattern.forEach(index => {
        cells[index].classList.add("winner");   //convert class of winning cell to winner class
    })
}