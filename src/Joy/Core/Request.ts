import {IRequest} from "./IRequest"

export abstract class Request implements IRequest {

    abstract send();

    abstract handleSuccess();

    abstract handleError();

}