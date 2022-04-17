let jogador = true;
let winner = null;
let modo = null;
let jogadas = 0;

let quadriculado = [null, null, null, null, null, null, null, null, null];

const onePlayerBtn = document.querySelector("#onePlayer");
const twoPlayersBtn = document.querySelector("#twoPlayers");
const hashtagBoard = document.querySelector("#quadro");
const menu = document.querySelector("#menu");
const score = document.querySelector("#score");
const developedBy = document.querySelector("#developedBy");
const startBtn = document.querySelector("#start");
const revancheBtn = document.querySelector("#revanche");
const playerB = document.querySelector("#jogadorB");
const playerA = document.querySelector("#jogadorA");
const endBtn = document.querySelector("#end");

const limpando = () => {
  const sqrs = document.querySelectorAll(".block");
  for (let i = 0; i < quadriculado.length; i++) {
    quadriculado[i] = null;
  }
  for (let i = 0; i < sqrs.length; i++) {
    while (sqrs[i].firstChild) {
      sqrs[i].removeChild(sqrs[i].firstChild);
    }
  }
  jogadas = 0;
};

const desenhando = (position, player) => {
  const sqr = document.querySelectorAll(`.block`)[position];
  const paragrafo = document.createElement("p");
  paragrafo.setAttribute("ID", `value${position}`);
  if (player) {
    paragrafo.textContent = "X";
    paragrafo.style.color = "#d63031";
  } else {
    paragrafo.textContent = "O";
    paragrafo.style.color = "#fdcb6e";
  }
  sqr.appendChild(paragrafo);
};

const fimRound = () => {
  setTimeout(() => {
    limpando();
    startBtn.style.display = "none";
    hashtagBoard.style.display = "none";
    menu.style.display = "flex";
    revancheBtn.style.display = "flex";
    score.style.display = "none";
    developedBy.style.display = "none";
  }, 300);
};

const trocaPlayer = () => {
  if (jogador) {
    jogador = false;
    return;
  }
  jogador = true;
};

const verificaWinner = () => {
  if (
    quadriculado[0] != null &&
    quadriculado[0] == quadriculado[1] &&
    quadriculado[1] == quadriculado[2]
  ) {
    winner = quadriculado[2];
    fimRound();
    return true;
  }
  if (
    quadriculado[3] != null &&
    quadriculado[3] == quadriculado[4] &&
    quadriculado[4] == quadriculado[5]
  ) {
    winner = quadriculado[5];
    fimRound();
    return true;
  }
  if (
    quadriculado[6] != null &&
    quadriculado[6] == quadriculado[7] &&
    quadriculado[7] == quadriculado[8]
  ) {
    winner = quadriculado[8];
    fimRound();
    return true;
  }
  if (
    quadriculado[0] != null &&
    quadriculado[0] == quadriculado[3] &&
    quadriculado[3] == quadriculado[6]
  ) {
    winner = quadriculado[6];
    fimRound();
    return true;
  }
  if (
    quadriculado[1] != null &&
    quadriculado[1] == quadriculado[4] &&
    quadriculado[4] == quadriculado[7]
  ) {
    winner = quadriculado[7];
    fimRound();
    return true;
  }
  if (
    quadriculado[2] != null &&
    quadriculado[2] == quadriculado[5] &&
    quadriculado[5] == quadriculado[8]
  ) {
    winner = quadriculado[8];
    fimRound();
    return true;
  }
  if (
    quadriculado[0] != null &&
    quadriculado[0] == quadriculado[4] &&
    quadriculado[4] == quadriculado[8]
  ) {
    winner = quadriculado[8];
    fimRound();
    return true;
  }
  if (
    quadriculado[2] != null &&
    quadriculado[2] == quadriculado[4] &&
    quadriculado[4] == quadriculado[6]
  ) {
    winner = quadriculado[6];
    fimRound();
    return true;
  }
  if (jogadas == 9) {
    fimRound();
    return true;
  }
  return false;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const bot = () => {
  let count = 0;
  for (let i = 0; i < quadriculado.length; i++) {
    if (quadriculado[i] == null) {
      count += 1;
    }
  }
  const ondeJogar = getRandomInt(0, count);
  let n = 0;
  for (let i = 0; i < quadriculado.length; i++) {
    if (quadriculado[i] != null) continue;
    if (n == ondeJogar) {
      setTimeout(() => {
        jogadas += 1;
        quadriculado[i] = false;
        desenhando(i, false);
        verificaWinner();
      }, 40);
      break;
    }
    n += 1;
  }
};

const atualizaPlacar = () => {
  let placarA = parseInt(playerA.textContent);
  let placarB = parseInt(playerB.textContent);
  if (winner == true) {
    placarA += 10;
  } else if (winner == false) {
    placarB += 10;
  }
  setTimeout(() => {
    playerB.textContent = placarB;
    playerA.textContent = placarA;
  }, 300);
};

onePlayerBtn.onclick = () => {
  modo = false;
  onePlayerBtn.style.backgroundColor = "#00cec9";
  twoPlayersBtn.style.backgroundColor = "#dfe6e9";
};

twoPlayersBtn.onclick = () => {
  modo = true;
  twoPlayersBtn.style.backgroundColor = "#00cec9";
  onePlayerBtn.style.backgroundColor = "#dfe6e9";
};

revancheBtn.onclick = () => {
  hashtagBoard.style.display = "flex";
  menu.style.display = "none";
  score.style.display = "flex";
  developedBy.style.display = "flex";
  atualizaPlacar();
};

endBtn.onclick = () => {
  jogador = true;
  modo = null;
  startBtn.style.display = "flex";
  revancheBtn.style.display = "none";
  playerB.textContent = 0;
  playerA.textContent = 0;
  onePlayerBtn.style.backgroundColor = "#dfe6e9";
  twoPlayersBtn.style.backgroundColor = "#dfe6e9";
  onePlayerBtn.style.display = "inline";
  twoPlayersBtn.style.display = "inline";
};

startBtn.onclick = () => {
  if (modo == null) return;
  onePlayerBtn.style.display = "none";
  twoPlayersBtn.style.display = "none";
  score.style.display = "flex";
  hashtagBoard.style.display = "flex";
  menu.style.display = "none";
  developedBy.style.display = "flex";
};

for (let i = 0; i < quadriculado.length; i++) {
  document.querySelectorAll(".block")[i].addEventListener("click", () => {
    if (modo == null) return;
    if (modo) {
      if (quadriculado[i] != null) return;
      jogadas += 1;
      quadriculado[i] = jogador;
      desenhando(i, jogador);
      trocaPlayer();
    } else {
      if (quadriculado[i] != null) return;
      jogadas += 1;
      quadriculado[i] = true;
      desenhando(i, true);
      bot();
    }
    verificaWinner();
  });
}
