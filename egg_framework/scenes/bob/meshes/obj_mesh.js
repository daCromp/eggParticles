import { Mesh } from "../../../core/mesh.js";

class OBJMesh extends Mesh {
    constructor(gl, data) {

        // ToDo parse the data string and create a mesh

        let vertices = [];
        let indices = [];

        const lines = data.split('\n');
        const vLines = lines.filter(line => line.trim().startsWith('v '));
        const faces = lines.filter(line => line.trim().startsWith('f '));

        vLines.forEach(line => {
            let split = line.split(' ')
            vertices.push(split[1], split[2], split[3])
        });

        faces.forEach(line => {
            let split = line.split(' ')
            let split2 = split[1].split("/")
            let split3 = split[2].split("/")
            let split4 = split[3].split("/")


            indices.push(split2[0] - 1, split3[0] - 1, split4[0] - 1)
        });
        super(gl, {
            positions: vertices,
            indices: indices,
            primitiveType: gl.TRIANGLES
        });

    }
}

function loadOBJMesh(gl, file_path, callback) {
    fetch(file_path)
        .then(response => response.text())
        .then(data => callback(new OBJMesh(gl, data)));
}

export { OBJMesh, loadOBJMesh };