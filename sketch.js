let triangles = []
let colors = []
let notes = []
let chord
let root
let octs = 2
let FADE = 255
hn = 0


function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  outputVolume(0.1)
  fft = new p5.FFT()
  colors = [color(225, 0, 0, FADE),
  color(225, 128, 0, FADE),
  color(225, 255, 0, FADE),
  color(128, 225, 0, FADE),
  color(0, 225, 0, FADE),
  color(0, 225, 128, FADE),
  color(0, 225, 255, FADE),
  color(0, 128, 255, FADE),
  color(0, 0, 255, FADE),
  color(128, 0, 255, FADE),
  color(225, 0, 255, FADE),
  color(225, 0, 128, FADE)]
  chord = random(Object.entries(CHORDS))
  root = random(Object.entries(NOTES))
  generateNotes(octs,chord[1],root[1])
  console.log(chord[0],root[0])
  let nl = notes.length
  hn = notes[notes.length-1]
  for (let index = 0; index < nl; index++) {
    triangles.push(new SingingColorfulFollowingMovingSpinningPolygon(4, 20, createVector(width / 2, height / 2), -0.1, createVector(-1, 0), createVector(random(width), random(height)), true, colors,notes))
  }
}

function draw() {
  background(0, 22.5);
  wave(fft)
  for (const triangle of triangles) {
    triangle.draw()
  }
  for (const triangle of triangles) {
    triangle.update(notes)
  }
}

function updateTargets() {
  let new_target = createVector(mouseX, mouseY)
  triangle.addTarget(new_target)
}

function generateNotes(oc,c,r){
  let o = r - (oc)*12
  for(let i = 0; i<oc; i++){
    for(let k = 0;k<c.length;k++){
      notes.push(midiToFreq(o+c[k]))
    }
    o+=12
  }
}

function wave(){
  push()
  let bins = Math.pow(2,13)
  let slicesize = int(hn  / (24000/ (bins)))
  spectrum = fft.analyze(bins).splice(14,(slicesize+14))
  noStroke();
  for (let i = 0; i< spectrum.length; i++){
    fill(lerpColor(colors[0],colors[4],map(spectrum[i],0,255*.75,0,1)));
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
  pop()
}