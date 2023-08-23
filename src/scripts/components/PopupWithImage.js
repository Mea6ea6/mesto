import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

    constructor(popupSelector){
        super(popupSelector);
        this._image = document.querySelector('.popup__image');
        this._caption = document.querySelector('.popup__figcaption');
    }

    open(imgLink, caption) {
        super.open();
        this._image.src = imgLink;
        this._caption.textContent = caption;
        this._image.alt = caption;
    }
    
}

export { PopupWithImage }