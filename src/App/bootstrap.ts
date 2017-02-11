import * as joy from "../Joy/index"

import {MyComponent} from "./Component/MyComponent"

import {MyFirstService} from "./Service/MyFirstService"
import {MySecondService} from "./Service/MySecondService"

let container = new joy.Container();

container.add(MyFirstService);
//container.add(MySecondService);

let application = new joy.Application(container);
application.run();

// List of all used components
MyComponent;

declare var module;
if (module.hot) {
    module.hot.accept();
}