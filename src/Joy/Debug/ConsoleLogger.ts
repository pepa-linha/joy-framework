import {Logger} from "./Logger"

export class ConsoleLogger extends Logger {

    log(message?: any, ...optionalParams: any[]) {
        console.log.apply(null, arguments);
    }

    info(message?: any, ...optionalParams: any[]) {
        console.info.apply(null, arguments);
    }

    warn(message?: any, ...optionalParams: any[]) {
        console.warn.apply(null, arguments);
    }

    error(message?: any, ...optionalParams: any[]) {
        console.error.apply(null, arguments);
    }

}