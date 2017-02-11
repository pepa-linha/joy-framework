import {ITemplateFactory} from "./ITemplateFactory"
import {ITemplate} from "./ITemplate"
import {Template} from "./Template"

export class TemplateFactory implements ITemplateFactory {

    create(template: string): ITemplate {
        return new Template(template);
    }

}