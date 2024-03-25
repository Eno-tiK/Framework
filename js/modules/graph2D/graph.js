function Graph(options) {
    options = options || {};
    var id = options.id;
    var width = options.width || 300;
    var height = options.height || 300;
    var win = options.win || {};
    var canvas;

    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild('canvas'); 
    }

    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    var callbacks = options.callbacks;
    canvas.addEventListener('wheel', callbacks.wheel);
    var PI2 = 2 * Math.PI;
    canvas.addEventListener('wheel', callbacks.wheel);
    canvas.addEventListener('mousemove', callbacks.mousemove);
    canvas.addEventListener('mousedown', callbacks.mousedown);
    canvas.addEventListener('mouseup', callbacks.mouseup);
    canvas.addEventListener('mouseout', callbacks.mouseout);

    function xs(x) {
        return (x-win.left)/win.width * canvas.width;
    }

    function ys(y) {
        return canvas.height - (y - win.bottom) / win.height * canvas.height;
    }

    this.clear = function() {
        context.fillStyle = '#efe';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    this.line = function(x1, y1, x2, y2, color, width, isDash) {
        context.beginPath();
        context.strokeStyle = isDash ? color + '3' : color || '#000';
        context.lineWidth = width || 2;
        if (isDash) {
            context.setLineDash([12, 10]);
        } else { 
            context.setLineDash([]);
        }
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
    }

    this.point = function(x, y, color) {
        context.beginPath();
        context.strokeStyle = color || '#f00';
        context.lineWidth = 5;
        context.arc(xs(x), ys(y), 2, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }

    this.text = function (text, x, y, color, font) {
        context.fillStyle = color || '#000';
        context.font = font || "20px Arial";
        context.fillText(text, xs(x), ys(y));
    }

    this.drawPoint = function(x, y, color, size) {
      if (color == null) {
        color = '#000';
      }
      if (size == null) {
        size = 5;
      }
      let pointX = Math.round(x);
      let pointY = Math.round(y);
      context.beginPath();
      context.fillStyle = color;
      context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
      context.fill();
    }  

    this.connect = function(x1, y1, x2, y2) {
        context.beginPath();
        context.quadraticCurveTo(x1, y1, x2, y2);
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.stroke();
    }

    this.polygon = function(points, color) {
        context.beginPath();
        context.fillStyle = color;
        context.moveTo(xs(points[0].x),
            ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            context.lineTo(xs(points[i].x),
                ys(points[i].y));
        }
        context.lineTo(xs(points[0].x),
            ys(points[0].y));
        context.closePath();
        context.fill();
    }
}