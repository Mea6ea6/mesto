class Card {
  _data;
  _link;
  _card;
  _templateSelector;
  _handleClickOpen;
  _handleClickDelete;

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  constructor({data, handleClickOpen, handleClickDelete}, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleClickOpen = handleClickOpen;
    this._handleClickDelete = handleClickDelete;
  }

  createCard() {
    this._card = this._getTemplate();
    const cardTitle = this._card.querySelector(".element__denomination");
    const cardImage = this._card.querySelector(".element__image");
    const cardDelete = this._card.querySelector(".element__delete");

    cardTitle.textContent = this._data.name;
    cardImage.setAttribute("src", this._data.link);
    cardImage.setAttribute("alt", "место: " + this._data.name);

    cardDelete.addEventListener("click", () => {
      this._handleClickDelete(this._card);
    });

    cardImage.addEventListener("click", () => {
      this._handleClickOpen(this._card)
    });


    this._card.querySelector(".element__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });

    return this._card;
  }
}

export { Card };
