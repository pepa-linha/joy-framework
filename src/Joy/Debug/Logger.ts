import {ILogger} from "./ILogger"

export abstract class Logger implements ILogger {

    mode: "development" | "production";

    abstract log(message?: any, ...optionalParams: any[]);

    abstract warn(message?: any, ...optionalParams: any[]);

    abstract info(message?: any, ...optionalParams: any[]);
    
    abstract error(message?: any, ...optionalParams: any[]);

    isProductionMode() {
        return this.mode === "production";
    }

    isDevelopmentMode() {
        return this.mode === "development";
    }

}