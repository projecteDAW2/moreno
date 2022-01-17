var cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let primeracard, segundaCard;

var puntuacion = 0;
var tiempo = 0;
var intervalo = 0;
var cerrarmodalinicio = document.getElementById('cerrarmodalinicio');
var cerrarmodalvictoria = document.getElementById('cerrarmodalvictoria');
var cerrarmodalderrota = document.getElementById('cerrarmodalderrota');

var volverajuegos = document.getElementById('volverajuegos');

var btn = document.createElement("boton");


function iniciarContador(){
  let temporizador = document.getElementById('textCrono');
  let verificador = false;

    if (verificador==false) {
        intervalo = setInterval(function(){
            tiempo += 0.01;
            temporizador.innerHTML = tiempo.toFixed(2);      
            finjuegoloser();             

      }, 10);
      verificador = true;
      
    }  
}

function girarcard() {
  if (lockBoard) return;
  if (this === primeracard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    primeracard = this;

    return;
  }

  segundaCard = this;
  comprobarcards();
  finjuegowin();
  
}

function comprobarcards() {
  let isMatch = primeracard.dataset.framework === segundaCard.dataset.framework;

  isMatch ? deshabilitarCard() : resetCards();

}

function deshabilitarCard() {
  primeracard.removeEventListener('click', girarcard);
  segundaCard.removeEventListener('click', girarcard);
  puntuacion = puntuacion+100;
  document.getElementById('puntuacion').innerHTML = puntuacion;

  resetBoard();
}

function resetCards() {
  lockBoard = true;

  setTimeout(() => {
    primeracard.classList.remove('flip');
    segundaCard.classList.remove('flip');

    

    resetBoard();
  }, 2000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [primeracard, segundaCard] = [null, null];
}

function finjuegowin() {
  if (puntuacion === 600) {
      document.getElementById("modalvictoria").style.display = "block";

      cerrarmodalvictoria.addEventListener("click", function() {
      document.getElementById("modalvictoria").style.display = "none";
      location.reload();
    });

    clearInterval(intervalo);
      for (const card of cards) {
        card.removeEventListener('click', girarcard);
      }
  }
  }

  function finjuegoloser() {
    if (tiempo > 40) {
      document.getElementById("modalderrota").style.display = "block";
        cerrarmodalderrota.addEventListener("click", function() {
      document.getElementById("modalderrota").style.display = "none";
      location.reload();
    });
    clearInterval(intervalo);
      for (const card of cards) {
        card.removeEventListener('click', girarcard);
      }
     }
    }

  function abrirmodal (){
      document.getElementById("modalinicio").style.display = "block";
      cerrarmodalinicio.addEventListener("click", function() {
      document.getElementById("modalinicio").style.display = "none";
      iniciarContador();
      finjuegowin();
      finjuegoloser();
    });
  }



(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

window.onload = function() {
  abrirmodal();
}

cards.forEach(card => card.addEventListener('click', girarcard));