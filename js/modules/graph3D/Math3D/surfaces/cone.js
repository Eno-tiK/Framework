Surface.prototype.cone = () => {
    const points = [];

const edges = [];

const polygons = [];


const height = 1;

const radius = 0.5;

const slices = 32;

const stacks = 16;


const dt = Math.PI * 2 / slices;

const dr = height / stacks;


// Generate points
for (let i = 0; i <= stacks; i++) {
    for (let j = 0; j <= slices; j++) {
        const angle = j * dt;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = i * dr;
        if (i === 0) {
            points.push(new Point(0, y, 0));
        } else {
            points.push(new Point(x, y, z));
        }
    }
}


// Generate edges

for (let i = 0; i < stacks; i++) {

    for (let j = 0; j < slices; j++) {

        const p1 = i * (slices + 1) + j;

        const p2 = p1 + slices + 1;

        const p3 = p2 + 1;

        const p4 = p1 + 1;


        edges.push(new Edge(p1, p2));

        edges.push(new Edge(p2, p3));

        edges.push(new Edge(p3, p4));

        edges.push(new Edge(p4, p1));

    }

}


// Generate polygons
for (let i = 0; i < stacks; i++) {

    for (let j = 0; j < slices; j++) {

        const p1 = i * (slices + 1) + j;

        const p2 = p1 + slices + 1;

        const p3 = p2 + 1;

        const p4 = p1 +1;


        polygons.push(new Polygon([p1, p2, p3, p4]));

    }

}
return new Surface(points, edges, polygons);
}