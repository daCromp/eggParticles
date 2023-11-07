import {rand} from "../../utils.js";
import {Particle} from "./particle.js";

class ParticleSystem2D {

    /*
    * A particle system does the book keeping of particles.
    */
    constructor(config) {
        this._particles = [];
    }

    createParticles() {
        // TODO: implement better creation
        for (let i=0; i<1; ++i) {
            let particle = new Particle({
                position : [350, 350],
                velocity : [rand.rand(-1, 1), rand.rand(-1, 1)],
                size     : 5
            })
            this._particles.push(particle)
        }
    }

    render(context) {
        for (let particle of this._particles) {
            particle.render(context)
        }
    }

    update(deltaTime) {
        // update the particles
        for (let particle of this._particles) {
            particle.update()
            if(particle._lifetime <= 0){
                this._particles.shift();
            }
        }
        // TODO: more logic over the particles if necessary
    }

}

export {ParticleSystem2D};