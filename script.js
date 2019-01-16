window.onload = function() {
  new Particles('#canvas');
};

class Particles {
  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.draw = this.draw.bind(this);

    const halfwidth = this.canvas.width / 2;
    const halfheight = this.canvas.height / 2;

    this.wind = {
      xvel: 0,
      yvel: 0,
    };

    const changeWindForce = (e) => {
      const xforce = Math.floor(((e.clientX - halfwidth) / halfwidth) * 100) / 100;
      const yforce = Math.floor(((e.clientY - halfheight) / halfheight) * 100) / 100;
      this.wind.xvel = 0.08 * xforce;
      this.wind.yvel = 0.08 * yforce;
    };

    this.canvas.addEventListener('mousemove', changeWindForce);
    this.canvas.addEventListener('click', changeWindForce);

    this.particles = [];

    this.draw();
  }

  draw() {
    const { ctx, draw, canvas, particles, wind } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const { x, y, xvel, yvel, size } = particles[i];
      ctx.fillStyle = `hsl(${(x + y) / 5}, 100%, 50%)`;
      ctx.fillRect(x, y, size, size);
      particles[i].x += xvel;
      particles[i].y += yvel;
      particles[i].xvel += wind.xvel;
      particles[i].yvel += wind.yvel;
    }
    this.addParticle();
    if (this.particles.length > 350) this.particles.shift();
    window.requestAnimationFrame(draw);
  }

  addParticle() {
    this.particles.push({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      xvel: rand(-2, 2),
      yvel: rand(-2, 2),
      size: 5,
    });
  }
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
