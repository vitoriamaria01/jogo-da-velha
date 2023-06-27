import React, { useState } from "react";
import "./App.css";

const Game = () => {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [jogadorAtual, setjogadorAtual] = useState("X");
  const [vencedor, setVencedor] = useState(null);

  const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const verificarVencedor = (tabuleiro) => {
    for (let combinacao of combinacoesVencedoras) {
      const [a, b, c] = combinacao;
      if (
        tabuleiro[a] &&
        tabuleiro[a] === tabuleiro[b] &&
        tabuleiro[a] === tabuleiro[c]
      ) {
        setVencedor(tabuleiro[a]);
        return;
      }
    }

    if (tabuleiro.every((quadrado) => quadrado !== null)) {
      setVencedor("empate");
    }
  };

  const reiniciarJogo = () => {
    setTabuleiro(Array(9).fill(null));
    setjogadorAtual("X");
    setVencedor(null);
  };

  const criarQuadrado = (index) => {
    return (
      <div className="quadrado" onClick={() => realizarJogada(index)}>
        {tabuleiro[index]}
      </div>
    );
  };

  const realizarJogada = (index) => {
    if (tabuleiro[index] === null && !vencedor) {
      tabuleiro[index] = jogadorAtual;
      setjogadorAtual(jogadorAtual === "X" ? "O" : "X");
      verificarVencedor(tabuleiro);
    }
  };

  return (
    <main>
      <h1 className="titulo">Jogo da velha</h1>
      {vencedor && (
        <div className="mensagem">
          {vencedor === "empate"
            ? "Deu um empate!"
            : `O jogador "${vencedor}" ganhou!`}
        </div>
      )}
      <div className="tabuleiro">
        {tabuleiro.map((_, index) => criarQuadrado(index))}
      </div>
      <button onClick={reiniciarJogo}>
        <span className="btn-titulo">Reiniciar jogo</span>
      </button>
    </main>
  );
};

export default Game;
