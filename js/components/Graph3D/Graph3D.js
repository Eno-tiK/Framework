window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

class Graph3D extends Component {
    constructor(options) {
        super(options);
        this.win = {
            left: -5,
            bottom: -5,
            width: 10,
            height: 10,
            center: new Point(0, 0, -30),
            camera: new Point(0, 0, -50)
        }

        this.graph = new Graph({
            id: 'canvasGraph3D',
            width: 800,
            height: 800,
            win: this.win,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
                mousemove: (event) => this.mousemove(event),
                mouseLeave: () => this.mouseLeave()
            }
        });
        this.math3D = new Math3D(this.win);
        this.surface = new Surface();
        this.light = new Light(-20, 0, -20, 700);

        this.canMove = false;
        this.drawPoint = false;
        this.drawEdges = false;
        this.drawPolygon = true;
        this.drawAnimation = false;
        this.colorPoints;
        this.colorEdges;

        this.scene = this.SolarSystem();

        setInterval(() => {
            if(this.drawAnimation) {
                this.scene.forEach(surface => surface.doAnimation(this.math3D));
            }
        }, 50);
        
        let FPS = 0;
        let countFPS = 0;
        let timestamp = Date.now();

        const renderLoop = () => {
            countFPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                FPS = countFPS;
                countFPS = 0;
                timestamp = currentTimestamp;
            }
            this.renderScene(FPS);
            requestAnimationFrame(renderLoop);
        }

        renderLoop();
    }

    wheel(event) {
        const delta = (event.wheelDelta < 0) ? 0.9 : 1.1;
        const matrix = this.math3D.zoom(delta);
        this.scene.forEach(surface => surface.points.forEach((point) => {
            this.math3D.transform(matrix, point);
        }));
    }

    mouseup() {
        this.canMove = false;
    }

    mousedown() {
        this.canMove = true;
    }

    mouseLeave() {
        this.canMove = false;
    }

    mousemove(event) {
        if (this.canMove) {
            const gradus = Math.PI / 180 / 4;
            const T1 = this.math3D.rotateOx((this.dy - event.offsetY) * gradus);
            const T2 = this.math3D.rotateOy((this.dx - event.offsetX) * gradus);
            this.scene.forEach(surface => surface.points.forEach(point => {
                this.math3D.transform(T1, point);
                this.math3D.transform(T2, point);
            }));
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
        }

    renderScene(FPS) {
        this.graph.clear();
        document.getElementById('fpsCount').value = FPS;
        if (this.scene) {
            this.scene.forEach((surface, index) => {
                //Polygons
                if (this.drawPolygon) {
                    const polygons = [];
                    this.math3D.calcCenter(surface);
                    this.math3D.calcRadius(surface);
                    this.math3D.calcDistance(surface, this.win.camera, 'distance');
                    this.math3D.calcDistance(surface, this.light, 'lumen');
                    surface.polygons.forEach(polygon => {
                        polygon.index = index;
                        polygons.push(polygon);
                    })
                    this.math3D.sortByArtistAlgorythm(surface);
                    surface.polygons.forEach(polygon => {
                        const points = polygon.points.map(index =>
                            new Point(
                                this.math3D.xs(this.scene[polygon.index].points[index]),
                                this.math3D.ys(this.scene[polygon.index].points[index])
                            )
                        );
                        let { r, g, b } = polygon.color;
                        const {isShadow, dark}  = this.math3D.calcShadow(polygon, this.scene, this.light);
                        const lumen = this.math3D.calcIllumination(polygon.lumen, this.light.lumen * (isShadow ? dark: 1));
                        r = Math.round(r * lumen);
                        g = Math.round(g * lumen);
                        b = Math.round(b * lumen);
                        this.graph.polygon(points, polygon.rgbToHex(r, g, b));
                    });
                }
                //Edges
                if (this.drawEdges) {
                    surface.edges.forEach(edge => {
                        const point1 = surface.points[edge.p1];
                        const point2 = surface.points[edge.p2];
                        this.graph.line(
                            this.math3D.xs(point1),
                            this.math3D.ys(point1),
                            this.math3D.xs(point2),
                            this.math3D.ys(point2),
                            this.colorEdges,
                        );
                    })
                }
                //Points
                if (this.drawPoint) {
                    surface.points.forEach(point => this.graph.point(
                        this.math3D.xs(point),
                        this.math3D.ys(point),
                        this.colorPoints
                    ))
                };
            });
        }
    }

    addEventListeners() {
        document.getElementById("SelectSurface")
            .addEventListener("change", (event) => {
                this.scene = [(new Surface)[event.target.value]()];
            });
        document.querySelectorAll('.surfaceCustom').forEach(input =>
            input.addEventListener("input", (event) => {
                this[event.target.dataset.custom] = event.target.checked;
            })
        );
        //ColorChanger
        document.getElementById('pointColor').addEventListener('change', () => {
            this.colorPoints = document.getElementById('pointColor').value;
            this.colorEdges = document.getElementById('edgeColor').value;
        })
        document.getElementById('edgeColor').addEventListener('change', () => {
            this.colorPoints = document.getElementById('pointColor').value;
            this.colorEdges = document.getElementById('edgeColor').value;
        })

        //CheckBoxDraw
        document.getElementById('showPoints').addEventListener(
            'click',
            () => {
                if (document.getElementById('showPoints').checked) {
                    this.drawPoint = true;
                } else {
                    this.drawPoint = false;
                }
            }
        )
        document.getElementById('showEdges').addEventListener(
            'click',
            () => {
                if (document.getElementById('showEdges').checked) {
                    this.drawEdges = true;
                } else {
                    this.drawEdges = false;
                }
            }
        )
        document.getElementById('showPolygons').addEventListener(
            'click',
            () => {
                if (document.getElementById('showPolygons').checked) {
                    this.drawPolygon = true;
                } else {
                    this.drawPolygon = false;
                }
            }
        )
        document.getElementById('drawAnimation').addEventListener(
            'click',
            () => {
                if (document.getElementById('drawAnimation').checked) {
                    this.drawAnimation = true;
                } else {
                    this.drawAnimation = false;
                }
            }
        )

    }

    SolarSystem() {
        const Moon = this.surface.cube(new Point(10, -1, 0), 2);
        const Mars = this.surface.ellipsoid(new Point(-10, 1, 0), 4);
        const Earth = this.surface.sphere(new Point(0,0,0), 4);
        Moon.addAnimation('rotateOy', 0.1);
        Moon.addAnimation('rotateOz', 0.1);
        Moon.addAnimation('rotateOx', 0.1);
        Mars.addAnimation('rotateOy', -0.1);
        Mars.addAnimation('rotateOz', -0.1);
        Mars.addAnimation('rotateOx', -0.1);
        return [Moon, Mars, Earth];
    }
}
