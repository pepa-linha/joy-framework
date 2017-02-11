//import "reflect-metadata";
import {ComponentService} from "../Service/ComponentService"
import {IComponent} from "../Core/IComponent"

export const STORAGE_KEY = "___components";

export const Component = function Component(name: string, value?: any) { // @TODO any.. ? Object?
    return function (target: any) {
        //Reflect.defineMetadata(STORE_KEY, value, target);
        target[STORAGE_KEY] = value;
        ComponentService.add(name, <IComponent> target);
    }
}