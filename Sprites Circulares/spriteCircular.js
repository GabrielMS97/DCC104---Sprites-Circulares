function Sprite() {
  this.x = 64;
  this.y = 64;
  this.larg = 20;
  this.alt = 20;
  this.raio = 15;
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
  ctx.beginPath();
  var anticlockwise = true;
  var startAngle = 0;
  var endAngle = Math.PI*2;
  ctx.arc(this.x, this.y, this.raio, startAngle, endAngle, anticlockwise);
  ctx.closePath();
  ctx.stroke(); //desenha a borda
  ctx.fill();   //preenche
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
  if (this.raio + alvo.raio < (Math.sqrt((Math.pow((alvo.x - this.x),2))+Math.pow((alvo.y - this.y),2)))) return false;

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
