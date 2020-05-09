import {LitElement} from 'jahmin'

let tpl = document.createElement("template");
tpl.innerHTML = `
<style>
    :host{
        display:block;
    }
</style>
<svg viewBox="149.619 91.947 128.401 109.903" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
<path d="M 263.874 190.422 L 327.956 301.415 L 199.792 301.415 L 263.874 190.422 Z" transform="matrix(0.499275, 0.866443, -0.866443, 0.499275, 311.10025, -232.379578)" bx:shape="triangle 199.792 190.422 128.164 110.993 0.5 0 1@395242f4"></path>
</svg>
`;
export class triangle extends HTMLElement
{
    constructor(){
        super();
        let swr = this.attachShadow({mode:"open"});
        swr.appendChild(tpl.content.cloneNode(true));
    }
}
customElements.define("x-triangle",triangle);