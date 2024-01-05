import {Mesh} from "../../../core/mesh.js";


class Grid extends Mesh{

    constructor(gl, uSamples, uSpace, vSamples, vSpace) {

        let vertices = [];

        for (let u=0; u<uSamples; u++){
            for (let v=0; v<vSamples; v++) {

                // do not push arrays but the bare components
                let uRange = uSpace[1] - uSpace[0];
                let vRange = vSpace[1] - vSpace[0];
                vertices.push(uSpace[0] + ((u / uSamples) * uRange));
                vertices.push(vSpace[0] + ((v / vSamples) * vRange));
                vertices.push(0)

            }
        }

        // ToDo create indices and color definitions

        super(gl, {
            positions: vertices,
            //indices: indices,
            //colors: colors,
            primitiveType: gl.POINTS
        });

    }

}

export default Grid;