import { vec2 } from "../../external_libs/gl-matrix.js";

class Bezier {

    constructor(controlPoints, segments = 100) {
        this.controlPoints = controlPoints;
        this.segments = segments;
        
    }

    update(deltaTime) {

    }

    render(ctx) {
        ctx.beginPath();
        for (let i = 0; i < this.controlPoints.length; i++) {
            ctx.lineTo(this.controlPoints[i].position[0], this.controlPoints[i].position[1]);
        }
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(this.controlPoints[0].position[0], this.controlPoints[0].position[1]); 

        let counter = 0;

        for (let t = 0; t <= 1; t += 1 / this.segments) {   
            let point = this.deCasteljau(t);
            ctx.lineTo(point[0], point[1]);
            counter++;
        }
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }



    deCasteljau(t) {
        let points = this.controlPoints.map(cp => vec2.clone(cp.position));

        while (points.length > 1) {
            let nextPoints = [];
            for (let i = 0; i < points.length - 1; i++) {
                let x = (1 - t) * points[i][0] + t * points[i + 1][0];
                let y = (1 - t) * points[i][1] + t * points[i + 1][1];
                nextPoints.push(vec2.fromValues(x, y));
            }
            points = nextPoints;
        }
        return points[0];
    }
}

export { Bezier };