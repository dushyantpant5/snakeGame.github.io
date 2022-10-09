//Constants & Variables
let snakeDir = {x:0 , y:0};
const eatingSound = new Audio ('assets/food.mp3');
const gameSound = new Audio ('assets/music.mp3');
const moveSound = new Audio ('assets/move.mp3');
const gameOverSound = new Audio ('assets/gameover.mp3');
let lastPaintTime = 0;

let speed = 9;
let score = 0;

let snakeArr = [{x:15,y:15}];
let food = {x:12 , y:13};   
//Game Functions

const main = (ctime) =>
{
    
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 <1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

const isCollide = (snake) =>
{
    //Bump to your self
    for(let i = 1; i<snake.length; i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        {
            return true;
        }
    }

    if(snake[0].x >25 || snake[0].x<=0 || snake[0].y>25 || snake[0].y <=0)
    {
        return true;
    }

    return false;
}

const gameEngine = () =>
{
    //Updating Snake Array

    //If snake collide
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        gameSound.pause();
        snakeDir = {x:0 , y:0};
        alert("Game Over");
        snakeArr = [{x:15,y:15}];
        score = 0;
        // gameSound.play();
        scoreBoard.innerHTML = "Score : " + score;
    }

    //But if snake eats the food

    if(snakeArr[0].x === food.x && snakeArr[0].y===food.y)
    {
        eatingSound.play();
        score += 1;
        scoreBoard.innerHTML = "Score : " + score;
        snakeArr.unshift({x:snakeArr[0].x+snakeDir.x,y:snakeArr[0].y+snakeDir.y}); //Increase the size of snake
        let a = 1;
        let b = 25;
        food = {x:Math.round(a+(b-a)*Math.random()) ,y:Math.round(a+(b-a)*Math.random())};//Randomly generate new Food
    }

    //Moving the snake(Except head)
    for (let i = snakeArr.length -2; i>=0; i--) 
    {
        
        snakeArr[i+1] = {...snakeArr[i]}; //Destructuring (Padh lena) 
        
    }
    //Move Head
    snakeArr[0].x += snakeDir.x;
    snakeArr[0].y += snakeDir.y;
    

    //Display Snake and Food
    board.innerHTML = "";
    
    //Display the Snake
    snakeArr.forEach((e,index) =>
    {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snakeBody');
        }

        board.appendChild(snakeElement);    
    });

    //Display the Food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);    


}


//Main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>
{
    snakeDir = {x:0 , y:1}; //Start the game ,(It will start downwords)
    moveSound.play();
    gameSound.play();
    switch (e.key) {
        
        case "ArrowUp":
        snakeDir.x = 0;
        snakeDir.y = -1;
        break;
        
        case "ArrowDown":
        snakeDir.x = 0;
        snakeDir.y = 1;
        break;
        
        case "ArrowLeft":
        snakeDir.x = -1;
        snakeDir.y = 0;
        break;
        
        case "ArrowRight":
        snakeDir.x = 1;
        snakeDir.y = 0;
        break;
        
        default:
            break;
    }

})