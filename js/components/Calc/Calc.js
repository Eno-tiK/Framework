class Calc extends Component {

    operandCalcHandler(event) {
        const calc = new Calculator();
        const a = calc.getValue(document.getElementById('num1').value);
        const b = calc.getValue(document.getElementById('num2').value);
        const operand = event.target.dataset.operand;
        const result = calc[operand](a, b);
        document.getElementById('result').value = result !== null ? result.toString() : '';
    }

    operandPolyHandler(event) { 
            const calc = new PolynomialCalculator;
            const input1 = document.getElementById('polyNum1');
            const input2 = document.getElementById('polyNum2');
            const a = calc.getPolynomial(input1.value);
            const b = calc.getPolynomial(input2.value);
            const operand = event.target.dataset.operand;
            const result = calc[operand](a, b);
            document.getElementById('polyResult').value = result !== null ? result.toString() : '';
    }

    addEventListeners() {
        const buttons = document.querySelectorAll('.operand');
        buttons.forEach(button =>
            button.addEventListener(
                'click',
                (event) => this.operandCalcHandler(event)
            )  
        );
        const polyButtons = document.querySelectorAll('.polyOperand');
        polyButtons.forEach(button =>
            button.addEventListener(
                'click',
                (event) => this.operandPolyHandler(event)
            )  
        );

    }
}
