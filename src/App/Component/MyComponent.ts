import * as joy from "../../Joy"
import {Component, Inject} from "../../Joy/Decorators"
import {Finder} from "../../Joy/Service/Finder"
import {MyFirstService} from "../Service/MyFirstService"


@Component("MyComponent")
export class MyComponent extends joy.Component {

    @Inject(MyFirstService)
    myFirstService: MyFirstService

    @Inject(Finder)
    finder: Finder;

    prepare() {
        this.myFirstService.foo();
        this.myFirstService.bar();
        this.on("click", ".js-show", this.handleClick);
        this.on("click", ".js-remove", this.handleRemove);
        this.on("click", ".js-clear", this.handleClear);
    }

    destroy() {}

    handleClick = () => {
        this.redraw("items", {
            items: ["One", "Two", "Three"]
        });
    }

    handleRemove = (event) => {
        this.finder.getElement(event.currentTarget).closest(".List-item").remove();
    }

    handleClear = () => {
        this.redraw("items", {
            items: []
        });
    }

}