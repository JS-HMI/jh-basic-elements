import { hmiElement, html, css } from 'jahmin';
let tmpl = document.createElement("template");
tmpl.innerHTML = `
<style>
    .xcircle{
        fill: var(--basic-color, lightgray);
    }
</style>
<svg viewBox="159.193 82.61 52.45 52.508" xmlns="http://www.w3.org/2000/svg">
  <circle class="st1" cx="47.7" cy="133.3" r="25.7" style="stroke-miterlimit: 10;" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)"></circle>
  <path d="M 72.761 139.02 C 70.161 150.461 59.928 159 47.7 159 C 43.618 159 39.759 158.048 36.331 156.355" class="xcircle" style="stroke-miterlimit: 10;" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)"></path>
  <path d="M 37.091 109.885 C 40.325 108.417 43.917 107.6 47.7 107.6 C 60.178 107.6 70.578 116.492 72.911 128.285" class="xcircle" style="stroke-miterlimit: 10;" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)"></path>
  <line class="st1" x1="73" y1="138.5" x2="36.6" y2="156.5" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)" ></line>
  <line class="st1" x1="36.6" y1="110.1" x2="73" y2="128.1" transform="matrix(1, 0, 0, 1, 137.659134, -24.486082)" ></line>
</svg>
`;
export class vacumPumpIcon extends HTMLElement {
    constructor() {
        super();
        let swr = this.attachShadow({ mode: "open" });
        swr.appendChild(tmpl.content.cloneNode(true));
    }
}
customElements.define("vacum-pump-icon", vacumPumpIcon);
export class vacumPump extends hmiElement {
    static get styles() {
        return css `
            /*necessary for chrome flex-box issue*/
            bool-color{
                width : 100%;
            }
        `;
    }
    render() {
        return html `
        <hmi-label name="${this.name}"  engine="${this.engine}" system="${this.system}">
            <slot slot="label">${this.name}</slot>
            <bool-color name="${this.name}"  engine="${this.engine}" system="${this.system}"> 
                <vacum-pump-icon></vacum-pump-icon>
            </bool-color>
        </hmi-label>
        `;
    }
}
customElements.define("vacum-pump", vacumPump);
