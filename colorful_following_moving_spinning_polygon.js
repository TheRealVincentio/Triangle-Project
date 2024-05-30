class ColorfulFollowingMovingSpinningPolygon extends FollowingMovingSpinningPolygon {
    constructor(_sides, _radius, _center, _rate, _velocity, _target, _constrain, _colors) {
        super(_sides, _radius, _center, _rate, _velocity, _target, _constrain)
        this.colors = _colors
        this.color = int(random(this.colors.length))
        this.stroke = (this.color + int(this.colors.length / 2)) % this.colors.length
    }
    atTarget() {
        if (this.target[0].dist(this.center) <= this.radius) {
            this.color++
            this.color = this.color % this.colors.length
            this.stroke++
            this.stroke = this.stroke % this.colors.length
            this.sides = int(random(3,10))
            this.radius = int(random(10,21))
            this.velocity.setMag(int(random(1,5)))
            return true
        }
        return false
    }
    draw() {
        push()
        fill(this.colors[this.color])
        stroke(this.colors[this.stroke])
        let am = angleMode()
        angleMode(DEGREES)
        let point = new createVector(0, -this.radius)
        point.rotate(frameCount * this.rate)
        push()
        angleMode(RADIANS)
        translate(this.center.x, this.center.y)
        beginShape()
        for (let index = 0; index < this.sides; index++) {
            vertex(point.x, point.y)
            point.rotate(TWO_PI / this.sides)
        }
        endShape(CLOSE)
        pop()
        angleMode(am)
        pop()
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
            this.updateTarget()
        }
    }
    updateTarget(){
        this.target.shift()
        if (this.target.length == 0) {
            this.addTarget(createVector(random(width), random(height)))
        }  
    }
}