import {Mesh} from "../../../core/mesh.js";


class Grid extends Mesh {
    constructor(gl, uSamples, uSpace, vSamples, vSpace) {  //Samples = Anzahl in U/V Richtung, Space = Platz zwischen Punkten in U/V Richtung
        
        let vertices = [];
        let indices = [];
        let colors = [];
        let test = true;

        for (let u = 0; u < uSamples; u++) {
            for (let v = 0; v < vSamples; v++) {
                let uRange = uSpace[1] - uSpace[0]; // -4
                let vRange = vSpace[1] - vSpace[0]; // -4
                vertices.push(uSpace[0] + (u / (uSamples - 1)) * uRange);  //2 + (0/(5-1))*-4 = 2
                vertices.push(vSpace[0] + (v / (vSamples - 1)) * vRange);  
                vertices.push(0);

                colors.push(1,1,1,1)

            }
        }

        for (let u = 0; u < uSamples - 1; u++) {
            for (let v = 0; v < vSamples - 1; v++) {
                let index1 = u * vSamples + v;
                let index2 = (u + 1) * vSamples + v;
                let index3 = u * vSamples + (v + 1);
                let index4 = (u + 1) * vSamples + (v + 1);

                indices.push(index1, index2, index4, index3, index1, index4);
            }
        }



        // console.log(vertices)

        // indices.push(5,1,0);
        // indices.push(5,6,1);

        // indices.push(6,2,1);
        // indices.push(6,7,2);

        // console.log(indices)



        super(gl, {
            positions: vertices,
            indices: indices,
            colors: colors,
            primitiveType: gl.LINE_LOOP
        });
    }
}

export default Grid;

