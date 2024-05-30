class FollowingMovingSpinningPolygon extends MovingSpinningPolygon {
    constructor(_sides, _radius, _center, _rate, _velocity, _target, _constrain) {
        super(_sides, _radius, _center, _rate, _velocity, _constrain)
        this.target = []
        this.target.push(_target)
    }
    updateHeading() {
        this.velocity.rotate(this.velocity.angleBetween(this.target[0].copy().sub(this.center)) / 10)
    }
    update() {
        this.updateHeading()
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
        if (this.atTarget()) {
            this.target.shift()
            if (this.target.length == 0) {
                this.addTarget(createVector(random(width), random(height)))
            }
        }
    }
    atTarget() {
        return (this.target[0].dist(this.center) <= this.radius)
    }
    addTarget(pos) {
        this.target.push(pos.copy())
    }
}