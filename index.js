let main = document.querySelector("main");
let movesCount = document.getElementById("moves-count");
let startBtn = document.getElementById("start");
let time = document.getElementById("time");

let firstCard = null;
let remainingPairs=8;
let moves = 0;
let seconds = 0;
let gameStarted = false;
let intervalInstance;

let startGame = () => {
  if (gameStarted) location.reload();

  addCardsToMain();
  assignValues();

  let cards = document.querySelectorAll(".card");

  showAllCards(cards);

  setTimeout(() => {
    //hide cards after 2 seconds
    hideAllCards(cards);
    startTimer();
    gameStarted = true;
  }, 2000);

  startBtn.innerText = "RELOAD";
};

let addCardsToMain = () => {
  main.innerHTML = "";
  let i = 16;
  while (i-- > 0) {
    let myCard = document.createElement("div");
    myCard.classList.add("card");
    let value = document.createElement("span");
    value.classList.add("card-value");
    myCard.appendChild(value);
    main.appendChild(myCard);
  }
};

let assignValues = () => {
  const usedInt = [];
  const assignedCards = [];
  let cards = document.querySelectorAll(".card");
  let cardsValues = document.querySelectorAll(".card-value");

  let i = 0;
  while (usedInt.length < 8) {
    let randomInt = null;
    while (randomInt === null || usedInt.includes(randomInt)) {
      randomInt = Math.floor(Math.random() * 8)+1;
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
};

let showAllCards = (cards) => {
  cards.forEach((card) => {
    card.classList.add("active-card");
  });
};

let hideAllCards = (cards) => {
  cards.forEach((card) => {
    card.classList.remove("active-card");
    card.style.animation = "flip 0.3s linear";
  });
};

let startTimer = () => {
  intervalInstance = setInterval(() => {
    time.innerText = ++seconds;
  }, 1000);
};

let handleCardClick = (event) => {
  // Checks
  if (
    !event.target.classList.contains("card") ||
    event.target.classList.contains("active-card") ||
    !gameStarted
  )
    return;

  movesCount.innerText = ++moves;

  let element = event.target;
  showCard(element);

  if (firstCard === null) firstCard = element;
  else {
    if (
      firstCard.getAttribute("id") === element.getAttribute("id") &&
      firstCard !== element // prevent pairing a card with itself
    ) {
      firstCard.style.background = "green";
      element.style.background = "green";
      if (--remainingPairs === 0) endGame();
      firstCard = null;
    } else {
      setTimeout(() => {
        hideCard(firstCard);
        hideCard(element);
        firstCard = null;
      }, 500);
    }
  }
};

let endGame = () => {
  clearInterval(intervalInstance);
  main.innerHTML = `<h1 id="game-won">GAME WON in ${seconds} seconds</h1>;`;
};

let showCard = (card) => {
  card.style.animation = "flipBack 0.3s linear";
  setTimeout(() => {
    card.classList.add("active-card");
  }, 200);
};

let hideCard = (card) => {
  card.classList.remove("active-card");
  card.style.animation = "flip 0.3s linear";
};

main.addEventListener("click", handleCardClick);

startBtn.addEventListener("click", startGame);
