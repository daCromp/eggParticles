class Particle {
    

    constructor(config) {
        this._position = config.position
        this._velocity = config.velocity
        this._size = config.size
        this._lifetime = 1000;
        // TODO: define more properties, e.g. life time
    }

    update() {
        // integrate movement properties
        this._position[0] += this._velocity[0]
        this._position[1] += this._velocity[1]

        this._lifetime--;

        // TODO: integrate more properties, e.g. life time
    }

    render(context) {
        // TODO: use the canvas2d context API for more graphics

        // https://www.rapidtables.com/web/color/html-color-codes.html
        // context.fillStyle = 'pink'
        let tempG = Math.floor(255 * this._lifetime/1000);
        let tempR = Math.floor(255 - tempG);
        let tempB = Math.floor(Math.random() * 256);
        context.fillStyle = `rgb(${tempG}, ${tempR},  ${tempB})`;
        context.strokeStyle = `rgb(${tempG}, ${tempR}, ${tempB})`;

        context.shadowColor = `rgb(${tempG}, ${tempR}, ${tempB})`;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2; 
        context.shadowBlur = 5;

        if(this._lifetime < 700){
            context.fillRect(this._position[0], this._position[1], this._size+=0.01, this._size+=0.01)
        } else {
            context.strokeRect(this._position[0], this._position[1], this._size+=0.01, this._size+=0.01)
        }

    }

}

export {Particle};