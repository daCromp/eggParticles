import { Scene3D } from "../../core/scene.js";
import { Mesh } from "../../core/mesh.js";
import BasicShaderMaterial from "../../materials/basic_shader_material.js";
import { Model } from "../../core/model.js";
import { mat4, vec3 } from "../../external_libs/gl-matrix.js";
import Grid from "./meshes/grid.js";
import { loadOBJMesh } from "./meshes/obj_mesh.js";
import GridWaveMaterial from "../../materials/grid_wave_material.js";
import GridSUMaterial from "../../materials/grid_su_material.js";


class BobScene extends Scene3D {

    constructor() {
        super();
        this._camera.lookAt(vec3.fromValues(10, 10, 12), vec3.fromValues(0, 0, 0))
        this.verschiebung = 0;
    }

    load(appRuntime) {
        super.load(appRuntime);

        // ToDo create a grid mesh and create a model with the GridWaveMaterial and add it to the scene
     

        let grid_mesh = new Grid(this.gl, 100, [-2 * Math.PI, 2 * Math.PI], 100, [-2 * Math.PI, 2 * Math.PI]);
        let basicMaterial = new GridSUMaterial(this.gl, appRuntime.shaderLoader);

        // const verschiebungValue = 3.0;

        // basicMaterial.bind(verschiebungValue);

        this._grid = new Model(grid_mesh, basicMaterial);
        this._sceneObjects.push(this._grid);

        // loadOBJMesh(this.gl, './scenes/bob/data/bob_tri.obj', (objMesh)=>{
        //     this._bob = new Model(objMesh, basicMaterial);
        //     this._sceneObjects.push(this._bob);
        // });

        this._programm = appRuntime.shaderLoader.getProgram('grid_su')
        console.log(this._programm)
    }

    update(deltaTime) {
        super.update(deltaTime);

        this._programm.setUniform("verschiebung", this.verschiebung += 0.02);

        // ToDo animation and transformation of the waves and the boat
    }

}

export default BobScene;


// float h = 1.0 - 0.5 * uv[1];
// float x = a * h * cos(n * uv[1] * PI) * (1.0 + cos(uv[0] * PI)) + c * cos(n * uv[1] * PI);
// float y = a * h * sin(n * uv[1] * PI) * (1.0 + cos(uv[0] * PI)) + c * sin(n * uv[1] * PI);
// float z = b * 0.5 * uv[1] + a * h * sin(uv[0] * PI);