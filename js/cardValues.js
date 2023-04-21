export default function (numberOfCards, shuffle) {
  const cardValuesArray = [];

  // отнимаем от числа кол-ва карточек половину, чтобы получить корректный массив
  for (let i = 0; i < (numberOfCards / 100 * 50); i++) {
    cardValuesArray[i] = i + 1;
  }

  return shuffle(cardValuesArray.concat(cardValuesArray)); // дублируем каждый элемент внутри массива и сразу все перемешиваем
}
