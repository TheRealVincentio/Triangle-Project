class SingingColorfulFollowingMovingSpinningPolygon extends ColorfulFollowingMovingSpinningPolygon{
    constructor(_sides, _radius, _center, _rate, _velocity, _target, _constrain, _colors,_notes){
        super(_sides, _radius, _center, _rate, _velocity, _target, _constrain, _colors)
        this.velocity.setMag(int(random(1,5)))
        this.note = new p5.Oscillator(_notes.shift(),'square')
        this.n2 = new p5.Oscillator(this.note.getFreq(),'sine')
        this.n3 = new p5.Oscillator(this.note.getFreq(),'triangle')
        this.env = new p5.Envelope()
        this.env.set(0.3,1,0,1,((this.center.dist(this.target[0])-this.radius*4)/this.velocity.mag()-0.6)/60,0)
    }
    updateTarget(notes){
        this.note.stop()
        this.n2.stop()
        this.n3.stop()
        notes.push(this.note.getFreq())
        this.note.freq(notes.shift())
        this.target.shift()
        if (this.target.length == 0) {
            this.addTarget(createVector(random(width), random(height)))
        }
        this.env.set(0.1,1,0.1,0.8,((this.center.dist(this.target[0])-this.radius*4)/this.velocity.mag()-0.2)/60,0)
        //((this.center.dist(this.target[0])-this.radius*4)/this.velocity.mag()-0.6)/60
        this.note.phase(0)
        this.n2.phase(0)
        this.n3.phase(0)
        this.note.start()
        this.n2.start()
        this.n3.start()
        this.env.play(this.note)
        this.env.play(this.n2)
        this.env.play(this.n3)
    }
    update(notes) {
        if (this.atTarget()) {
            this.updateTarget(notes)
        }
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
    }
}