class MovingSpinningPolygon extends SpinningPolygon {
    constructor(_sides, _radius, _center, _rate, _velocity, _constrain) {
        super(_sides, _radius, _center, _rate)
        this.velocity = _velocity.copy()
        this.constrain = _constrain
    }
    setVelocity(vel) {
        this.velocity = vel.copy()
    }
    update(vel) {
        if (vel !== null) {
            this.setVelocity(vel)
        }
        this.center.add(this.velocity)
        if (this.constrain) {
            if (this.center.x < -this.radius) {
                this.center.x = width + this.radius
            } else if (this.center.x > width + this.radius) {
                this.center.x = -this.radius
            }
            if (this.center.y < -this.radius) {
                this.center.y = height + this.radius
            } else if (this.center.y > height + this.radius) {
                this.center.y = -this.radius
            }
        }
    }
}