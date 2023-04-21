class Card {
  _open = false;
  _success = false;
  _number = null;

  constructor(gameField, number, flip) {
    this.gameField = gameField;
    this.cardElement = this.createElement();
    this.number = number;
    this.flip = flip;
  }

  createElement() {
    this.cardElement = document.createElement('div');
    this.cardElement.classList.add('card');

    this.cardElement.addEventListener('click', () => {
      if (!this.open && !this.success) {
        this.flip();
      }
    });

    this.gameField.append(this.cardElement);
    return this.cardElement;
  }

  // _open
  set open(value) {
    this._open = value;
    value ? this.cardElement.classList.add('open') : this.cardElement.classList.remove('open');
  }
  get open() { return this._open }

  // _success
  set success(value) {
    this._success = value;
    value ? this.cardElement.classList.add('success') : this.cardElement.classList.remove('success');
  }
  get success() { return this._success }

  // _number
  set number(value) {
    this._number = value;

    this.cardElement.textContent = this.number;
  }
  get number() { return this._number }
}

export default class AmazingCard extends Card {
  setImg(prop) {
    const img = document.createElement('img');
    img.src = prop;

    this.cardElement.append(img)
  }

  set number(value) {
    this._number = value;

    if (value <= 8) {
      this.setImg(`./img/couples-${value}.jpg`);
    } else {
      this.cardElement.textContent = value;
    }
  }
  get number() { return this._number }
}
