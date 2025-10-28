const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const cols = canvas.width / box;
const rows = canvas.height / box;
let snake = [{x: Math.floor(cols/2)*box, y: Math.floor(rows/2)*box}];
let dir = 'RIGHT';
let food = randomFood();
let score = 0;
let interval;
const scoreVal = document.getElementById('scoreVal');
const startBtn = document.getElementById('startBtn');

function randomFood(){
  return {x: Math.floor(Math.random()*cols)*box, y: Math.floor(Math.random()*rows)*box};
}

function drawGrid(){
  // subtle grid is background via CSS; draw snake and food
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // draw food glow
  ctx.fillStyle = '#ff3b3b';
  drawRect(food.x, food.y, '#ff3b3b');
}

function drawRect(x,y,color){
  ctx.fillStyle = color;
  ctx.fillRect(x,y,box,box);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.strokeRect(x+0.5,y+0.5,box-1,box-1);
}

function draw(){
  // move head
  let headX = snake[0].x;
  let headY = snake[0].y;
  if(dir==='LEFT') headX-=box;
  if(dir==='RIGHT') headX+=box;
  if(dir==='UP') headY-=box;
  if(dir==='DOWN') headY+=box;

  // check collision
  if(headX<0||headY<0||headX>=canvas.width||headY>=canvas.height||collision({x:headX,y:headY},snake)){
    clearInterval(interval);
    alert('Game Over! Score: '+score);
    reset();
    return;
  }

  // eat
  if(headX===food.x && headY===food.y){
    score++; scoreVal.textContent=score;
    // pulse effect: briefly grow food (visual handled by CSS subtlety)
    food=randomFood();
  } else {
    snake.pop();
  }

  snake.unshift({x:headX,y:headY});

  // render
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // draw food glow
  ctx.shadowColor='#ff6b6b'; ctx.shadowBlur=12;
  drawRect(food.x,food.y,'#ff3b3b');
  ctx.shadowBlur=0;
  // draw snake with neon gradient
  for(let i=0;i<snake.length;i++){
    let c = i===0? '#9effa6' : '#2fe08a';
    ctx.fillStyle = c;
    ctx.fillRect(snake[i].x,snake[i].y,box,box);
    ctx.strokeStyle='rgba(255,255,255,0.06)';
    ctx.strokeRect(snake[i].x+0.5,snake[i].y+0.5,box-1,box-1);
  }
}

function collision(head, arr){
  return arr.some(s=>s.x===head.x && s.y===head.y);
}

document.addEventListener('keydown', e=>{
  if(e.key==='ArrowLeft'&&dir!=='RIGHT') dir='LEFT';
  if(e.key==='ArrowUp'&&dir!=='DOWN') dir='UP';
  if(e.key==='ArrowRight'&&dir!=='LEFT') dir='RIGHT';
  if(e.key==='ArrowDown'&&dir!=='UP') dir='DOWN';
});

startBtn.addEventListener('click', ()=>{
  if(interval){ clearInterval(interval); reset(); return; }
  score=0; scoreVal.textContent=score; dir='RIGHT'; snake=[{x:Math.floor(cols/2)*box,y:Math.floor(rows/2)*box}];
  interval=setInterval(draw,120);
});

function reset(){
  clearInterval(interval);
  interval=null;
  score=0; scoreVal.textContent=0;
  snake=[{x:Math.floor(cols/2)*box,y:Math.floor(rows/2)*box}];
  dir='RIGHT';
}