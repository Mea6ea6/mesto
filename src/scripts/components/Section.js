class Section {

    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        })
    }
    
    addCard(element) {
        this._containerSelector.append(element);
    }
    
} 

export { Section }