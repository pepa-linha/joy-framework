export interface ILogger {

    mode: "development" | "production";
    
    log(message?: any, ...optionalParams: any[]);

    warn(message?: any, ...optionalParams: any[]);

    info(message?: any, ...optionalParams: any[]);

    error(message?: any, ...optionalParams: any[]);

}