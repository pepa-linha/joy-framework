import {IContainer} from "./IContainer"

export interface IContainerAware {

    setContainer(container: IContainer);

    getContainer(): IContainer;

}