class Section {

    constructor({items, renderer}) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector('.elements');
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