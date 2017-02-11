import {Finder} from "./Finder"
import {Inject} from "../Decorators/Inject"

export class EventHandler {

    @Inject(Finder)
    finder: Finder;
    
    on(element: Element, type: string, data : any, listener: (eventObject: JQueryEventObject, ...args: any[]) => any) {
        this.finder.getElement(element).on(type, data, listener);
    }

    off(element: Element, type: string, selector?: string, listener?: (eventObject: JQueryEventObject) => any) {
        this.finder.getElement(element).off(type, selector, listener);
    }
    
    fire(element: Element, type: string, extraParameters?: Object) {
        this.finder.getElement(element).trigger(type, extraParameters);
    }

}