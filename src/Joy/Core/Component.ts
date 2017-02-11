import {IComponent} from "./IComponent";
import {ComponentService} from "../Service/ComponentService";
import {Container} from "../DI/Container"
import {IContainerAware} from "../DI/IContainerAware"
import {IRequest} from "./IRequest"
import {RequestFactory} from "./RequestFactory"
import {TemplateFactory} from "./TemplateFactory"
import {EventHandler} from "../Service/EventHandler"
import {Inject} from "../Decorators/Inject"
import {Finder} from "../Service/Finder"

declare var module;

export abstract class Component implements IComponent, IContainerAware {

    element: HTMLElement;

    @Inject(Finder)
    finder: Finder;

    protected container: Container;

    constructor(element) {
        this.element = element;

        if (module.hot) {
            module.hot.status((status: string) => {
                if (status === "prepare") {
                    this.destroy();
                }
            });
        }
    }

    /**
     * Prepares the component
     */
    abstract prepare();

    /**
     * Destroys the component
     */
    abstract destroy();

    /**
     * Redirects to a URL address
     */
    redirect(url: string) {
        window.location.href = url;
    }

    /**
     * Redraws context by component template in script tag inside component element
     */
    redraw(context: string, data: any = this, template: string = null) {

        let contextElement: Element = this.element.querySelector(`[template=${context}]`),
            templateElement: Element;

        if (template === null) {
            // Find template in script element in main component element
            templateElement = this.element.querySelector(`script[type="template"][name="${context}"]`);
            if (templateElement) {
                template = templateElement.innerHTML;
            }
        }

        (<TemplateFactory> this.container.get(TemplateFactory)).create(template).renderTo(contextElement, data);
        //this.templateFactory.create(template).renderTo(contextElement, data);
    }


    /* *************** SHORTHANDs *************** */


    /**
     * Creates the request object for AJAX
     */
    createRequest(url: string, data?: Object): IRequest {
        return (<RequestFactory> this.container.get(RequestFactory)).create(url, data);
    }

    /**
     * Returns array of all child components
     */
    getComponents() {
        return (<ComponentService> this.container.get(ComponentService)).getComponentsIn(this.element);
    }

    /**
     * Adds an event to the component element
     */
    
    on(type: string, data : any, listener: (eventObject: JQueryEventObject, ...args: any[]) => any) {
        (<EventHandler> this.container.get(EventHandler)).on(this.element, type, data, listener);
    }

    /**
     * Fires an event on the component element
     */
    fire(type: string, extraParameters: Object) {
        (<EventHandler> this.container.get(EventHandler)).fire(this.element, type, extraParameters);
    }


    /* *************** IContainerAware *************** */


    /**
     * Sets the DI container
     */
    setContainer(container: Container) {
        this.container = container;
    }
    
    /**
     * Returns the DI container
     */
    getContainer(): Container {
        return this.container;
    }

}