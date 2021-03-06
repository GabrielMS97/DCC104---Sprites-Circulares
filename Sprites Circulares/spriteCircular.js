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
  this.vx = this.vx+ this.ax*dt;
  this.vy = this.vy+ this.ay*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  this.imunidade = this.imunidade - 1*dt;
}

Sprite.prototype.perseguir = function (alvo) {
  this.ax = 20*(alvo.x - this.x)*dt - 1*this.vx*dt;
  this.ay = 20*(alvo.y - this.y)*dt - 1*this.vy*dt;
}

Sprite.prototype.impoeLimites = function (x, y, w, h) {
  if(this.x - this.raio < x)
  {
    this.x = x + this.raio;
    this.vx = 0;
  }
  if(this.x + this.raio > x + w)
  {
    this.x = x + w - this.raio;
    this.vx = 0;
  }
  if(this.y - this.raio < y)
  {
    this.y = y + this.raio;
    this.vy = 0;
  }
  if(this.y + this.raio > y + h)
  {
    this.y = y + h - this.raio;
    this.vy = 0;
  }
}

Sprite.prototype.colidiuCom = function (alvo) {
  if (this.raio + alvo.raio < (Math.sqrt((Math.pow((alvo.x - this.x),2))+Math.pow((alvo.y - this.y),2)))) return false;

  return true;

}

Sprite.prototype.repulsao = function (alvo) {
  var dist = (Math.sqrt((Math.pow((alvo.x - this.x),2))+Math.pow((alvo.y - this.y),2)));
  //if(this.colidiuCom(alvo))
  {
    this.vx += 10*(this.x-alvo.x)/Math.pow(dist, 2);
    this.vy += 10*(this.y-alvo.y)/Math.pow(dist, 2);
  }
}
