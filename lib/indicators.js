import { hmiElement } from 'jahmin';
import { css, html } from 'jahmin';
import './miscellaneus.js';
export class numericIndicator extends hmiElement {
    static get properties() {
        let p = super.properties;
        p['precision'] = { type: Number };
        p['unit'] = { type: String };
        return p;
    }
    constructor() {
        super();
        this.precision = 2;
        this.unit = "";
    }
    static get styles() {
        return css `
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

        `;
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
//@ts-ignore
customElements.define("numeric-ind", numericIndicator);
export class setNumber extends hmiElement {
    static get properties() {
        let p = super.properties;
        p['precision'] = { type: Number };
        p['unit'] = { type: String };
        p['showinpt'] = { type: Boolean };
        return p;
    }
    constructor() {
        super();
        this.precision = 2;
        this.unit = "";
        this.onmousedown = this.show.bind(this);
        this.onkeydown = this.send.bind(this);
        this.inpt_val = "";
        this.onblur = this.hide.bind(this);
    }
    /*get inpt_val(){
        return this.value.toString();
    }*/
    static get styles() {
        return css `
            :host{
                display:flex;
                flex-direction: column;
                justify-content : center;
                align-items : center;
                font-family: 'Roboto', sans-serif;
                color:var(--base-color,#333333);
                cursor: pointer;
                width: 100%;
                padding-top: 0.3rem;
                padding-bottom: 0.2rem;

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
                
                min-height: 0rem;
                -moz-transition: width 1s ease-in-out, left 1.5s ease-in-out;
               -webkit-transition: width 1s ease-in-out, left 1.5s ease-in-out;
                -moz-transition: width 1s ease-in-out, left 1.5s ease-in-out;
                -o-transition: width 1s ease-in-out, left 1.5s ease-in-out;
                transition: width 1s ease-in-out, left 1.5s ease-in-out;
                
                
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
            }
            input:invalid{
                border-color:red;
            }
            x-triangle{
                margin-left: 0.5rem;
                width:0.5rem;
            }
            x-triangle[show]{
                transform: rotate(90deg); 
            }
        `;
    }
    render() {
        return html `
                <label><strong><slot></slot></strong></label>
                <div class="set" id="setcont">set: ${Number.parseFloat(this.value).toFixed(this.precision)} <x-triangle ?show="${this.showinpt}"></x-triangle> </div>
                <div id="form" class="inpt" ?show="${this.showinpt}">
                        <input id="inpt" type="number" value="" step="${Math.pow(10, -1 * this.precision)}">
                        <input id="btn" type="submit" value="set" @click="${this.send}">
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
            this.setAttribute("err", true);
        }
    }
}
//@ts-ignore
customElements.define("set-number", setNumber);
