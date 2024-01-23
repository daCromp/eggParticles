import {Material} from "../core/material.js";

class EnteMaterial extends Material{

    constructor(glContext, loader) {
        super(loader.program(glContext, 'ente'));
    }

}

export default EnteMaterial;