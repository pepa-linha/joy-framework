import {Inject} from "../../Joy/Decorators/Inject"
import {Logger} from "../../Joy/Debug/Logger"
import {MySecondService} from "./MySecondService"

export class MyFirstService {

    @Inject(MySecondService)
    mySecondService: MySecondService;

    @Inject(Logger)
    logger: Logger;

    foo() {
        this.mySecondService.myMethod();
    }

    bar() {
        this.logger.log("MyFirstService::bar()");
    }

}