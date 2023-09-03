class Section {

    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        })
    }
    
    appendItem(element) {
        this._container.append(element);
    }

    prependItem(element) {
        this._container.prepend(element);
    }
    
} 

export { Section }