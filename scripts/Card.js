class Card {
  _data;
  _link;
  _card;
  _templateSelector;
  _handleClickOpen;
  _handleClickDelete;
  _handleClickLike;

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  constructor({data, handleClickOpen, handleClickDelete, handleClickLike}, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleClickOpen = handleClickOpen;
    this._handleClickDelete = handleClickDelete;
    this._handleClickLike = handleClickLike;
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardOpenButton = this._card.querySelector('.element__image');
    this._cardDeleteButton = this._card.querySelector('.element__delete');
    this._cardLikeButton = this._card.querySelector('.element__like');
    this._setEventListeners();
    const cardTitle = this._card.querySelector(".element__denomination");
    const cardImage = this._card.querySelector(".element__image");

    cardTitle.textContent = this._data.name;
    cardImage.setAttribute("src", this._data.link);
    cardImage.setAttribute("alt", "место: " + this._data.name);

    return this._card;
  }

  _setEventListeners() {
    this._cardOpenButton.addEventListener("click", () => {
      this._handleClickOpen(this._data);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleClickDelete(this._card);
    });

    this._cardLikeButton.addEventListener("click", this._handleClickLike);
  }
}

export { Card };
