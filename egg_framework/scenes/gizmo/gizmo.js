import {Mesh} from "../../core/mesh.js";

/*
 * A gizmo is a mesh representing an axis pivot.
 */
class Gizmo extends Mesh {

    constructor(gl) {

        // the origin and the three unit axes
        let vertices = [
            0, 0, 0,
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];

        let colors = [
            1,1,1,1,
            1,0,0,1,
            0,1,0,1,
            0,0,1,1,
        ];

        let indices = [   // beschreibt das die linie von Urspung (Vertex0) zu den 3 anderen Punkten gezogen werden soll
            0, 1,
            0, 2,
            0, 3
        ];



        //ToDo define colors and indices

        super(gl, {
            positions: vertices,
            colors: colors,
            indices: indices,
            primitiveType: gl.LINES
        });
    }
}

export {Gizmo};