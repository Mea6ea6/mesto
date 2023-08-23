class Section {

    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItem() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        })
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }
    
}

export { Section }