Surface.prototype.ellipsoid = (radius, count) => {
    const points = [];
    const edges = [];
    const polygons = [];
    const dt = Math.PI * 2 / count;

    //points
    for (let i = 0; i <= Math.PI; i += dt) {
        for (let j = 0; j < Math.PI * 2; j += dt) {
            const x = radius * Math.cos(j) * Math.sin(i);
            const y = radius * Math.cos(i) * 0.5;
            const z = radius * Math.sin(j) * Math.sin(i);
            points.push(new Point(x, y, z));
        }
    }

    //edges
    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count));
        }
        if (i < points.length - count) {
            edges.push(new Edge(i, i + count));
        }
    }

    //polygons
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1,i + 1 + count, i + count]));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
        }
    }
    return new Surface(points, edges, polygons);
}