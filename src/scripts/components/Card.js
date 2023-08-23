class Card {
  
  _name;
  _link;
  _card;
  _templateSelector;

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.element__image');  
    this._cardTitle = this._card.querySelector('.element__denomination');
    this._cardDeleteButton = this._card.querySelector('.element__delete');
    this._cardLikeButton = this._card.querySelector('.element__like');
  }

  createCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = 'место: ' + this._name;
    this._cardTitle.textContent = this._name;

    this._cardLikeButton.addEventListener('click', () => {this._toggleLike()});
    this._cardDeleteButton.addEventListener('click', () => {this._deleteCard()});

    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._link, this._name)});

    return this._card;
  }

  _toggleLike() {
    this._cardLikeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
      this._card.remove();
      this._card = null;
  }

}

export { Card };
