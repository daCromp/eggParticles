import {Mesh} from "../../../core/mesh.js";

class OBJMesh extends Mesh{
    constructor(gl, data) {

        // ToDo parse the data string and create a mesh

        super(gl, {
            positions: []
        });

    }
}

function loadOBJMesh(gl, file_path, callback) {
    fetch(file_path)
        .then(response => response.text())
        .then(data => callback(new OBJMesh(gl, data)));
}

export {OBJMesh, loadOBJMesh};