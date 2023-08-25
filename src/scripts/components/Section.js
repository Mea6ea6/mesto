class Section {

    constructor({items, renderer}, containerSelector) {
        this._items = items; 
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        })
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }
    
}

export { Section }