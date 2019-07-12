const PIPE_GAP = 150,
      VELOCITY = 55,
      BIRD_OFFSET = 100,
      SCORE_GENERATE = 500,
      GROUNDHEIGHT = 50,
      GRAVITY = 1.5;

const canvas = document.getElementById('canvas');
const startscreen = document.getElementById('screen');
const playbtn = document.getElementById('playbtn');
const endscreen = document.getElementById('game_over');
const stopbtn = document.getElementById('over_button');

endscreen.style.display = 'none';

canvas.style.width = 800 + 'px';
canvas.style.height = 500 +'px';
canvas.style.marginLeft = 300 + 'px';
canvas.style.marginTop = 40 + 'px';

canvas.width = parseInt(canvas.style.width);
canvas.height = parseInt(canvas.style.height);

const ctx = canvas.getContext('2d');

let flappingSound = new Audio('./sounds/wing.wav'),
    pointSound = new Audio('./sounds/point.wav'),
    collisionSound = new Audio('./sounds/hit.wav');

let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
playbtn.addEventListener('click',()=>{
  startscreen.style.display = 'none';
  endscreen.style.display = 'none';
  canvas.style.display = 'block';
  pipeAnimation();
})

let drawAll = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage();
  randomPipe.forEach((eachPipe, index) => {
    eachPipe.draw();
  })
  flappy_bird.draw();
}

let updateAll = ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  flappy_bird.positionX = BIRD_OFFSET;
  flappy_bird.positionY = BIRD_OFFSET;
  pipeAnimation();
  score = 0;
  storeScore = [];
  displayScore();
  highScoreDisplay();
  randomPipe.forEach((eachpipe)=>{
    eachpipe.update();
    eachpipe.draw();
  })

  flappy_bird.draw();
  flappy_bird.moveDown();
}

let randomPipe = [];
let score = 0,
    random_number_generate,
    game_interval;

let pipeAnimation = ()=>{
    random_number_generate = setInterval(()=>{

  let obstacle_up = new PIPE(pipe_obstacle);
  let obstacle_down = new PIPE(pipe_obstacle_down);

    obstacle_up.height = generateRandomNumber(60,280);
    obstacle_down.positionY = obstacle_up.height + PIPE_GAP;
    obstacle_down.height = canvas.height - obstacle_down.positionY;

    randomPipe.push(obstacle_down);
    randomPipe.push(obstacle_up);

},2000);


game_interval = setInterval(()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  backgroundImage();
  randomPipe.forEach((eachpipe,index)=>{
    eachpipe.update();
    eachpipe.draw();
    totalScore(eachpipe,index);
    collision(eachpipe);
  })
  groundBaseImage();
  flappy_bird.draw();
  flappy_bird.moveDown();
  displayScore();
  highScoreDisplay();

  if (randomPipe.length > 10) {
    randomPipe.splice(0, 6);
  }

},1000/60);
}

let storeScore = [];
let totalScore = (eachpipe,index)=>{
  if(eachpipe.positionX+eachpipe.width < flappy_bird.positionX)
    {
      if(storeScore.indexOf(eachpipe) === -1 && storeScore.indexOf(randomPipe[index+1])){
        storeScore.push(eachpipe);
        storeScore.push(randomPipe[index+1]);
        pointSound.play();

      }

      score = storeScore.length/2;
}

if((flappy_bird.positionX + flappy_bird.width)>(eachpipe.positionX + eachpipe.width + SCORE_GENERATE )){
  randomPipe.splice(randomPipe.indexOf(eachpipe),1);
  randomPipe.splice(randomPipe[index+1],1);
}
}

let collision = (eachpipe)=>{
  if((flappy_bird.positionX < eachpipe.positionX+ eachpipe.width &&
     flappy_bird.positionX+ flappy_bird.width >  eachpipe.positionX &&
     flappy_bird.positionY < eachpipe.positionY + eachpipe.height &&
     flappy_bird.positionY + flappy_bird.height > eachpipe.positionY )||
     (flappy_bird.positionY + flappy_bird.height >= canvas.height -GROUNDHEIGHT)||
   flappy_bird.positionY < 0)
{
  if (localStorage.getItem('highScore') < score) {
      localStorage.setItem('highScore', score);
    }

  collisionSound.play();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stopCollision();

}
}

let displayScore = ()=>{
  ctx.beginPath();
  ctx.font = "50px Arial";
  ctx.fillText(score ,380,50);
  ctx.fillStyle = 'white';
  ctx.closePath();
}
let highScore;

let highScoreDisplay = () => {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`High Score : ${localStorage.getItem('highScore') || 0}`, canvas.width - 160, 30);
  ctx.closePath();
}



let stopCollision = ()=>{

  randomPipe = [];
  clearInterval(random_number_generate);
  clearInterval(game_interval);
  collisionCanvas();

  endscreen.style.display = 'block';

}

function getKeyAndMove(el){
  var keyCode = el.keyCode;
  switch(keyCode){
    case(32 ):
    flappy_bird.moveup();
    flappingSound.play();

    break;

  }
}

document.addEventListener('keydown',getKeyAndMove,true);

stopbtn.addEventListener('click', ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height)
  endscreen.style.display = 'none';
  updateAll();
})
