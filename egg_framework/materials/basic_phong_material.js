import {Material} from "../core/material.js";

class BasicPhongMaterial extends Material{

    constructor(glContext, loader, ambientColor=[0, 0, 0], diffuseColor=[0.8, 0.8, 0.8], specularColor=[1, 1, 1], shininess=32) {
        super(loader.program(glContext, 'phong'));
        this.ambientColor = ambientColor;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.shininess = shininess;
    }

    bind() {
        super.bind();

        // ToDo set uniforms

    }

}

export default BasicPhongMaterial;