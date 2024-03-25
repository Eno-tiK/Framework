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
            [0, 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]];
    }

    calcDistance(surface, endPoint, name) {
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
        const result = this.multPoint(matrix, [point.x, point.y, point.z]);
        point.x = result[0];
        point.y = result[1];
        point.z = result[2];
    }

    getTransform(...args) {
        return args.reduce(
            (s, t) => this.multMatrix(s, t),
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]
        );
    }
}




