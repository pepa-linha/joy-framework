import {IContainerAware} from "../DI/IContainerAware"

export const STORAGE_KEY = "___injects";

export function Inject(object: any) {

    return function(target: any, propertyKey: string) {
        let targetClass: any = target.constructor;
        targetClass[STORAGE_KEY] = targetClass[STORAGE_KEY] || {};
        targetClass[STORAGE_KEY][propertyKey] = object;
    }

}