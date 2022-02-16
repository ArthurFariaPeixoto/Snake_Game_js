let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let scale = 24;

let direction = "right";

let snake = [];
snake[0] = {
    x: scale,
    y: scale
}
let food = {
    x: Math.floor(Math.random()*31+1)*scale,
    y:Math.floor(Math.random()*31+1)*scale
}

let score=0;


let game = setInterval(startGame, 100);

function createBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,32*scale,32*scale);
}

function createSnake(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, scale, scale);
    }
}

function createFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, scale, scale);
}

function update(event){
    if(event.keyCode === 37 && direction!=="right"){
        direction="left";
    }
    if(event.keyCode === 38 && direction!=="down"){
        direction="up";
    }
    if(event.keyCode === 39 && direction!=="left"){
        direction="right";
    }
    if(event.keyCode === 40 && direction!=="up"){
        direction="down";
    }
}

function startGame(){
    createBG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === "right"){
        snakeX += scale;
    }
    if(direction === "left"){
        snakeX -= scale;
    }
    if(direction ==="up"){
        snakeY -= scale;
    }
    if(direction === "down"){
        snakeY += scale;
    }

    if(snakeX !== food.x || snakeY!==food.y){
        snake.pop();
    }else{
        food.x=Math.floor(Math.random()*31+1)*scale;
        food.y=Math.floor(Math.random()*31+1)*scale;
        score++;
        document.getElementById('Score').value = score;
    }

    let newHead={
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);

    if(snake[0].x > 31*scale && direction === "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction === "left") snake[0].x = 31*scale;
    if(snake[0].y > 31*scale && direction === "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction === "up") snake[0].y = 31*scale;

    for(i=1; i<snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            clearInterval(game);
            alert('Game Over!!!');
        }
    }
}



document.addEventListener('keydown', update);