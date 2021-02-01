import { hmiElement, html } from "jahmin";
export class onclickToggle extends hmiElement {
    constructor() {
        super();
        this.addEventListener("click", this.toggle.bind(this));
    }
    toggle() {
        let toggle = this.value ? false : true;
        this.Write(toggle);
    }
    render() {
        return html `<slot></slot>`;
    }
}
customElements.define("onclick-toggle", onclickToggle);
