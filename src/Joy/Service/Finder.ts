export class Finder {

    private cache: { element: Element, jQuery: JQuery }[] = [];

    getElement(element): JQuery {

        let foundJQueryElement;

        for (let i = 0, len = this.cache.length; i < len; i++) {
            if (this.cache[i].element === element) {
                foundJQueryElement = this.cache[i].jQuery;
                break;
            }
        }

        if(!foundJQueryElement) {
            foundJQueryElement = $(element);
            this.cache.push({
                element: element,
                jQuery: foundJQueryElement
            });

            if (this.cache.length > 10) {
                this.cache.shift();
            }
        }

        return foundJQueryElement;
    }

    query(selector: string, context: Element = document.documentElement): Element | null {
        return this.getElement(context).find(selector)[0] || null;
    }

    queryAll(selector: string, context: Element = document.documentElement): JQuery {
        return this.getElement(context).find(selector);
    }

    getAttribute(name: string, element: Element) {
        return this.getElement(element).attr(name);
    }

    getDataAttribute(name: string, element: Element) {
        return this.getAttribute(`data-${name}`, element);
    }

    setAttribute(name: string, value: string | number, element: Element) {
        this.getElement(element).attr(name, value);
    }

    setDataAttribute(name: string, value: string | number, element: Element) {
        this.setAttribute(`data-${name}`, value, element);
    }

    getProperty(name: string, element: Element) {
        return this.getElement(element).prop(name);
    }

    setProperty(name: string, value: string | number | boolean, element: Element) {
        this.getElement(element).prop(name, value);
    }

    setData(key: string, value: any, element: Element) {
        this.getElement(element).data(key, value);
    }

    getData(key: string, element: Element) {
        return this.getElement(element).data(key);
    }

}