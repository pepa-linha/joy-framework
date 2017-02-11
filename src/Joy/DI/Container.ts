import {IContainer} from "./IContainer"
//import {STORAGE_KEY as STORAGE_COMPONENT_KEY} from "../Decorators/Component"
import {STORAGE_KEY as STORAGE_INJECT_KEY} from "../Decorators/Inject"

import {ComponentService} from "../Service/ComponentService"
import {EventHandler} from "../Service/EventHandler"
import {Finder} from "../Service/Finder"
import {Logger} from "../Debug/Logger"
import {ConsoleLogger} from "../Debug/ConsoleLogger"
import {TemplateFactory} from "../Core/TemplateFactory"

export class Container implements IContainer {

    private registry: {FunctionConstructor: Function, instance: Object}[] = [];

    constructor() {
        this.addRequiredServices();
    }

    private addRequiredServices() {
        this.add(ComponentService);
        this.add(EventHandler);
        this.add(Finder);
        this.add(ConsoleLogger);
        this.add(TemplateFactory);
    }

    add(service: Function) {

        if (Object.prototype.hasOwnProperty.call(this.registry, service)) {
            (<Logger> this.get(Logger)).warn(`Service '${service.toString}' already exists.`);
            return;
        }

        this.registry.push({
            FunctionConstructor: service,
            instance: null
        });
    }

    get(type: Function) {
        let dependency;

        for (let i = 0, len = this.registry.length; i < len; i++) {
            // http://stackoverflow.com/questions/30993434/check-if-a-constructor-inherits-another-in-es6
            if (this.registry[i].FunctionConstructor === type || Function.prototype.isPrototypeOf.call(type, this.registry[i].FunctionConstructor)) {
                dependency = this.registry[i];
                break;
            }
        }

        if (!dependency) {
            (<Logger> this.get(Logger)).error(`Dependency '${type["name"]}', was not found. Did you registered as dependency to DI container: container.add(${type["name"]})?`);
            return null;
        }

        if (!dependency.instance) {
            dependency.instance = this.createInstance(dependency.FunctionConstructor);
        }

        return dependency.instance;
    }

    createInstance(clazz: FunctionConstructor) {
        let newClass = new clazz();
        this.callInjects(newClass);
        return newClass;
    }

    callInjects(o: any) {
        let injects = o.constructor[STORAGE_INJECT_KEY] ? o.constructor[STORAGE_INJECT_KEY] : null,
            dependencyToInject;

        if (injects) {
            for (let inject in injects) {
                if (Object.prototype.hasOwnProperty.call(injects, inject)) {
                    dependencyToInject = this.get(injects[inject]);
                    o[inject] = dependencyToInject;
                }
            }
        }
    }

}