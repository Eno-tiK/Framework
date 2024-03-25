class Graph2D extends Component {
    addEventListeners() {
        
    function f1(x) {
        return Math.cos(x);
    }

    let pointsX = [];
    let pointsY = [];
    let canMove = false;
    let zoomStep = 0.2;

    const win = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20,
    }
    
    const mousedown = () => {
        canMove = true;
    }

    const mouseup = () => {
        canMove = false;
    }

    const mouseout = () => {
        canMove = false;
    }

    const checkBox = document.getElementById('setInterpolation');
    const mousemove = (useInterpolation) => {
        if (canMove) {
            if(!checkBox.checked){
                win.left -= useInterpolation.movementX/(canvasGraph2D.width/win.width);
                win.bottom += useInterpolation.movementY/(canvasGraph2D.height/win.height);
                render();
            } else {
                document.getElementById('canvasGraph2D').addEventListener("click", function(event) {
                    if(event) {
                      let x = event.offsetX;
                      let y = event.offsetY;
                      graph.drawPoint(x, y, 'red', 5)
                      pointsX.push(x);
                      pointsY.push(y);
                      for(var i = 0; i < pointsX.length; i++) {
                            graph.connect(pointsX[i], pointsY[i], pointsX[i+1], pointsY[i+1]);
                      }
                    }}); 
            }
        }
    }

    function wheel(event) {
        var delta = (event.wheelDelta > 0) ? -zoomStep: zoomStep;
        win.width += delta;
        win.height += delta;
        win.left -= delta / 2;
        win.bottom -= delta / 2;
        render();
    } 

        const graph = new Graph({
            id:'canvasGraph2D',
            width: 800,
            height: 800,
            win,
            callbacks:{
                wheel,
                mousemove,
                mousedown,
                mouseup,
                mouseout}
        });

        function render() {
            graph.clear();
            printOXY();
            printFunction(f1, 200, 'red');
            pointsX = [];
            pointsY = [];
        }

        function printOXY() {
            // координатные оси
            graph.line(win.left, 0, win.left + win.width, 0, '#000');
            graph.line(0, win.bottom, 0, win.bottom + win.height, '#000');
            // стрелки на осях
            graph.line(win.left + win.width, 0, win.left + win.width-0.3, -0.3, '#000');
            graph.line(win.left + win.width, 0, win.left + win.width-0.3, 0.3, '#000');
            graph.line(0, win.bottom + win.height, 0.3, win.bottom + win.height-0.3, '#000');
            graph.line(0, win.bottom + win.height, -0.3, win.bottom + win.height-0.3, '#000');
            // рисочки
            for (var i = 1; i <= win.left + win.width-1; i++) {
                graph.line(i, -0.2, i, 0.2);
                graph.text(i, i-0.4, -0.6, '', "12px Arial")
            }
            for (var i = 1; i <= win.bottom + win.height-1; i++){
                graph.line(-0.2, i, 0.2, i)
                graph.text(i, -0.6, i-0.4, '', "12px Arial")
            }
            for (var i = -1; i > win.left; i--) {
                graph.line(i, -0.2, i, 0.2);
                graph.text(i, i-0.4, -0.6, '', "12px Arial")
            }
            for (var i = -1; i > win.bottom; i--){
                graph.line(-0.2, i, 0.2, i)
                graph.text(i, -0.6, i-0.4, '', "12px Arial")
            }
            graph.text('0', -0.6, -0.6, '', "15px Arial");
            // разметка
            for (var i = 0; i < win.left + win.width; i++) {
                graph.line(i, win.bottom, i, win.bottom + win.height, '#6d767a80')
            }
            for (var i = 0; i < win.bottom + win.height; i++) {
                graph.line(win.left, i, win.left + win.width, i, '#6d767a80');
            }
            for (var i = 0; i > win.left; i--){
                graph.line(i, win.bottom, i, win.bottom + win.height, '#6d767a80');
            }
            for (var i = 0; i > win.bottom ; i--){
                graph.line(win.left, i, win.left + win.width, i, '#6d767a80');
            }
            graph.text('X', win.width + win.left - win.width/50, -win.height/25);
            graph.text('Y', win.width/34, win.height + win.bottom - win.height/34);
        }

        const getFuncName = (f) => {
            let str = f.toString();
    
            if (str.includes('eval')) {
                return document.getElementById('inputText').value
                    .replaceAll('Math.', '');
            }
            else {
                return str.substr(str.lastIndexOf('return') + 6, str.length)
                    .replaceAll('Math.', '')
                    .replaceAll(';', '')
                    .replaceAll('}', '')
            }
        }

        function printFunction(f, n, color) {
            var x = win.left;
            var dx = win.width / n;
            while (x <= win.width + win.left) {
                var isDash = Math.abs(f(x) - f(x + dx)) >= win.height;
                graph.line(x, f(x), x + dx, f(x + dx), color, 2, isDash);
                x += dx;
            }
            
            graph.text('y = ' + getFuncName(f), 4.2, f(4), color);
        } 

        render();
    }
    
}