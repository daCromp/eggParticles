import {Scene3D} from "../../core/scene.js";
import {Mesh} from "../../core/mesh.js";
import BasicShaderMaterial from "../../materials/basic_shader_material.js";
import {Model} from "../../core/model.js";
import {mat4, vec3} from "../../external_libs/gl-matrix.js";
import Grid from "./meshes/grid.js";
import {loadOBJMesh} from "./meshes/obj_mesh.js";
import GridWaveMaterial from "../../materials/grid_wave_material.js";


class BobScene extends Scene3D{

    constructor() {
        super();
        this._camera.lookAt(vec3.fromValues(4, 4, 3), vec3.fromValues(0, 0, 0))
    }

    load(appRuntime) {
        super.load(appRuntime);

        // ToDo create a grid mesh and create a model with the GridWaveMaterial and add it to the scene

        let grid_mesh = new Grid(this.gl, 5, [2,-2], 5, [2,-2]);
        let basicMaterial = new BasicShaderMaterial(this.gl, appRuntime.shaderLoader);

        this._grid = new Model(grid_mesh, basicMaterial);
        this._sceneObjects.push(this._grid);

        // loadOBJMesh(this.gl, './scenes/bob/data/bob_tri.obj', (objMesh)=>{
        //     this._bob = new Model(objMesh, basicMaterial);
        //     this._sceneObjects.push(this._bob);
        // });

    }

    update(deltaTime) {
        super.update(deltaTime);

        // ToDo animation and transformation of the waves and the boat

    }

}

export default BobScene;