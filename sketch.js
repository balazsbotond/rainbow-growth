const initialThreads = 10;
const maxThreads = 40000;
const threads = [];
const fps = 10;
const record = false;
const filePrefix = 'rainbow';

let running = true;
let canvas;
let frame = 0;

function setup() {
  for (let i = 0; i < initialThreads; i++) {
    threads.push(new Thread(300, 300, 5, QUARTER_PI, threads));
  }
  canvas = createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  frameRate(fps);
  background(10);
}

function draw() {
  if (!running) {
    return;
  }
  for (let i = 0; i < threads.length; i++) {
    threads[i].grow();
  }
  if (record) {
    recordFrame();
  }
  if (threads.length > maxThreads) {
    running = false;
  }
}

function mouseClicked() {
  running = !running;
}

function recordFrame() {
  const fileName = `${filePrefix}-${frame.toString().padStart(3, '0')}.png`;
  saveCanvas(canvas, fileName, 'png');
  frame++;
}
