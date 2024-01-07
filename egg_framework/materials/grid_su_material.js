import {Material} from "../core/material.js";


class GridSUMaterial extends Material {

    constructor(glContext, loader) {
        super(loader.program(glContext, 'grid_su'));


        // ToDo add variables for the phase shift of the wave and the rotation of the wave front

        // this.verschiebung = 3
        // console.log(glContext)

        // glContext.useProgram()
        

        // this._verschiebungLocation = glContext.getUniformLocation('verschiebung');
        

    }

    bind(verschiebung) {
        super.bind();

        // ToDo set the shader uniform variables
        
        // this.glContext.uniform1f(this.glContext.getUniformLocation(program, 'verschiebung'), this.verschiebung);

        // glContext.uniform1f(this._verschiebungLocation, verschiebung);
    }

}

export default GridSUMaterial;