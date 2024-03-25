Template.prototype.graph3DTemplate = () => `
    <button id='figureSwitch' class='button'>Фигуры »</button>
    <div class='switchMenu hide' id='figureSwitchMenu'>
        <button class='button' id='cube'>Куб</button>
        <button class='button' id='sphere'>Сфера</button>
        <button class='button' id='ellipsoid'>Элипсоид</button>
        <button class='button' id='bubalik'>Бубалик</button>
        <button class='button' id='cone'>Конус</button>
        <button class='button' id='gCilindr'>Г.Цилиндр</button>
        <button class='button' id='pCilindr'>П.Цилиндр</button>
        <button class='button' id='eCilindr'>Э.Цилиндр</button>
        <button class='button' id='oneGiper'>1 Гиперболоид</button>
        <button class='button' id='twoGiper'>2 Гиперболоид</button>
        <button class='button' id='eParaboloid'>Э.Параболоид</button>
        <button class='button' id='gParaboloide'>Г.параболоид</button>
        <button class='button' id='cleiiii'>Клеййй</button>
    </div>
    <div class='marginDiv'>
    <div>
        <input type="checkbox" id="showPoints" class='checkBox3D'>
        <label for='showPoints' class='checkBox3D'>Показать точки</label>
        <input class='color' id='pointColor' type='color' value='#ff0000'>
    </div>
    <div>
        <input type="checkbox" id="showEdges">
        <label for='showEdges' class='checkBox3D'>Показать грани</label>
        <input class='color' id='edgeColor' type='color' value='#000000'>
    </div>
    <div>
        <input type="checkbox" id="showPolygons" checked>
        <label for='showPolygons' class='checkBox3D'>Показать полигоны</label>
    </div>
    </div>
    <canvas id ='canvasGraph3D' class='canvas3D'></canvas>
`;