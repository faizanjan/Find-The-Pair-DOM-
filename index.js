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

  if (event.target.classList.contains("card") && !event.target.classList.contains("active-card")) {
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
      if (firstCard.getAttribute("id") === element.getAttribute("id") &&
        firstCard !== element
      ) {
        firstCard.style.background="green";
        element.style.background="green";
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

  main.innerHTML = `
        <div class="card" id="1" > <span class="card-value" >1</span></div>
        <div class="card" id="3" > <span class="card-value" >3</span></div>
        <div class="card" id="7" > <span class="card-value" >7</span></div>
        <div class="card" id="2" > <span class="card-value" >2</span></div>
        <div class="card" id="3" > <span class="card-value" >3</span></div>
        <div class="card" id="5" > <span class="card-value" >5</span></div>
        <div class="card" id="7" > <span class="card-value" >7</span></div>
        <div class="card" id="4" > <span class="card-value" >4</span></div>
        <div class="card" id="1" > <span class="card-value" >1</span></div>
        <div class="card" id="6" > <span class="card-value" >6</span></div>
        <div class="card" id="8" > <span class="card-value" >8</span></div>
        <div class="card" id="5" > <span class="card-value" >5</span></div>
        <div class="card" id="8" > <span class="card-value" >8</span></div>
        <div class="card" id="4" > <span class="card-value" >4</span></div>
        <div class="card" id="6" > <span class="card-value" >6</span></div>
        <div class="card" id="2" > <span class="card-value" >2</span></div>
        `;

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
