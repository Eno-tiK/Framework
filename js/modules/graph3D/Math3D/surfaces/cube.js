Surface.prototype.cube = () => {
        const points = [
            //Угловые точки
            new Point(-6,-6,-6),
            new Point(-6,-6,6),
            new Point(6,-6,6),
            new Point(6,-6,-6),
            new Point(-6,6,-6),
            new Point(-6,6,6),
            new Point(6,6,6),
            new Point(6,6,-6),
        ]
        
       const edges = [
            //Внешние грани
            new Edge(0, 1),
            new Edge(0, 3),
            new Edge(0, 4),
            new Edge(2, 1),
            new Edge(5, 1),
            new Edge(3, 2),
            new Edge(3, 7),
            new Edge(6, 7),
            new Edge(4, 7),
            new Edge(5, 6),
            new Edge(5, 4),
            new Edge(2, 6),
        ]

        const polygons = [
            new Polygon([0, 1, 2, 3], '#ffa161'),
            new Polygon([0, 4, 7, 3], '#DCD36A'),
            new Polygon([0, 4, 5, 1], '#72525C'),
            new Polygon([1, 2, 6, 5], '#ED4830'),
            new Polygon([2, 3, 7, 6], '#C6C3B5'),
            new Polygon([4, 5, 6, 7], '#52442C')
        ]

    return new Surface(points, edges, polygons)
}