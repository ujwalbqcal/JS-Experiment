const canvas = document.getElementById('canvas');
const button = document.getElementById('playbtn');
const startScreen = document.getElementById('screen');
const gameOver = document.getElementById('game_over');
const gameover_button = document.getElementById("over_button");

gameOver.style.display = 'none';

const ctx = canvas.getContext('2d');

canvas.style.width = 600 + 'px';
canvas.style.height = 550 + 'px';
canvas.style.marginLeft = 300 + 'px';
canvas.style.border = `1 px solid black`;
canvas.style.backgroundColor= 'black';
canvas.style.display = 'block';
canvas.width = parseInt(canvas.style.width);
canvas.height = parseInt(canvas.style.height);

const FIRSTLANE = 0,
      SECONDLANE = 1,
      THIRDLANE = 2,
      LANEWIDTH = canvas.width/3;

let highScore;
let speed = 2;
let score = 0;
let offset = 0;

let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let screenUpdate = () => {
  if(canvas.getContext){
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  playerCar.draw();
  enemyCarList.forEach((enemyCar, index) => {
  enemyCar.draw();

})
  linedraw.draw();
  linedrawnext.draw();
  displayScore();
  highScoreDisplay();
}
}

let enemyCarList = [];
let carGeneration,
    randomCarNumber,
    enemycar;

let allCarGenerate = () => {
  randomCarNumber = setInterval(() => {
   enemyCar = new CAR(aboveCar);
  enemyCar.lane = generateRandomNumber(0, 3);
  enemyCar.image = generateRandomNumber(0, 5);
  enemyCarList.push(enemyCar);

  if (enemyCarList.length > 10) {
    enemyCarList.splice(0, 6);
  }
}, 2500);

 carGeneration = setInterval(() => {
  enemyCarList.forEach((eachEnemy, index) => {
    eachEnemy.update();
    eachEnemy.draw();

  ballCollision(eachEnemy);
    scoreCard(eachEnemy);

  })
  linedraw.update();
  linedrawnext.update();
  screenUpdate();

}, 20)
}

let ballCollision =(eachEnemy)=>{
   if (playerCar.positionX < eachEnemy.positionX + eachEnemy.width &&
 playerCar.positionX + playerCar.width > eachEnemy.positionX &&
 playerCar.positionY < eachEnemy.positionY + eachEnemy.height &&
 playerCar.positionY + playerCar.height > eachEnemy.positionY) {

   ctx.clearRect(0,0,canvas.width,canvas.height);

   if (localStorage.getItem('highScore') < score) {
       localStorage.setItem('highScore', score);
     }
   clearInterval(carGeneration);
   clearInterval(enemyCar);

   stopGame();
}
}

let stopGame = ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  gameOver.style.display = 'block';

}

let scoreCard = (eachEnemy)=>{
  if(eachEnemy.positionY >innerHeight){
    score ++;

    enemyCarList.splice(enemyCarList.indexOf(eachEnemy),1);
  }
}

let displayScore = ()=>{

  ctx.fillText(  `Score : ` + score  ,50 ,30);
  ctx.font = "25px Arial";
  ctx.fillStyle = 'white';
}

let highScoreDisplay = () => {
  ctx.font = '14px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`High Score : ${localStorage.getItem('highScore') || 0}`, canvas.width - 145, 30);
}

function getKeyAndMove(el){
  var keyCode = el.keyCode;
  switch(keyCode){
    case(37 ):
    moveLeft();
    break;
    case(39 ):
    moveRight();
    break;
    case(65):
    moveLeft();
    break;
    case(68):
    moveRight();
    break;
  }

}
function moveLeft(){
  if(playerCar.lane>0){
  playerCar.lane -= 1;
  playerCar.updateplayerCar();
  screenUpdate();
}
}

function moveRight(){
  if(playerCar.lane<2){
  playerCar.lane += 1;
  playerCar.updateplayerCar();
  screenUpdate();

}
}
document.addEventListener('keydown',getKeyAndMove,true);

let gameStart = ()=>{
  allCarGenerate();
  screenUpdate();
  displayScore();
  
  // highScoreDisplay();
}

button.addEventListener('click',()=>{
  startScreen.style.display = 'none';
  gameStart();
})

let updateAll = ()=>{
  playerCar.lane = SECONDLANE;
  playerCar.draw();
  enemyCarList = [];
  speed = 2;
  offset = 8;
  score = 0;
  gameStart();
  highScoreDisplay();

}

gameover_button.addEventListener('click',()=>{
  gameOver.style.display = 'none';
  canvas.style.display = 'block';

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  clearInterval(carGeneration);
  clearInterval(randomCarNumber);

updateAll();

})
