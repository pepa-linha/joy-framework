import {ILogger} from "../Debug/ILogger"
import {Logger} from "../Debug/Logger"
import {Container} from "../DI/Container"
import {IContainerAware} from "../DI/IContainerAware"
import {ComponentService} from "../Service/ComponentService"
import {Inject} from "../Decorators/Inject"
import {IConfig} from "./IConfig"

const EVENT_STARTUP = "startup";
const EVENT_START = "load";

const MODE_DEVELOPMENT = "development";
const MODE_PRODUCTION = "production";

export class Application implements IContainerAware {

    private container: Container;

    private config: IConfig = {
        baseElement: document.documentElement,
        debug: false
    };

    @Inject(Logger)
    logger: ILogger;

    @Inject(ComponentService)
    componentService: ComponentService;

    constructor(container: Container, config?: Object) {
        this.container = container;

        if (config) {
            for (let property in config) {
                if (Object.prototype.hasOwnProperty.call(config, property)) {
                    this.config[property] = config[property];
                }
            }
        }

        this.container.callInjects(this);
        this.logger.mode = (this.config.debug ? MODE_DEVELOPMENT : MODE_PRODUCTION);
        this.componentService.setContainer(this.container);
    }

    onStartup() {}

    run() {
        try {
            this.onStartup();
            this.componentService.loadComponents();

        } catch (error) {
            this.logger.error(error.stack);
        }
    }

    setContainer(container: Container) {
        this.container = container;
    }

    getContainer() {
        return this.container;
    }
}