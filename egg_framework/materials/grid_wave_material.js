import {Material} from "../core/material.js";


class GridWaveMaterial extends Material {

    constructor(glContext, loader) {
        super(loader.program(glContext, 'grid'));

        // ToDo add variables for the phase shift of the wave and the rotation of the wave front

    }

    bind() {
        super.bind();

        // ToDo set the shader uniform variables

    }

}

export default GridWaveMaterial;