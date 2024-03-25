Template.prototype.calcTemplate = () => `
<p class="nameCalculator">Universal Calculator</p>
        <div class="Calculator">
            <textarea id="num1" class="input" placeholder="Input 1 number"></textarea>
            <textarea id="num2" class="input" placeholder="Input 2 number"></textarea>
            <div>
                <button class="operand" data-operand="add">+</button>
                <button class="operand" data-operand="sub">-</button>
                <button class="operand" data-operand="mult">*</button>
                <button class="operand" data-operand="div">/</button>
                <button class="operand" data-operand="pow">^</button>
                <button class="operand" data-operand="prod">x</button>
            </div>
            <p class="res">| |</p>
            <textarea id="result" placeholder="Result:" class="input"></textarea>
        </div>

        <p class="nameCalculator">Polynomial Calculator</p>
        <div class="Calculator">

            <textarea id="polyNum1" class="input" placeholder="Input 1 Polynomial"></textarea>
            <textarea id="polyNum2" class="input" placeholder="Input 2 Polynomial / point"></textarea>
            <div>
                <button class="polyOperand" data-operand="add" >+</button>
                <button class="polyOperand" data-operand="sub" >-</button>
                <button class="polyOperand" data-operand="mult" >*</button>
                <button class="operandScal" data-operand="prod" >scal</button>
                <button class="polyPointButton" id="polyPointButton" >Value at point</button>
            </div>
                <p class="res">| |</p>
                <textarea id="polyResult" placeholder="Result:" class="input"></textarea>
        </div>
`;
