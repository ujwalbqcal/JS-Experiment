class LINE{
  constructor(line){
    this.lineX = line.lineX;
  }

  draw(){
    if(canvas.getContext){
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(this.lineX,0);
      ctx.lineTo(this.lineX,innerHeight);
      ctx.setLineDash([20,15]);
      ctx.lineDashOffset = -offset;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

  }

  update(){
    offset += speed;
  }
}

let lineone = {
  lineX : 200

};
let linetwo = {
  lineX : 400
}

  let linedraw = new LINE(lineone);
  linedraw.draw();

  let linedrawnext = new LINE(linetwo);
  linedrawnext.draw();
