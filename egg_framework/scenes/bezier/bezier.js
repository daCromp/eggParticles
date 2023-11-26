import {vec2} from "../../external_libs/gl-matrix.js";

class Bezier{

    constructor(controlPoints, segments=100) {
        this.controlPoints = controlPoints;
        this.segments = segments;
    }

    update(deltaTime) {
        // Animation
    }

    render(ctx) {
        // render curve
    }
}

export {Bezier};