const SPEED = 2;


let pipe_Image = new Image(),
    pipe_Down = new Image();

pipe_Image.src = "./images/pipe-green.png";
pipe_Down.src = "./images/pipe-down.png";


class PIPE{
  constructor(pipe){
    this.width = pipe.width;
    this.height= pipe.height;
    this.positionX = pipe.positionX;
    this.positionY = pipe .positionY;

  }

  draw(){
    ctx.beginPath();
      if(this.positionY == 0){
      ctx.drawImage(pipe_Down,this.positionX,this.positionY,this.width,this.height);
    }
    else{
      ctx.drawImage(pipe_Image,this.positionX,this.positionY,this.width,this.height);

    }
  }

  update(){
    this.positionX -= SPEED;

  }
}

let pipe_obstacle = {
  width : 60,
  positionX : canvas.width,
  positionY : 0,
};

let pipe_obstacle_down = {
  width : 60,
  positionX : canvas.width,
  height : canvas.height ,
};
