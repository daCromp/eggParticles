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
        
        let basicMaterialGreen = new BasicPhongMaterial(this.gl, appRuntime.shaderLoader, [0, 0.4, 0], [0, 0.8, 0]);
        let basicMaterialRed = new BasicPhongMaterial(this.gl, appRuntime.shaderLoader, [0.4, 0, 0], [0.8, 0, 0]);
        let basicMaterialBlue = new BasicPhongMaterial(this.gl, appRuntime.shaderLoader, [0, 0, 0.4], [0, 0, 0.8]);


        let sphereTransformGreen = mat4.create();
        mat4.scale(sphereTransformGreen, sphereTransformGreen, vec3.fromValues(0.25, 0.25, 0.25));
        mat4.translate(sphereTransformGreen, sphereTransformGreen, vec3.fromValues(0, 0, 0));

        let sphereTransformRed = mat4.create();
        mat4.scale(sphereTransformRed, sphereTransformRed, vec3.fromValues(0.2, 0.2, 0.8));
        mat4.translate(sphereTransformRed, sphereTransformRed, vec3.fromValues(0, 3, 0));

        let sphereTransformBlue = mat4.create();
        mat4.scale(sphereTransformBlue, sphereTransformBlue, vec3.fromValues(1, 0.25, 0.25));
        mat4.translate(sphereTransformBlue, sphereTransformBlue, vec3.fromValues(0, -4, -4));

        this._spheres.green = new Model(sphereMesh, basicMaterialGreen);
        this._spheres.green.transform = sphereTransformGreen;

        this._spheres.red = new Model(sphereMesh, basicMaterialRed);
        this._spheres.red.transform = sphereTransformRed

        this._spheres.blue = new Model(sphereMesh, basicMaterialBlue);
        this._spheres.blue.transform = sphereTransformBlue

        this._sceneObjects.push(this._spheres.green);
        this._sceneObjects.push(this._spheres.red);
        this._sceneObjects.push(this._spheres.blue);

    }

    update(deltaTime) {
        super.update(deltaTime);
        console.log(this._camera.eye)

        let rotationAngle = deltaTime * Math.PI * 0.0002;
        let rotationMatrix = mat4.create();
        mat4.identity(rotationMatrix);
        mat4.rotateZ(rotationMatrix, rotationMatrix, rotationAngle);

        vec3.transformMat4(this._camera.eye, this._camera.eye, rotationMatrix);
        vec3.transformMat4(this.light.position, this.light.position, rotationMatrix);

    }

    bind(model, program) {
        if(program.name === 'phong'){

            let modelViewMatrix = mat4.create();
            mat4.multiply(modelViewMatrix, this._camera.getViewMatrix(), model.globalTransform);

            // create normal matrix for lighting calculations
            let normalMatrix = mat3.create();
            // ToDo determine normal matrix

            mat3.normalFromMat4(normalMatrix, modelViewMatrix);    
            let newLightPos = vec3.create();
            vec3.transformMat4(newLightPos, this.light.position, this._camera.getViewMatrix());

            // ToDo set uniforms

            program.setUniform('normalMatrix', normalMatrix)
            program.setUniform('light.color', this.light.color)
            program.setUniform('light.position', newLightPos)
            program.setUniform('ambientLight', this.ambientLight)
        }
    }

}

export default PhongScene;