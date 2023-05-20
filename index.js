let main = document.querySelector("main");
let movesCount = document.getElementById("moves-count");
let startBtn = document.getElementById("start");
let time = document.getElementById("time");

let firstCard = null;
let remainingPairs = 8;
let moves = 0;
let seconds = 0;
let gameStarted = false;
let intervalInstance;

main.addEventListener("click", (event) => {
  if (!gameStarted) return;

  if (
    event.target.classList.contains("card") &&
    !event.target.classList.contains("active-card")
  ) {
    let element = event.target;
    moves++;
    movesCount.innerText = moves;
    element.style.animation = "flipBack 0.3s linear";
    setTimeout(() => {
      element.classList.add("active-card");
    }, 200);
    if (firstCard === null) {
      firstCard = element;
    } else {
      if (
        firstCard.getAttribute("id") === element.getAttribute("id") &&
        firstCard !== element
      ) {
        firstCard.style.background = "green";
        element.style.background = "green";
        //   GAME END:
        if (--remainingPairs === 0) {
          clearInterval(intervalInstance);
          main.innerHTML = `
            <h1 id="game-won">GAME WON in ${seconds} seconds</h1>;
        `;
        }
        firstCard = null;
      } else {
        setTimeout(() => {
          firstCard.classList.remove("active-card");
          firstCard.style.animation = "flip 0.3s linear";
          element.classList.remove("active-card");
          element.style.animation = "flip 0.3s linear";
          firstCard = null;
        }, 500);
      }
    }
  }
});

startBtn.addEventListener("click", () => {
  if (gameStarted) location.reload();

  let i = 16

  main.innerHTML='';
  while(i-->0){
    let myCard = document.createElement('div');
    myCard.classList.add('card');
    let value = document.createElement('span');
    value.classList.add('card-value');
    myCard.appendChild(value);
    main.appendChild(myCard)
  }

  assignValues();
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.classList.add("active-card");
  });

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("active-card");
      card.style.animation = "flip 0.3s linear";
    });
    intervalInstance = setInterval(() => {
      time.innerText = ++seconds;
    }, 1000);
    gameStarted = true;
  }, 2000);

  startBtn.innerText = "RELOAD";
});

function assignValues() {
  const usedInt = [];
  const assignedCards = [];
  let cards = document.querySelectorAll(".card");
  let cardsValues = document.querySelectorAll(".card-value");

  let i = 0;
  while (usedInt.length < 8) {
    let randomInt = null;
    while (randomInt === null || usedInt.includes(randomInt)) {
      randomInt = Math.floor(Math.random() * 9);
    }
    usedInt.push(randomInt);

    let randElement1 = null;
    while (randElement1 === null || assignedCards.includes(randElement1)) {
      randElement1 = Math.floor(Math.random() * 16);
    }
    assignedCards.push(randElement1);

    let randElement2 = null;
    while (randElement2 === null || assignedCards.includes(randElement2)) {
      randElement2 = Math.floor(Math.random() * 16);
    }
    assignedCards.push(randElement2);

    cards[randElement1].setAttribute("id", randomInt);
    cards[randElement2].setAttribute("id", randomInt);
    cardsValues[randElement1].innerText = randomInt;
    cardsValues[randElement2].innerText = randomInt;
  }
}
