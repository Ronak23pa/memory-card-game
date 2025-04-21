const gameBoard = document.getElementById("game-board");

const emojis = ["🍕", "🍔", "🍟", "🍩", "🍿", "🍦", "🍣", "🍉"];
const cards = [...emojis, ...emojis]; // duplicate to make pairs
cards.sort(() => 0.5 - Math.random()); // shuffle

let flippedCards = [];
let matchedCards = [];

function createCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-emoji", emoji);
  card.innerText = emoji;

  card.addEventListener("click", () => {
    if (
      flippedCards.length < 2 &&
      !card.classList.contains("flipped") &&
      !card.classList.contains("matched")
    ) {
      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  });

  return card;
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);

    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        alert("🎉 You matched all cards!");
        window.location.reload();
      }, 500);
    }

    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Add all cards to the board
cards.forEach(emoji => {
  const card = createCard(emoji);
  gameBoard.appendChild(card);
});
