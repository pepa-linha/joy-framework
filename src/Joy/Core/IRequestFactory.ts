import {IRequest} from "./IRequest"

export interface IRequestFactory {

    create(url: string, data?: Object): IRequest;

}