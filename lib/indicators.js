import { hmiElement } from 'jahmin';
import { css, html, VarStatusCodesLit as vsc, VarStatusCodes as vs, shadow_normalize } from 'jahmin';
import './miscellaneus.js';
export class numericIndicator extends hmiElement {
    constructor() {
        super();
        this.precision = 2;
        this.unit = "";
    }
    static get properties() {
        let p = super.properties;
        p['precision'] = { type: Number };
        p['unit'] = { type: String };
        return p;
    }
    static get styles() {
        return [shadow_normalize, css `
            :host{
                display:flex;
                flex-direction: column;
                justify-content : center;
                align-items : center;
                font-family: 'Roboto', sans-serif;
                color:var(--base-color,#333333);
            }
            div.display{
                max-width:10rem;
                min-width:5rem;
                display :flex;
                flex-direction : row;
                align-items : center;
                justify-content : space-evenly;
            }
            .val {
                margin-right : 0.5rem;
                color: #555555
            }

            x-loader{
                margin-right : 0.5rem;
                width:0.9rem;
            }
            x-loader:not([show]){
                display : none;
            }
            .val:not([show]){
                display : none;
            }

        `];
    }
    render() {
        return html `
                <label><strong><slot>${this.name}</slot></strong> </label>
                <div class="display"> 
                    <x-loader ?show="${this.status === "PENDING"}"></x-loader>
                    <strong class="val" ?show="${this.status !== "PENDING"}" > ${Number.parseFloat(this.value).toFixed(this.precision)} </strong> 
                    <span>${this.unit}</span> 
                </div>
        `;
    }
}
customElements.define("numeric-ind", numericIndicator);
export class setNumber extends hmiElement {
    constructor() {
        super();
        this.precision = 2;
        this.unit = "";
        this.onmousedown = this.show.bind(this);
        this.onkeydown = this.send.bind(this);
        this.inpt_val = "";
        this.onblur = this.hide.bind(this);
    }
    static get properties() {
        let p = super.properties;
        p['precision'] = { type: Number };
        p['unit'] = { type: String };
        p['showinpt'] = { type: Boolean };
        return p;
    }
    static get styles() {
        return [shadow_normalize, css `
            :host{
                display:flex;
                flex-direction: column;
                justify-content : center;
                align-items : center;
                font-family: 'Roboto', sans-serif;
                color:var(--base-color,#333333);
                cursor: pointer;
                width: 100%;
                max-width : 8rem;
                padding-top: 0.3rem;
                padding-bottom: 0.2rem;

            }
            
            :host([status="${vsc.Error}"])
            {
                cursor: not-allowed;
            }
            :host([status="${vsc.Error}"])
            {
                cursor: not-allowed;
            }
            :host([err]){
                background-color:red;
            }
            .set{
                font-size : smaller;
                align-self : flex-start;
                display:flex;
                justify-content : flex-start;
                align-items : center;
                color : blue;
                width:100%;
                margin-bottom: 0.2rem;
            }
            :host([status="${vsc.Error}"]) > .set{
                color : #8B0000;
            }
            :host([status="${vsc.Unsubscribed}"]) > .set{
                color : #999900;
            }
            .inpt{
                display:flex;
                justify-content:center;
                align-items: center;
                max-width:0rem;
                max-height: 0rem;
                transition: max-height 0.2s ease-out, max-width 0.2s ease-out;
                transition-delay: 0s;
                overflow:hidden;
            }
            .inpt[show]{
                max-width: 10rem;
                max-height : 5rem;
            }
            input{
                width: 3rem;
                margin:0px;
                margin-right : 0.1rem;
                color: hsl(0, 0%, 41%) ;
                background-color:hsl(0, 0%, 100%);
                border-radius:.4rem;
                padding:0.5rem;
                font-family: inherit; /* 1 */
                font-size: 0.8rem; /* 1 */
                font-weight: 500;
                line-height: 1; /* 1 */
                border: 1px solid hsl(0, 0%, 86%);
            }
            input:focus{
                border-color : #00d1b2;
            }
            input:invalid{
                border-color:red;
            }
            x-triangle{
                margin-left: 0.5rem;
                width:0.5rem;
            }
            x-triangle[rotate]{
                transform: rotate(90deg); 
            }

            button {
                margin : 0;
                box-sizing : border-box;
                text-align: center;
                text-decoration: none;
                font-size: .8rem;
                font-weight: 700;
                letter-spacing: .1rem;
                padding: 0.2rem;
                background-color: hsl(0, 0%, 100%);
                border: 1px solid hsl(0, 0%, 86%);
                border-radius: .4rem;
                color: hsl(0, 0%, 41%) ;
                cursor: pointer;
                -moz-appearance: none;
                -webkit-appearance: none;
            }
            button:hover{
                border-color : #00d1b2;
            }
            x-loader{
                margin-left : 0.2rem;
                width:0.8rem;
            }
            x-loader:not([show]){
                display : none;
            }
            span[show]{
                display:none;
            }
        `];
    }
    render() {
        return html `
                <label><strong><slot></slot></strong></label>
                <div class="set" id="setcont">set: 
                    <span ?show="${this.status === "PENDING"}">${Number.parseFloat(this.value).toFixed(this.precision)}</span>
                    <x-loader ?show="${this.status === "PENDING"}"></x-loader>
                    <x-triangle ?rotate="${this.showinpt}"></x-triangle> 
                </div>
                <div id="form" class="inpt" ?show="${this.showinpt}">
                        <input id="inpt" type="number" ?disabled="${(this.status === "ERROR" || this.status === "UNSUBSCRIBED")}" value="" step="${Math.pow(10, -1 * this.precision)}">
                        <button id="btn" type="submit" ?disabled="${(this.status === "ERROR" || this.status === "UNSUBSCRIBED")}" @click="${this.send}">Set</button>
                </div>
        `;
    }
    hide(e) {
        //e.preventDefault();
        if (this.showinpt === false)
            return;
        this.showinpt = false;
        this.removeAttribute("err");
        let inpt = this.shadowRoot.getElementById('inpt');
        let btn = this.shadowRoot.getElementById('btn');
        inpt.blur();
        btn.blur();
        this.blur();
    }
    show(e) {
        if (this.status === "ERROR" || this.status === "UNSUBSCRIBED") {
            this.showinpt = true;
            setTimeout(this.hide.bind(this), 1000);
        }
        //e.preventDefault();
        //if(this.showinpt === true) this.hide
        if (this.showinpt === true)
            return;
        this.showinpt = true;
        let el = this.shadowRoot.getElementById('inpt');
        setTimeout(() => { el.focus(); }, 0);
        //el.focus();
    }
    async send(e) {
        if (this.status === vs.Error || this.status === vs.Unsubscribed)
            return;
        if (e instanceof KeyboardEvent && e.keyCode !== 13)
            return;
        let num = this.shadowRoot.getElementById('inpt').valueAsNumber;
        if (Number.isNaN(num)) {
            return;
        }
        let resp = await this.Write(num);
        if (resp[0].success) {
            this.hide(null);
        }
        else {
            this.setAttribute("err", "true");
        }
    }
}
customElements.define("set-number", setNumber);
