import { Scene3D } from "../../core/scene.js";
import { Mesh } from "../../core/mesh.js";
import BasicShaderMaterial from "../../materials/basic_shader_material.js";
import { Model } from "../../core/model.js";
import { mat4, vec3 } from "../../external_libs/gl-matrix.js";
import Grid from "./meshes/grid.js";
import { loadOBJMesh } from "./meshes/obj_mesh.js";
import GridWaveMaterial from "../../materials/grid_wave_material.js";
import GridSUMaterial from "../../materials/grid_su_material.js";
import EnteMaterial from "../../materials/ente_material.js";


class BobScene extends Scene3D {

    constructor() {
        super();
        this._camera.lookAt(vec3.fromValues(10, 10, 8), vec3.fromValues(0, 0, 0))
        this.verschiebung = 0;
    }

    load(appRuntime) {
        super.load(appRuntime);

        // ToDo create a grid mesh and create a model with the GridWaveMaterial and add it to the scene


        let grid_mesh = new Grid(this.gl, 100, [-2 * Math.PI, 2 * Math.PI], 100, [-2 * Math.PI, 2 * Math.PI]);
        this.waveMat = new GridWaveMaterial(this.gl, appRuntime.shaderLoader);
        this.enteMaterial = new EnteMaterial(this.gl, appRuntime.shaderLoader);

        this._grid = new Model(grid_mesh, this.waveMat);
        this._sceneObjects.push(this._grid);

        const degreeToRadian = Math.PI / 180.0;
        const rotateYAngle = 180.0 * degreeToRadian;
        const rotateZAngle = 90.0 * degreeToRadian;

        loadOBJMesh(this.gl, './scenes/bob/data/bob_tri.obj', (objMesh) => {
            this._bob = new Model(objMesh, this.enteMaterial);
            this._sceneObjects.push(this._bob);
        });


    }

    update(deltaTime) {
        super.update(deltaTime);

        this._grid._material.verschiebung += 0.02

        if (this._bob === undefined) return;

        mat4.identity(this._bob.transform);
        mat4.rotateX(this._bob.transform, this._bob.transform, Math.PI / 2);
        mat4.rotateY(this._bob.transform, this._bob.transform, Math.PI);
        mat4.translate(this._bob.transform, this._bob.transform, [0, 1, 0]);
        mat4.scale(this._bob.transform, this._bob.transform, [1.3, 1.3, 1.3]);

        const waveHeight = Math.sin(this._grid._material.verschiebung) * 0.5;
        const angle = Math.atan(waveHeight);

        mat4.rotateZ(this._bob.transform, this._bob.transform, angle);
    }
}

export default BobScene;


// float h = 1.0 - 0.5 * uv[1];
// float x = a * h * cos(n * uv[1] * PI) * (1.0 + cos(uv[0] * PI)) + c * cos(n * uv[1] * PI);
// float y = a * h * sin(n * uv[1] * PI) * (1.0 + cos(uv[0] * PI)) + c * sin(n * uv[1] * PI);
// float z = b * 0.5 * uv[1] + a * h * sin(uv[0] * PI);