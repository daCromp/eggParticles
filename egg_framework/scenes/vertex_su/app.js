import {Scene3D} from "../../core/scene.js";
import {Model} from "../../core/model.js";
import {mat4, vec3} from "../../external_libs/gl-matrix.js";
import Grid from "./meshes/grid.js";
import GridSUMaterial from "../../materials/grid_su_material.js";


class VertexSUScene extends Scene3D{

    constructor() {
        super();
        this._camera.lookAt(vec3.fromValues(1.25, 2, 1.25), vec3.fromValues(0, 0, 0))
    }

    load(appRuntime) {
        super.load(appRuntime);

        let grid_mesh = new Grid(this.gl, 100, [0,2], 100, [0, 2]);
        let grid_material = new GridSUMaterial(this.gl, appRuntime.shaderLoader);
        this._grid = new Model(grid_mesh, grid_material);
        this._sceneObjects.push(this._grid);

    }

    update(deltaTime) {
        super.update(deltaTime);

        // ToDo animation and transformation of the waves and the boat

    }

}

export default VertexSUScene;