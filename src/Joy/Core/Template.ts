import {ITemplate} from "./ITemplate"

export class Template implements ITemplate {

    private template: string;

    constructor(template: string) {
        this.template = template;
    }

    protected process(data: any) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.

        var fn = !/\W/.test(this.template) ? this.process(data)

                :
                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).
                new Function("obj",
                        "var p=[],print=function(){p.push.apply(p,arguments);};" +
                        // Introduce the data as local variables using with(){}
                        "with(obj){p.push('" +
                        // Convert the template into pure JavaScript
                        this.template
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t")
                        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                        + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn(data) : fn;
    }

    render(data: any): string {
        return this.process(data);
    }

    renderTo(element: Element, data: any) {
        element.innerHTML = this.process(data);
    }

}