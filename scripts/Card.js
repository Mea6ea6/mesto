class Card {
  constructor(data) {
    this._data = data;
  }

  createCard({ name, link }) {
    const card = cardTemplate.cloneNode(true);
    const cardTitle = card.querySelector(".element__denomination");
    const cardImage = card.querySelector(".element__image");

    cardTitle.textContent = name;
    cardImage.setAttribute("src", link);
    cardImage.setAttribute("alt", "место: " + name);

    cardImage.addEventListener("click", () => {
      openPopup(popupCard);
      popupImage.src = link;
      popupImage.alt = name;
      popupCaption.textContent = name;
    });

    const cardDelete = card.querySelector(".element__delete");
    cardDelete.addEventListener("click", function () {
      card.remove();
    });

    card
      .querySelector(".element__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_active");
      });

    return card;
  }
}

export { Card };
