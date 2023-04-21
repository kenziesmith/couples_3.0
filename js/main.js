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
          alert('Поздравляю! Ты проебал время вникуда!');

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

// на страте будем получать чётное кол-во карточек, а после запускать саму игру
function start() {
  const app = document.getElementById('app'); // получаем игровое поле
  app.innerHTML = ''; // очистим игровое поле

  const numberOfCards = +prompt('Введи ЧЁТНОЕ кол-во карточек для игры:'); // кол-во карточек

  if ((numberOfCards % 2) !== 0 || !numberOfCards) {
    app.innerHTML = ''; // очистим игровое поле
    alert('Ты еб*ан или да?\nОк = да'); // рил

    runGame(app, 16);
    return;
  }

  runGame(app, numberOfCards);
};

start();
