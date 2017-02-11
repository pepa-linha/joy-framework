import {IRequestFactory} from "./IRequestFactory"
import {IRequest} from "./IRequest"

export abstract class RequestFactory implements IRequestFactory {

    abstract create(url: string, data?: Object): IRequest;

}