import {ITemplate} from "./ITemplate"

export interface ITemplateFactory {

    create(template: string): ITemplate;

}