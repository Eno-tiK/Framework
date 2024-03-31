class Math3D {
    constructor(win) {
        this.win = win;
    }

    xs(point) {
        const zs = this.win.center.z;
        const z0 = this.win.camera.z;
        const x0 = this.win.camera.x;
        return ((point.x - x0) / (point.z - z0) * (zs - z0) + x0);
    }

    ys(point) {
        const zs = this.win.center.z;
        const z0 = this.win.camera.z;
        const y0 = this.win.camera.y;
        return ((point.y - y0) / (point.z - z0) * (zs - z0) + y0);
    }

    multPoint(T, m) {
        const a = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let b = 0;
            for (let j = 0; j < 4; j++) {
                b += T[j][i] * m[j];
            }
            a[i] = b;
        }
        return a;
    }

    multMatrix(a, b) {
        const c = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let S = 0;
        const len = 4;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                for (let k = 0; k < len; k++) {
                    S += a[i][k] * b[j][k];
                }
                c[i][j] = S;
                S = 0;
            }
        }
        return c;
    }

    zoom(delta) {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    }
    
    move(dx = 0, dy = 0, dz = 0) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    }

    rotateOx(alpha) {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]];
    }

    rotateOy(alpha) {
        return [
            [Math.cos(alpha), 0, -Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]];
    }

    rotateOz(alpha) {
        return [
            [Math.cos(alpha), Math.sin(alpha), 0, 0],
            [-Math.sin(alpha), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
    }

    calcDistance(surface, endPoint, name) {
        surface.polygons.forEach((polygon) => {
            let x = 0, y = 0, z = 0;
            polygon.points.forEach(index => {
                x += surface.points[index].x;
                y += surface.points[index].y;
                z += surface.points[index].z;
            });
            x /= polygon.points.length;
            y /= polygon.points.length;
            z /= polygon.points.length;
            polygon[name] = Math.sqrt((endPoint.x - x) ** 2 + (endPoint.y - y) ** 2 + (endPoint.z - z) ** 2);
        })
    };

    sortByArtistAlgorythm(surface) {
        surface.polygons.sort((a, b) =>
            (a.distance < b.distance) ? 1 : -1);
    }

    calcIllumination(distance, lumen) {
        const illum = distance ? lumen / distance ** 2 : 1;
        return illum > 1 ? 1 : illum;
    }

    transform(matrix, point) {
        const result = this.multPoint(matrix, [point.x, point.y, point.z, 1]);
        point.x = result[0];
        point.y = result[1];
        point.z = result[2];
    }

    getTransform(...args) {
        return args.reduce(
            (s, t) => this.multMatrix(s, t),
            [[1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]]
        );
    }

    getVector(a, b) {
        return {
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z
        }
    }

    multVector(a, b) {
        return {
            x: a.y * b.z - a.z * b.y,
            y: -a.x * b.z + a.z * b.x,
            z: a.x * b.y - a.y * b.x
        }
    }

    moduleVector(a) {
        return Math.sqrt( a.x**2 + a.y**2 + a.z**2 );
    }

    calcCenter(surface) {
        surface.polygons.forEach(polygon => {
            let x = 0, y = 0, z = 0;
            polygon.points.forEach(index => {
                x += surface.points[index].x;
                y += surface.points[index].y;
                z += surface.points[index].z;
            });
            x /= polygon.points.length;
            y /= polygon.points.length;
            z /= polygon.points.length;
            polygon.center = new Point(x, y, z);
        });
    }

    calcRadius(surface) {
        const points = surface.points;
        surface.polygons.forEach(polygon => {
            const center = polygon.center;
            const p1 = points[polygon.points[0]];
            const p2 = points[polygon.points[1]];
            const p3 = points[polygon.points[2]];
            const p4 = points[polygon.points[3]];
            polygon.R = (this.moduleVector(this.getVector(center, p1))
                    + this.moduleVector(this.getVector(center, p2))
                    + this.moduleVector(this.getVector(center, p3))
                    + this.moduleVector(this.getVector(center, p4)))
                    /4;
        });
    }

    calcShadow(polygon, scene, light) {
        const result = {isShadow: false};
        const m1 = polygon.center;
        const r = polygon.R;
        const S = this.getVector(m1, light);
        scene.forEach((surface, index) => {
            if (polygon.index === index) return;
            surface.polygons.forEach( polygon2 => {
                const m0 = polygon2.center;
                if (m1.x === m0.x && m1.y === m0.y && m1.z === m0.z) return;
                if (polygon2.lumen >= polygon.lumen) return;
                const dark = this.moduleVector(
                    this.multVector(
                        this.getVector(m0, m1),
                        S
                    )
                ) / this.moduleVector(S);

                if (dark < r) {
                    result.isShadow = true;
                    result.dark =   0.6;
                }
            });
        });
        return result;
    }
    
}




