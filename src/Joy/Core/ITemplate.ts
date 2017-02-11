export interface ITemplate {

    render(data: any): string;

    renderTo(element: Element, data: any);

}