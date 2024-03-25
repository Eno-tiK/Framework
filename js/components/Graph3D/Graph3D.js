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
        this.light = new Light(-40, 15, 0, 1300);

        this.canMove = false;
        this.drawPoint = false;
        this.drawEdges = false;
        this.drawPolygon = true;
        this.colorPoints;
        this.colorEdges;
        this.scene = this.SolarSystem();
        this.renderScene();
    }

    wheel(event) {
        const delta = (event.wheelDelta < 0) ? 0.9 : 1.1;
        const matrix = this.math3D.zoom(delta);
        this.scene.forEach(surface => surface.points.forEach((point) => {
            this.math3D.transform(matrix, point);
        }));
        this.renderScene();
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
            this.renderScene();
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    renderScene() {
        this.graph.clear();
        if (this.scene) {
            this.scene.forEach((surface, index) => {
            //Polygons
            if (this.drawPolygon) {
                this.math3D.calcDistance(surface, this.win.camera, 'distance');
                this.math3D.calcDistance(surface, this.light, 'lumen');
                this.math3D.sortByArtistAlgorythm(surface);
                surface.polygons.forEach(polygon => {
                    const points = polygon.points.map(index =>
                        new Point(
                            this.math3D.xs(surface.points[index]),
                            this.math3D.ys(surface.points[index])
                        )
                    );
                    const lumen = this.math3D.calcIllumination(polygon.lumen, this.light.lumen);
                    let { r, g, b } = polygon.color;
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    this.graph.polygon(points, polygon.rgbToHex(r, g, b));
                    })
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
                ))};
            });
        }}

    addEventListeners() {
        //FigureSwitch
        document.getElementById('figureSwitch').addEventListener(
            'click',
            () => {
                if (document.getElementById('figureSwitchMenu').classList.contains('hide')) {
                    document.getElementById('figureSwitchMenu').classList.remove('hide')
                } else {
                    document.getElementById('figureSwitchMenu').classList.add('hide')
                }
            }
        )
        document.getElementById('cube').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cube())
            this.renderScene();
        })
        document.getElementById('sphere').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.sphere(10, 20))
            this.renderScene();
        })
        document.getElementById('bubalik').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.bubalik(20, 10, 2.5))
            this.renderScene();
        })
        document.getElementById('ellipsoid').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.ellipsoid(10, 20))
            this.renderScene();
        })
        document.getElementById('cone').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })
        document.getElementById('gCilindr').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })
        document.getElementById('pCilindr').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })
        document.getElementById('eCilindr').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })
        document.getElementById('oneGiper').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })
        document.getElementById('twoGiper').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })
        document.getElementById('eParaboloid').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })
        document.getElementById('gParaboloide').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })
        document.getElementById('cleiiii').addEventListener('click', () => {
            this.scene = [];
            this.scene.push(this.surface.cone())
            this.renderScene();
        })

        //ColorChanger
        document.getElementById('pointColor').addEventListener('change', () => {
            this.colorPoints = document.getElementById('pointColor').value;
            this.colorEdges = document.getElementById('edgeColor').value;
            this.renderScene();
        })
        document.getElementById('edgeColor').addEventListener('change', () => {
            this.colorPoints = document.getElementById('pointColor').value;
            this.colorEdges = document.getElementById('edgeColor').value;
            this.renderScene();
        })

        //CheckBoxDraw
        document.getElementById('showPoints').addEventListener(
            'click',
            () => {
                if (document.getElementById('showPoints').checked) {
                    this.drawPoint = true;
                    this.renderScene();
                } else {
                    this.drawPoint = false;
                    this.renderScene();
                }
            }
        )
        document.getElementById('showEdges').addEventListener(
            'click',
            () => {
                if (document.getElementById('showEdges').checked) {
                    this.drawEdges = true;
                    this.renderScene();
                } else {
                    this.drawEdges = false;
                    this.renderScene();
                }
            }
        )
        document.getElementById('showPolygons').addEventListener(
            'click',
            () => {
                if (document.getElementById('showPolygons').checked) {
                    this.drawPolygon = true;
                    this.renderScene();
                } else {
                    this.drawPolygon = false;
                    this.renderScene();
                }
            }
        )

    }

    SolarSystem(){
        const Earth = this.surface.sphere(10, 20);
        Earth.addAnimation('rotateOy', 0.1, this.center);
        const Moon = this.surface.cube();
        Moon.addAnimation('rotateOx', 0.2);
        Moon.addAnimation('rotateOx', 0.05);
        return [Earth,Moon];
    }
}
