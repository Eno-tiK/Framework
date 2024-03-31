Surface.prototype.bubalik = (count = 20, R = 10, r = 2.5) => {
    const points = [];
    const edges = [];
    const polygons = [];
    // about points
    const da = Math.PI * 2 / count;
    for (let phi = 0; phi < Math.PI * 2; phi += da) {
        for (let psi = -Math.PI; psi < Math.PI; psi += da) {
            const x = (R + r * Math.cos(psi)) * Math.cos(phi);
            const y = (R + r * Math.cos(psi)) * Math.sin(phi);
            const z = r * Math.sin(psi);
            points.push(new Point(x, y, z));
        }
    }
    // about edges
    for (let i = 0; i < points.length; i++) {
        // кольца
        if (points[i + 1]) {
            if ((i + 1) % count === 0) {
                if (i + 1 - count >= 0) {
                    edges.push(new Edge(i, i + 1 - count));
                }
            } else {
                edges.push(new Edge(i, i + 1));
            }
            
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        } else {
            edges.push(new Edge(i, i % count));
        }
    }

    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        }
        if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]));
        }
        if (!points[i + count] && i + 1 < points.length) {
            polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)]));
        }
        polygons.push(new Polygon([19, 0, 380, 399]));
    }
    return new Surface(points, edges, polygons);
}
