class Card {

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  constructor(data, userId, templateSelector, handleCardClick, handleCardLike, handleCardDelete) {
    this._data = data;
    this._ownerId = data.owner._id;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;

    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".element__image");
    this._cardTitle = this._card.querySelector(".element__denomination");
    this._cardLikeButton = this._card.querySelector(".element__like");
    this._cardLikeCounter = this._card.querySelector(".element__counter");
    this._cardDeleteButton = this._card.querySelector(".element__delete");
  }

  createCard() {
    this._cardImage.src = this._data.link;
    this._cardImage.alt = "место: " + this._data.name;
    this._cardTitle.textContent = this._data.name;

    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });
    
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });
    this._updateLikeCounter();

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data.link, this._data.name);
    });

    if (this._userId !== this._ownerId) {
      this._cardDeleteButton.remove();
    }

    return this._card;
  }

  setLikesData(data) {
      this._data.likes = data.likes;
      this._updateLikeCounter();
  }

  isLiked() {
      return this._data.likes.some((item) => {
          return item._id === this._userId;
      })
  }

  _updateLikeCounter() {
      this._cardLikeCounter.textContent = this._data.likes.length;
      if (this.isLiked()) {
          this._cardLikeButton.classList.add('element__like_active');
      } else {
          this._cardLikeButton.classList.remove('element__like_active');
      }
  }

  getId() {
    return this._data._id;
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

}

export { Card };
