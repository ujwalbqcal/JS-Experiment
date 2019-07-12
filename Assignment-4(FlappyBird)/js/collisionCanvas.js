let collisionCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(stop_Image, 0, 0, canvas.width, canvas.height + GROUNDHEIGHT );
  ctx.font = '30px ';
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.textAlign = 'center';

}
