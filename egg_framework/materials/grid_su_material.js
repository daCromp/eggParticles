import {Material} from "../core/material.js";


class GridSUMaterial extends Material {

    constructor(glContext, loader) {
        super(loader.program(glContext, 'grid_su'));

        // ToDo add variables for the phase shift of the wave and the rotation of the wave front

    }

    bind() {
        super.bind();

        // ToDo set the shader uniform variables

    }

}

export default GridSUMaterial;