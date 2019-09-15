
(function(){
    "use strict";
    const size = 25;
    const length = 20;
    const startingX = 10;
    const startingY = 10;
    const width = 501;
    const height = 501;
    const fps = 30;
    const speed = 10
    let lastTime = 0;
    let currentDirection = 0;
    let lastMovement = 0;
    let snake = [{x: startingX, y: startingY}];
    let newFood = generateCoordinates();
    let eating = false;
    let consumedFood

    setup();
    function setup(){
        let startingButton = document.querySelector(".starting__button");
        startingButton.addEventListener("click", startGame);
        
    }
    function startGame(){
        hideStartingGameButton();
        initializeControls();
        gameLoop();
       
    }
    function drawField(){
        let canvas  = document.getElementById("canvas");
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        for (let i = 0; i <= size; i ++){
            ctx.moveTo(length*i,0);
            ctx.lineTo(length*i, length*size);
            ctx.stroke();
            ctx.moveTo(0,length*i);
            ctx.lineTo(length*size, length*i);
            ctx.stroke();
        }
    }
    function hideStartingGameButton(){
        let startingButton = document.querySelector(".starting__button");
        startingButton.style.display = "none";
    }
    function initializeControls(){
        
        window.addEventListener('keydown', function(e){
            
            if(e.keyCode === 38){
                currentDirection = 0;  
            }
            else if (e.keyCode === 39){
                currentDirection = 1;
            }
            else if(e.keyCode === 40){
                currentDirection = 2;
            }
            else if(e.keyCode === 37){
                currentDirection = 3;
            }
        }, false)
    }
    function gameLoop(timeStamp){
        if(timeStamp - lastTime >= 1000/fps);{
            lastTime = timeStamp;
            if(timeStamp - lastMovement > 1000/speed){
                lastMovement = timeStamp;
                moveSnake();
            }
            let canvas  = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0,0,width,height);
            drawField();
            drawFood();
            drawSnake();
            requestAnimationFrame(gameLoop); 
        }   
    }
    function generateCoordinates(){
        let xInterferes = true;
        let coordinateX = 0
        while(xInterferes){
        coordinateX = Math.floor(Math.random()*size);
            for (let i = 0; i < snake.length; i ++){
                if(snake[i].x !== coordinateX){
                    xInterferes = false;
                    i = snake.length;
                }
            }
        }
        let yInterferes = true;
        let coordinateY = 0;
        while(yInterferes){
        coordinateY = Math.floor(Math.random()*size);
            for (let i = 0; i < snake.length; i ++){
                if(snake[i].y !== coordinateY){
                    yInterferes = false;
                    i = snake.length;
                }
            }
        }
        return {x: coordinateX, y: coordinateY}
    }
    function drawFood(){
        let canvas  = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = 'blue';
        ctx.fillRect(newFood.x*length, newFood.y*length, length, length);
    }
    function drawSnake(){
        let canvas  = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = 'grey';
        for (let i = 0; i < snake.length; i ++){
            ctx.fillRect(snake[i].x*length, snake[i].y*length, length, length);
        }
    }
    function moveSnake(){
        console.log(snake);
        let temporarySnakePart1 = snake[0];
            if(currentDirection === 0){
                snake.unshift({x: snake[0].x, y: snake[0].y-1});
                console.log(snake);
                if(snake[0].y < 0){
                    snake[0].y = size-1;
                }
            }
            if(currentDirection === 1){
                snake.unshift({x: snake[0].x+1, y: snake[0].y});
                if(snake[0].x === size){
                    snake[0].x = 0;
                }
            }
            if(currentDirection === 2){
                snake.unshift({x: snake[0].x, y: snake[0].y+1});;
                if(snake[0].y === size){
                    snake[0].y = 0;
                }
            }
            if(currentDirection === 3){
                snake.unshift({x: snake[0].x-1, y: snake[0].y});;
                if(snake[0].x < 0){
                    snake[0].x = size-1;
                }
            }
        snake.pop();
        if(snake[0].x === newFood.x && snake[0].y === newFood.y){
            eating = true;
            consumedFood = newFood;
            newFood = generateCoordinates();
        }
        if(eating === true){
            let isEaten = true
            for(let i = 0; i < snake.length; i ++){
                if(snake[i].x === consumedFood.x && snake[i].y === consumedFood.y){
                    isEaten = false;
                }
            }
            if(isEaten === true){
                eating = false;
                snake.push(consumedFood);
            }
        }
    };
})();
