let inputDiraction = {x:0, y:0};
let snakearry = [
    {x:10, y:15}
];
let food = {x:15, y:16};
let speed = 9;
let score = 0;
let highScore = 0;
let printTime = 0;
const scoreEl = document.getElementById('score')
const highScoreEl = document.getElementById('hscore')


// hardnes of game or speed of snake 

let esey = document.getElementById('esey');
esey.addEventListener('click',()=>{
    speed = 5;
})
let mediam = document.getElementById('mediam');
mediam.addEventListener('click',()=>{
    speed = 14;
})
let hard = document.getElementById('hard');
hard.addEventListener('click',()=>{
    speed =20;
})


// game function calling 

function main(curTime){
    window.requestAnimationFrame(main)
    if ((curTime - printTime)/1000 < 1/speed) {
        return
    }
    printTime = curTime
    gameFunction()

}
window.requestAnimationFrame(main)

// when game is over

function gameOver(snakearry){

   // wall collide 
    if (snakearry[0].x >= 20 || snakearry[0].x <= 0 || snakearry[0].y >= 20 || snakearry[0].y <= 0) {
        return true
    }

    // body collide 
    for (let i = 1; i < snakearry.length; i++) {
        if (snakearry[i].x === snakearry[0].x && snakearry[i].y === snakearry[0].y) {
            return true
        }
        
    }
    return false
}


// main game function start

function gameFunction(){


// after game over 
if (gameOver(snakearry)) {
    score = 0;
    alert('Game Over press enter to restart')
    inputDiraction = {x:0, y:0};
    snakearry = [
    {x:10, y:12}
    ];
    food = {x:14, y:15};
}

// moving snake body 

for (let i = snakearry.length - 2; i >= 0; i--) {
    snakearry[i+1] = {...snakearry[i]}     
}
// moving head 
snakearry[0].x += inputDiraction.x;
snakearry[0].y += inputDiraction.y;


// after eadting food body groth 

if (snakearry[0].x === food.x && snakearry[0].y === food.y) {
    snakearry.unshift({x: snakearry[0].x + inputDiraction.x , y: snakearry[0].y + inputDiraction.y})

    // new food 
    let a = 2;
    let b = 18
    food = {
        x: Math.floor(Math.random()*(b-a)+a), y: Math.floor(Math.random()*(b-a)+a)
    }

    score += 1
    scoreEl.innerHTML = "Score " + score
    if (score>= highScore) {
        highScore = score;
        highScoreEl.innerHTML = "High Score " + highScore
    }

}



// showing snake on snake board

const board = document.getElementById('board');
board.innerHTML = ""

snakearry.forEach((el, index) => {
    const snakeEl = document.createElement('div');
    snakeEl.style.gridColumnStart = el.x;
    snakeEl.style.gridRowStart = el.y;
    if (index === 0) {
        snakeEl.classList.add('head')
    } else {
        snakeEl.classList.add('snakeBody')
    }

    board.appendChild(snakeEl)
})

// showing food on snake board 

const foodEl = document.createElement('div');
    foodEl.style.gridColumnStart = food.x;
    foodEl.style.gridRowStart = food.y;
    foodEl.classList.add('food');

    board.appendChild(foodEl);


}
// gamefunctin end 


// game controll events button press 
window.addEventListener('keydown', 
(input) =>{
    inputDiraction = {x:0, y:1};
    switch (input.key) {
        case "ArrowUp":
            inputDiraction.x = 0
            inputDiraction.y = -1
            break;
    
        case "ArrowDown":
            inputDiraction.x = 0
            inputDiraction.y = 1
            break;
    
        case "ArrowRight":
            inputDiraction.x = 1
            inputDiraction.y = 0
            break;
    
        case "ArrowLeft":
            inputDiraction.x = -1
            inputDiraction.y = 0
            break;
    
        default:
            break;
    }

})

