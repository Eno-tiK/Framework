Template.prototype.graph2DTemplate = () =>  `
<div>
    <input type="checkbox" id="setInterpolation">
    <label for="setInterpolation" class="checkBoxText">Режим интерполяции</label>
</div>
<div class="graphOptions">
    <button class="functionColor" id="functionColor"> color </button>
    <button id="addFunction" class="addFunction"> + </button>
    <canvas id="canvasGraph2D" class="border" ></canvas>
</div>
<div id="funcInputs"></div>
`;
