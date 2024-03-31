Template.prototype.graph3DTemplate = () => `
    <div class='D'>
    <label for='SelectSurface' class='checkBox3D'>Выбрать фигуру:</label>
    <select id='SelectSurface' class='SelectSurface'>
        <option value='cube'>Куб</option>
        <option value='sphere'>Сфера</option>
        <option value='ellipsoid'>Элипсоид</option>
        <option value='bubalik'>Бубалик</option>
        <option value='cone'>Конус</option>
        <option value='gCilindr'>Г.Цилиндр</option>
        <option value='pCilindr'>П.Цилиндр</option>
        <option value='eCilindr'>Э.Цилиндр</option>
        <option value='oneGiper'>1 Гиперболоид</option>
        <option value='twoGiper'>2 Гиперболоид</option>
        <option value='eParaboloid'>Г.Параболоид</option>
        <option value='gParaboloide'>Э.Параболоид</option>
        <option value='cleiiii'>Клеййй</option>
        <option value='SolarSystem' selected>Анимация</option>
    </select>
    <p class='fps'>FPS: <output id='fpsCount'>0</output></p>
    </div>
    <div class='D'>
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
            <div>
                <input type="checkbox" id="drawAnimation">
                <label for='drawAnimation' class='checkBox3D'>Анимация</label>
            </div>
        </div>
        <div>
            <canvas id ='canvasGraph3D' class='canvas3D'></canvas>
        </div>
    </div>
`;