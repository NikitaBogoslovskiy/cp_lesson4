import { MiniMaple } from "./miniMaple";

document.addEventListener('DOMContentLoaded',setup)

function setup() {
    document.getElementById('derivativeButton').onclick = outputDerivative;
}

function outputDerivative() {
    let inputFunction = document.getElementById('inputFunction');
    let inputVariable = document.getElementById('inputVariable');
    let derivativeResult = document.getElementById('derivativeResult');
    let maple = new MiniMaple();
    let derivativeOutput = "";
    try {
        derivativeOutput = maple.differentiate(inputFunction.value, inputVariable.value);
    } catch (exc) {
        derivativeOutput = exc.message;
    }
    derivativeResult.textContent = derivativeOutput;
}