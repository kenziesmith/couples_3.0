import shuffle from './helpers/shuffle.js';
import generateCardValues from './cardValues.js';
import Card from './card.js';

function runGame(app, numberOfCards) {
  const cardValues = generateCardValues(numberOfCards, shuffle);

  let cardElements = [];
  let firstCard = null;
  let secondCard = null;
  let clickable = true;

  for (const cardNumber of cardValues) {
    const card = new Card(app, cardNumber, () => {
      if (clickable) {
        card.open = !card.open;

        if (!firstCard) {
          firstCard = card;
        } else if (!secondCard) {
          secondCard = card;
          clickable = false;
        }

        if (firstCard && secondCard) {
          if (firstCard.number === secondCard.number) {
            setTimeout(() => {
              firstCard.success = true;
              secondCard.success = true;

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 300);
          } else {
            setTimeout(() => {
              firstCard.open = false;
              secondCard.open = false;

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 300);
          }
        }
      }

      setTimeout(() => {
        if (document.querySelectorAll('.success').length == cardElements.length) {
          alert('WIN!');

          cardElements = [];
          firstCard = null;
          secondCard = null;
          clickable = true;

          start();
        }
      }, 300);
    });

    cardElements.push(card);
  }
}

function start() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const numberOfCards = +prompt('Введи чётное кол-во карточек для игры:');

  if ((numberOfCards % 2) !== 0 || !numberOfCards) {
    app.innerHTML = '';
    alert('Error! Условия игры: поле 4x4');

    runGame(app, 16);
    return;
  }

  runGame(app, numberOfCards);
};

start();
