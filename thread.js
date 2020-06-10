class Thread {
  constructor(x, y, maxStep, maxAngle, threads) {
    this.pos = createVector(x, y);
    this.dir = p5.Vector.random2D();
    this.center = createVector(width / 2, height / 2);
    this.maxStep = maxStep;
    this.maxAngle = maxAngle;
    this.threads = threads;
    this.probBranch = 0.1;
    this.colorRandomness = 20;
  }
  
  grow() {
    const step = random(0, this.maxStep);
    const angle = random(-this.maxAngle, this.maxAngle);
    const d = this.dir.copy();
    d.rotate(angle);
    d.setMag(step);
    const from = this.pos;
    const to = this.pos.copy();
    to.add(d);
    stroke(this.getColor(), 100, 60, 0.1);
    line(from.x, from.y, to.x, to.y);
    this.pos = to;
    
    if (random(0, 1) < this.probBranch) {
      this.branch();
    }
  }
  
  branch() {
    const d = this.dir.copy();
    d.rotate(random(-QUARTER_PI, QUARTER_PI));
    const b = new Thread(this.pos.x, this.pos.y, this.maxStep, this.maxAngle, this.threads);
    b.dir = d;
    this.threads.push(b);
  }

  getColor() {
    const c = this.center.copy()
    c.sub(this.pos);
    const a = c.heading();

    // we add a bit of randomness to prevent color banding
    return map(a, -PI, PI, 0, 360) + random(-this.colorRandomness, this.colorRandomness);
  }
}