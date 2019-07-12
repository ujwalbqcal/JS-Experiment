let birdImage = new Image();

birdImage.src = "./images/redbird.png";

class BIRD{
  constructor(bird){
    this.width = bird.width;
    this.height = bird.height;
    this.positionX = bird.positionX;
    this.positionY = bird.positionY;
    this.index = 0;

    setInterval(() => {
     this.index++;
     if (this.index >= 8) {
       this.index = 0;
     }
   }, 150)
  }

  draw(){
      ctx.beginPath();
      ctx.drawImage(birdAnimation, 0, this.index * singleSpriteHeight, spriteWidth, singleSpriteHeight, this.positionX, this.positionY, spriteWidth, singleSpriteHeight);      // ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
  }
  moveup(){
    this.positionY -= VELOCITY;
  }

  moveDown(){
    this.positionY += GRAVITY;
  }
}
let flappy_trait = {
  width : 30,
  height : 30,
  positionX : 100,
  positionY : 100,
};

let flappy_bird = new BIRD(flappy_trait);

let spriteWidth,
 spriteHeight,
 numOfRows,
 singleSpriteHeight;

birdAnimation = new Image();
birdAnimation.src = "./images/finalsprite.png";

birdAnimation.addEventListener('load', (e) => {
 spriteWidth = birdAnimation.width;
 spriteHeight = birdAnimation.height;
 numOfRows = 8;

 singleSpriteHeight = spriteHeight / numOfRows;
});
