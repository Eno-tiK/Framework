Surface.prototype.eParaboloid = (count = 15, a = 1, b = 1, c = 1) => {
    const points = [];
    const edges = [];
    const polygons = [];

    const step = (2 * Math.PI) / count;
    for (let u = -Math.PI; u < Math.PI; u += step) {
        for (let v = -Math.PI; v < Math.PI; v += step) {
            const x = a * Math.cosh(u) * Math.cos(v);
            const y = b * Math.sinh(u) * Math.sin(v);
            const z = c * Math.sinh(u);
            points.push(new Point(x, y, z));
        }
    }

    for (let i = 0; i < points.length; i++) {
        
        if (points[i + 1]) {
            if ((i + 1) % count === 0) {
                if (i + 1 - count >= 0) {
                    edges.push(new Edge(i, i + 1 - count));
                }
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        for (let i = 0; i < points.length; i++) {
            if (points[i + 1 + count]) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + 1 + count,
                    i + count
                ], '#ffff00'));
            }
        }
    

        
        
        
    }

    return new Surface(points, edges, polygons);
}