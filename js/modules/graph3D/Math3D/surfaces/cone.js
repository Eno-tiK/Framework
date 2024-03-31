Surface.prototype.cone = (slices = 40, radius = 5) => {
        const points = [];
        const edges = [];
        const polygons = [];
        const height = radius * 1.5
        points.push(new Point(0, 0, 0));
      
    
        for (let i = 0; i < slices; i++) {
          const theta = (i / slices) * Math.PI * 2;
          const x = radius * Math.cos(theta);
          const y = 0;
          const z = radius * Math.sin(theta);
          points.push(new Point(x, y, z));
        }
    
        points.push(new Point(0, height, 0));
      
        for (let i = 1; i <= slices; i++) {
          edges.push(new Edge(i, (i % slices) + 1));
          edges.push(new Edge((i % slices) + 1, points.length - 1));
          polygons.push(
            new Polygon([i, (i % slices) + 1, points.length - 1, points.length - 1])
          );
        }
      
        for (let i = 1; i <= slices; i++) {
          edges.push(new Edge(0, i));
          edges.push(new Edge(i, (i % slices) + 1));
          polygons.push(new Polygon([0, i, (i % slices) + 1]));
        }
      
        return new Surface(points, edges, polygons);
}