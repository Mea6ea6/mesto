class Section {

    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        })
    }
    
    appendCard(element) {
        this._container.append(element);
    }

    prependCard(element) {
        this._container.prepend(element);
    }
    
} 

export { Section }