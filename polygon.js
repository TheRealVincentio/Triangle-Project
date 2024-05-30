class Polygon {
    constructor(_sides, _radius, _center) {
        this.sides = _sides > 2 ? _sides : 3
        this.radius = _radius
        this.center = _center.copy()
    }

    draw() {
        push()
        translate(this.center.x, this.center.y)
        let point = new createVector(0, -this.radius)
        beginShape()
        for (let index = 0; index < this.sides; index++) {
            vertex(point.x, point.y)
            point.rotate(TWO_PI / this.sides)
        }
        endShape(CLOSE)
        pop()
    }
}