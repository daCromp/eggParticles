import {Scene3D} from "../../core/scene.js";
import BasicPhongMaterial from "../../materials/basic_phong_material.js";
import Sphere from "./meshes/sphere.js";
import {mat4, vec3, mat3} from "../../external_libs/gl-matrix.js";
import {Model} from "../../core/model.js";


class PhongScene extends Scene3D{

    constructor() {
        super();
        this._spheres = {
            red: undefined,
            green: undefined,
            blue: undefined
        }
        this._camera.lookAt(vec3.fromValues(1, 1, 1), vec3.fromValues(0, 0, 0));
        this.ambientLight = [0.25, 0.25, 0.25];
        this.light = {
            position: this._camera.eye,
            color: [1.0, 1.0, 1.0]
        };

    }

    load(appRuntime) {
        super.load(appRuntime);

        let sphereMesh = new Sphere(this.gl, 50, 50);
        let basicMaterial = new BasicPhongMaterial(this.gl, appRuntime.shaderLoader, [0, 0.4, 0], [0, 0.8, 0]);

        let sphereTransform = mat4.create();
        mat4.scale(sphereTransform, sphereTransform, vec3.fromValues(0.25, 0.25, 0.25));
        mat4.translate(sphereTransform, sphereTransform, vec3.fromValues(0, 0, 0));

        this._spheres.green = new Model(sphereMesh, basicMaterial);
        this._spheres.green.transform = sphereTransform;

        this._sceneObjects.push(this._spheres.green);

    }

    update(deltaTime) {
        super.update(deltaTime);

        let rotationAngle = deltaTime * Math.PI * 0.0002;
        let rotationMatrix = mat4.create();
        mat4.identity(rotationMatrix);
        mat4.rotateZ(rotationMatrix, rotationMatrix, rotationAngle);

        vec3.transformMat4(this._camera.eye, this._camera.eye, rotationMatrix);
    }

    bind(model, program) {
        if(program.name === 'phong'){

            let modelViewMatrix = mat4.create();
            mat4.multiply(modelViewMatrix, this._camera.getViewMatrix(), model.globalTransform);

            // create normal matrix for lighting calculations
            let normalMatrix = mat3.create();
            // ToDo determine normal matrix

            // ToDo set uniforms
        }
    }

}

export default PhongScene;