let viperimage = new Image(),
  audiimage = new Image(),
  ambulance = new Image(),
  police = new Image(),
  truck = new Image();
  carimage = new Image(),

carimage.src ="images/Car.png";
viperimage.src = "images/Black_viper.png";
audiimage.src = "images/Audi.png";
ambulance.src ="images/Ambulance.png";
police.src = "images/Police.png";
truck.src = "images/Mini_truck.png";

class CAR  {
  constructor(car){
    this.lane = car.lane;
    this.width = car.width;
    this.image = car.image;
    this.height = car.height;
    this.positionX = (this.lane + 0.5) * LANEWIDTH - (this.width / 2);
    this.positionY = car.positionY ;

}

draw(){
  if(canvas.getContext){
    const ctx = canvas.getContext('2d');

    if(this.image == 0 ){
  ctx.drawImage(viperimage, this.positionX , this.positionY);
  }
  else if(this.image == 1){
    ctx.drawImage(viperimage,this.positionX,this.positionY);
  }
  else if(this.image == 2){
    ctx.drawImage(ambulance,this.positionX,this.positionY);
  }
  else if(this.image == 3){
    ctx.drawImage(police,this.positionX,this.positionY);
  }
  else if(this.image == 4){
    ctx.drawImage(truck,this.positionX,this.positionY);
  }
    else{
      ctx.drawImage(carimage, this.positionX , this.positionY);
    }

  }

}
update() {
  this.positionX = (this.lane + 0.5) * LANEWIDTH - (this.width / 2);
  this.positionY     += speed;
}
updateplayerCar(){
  this.positionX = (this.lane + 0.5) * LANEWIDTH - (this.width / 2);
  this.positionY = this.positionY;

}

}

let aboveCar = {
  width : 110,
  height : 100 ,
  positionY : 0 ,
};

let belowCar = {
  lane : SECONDLANE,
  width : 110,
  height : 100 ,
  positionY : canvas.height-120  ,
};

let autoDriveCar = new CAR(aboveCar);
autoDriveCar.draw();


let playerCar = new CAR(belowCar);
playerCar.draw();
