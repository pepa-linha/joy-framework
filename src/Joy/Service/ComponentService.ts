import {IComponent} from "../Core/IComponent"
import {IContainerAware} from "../DI/IContainerAware"
import {IContainer} from "../DI/IContainer"
import {Container} from "../DI/Container"

import {Finder} from "./Finder"
import {Inject} from "../Decorators/Inject"
import {Logger} from "../Debug/Logger"

const ATTRIBUTE = "component";
const SELECTOR = "[component]";
const KEY = "___instance";

export class ComponentService implements IContainerAware {

    private container: Container;

    /**
     * Array of components added automatic by @Component() decorator
     */
    private static components: IComponent[] = [];

    @Inject(Finder)
    finder: Finder;

    @Inject(Logger)
    logger: Logger;

    static add(name: string, component: IComponent) {
        this.components[name] = component;
    }

    static get(name: string): FunctionConstructor | null {
        return this.components[name] || null;
    }

    create(name: string, element: Element): IComponent {
        let component = <any> ComponentService.get(name);

        if (component === null) {
            this.logger.warn(`Component '${name}' defined on element`, element, "was not found.");
            return null;
        }

        this.logger.info(`Creating component '${name}' on element`, element);
        let createdComponent = new component(element);
        createdComponent.setContainer(this.container);
        this.container.callInjects(createdComponent);
        createdComponent.prepare();
        return createdComponent;
    }

    findComponentElements(context: Element = document.documentElement) {
        return this.finder.queryAll(SELECTOR);
    }

    getComponentsIn(context: Element): IComponent[] {

        let components: IComponent[] = [];

        let componentElements = this.findComponentElements(context);
        for (let i = 0, len = componentElements.length; i < len; i++) {
            let componentElement = componentElements[i];
            components.push(this.getComponentFrom(componentElement));
        }

        return components;
    }

    getComponentFrom(element: Element): IComponent|null {
        return <IComponent> this.finder.getData(KEY, element) || null;
    }

    loadComponents(context: Element = document.documentElement) {
        let componentElements = this.findComponentElements(context);
        for (let i = 0, len = componentElements.length; i < len; i++) {
            let componentElement = componentElements[i];
            this.loadComponent(this.finder.getAttribute(ATTRIBUTE, componentElement), componentElement);
        }
    }

    loadComponent(name: string, element: Element)
    {
        this.create(name, element);
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