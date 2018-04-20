function Sprite() {
  this.x = 100;
  this.y = 100;
  this.larg = 20;
  this.alt = 20;

  this.vx = 0;
  this.vy = 0;

  this.ax = 0;
  this.ay = 0;
  this.acel = 0;

  this.ang = 0;
  this.vang = 0;

  this.debug = 0;

  this.cor = "blue";
  this.imunidade = 0;
}

Sprite.prototype.desenhar = function(ctx) {
  if(this.imunidade > 0)
  {
    ctx.fillStyle = 'rgba(255, 255, 0, '+Math.cos(20*Math.PI*this.imunidade)+' )';
    ctx.strokeStyle = 'hsla(255, 255, 255, 0.3)';
  }
  else
  {
    ctx.fillStyle = this.cor;
    ctx.strokeStyle = "white";
  }
  ctx.lineWidth = 3;
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.ang*Math.PI/180);
  ctx.beginPath();
  ctx.moveTo(-this.larg/2, -this.alt/2);
  ctx.lineTo(-this.larg/2, +this.alt/2);
  ctx.lineTo(+this.larg/2 + 10, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  if(this.debug)
  {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    //ctx.fillRect(-this.larg/2, -this.alt/2, this.larg, this.alt);
    ctx.strokeRect(-this.larg/2, -this.alt/2, this.larg, this.alt);
  }
  ctx.restore();
}

Sprite.prototype.mover = function(dt) {
  this.ang = this.ang + this.vang*dt;
  this.vx = this.vx+ this.ax*dt;
  this.vy = this.vy+ (G+this.ay)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  this.imunidade = this.imunidade - 1*dt;
}

Sprite.prototype.perseguir = function (alvo) {
  this.ax = 0.5*(alvo.x - this.x) - 0.3*this.vx;
  this.ay = 0.5*(alvo.y - this.y) - 0.3*this.vy;
  if(this.y > alvo.y) this.vy -= 100;
}

Sprite.prototype.impoeLimites = function (x, y, w, h) {
  if(this.x - this.larg/2 < x)
  {
    this.x = x + this.larg/2;
    this.vx = 0;
  }
  if(this.x + this.larg/2 > x + w)
  {
    this.x = x + w - this.larg/2;
    this.vx = 0;
  }
  if(this.y - this.alt/2< y)
  {
    this.y = y + this.alt/2;
    this.vy = 0;
  }
  if(this.y + this.alt/2 > y + h)
  {
    this.y = y + h - this.alt/2;
    this.vy = 0;
  }
}

Sprite.prototype.colidiuCom = function (alvo) {
  if (alvo.x + alvo.larg < this.x) return false;
  if (alvo.x > this.x + this.larg) return false;
  if (alvo.y + alvo.alt < this.y) return false;
  if (alvo.y > this.y + this.alt) return false;

  return true;

}

Sprite.prototype.moverAng = function(dt) {
  this.ang = this.ang + this.vang*dt;

  this.ax = this.acel*Math.cos(this.ang*Math.PI/100);
  this.ay = this.acel*Math.sin(this.ang*Math.PI/100);

  this.vx = this.vx+ this.ax*dt;
  this.vy = this.vy+ (G+this.ay)*dt;

  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;

  this.imunidade = this.imunidade - 1*dt;
}
