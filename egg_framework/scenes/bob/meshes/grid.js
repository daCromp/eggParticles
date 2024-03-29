import {Mesh} from "../../../core/mesh.js";


class Grid extends Mesh {
    constructor(gl, uSamples, uSpace, vSamples, vSpace) {  //Samples = Anzahl in U/V Richtung, Space = Platz zwischen Punkten in U/V Richtung
        
        let vertices = [];
        let indices = [];
        let colors = [];

        let colorFactor = 0;

        for (let u = 0; u < uSamples; u++) {
            for (let v = 0; v < vSamples; v++) {
                let uRange = uSpace[1] - uSpace[0]; // -4
                let vRange = vSpace[1] - vSpace[0]; // -4
                vertices.push(uSpace[0] + (u / (uSamples - 1)) * uRange);  //2 + (0/(5-1))*-4 = 2
                vertices.push(vSpace[0] + (v / (vSamples - 1)) * vRange);  
                vertices.push(0);

                colorFactor += 1 / (uSamples * vSamples);
                let colorFactorReverse = 1 - colorFactor;
                
                colors.push(colorFactorReverse,colorFactor,colorFactorReverse,1)
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


        super(gl, {
            positions: vertices,
            indices: indices,
            colors: colors,
            primitiveType: gl.TRIANGLES
        });
    }
}

export default Grid;

