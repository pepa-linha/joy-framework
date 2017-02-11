export interface IContainer {

    add(service: Function);

    get(type: Function): Function | null;

    createInstance(clazz: FunctionConstructor);

}