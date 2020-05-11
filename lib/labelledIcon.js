import { hmiElement } from 'jahmin';
import { html, css } from 'jahmin';
export class labeledIcon extends hmiElement {
    constructor() {
        super(...arguments);
        this.orientation = "N";
        this.top = 0;
        this.left = 0;
    }
    static get properties() {
        let x = super.properties;
        x.orientation = { type: String };
        x.top = { type: Number };
        x.left = { type: Number };
        return x;
    }
    static get styles() {
        return css `
            :host{
                display:block;
            }
            slot#std::slotted(*)
            {
                width:2.5rem;
                height:2.5rem;
            }
        `;
    }
    render() {
        return html `
            <x-position top="${this.top}" left="${this.left}">
            <hmi-label name="${this.name}"  engine="${this.engine}" system="${this.system}"
                       orientation="${this.orientation}">
    
                <slot name="label" slot="label">${this.name}</slot>
                <bool-color name="${this.name}"  engine="${this.engine}" system="${this.system}"> 
                    <slot id="std"></slot>
                </bool-color>
    
            </hmi-label>
            </x-position>
        `;
    }
}
customElements.define("labeled-icon", labeledIcon);
