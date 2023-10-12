class showhello extends HTMLElement {
    constructor() {
        super();
    }
    /*Invoked each time the custom element is appended into a document-connected element.*/
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        // const shadow= this
        /*create first input ranger*/
        const ranger_slider_container = document.createElement('div');
        ranger_slider_container.classList.add("range-slider");
        ranger_slider_container.insertAdjacentHTML("afterbegin", ` <input  id="leftrange" class="range-min" type="range"  value="${this.getAttribute("data-min_value")}" min="${this.getAttribute("data-min")}" max="${this.getAttribute('data-max')}" step="${this.getAttribute('data-step')}">
        <input  id="rightrange" class="range-max" type="range"  value="${this.getAttribute("data-max_value")}" min="${this.getAttribute("data-min")}" max="${this.getAttribute('data-max')}" step="${this.getAttribute('data-step')}">`);
        shadow.append(ranger_slider_container);
        /*create slider track*/
        const slider_container = document.createElement('div');
        slider_container.classList.add("slider");
        slider_container.insertAdjacentHTML('afterbegin', ' <div id="progress" class="progress"></div>');
        shadow.append(slider_container);
        /*create price input */
        const price_input_container = document.createElement('div');
        price_input_container.classList.add("price-input");
        price_input_container.insertAdjacentHTML("afterbegin", `<div class="field"><span>Min</span><input type="number" class="input-min" value="${this.getAttribute("data-min_value")}"></div><div class="separator">-</div><div class="field"><span>Max</span><input type="number" class="input-max" value="${this.getAttribute("data-max_value")}"></div>`);
        shadow.append(price_input_container);
        /*link the external css to the element*/
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../css/controls/ranger.css";
        shadow.append(link);
        /*attach the event */
        const rangeInput = ranger_slider_container.querySelectorAll(".range-slider input");
        const range = slider_container.getElementsByClassName("progress")[0];
        const priceInput = price_input_container.querySelectorAll(".price-input input");
        // let priceGap = this.getAttribute("data-pricegap");
        let priceGap = 100;
        rangeInput.forEach(input => {
            input.addEventListener("input", e => {
                let minVal = parseInt(rangeInput[0].value), maxVal = parseInt(rangeInput[1].value);
                if ((maxVal - minVal) < priceGap) {
                    if (e.target.className === "range-min") {
                        rangeInput[0].value = maxVal - priceGap
                    } else {
                        rangeInput[1].value = minVal + priceGap;
                    }
                } else {
                    rangeInput[0].value = minVal;
                    rangeInput[1].value = maxVal;
                    priceInput[0].value = minVal;
                    priceInput[1].value = maxVal;
                    range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
                    range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
                }
            });
        });
        priceInput.forEach(input => {
            input.addEventListener("input", e => {
                let minPrice = parseInt(priceInput[0].value),
                    maxPrice = parseInt(priceInput[1].value);

                if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
                    if (e.target.className === "input-min") {
                        rangeInput[0].value = minPrice;
                        range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
                    } else {
                        rangeInput[1].value = maxPrice;
                        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                    }
                }
            });
        });
    }
}
customElements.define("price-range", showhello);

