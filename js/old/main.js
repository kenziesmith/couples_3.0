// генерируем массив значений (в зависимоти от количества карточек на поле)
function generateCardValues(numberOfCards) {
  const cardValuesArray = [];

  // здесь мы отнимаем от числа кол-ва карточек половину, чтобы получить корректный массив. Ничего лучше я не придумал :(
  for (let i = 0; i < (numberOfCards / 100 * 50); i++) {
    cardValuesArray[i] = i + 1;
  }

  return shuffle(cardValuesArray.concat(cardValuesArray)); // дублируем каждый элемент внутри массива и сразу все перемешиваем
}

// функция создает строку, куда в дальнейшем будут помещаться карточки
function createRow() {
  const row = document.createElement('div');
  row.classList.add('row');

  return row;
}

// функция создает карточку
function createCard() {
  const card = document.createElement('div');
  card.classList.add('card', 'close');

  return card;
}

// пишем саму игру
function createCouplesGame(rows = 4, rowItems = 4) {
  const numberOfCards = rows * rowItems; // получаем общее количество карточек

  const timer = document.getElementById('timer'); // получаем таймер
  const count = document.createElement('div'); // создаем счетчик

  const cardValues = generateCardValues(numberOfCards); // генерируем массив случайных значений
  const gameField = document.getElementById('game-field'); // получаем игровое поле

  timer.innerHTML = '';

  let setTime = 40;

  timer.append('Время: ', count);
  count.innerHTML = setTime;

  let interval;

  let firstCard = null;
  let secondCard = null;
  let clickable = true;

  gameField.innerHTML = ''; // очищаем поле перед его наполнением

  // запускаем таймер
  interval = setInterval(() => {
    count.innerHTML -= 1;

    if (count.innerHTML == 0) {
      count.innerHTML = '0';
      clearInterval(interval);

      // задержка нужна, чтобы в count.innerHTML успел отобразиться 0
      setTimeout(() => {
        alert('Вермя вышло! Нажмите "Ок", чтобы начать заново');
        startGame();
      }, 100)
    }
  }, 1000)

  // размещаем строки и карточки на игровом поле
  for (let i = 0; i < rows; i++) {
    const currentRow = createRow();

    for (let j = 0; j < rowItems; j++) {
      const currentCard = createCard();

      currentRow.append(currentCard);
    }

    gameField.append(currentRow);
  }

  const cards = document.querySelectorAll('.card'); // массив всех карточек

  // наполняем контент в карточках значениями из сгенерированного массива
  for (let i = 0; i < numberOfCards; i++) {
    cards[i].textContent = cardValues[i];
  }

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]; // текущая карта
    const cardIndex = i; // индекс текущей карты

    // на каждую карточку вешаем событие клика с условиями
    card.addEventListener('click', () => {
      if (clickable == true && !card.classList.contains('success')) {
        card.classList.remove('close');
        card.classList.add('open');

        if (firstCard == null) {
          firstCard = cardIndex;
        } else if (cardIndex != firstCard) {
          secondCard = cardIndex;
          clickable = false;
        }

        if (firstCard != null && secondCard != null && firstCard != secondCard) {
          const firstItem = cards[firstCard];
          const secondItem = cards[secondCard];

          if (firstItem.textContent !== secondItem.textContent) {
            setTimeout(() => {
              firstItem.classList.add('close');
              firstItem.classList.remove('open');
              secondItem.classList.add('close');
              secondItem.classList.remove('open');

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 300)
          } else {
            setTimeout(() => {
              firstItem.classList.add('success');
              secondItem.classList.add('success');

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 200)
          }
        }

        if (Array.from(cards).every(card => card.className.includes('open'))) {
          setTimeout(() => {
            alert(`Поздравляем! Вы выйграли и в никуда потратили свое время!\r\nНажмите "Ок", чтобы начать заново`);
            clearInterval(interval);
            startGame();
          }, 300);
        }
      }
    });
  }
}

function startGame() {
  const rows = prompt('Введите количество строк (от 2 до 10):');
  const rowItems = prompt('Введите количество карточек в строке\r\nТолько четные числа не менее 2 и не более 10!');

  if (rows >= 2 && rowItems >= 2 && rows <= 10 && rowItems <= 10 && (rowItems % 2 == 0)) createCouplesGame(rows, rowItems);
  else createCouplesGame(4, 4);
}

document.addEventListener('DOMContentLoaded', () => {
  startGame();
});
