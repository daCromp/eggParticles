import {Material} from "../core/material.js";


class GridWaveMaterial extends Material {

    constructor(glContext, loader) {
        super(loader.program(glContext, 'grid'));

        // ToDo add variables for the phase shift of the wave and the rotation of the wave front

        this.verschiebung = 0.0;
    }

    bind() {
        super.bind();

        // ToDo set the shader uniform variables
        this.program.setUniform('verschiebung', this.verschiebung);

    }

}

export default GridWaveMaterial;