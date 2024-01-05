import { rand } from "../../utils.js";
import { Particle } from "./particle.js";

class ParticleSystem2D {
  /*
   * A particle system does the book keeping of particles.
   */
  constructor(config) {
    this._particles = [];
    this._position = config.position;
    this._size = config.size;
    this._velocityRangeX = config.velocityRangeX;
    this._velocityRangeY = config.velocityRangeY;
  }

  createParticles() {
    // TODO: implement better creation
    for (let i = 0; i < 1; ++i) {
      let particle = new Particle({
        position: [this._position[0], this._position[1]],
        velocity: [
          rand.rand(this._velocityRangeX[0], this._velocityRangeX[1]),
          rand.rand(this._velocityRangeY[0], this._velocityRangeY[1]),
        ],
        size: this._size,
      });
      this._particles.push(particle);
    }
  }

  render(context) {
    for (let particle of this._particles) {
      particle.render(context);
    }
  }

  update(deltaTime) {
    // update the particles
    for (let particle of this._particles) {
      particle.update();
      if (particle._lifetime <= 0) {
        this._particles.shift();
      }
    }
    // TODO: more logic over the particles if necessary
  }
}

export { ParticleSystem2D };
