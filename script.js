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
        // verifica se ja está preenchido
        if(tabuleiroGlobal[Math.floor(i/3)][i%3] != null) return;
        
        // verifica se ganhou
        if(checkWinner()) return;

        // marca no tabuleiro
        tabuleiroGlobal[Math.floor(i/3)][i%3] = jogador;
        
        // desenha no tabuleiro
        tabuleiro[i].appendChild(drawElement(jogador));

        // troca de jogador
        jogador = jogador ? false : true;

        if (checkWinner()) drawLine();
      }
    }
  })
  return div;
}

const checkWinner = () => {
  for(let j = 0; j < 3; j++) {
    if(tabuleiroGlobal[j][j] == null) continue;
    let s = [0, 0];
    for(let i = 0; i < 2; i++) {
      if(tabuleiroGlobal[j][i] == tabuleiroGlobal[j][i + 1]) s[0]++;
      if(tabuleiroGlobal[i][j] == tabuleiroGlobal[i + 1][j]) s[1]++;
    }
    if(s[0] == 2 || s[1] == 2) return true;
  }   
  
  if(tabuleiroGlobal[1][1] === null) return false;

  if((tabuleiroGlobal[0][0] === tabuleiroGlobal[1][1] && tabuleiroGlobal[1][1] === tabuleiroGlobal[2][2]) ||
    (tabuleiroGlobal[0][2] === tabuleiroGlobal[1][1] && tabuleiroGlobal[1][1] === tabuleiroGlobal[2][0]))
  return true;

  return false;
}

const drawElement = (team) => {
  const letter = team ? "X" : "O";
  const paragraph = document.createElement("p");
  paragraph.textContent = letter;
  paragraph.classList.add("letter");
  return paragraph;
}

const drawLine = () => {
  const line = document.createElement("div");
  line.classList.add("line");
  document.querySelector(".board").appendChild(line);
}

drawBoard();