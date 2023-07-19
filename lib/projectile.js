class ProjectileMotion {
    g = 9.80665;
    pi = 3.141592653589793238462643383279502884197;

    constructor(angle, v_init) {
        this.alpha = (angle * this.pi) / 180; // start angle
        this.v_0 = v_init; // start velocity
        this.x = 0; // initial x
        this.y = 0; // initial y
        this.step = 1 / 100 * this.Range;
        this.angle_step = -1 * (angle * (this.pi / 180)) / 100;
    }

    get Range() {
        // R = frac {v_0^2 . sin (2 %alpha)} {g}
        return (this.v_0 ** 2 * Math.sin(2 * this.alpha));
    }

    get FlightTime() {
        // T = 2 . frac {v_0 . sin %alpha} {g}
        return (2 * (this.v_0 * Math.sin(this.alpha)) / (this.g));
    }

    get MaxHeight() {
        // h = frac {v_0 . sin(alpha) ^2} {2 * g}
        return ((this.v_0 * Math.sin(this.alpha)) ** 2 / (2 * this.g));
    }

    * move() {
        // y = x . tan %theta - frac {g} {2} .
        //	frac {x^2} {(v_0 . cos %theta)^2}
        for (const j of Array(100).keys()) {
            this.x += this.step;
            this.y = this.x * Math.tan(this.alpha) - (this.g / 2) * (this.x ^ 2) / (this.v_0 ^ 2 * Math.cos(this.alpha)) ** 2;
            // y = x . tan %theta - frac {g} {2} . frac {x^2} {(v_0 . cos %theta)^2}
            this._alter_angle();
            if (this.y > 0) {
                yield ([this.x, this.y]);
            } else {
                break;
            }
            
        }
    }

    _alter_angle() {
        this.alpha += this.angle_step;
    }

    _position() {
        return ([this.x, this.y]);
    }
}


if (typeof require !== 'undefined' && require.main === module) {
    const args = process.argv.slice(2,);
    const angle = args[0];
    const v_init = args[1];

    const projectile = new ProjectileMotion(angle, v_init);
    const o = projectile.move();
    while (true) {
        let c = o.next();
        if (c.done === true) break; else console.log(c.value)
    }
}