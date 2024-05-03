function creatPlayer(name,token){
    let position = {x:"",y:""};
    function setPosition(x,y){
        position.x=x;
        position.y=y;
    }
    return {name,token,position,setPosition};
}

const gameBoard = (function(){
    const board = [[0,0,0],[0,0,0],[0,0,0]];
    function resetTheBoard(){
        board.forEach((e)=>e.fill(0,0,2));
    }
    function displayTheboard(){
        board.forEach((e)=>console.log(e));
    }
    function isRowStrick(numberOfRow,token){
        
        return board[numberOfRow].reduce((a,b)=>{return a && (b === token)},true);
    }
    function isColStrick(numberOfCol,token){
        console.log(token)
        return board.reduce((a,b)=>{return a && (b[numberOfCol] === token)},true);
    }
    function alterBoard(token,position){
        if(board[position.x][position.y] ===0){
        board[position.x][position.y] = token;
        }
    }
    function getBoxValue(x,y){
        return board[x][y];
    }
    return {resetTheBoard,displayTheboard,alterBoard,isRowStrick,isColStrick,getBoxValue}
})();
function creatGameController(){
    const players = [];
    let turn = 0;
    let gameEnded = false;
    function setPlayers(firstPlayer,secondPlayer){
        players.push(firstPlayer);
        players.push(secondPlayer);
    }
    function getTurn(){return turn};
    function switchTurn(){
        turn = turn === 0 ? 1 : 0 ;
    }
    function getCurrentPlayer(){
        return players[turn];
    }
    function  isThereAwiner(){
        for(let i  = 0 ; i <3 ; i++){
            if(gameBoard.isColStrick(i,getCurrentPlayer().token)|| gameBoard.isRowStrick(i,getCurrentPlayer().token)) return true ;
        }
        return false;
    }
    function playRound(){
        let player = getCurrentPlayer();
        
        if(!isThereAwiner() && !gameEnded)
            {gameBoard.alterBoard(player.token,player.position);
            if(isThereAwiner()) {gameEnded = true;
                let par = document.createElement("p");
                console.log("from else")
                par.textContent = "The winner is " + getCurrentPlayer().name;
                document.querySelector(".game-result").appendChild(par);
                document.querySelector("button").style.display = "block"
            }
            else {
            switchTurn();
                 console.log("there is no winner")
            }
                }
        else {
            gameEnded = true
           
        }
    }
   
    return{setPlayers,getTurn,playRound,getCurrentPlayer,gameEnded};
}
function handleClick(e){
    if(!gameController.gameEnded){
    let boxNumber = e.target.classList.item(1).split('-')[1];
    let rowNumber = Math.floor(boxNumber / 3) ;
    let colNumber = parseInt(boxNumber)-rowNumber*3;
    gameController.getCurrentPlayer().setPosition(rowNumber,colNumber);
    gameController.playRound();
    renderFromBoard();
    }
    else {
       
    }

}
function initializUi(){
    const board = document.querySelector(".game-board");
    for (let index = 0; index < 9; index++) {
        const div = document.createElement("div");
        div.addEventListener('click',handleClick);
        div.classList.add("box-board");
        let boxClass = "box-" + index.toString();
        div.classList.add(boxClass);
        board.appendChild(div);
        
    }
}
function renderFromBoard(){
    for(let i = 0 ; i  < 3 ; i++){
        for(let j = 0 ; j < 3 ;j++){
            if(gameBoard.getBoxValue(i,j) === 1){
                let classOfBox = ".box-" + (i*3 + j).toString();
                let div = document.querySelector(classOfBox);
                div.textContent = "O";
            }
            if(gameBoard.getBoxValue(i,j) === 2){
                let classOfBox = ".box-" + (i*3 + j).toString();
                let div = document.querySelector(classOfBox);
                div.textContent = "X";
            }
        }
    }
}

initializUi();
renderFromBoard();
const gameController  = creatGameController();
const nabil = creatPlayer("nabil",1);
const anouar = creatPlayer("anouar",2);
gameController.setPlayers(nabil,anouar);
 
 gameController.getCurrentPlayer().setPosition(x,y);
 console.log(nabil);
 gameController.playRound();
 gameBoard.displayTheboard();
 console.log(gameController.getCurrentPlayer());
 console.log(typeof parseInt(x));














