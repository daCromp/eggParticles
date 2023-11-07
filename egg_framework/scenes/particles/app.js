import { Scene2D } from "../../core/scene.js";
import { ParticleSystem2D } from "./particle_system_2d.js";

class ParticleScene extends Scene2D {
  constructor() {
    super();
    this.particleSystem = undefined;
  }

  load(appRuntime) {
    super.load(appRuntime);
    // create particle system
    this.particleSystem = new ParticleSystem2D({
      position: [350, 350],
      velocityRangeX: [-1, 1],
      velocityRangeY: [-1, 1],
      size: 5,
    });
    // this.particleSystem.createParticles();
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.particleSystem === undefined) return;
    this.particleSystem.update(deltaTime);
    if (this.particleSystem._particles.length < 10000) {
      this.particleSystem.createParticles();
    }
  }

  render() {
    super.render();
    this.particleSystem.render(this.ctx);
  }
}

export default ParticleScene;
