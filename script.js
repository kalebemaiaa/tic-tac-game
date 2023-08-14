let tabuleiroGlobal = [[null, null, null], [null, null, null], [null, null, null]];
let jogador = true;

const drawBoard = () => {
  const board = document.createElement("div");
  for(let row of tabuleiroGlobal) { 
    for(let square of row) {
      board.appendChild(drawSquare());
    }
  }
  board.classList.add("board");
  document.querySelector("body").appendChild(board);
}

const drawSquare = () => {
  const div = document.createElement("div");
  div.classList.add("square");
  div.addEventListener("click", (e) => {
    const tabuleiro = e.target.parentNode.children;
    for(let i = 0; i < tabuleiro.length; i++) {
      if(tabuleiro[i] === e.target){
        if(tabuleiroGlobal[Math.floor(i/3)][i%3] != null) return;
        
        // verifica se ganhou
        if(checkWinner()){
          console.log("CABO");
          return;
        } 

        // marca no tabuleiro
        tabuleiroGlobal[Math.floor(i/3)][i%3] = jogador;
        
        // troca de jogador
        jogador = jogador ? false : true;

        console.log(i, jogador, tabuleiroGlobal);
        return;
      }
    }
  })
  return div;
}

const checkWinner = () => {
  for(let j = 0; j < 3; j++) {
    if(tabuleiroGlobal[j][j] == null) continue;
    if((tabuleiroGlobal[j][0] === tabuleiroGlobal[j][1] && tabuleiroGlobal[j][1] === tabuleiroGlobal[j][2]) ||
      (tabuleiroGlobal[0][j] === tabuleiroGlobal[1][j] && tabuleiroGlobal[1][j] === tabuleiroGlobal[2][j]))
      return true;
  }   
  
  if(tabuleiroGlobal[1][1] === null) return false;
  if((tabuleiroGlobal[0][0] === tabuleiroGlobal[1][1] && tabuleiroGlobal[1][1] === tabuleiroGlobal[2][2]) ||
    (tabuleiroGlobal[0][2] === tabuleiroGlobal[1][1] && tabuleiroGlobal[1][1] === tabuleiroGlobal[2][0]))
  return true;

  return false;
}

drawBoard();