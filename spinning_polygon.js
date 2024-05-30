class SpinningPolygon extends Polygon {
    constructor(_sides, _radius, _center, _rate) {
        super(_sides, _radius, _center)
        this.rate = _rate
    }
    draw() {
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
    }
}