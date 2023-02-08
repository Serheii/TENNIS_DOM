"use strict"

let start=document.createElement('input');
document.body.appendChild(start);
start.type="button";
start.value="START";
start.setAttribute('onclick','startGame()');
start.id='start';

let score=document.createElement('div');
document.body.appendChild(score);
score.value="SCORE";
score.id='score';

let gameArea=document.createElement('div');
document.body.appendChild(gameArea);
gameArea.id='gameArea';

let gameBoardLeft=document.createElement('div');
gameArea.appendChild(gameBoardLeft);
gameBoardLeft.id='gameBoardLeft';
gameBoardLeft.style.marginTop=gameArea.offsetHeight/2 - gameBoardLeft.offsetHeight/2 + 'px';

let gameBoardRight=document.createElement('div');
gameArea.appendChild(gameBoardRight);
gameBoardRight.id='gameBoardRight';
gameBoardRight.style.marginTop=gameArea.offsetHeight/2 - gameBoardRight.offsetHeight/2 + 'px';

let ball=document.createElement('div');
gameArea.appendChild(ball);
ball.id='ball';
ball.style.marginLeft=gameArea.offsetWidth/2 - ball.offsetWidth/2 + 'px';
ball.style.marginTop=gameArea.offsetHeight/2 - ball.offsetHeight/2 + 'px';



let leftB={
    speed:0,
    
    update:function () {
        if (((parseFloat(gameBoardLeft.style.marginTop) + this.speed) < 0) || ((parseFloat(gameBoardLeft.style.marginTop) + this.speed) > (gameArea.offsetHeight - gameBoardLeft.offsetHeight))) {
            this.speed = 0;
        }
        else
        gameBoardLeft.style.marginTop = parseFloat(gameBoardLeft.style.marginTop) + this.speed + 'px';
    }
}

let rightB={
    speed:0,
    
    update:function () {
        if (((parseFloat(gameBoardRight.style.marginTop) + this.speed) < 0) || ((parseFloat(gameBoardRight.style.marginTop) + this.speed) > (gameArea.offsetHeight - gameBoardRight.offsetHeight))) {
            this.speed = 0;
        }
        else
        gameBoardRight.style.marginTop = parseFloat(gameBoardRight.style.marginTop) + this.speed + 'px';
    }
}

let ballMove={
    speedX:10,
    speedY:0,
    
    update:function () {
                    //шарик дошёл до левого края
            if (((parseFloat(ball.style.marginLeft) - gameBoardLeft.offsetWidth + this.speedX) <= 0)
        ||          //шарик дошёл до правого края
            ((parseFloat(ball.style.marginLeft) + ball.offsetWidth + gameBoardRight.offsetWidth + this.speedX) >= gameArea.offsetWidth)) {
                                                                                                                                        

            if (this.speedX > 0) {  //шарик летит вправо
                                            //верхний край правой ракетки
                if (((parseFloat(ball.style.marginTop) + ball.offsetHeight/2) >= (parseFloat(gameBoardRight.style.marginTop)))
                &&                          //нижний край правой ракетки
                ((parseFloat(ball.style.marginTop) + ball.offsetHeight/2) <= (parseFloat(gameBoardRight.style.marginTop) + gameBoardRight.offsetHeight))) {

                    ball.style.marginLeft = gameArea.offsetWidth - ball.offsetWidth - gameBoardRight.offsetWidth + 'px';    //дожимаем шарик к ракетке
                    this.speedX = -this.speedX; //отскок от ракетки
                    
                    setTimeout(startGame,40);   //продолжаем

                    if (rightB.speed>0)  //подкрутка правой ракеткой
                        this.speedY++;
                    else if (rightB.speed<0)
                        this.speedY--;
                    
                } else {
                    // попадание в правую стенку
                    ball.style.marginLeft = gameArea.offsetWidth - ball.offsetWidth + 'px';    //дожимаем шарик к стене
                    this.speedX = 0;
                    this.speedY = 0;
                }

            } else {                //шарик летит влево
                                        //верхний край левой ракетки
                if (((parseFloat(ball.style.marginTop) + ball.offsetHeight/2) >= (parseFloat(gameBoardLeft.style.marginTop)))
                &&                      //нижний край левой ракетки
                ((parseFloat(ball.style.marginTop) + ball.offsetHeight/2) <= (parseFloat(gameBoardLeft.style.marginTop) + gameBoardLeft.offsetHeight))) {
                    
                    ball.style.marginLeft = gameBoardLeft.offsetWidth + 'px';    //дожимаем шарик к ракетке
                    this.speedX = -this.speedX; //отскок от ракетки
                    
                    setTimeout(startGame,40);   //продолжаем

                    if (leftB.speed>0)  //подкрутка левой ракеткой
                    this.speedY++;
                    else if (leftB.speed<0)
                    this.speedY--;
                    
                } else {
                    // попадание в левую стенку
                    ball.style.marginLeft = 0 + 'px';    //дожимаем шарик к стене
                    this.speedX = 0;
                    this.speedY = 0;
                }
            }

        } else {    //отскок от потолка
                    if ((parseFloat(ball.style.marginTop)<0)
                ||  //отскок от пола
                    (parseFloat(ball.style.marginTop) + ball.offsetHeight)>(gameArea.offsetHeight)) {
                    this.speedY=-this.speedY;
                }
                //движение прямо, если нет препядствия
                ball.style.marginLeft=parseFloat(ball.style.marginLeft) + this.speedX + 'px';
                ball.style.marginTop=parseFloat(ball.style.marginTop) + this.speedY + 'px';

                setTimeout(startGame,40);   //продолжаем
        }
    }
}

document.onkeydown = function (eo) {
    if(eo.keyCode === 16) {
        leftB.speed=-5;
    }
    if (eo.keyCode === 17) {
        leftB.speed=5
    }
    if(eo.keyCode === 38) {
        rightB.speed=-5;
    }
    if (eo.keyCode === 40) {
        rightB.speed=5
    }
}

document.onkeyup = function (eo) {
    if(eo.keyCode === 16) {
        leftB.speed=0;
    }
    if (eo.keyCode === 17) {
        leftB.speed=0
    }
    if(eo.keyCode === 38) {
        rightB.speed=0;
    }
    if (eo.keyCode === 40) {
        rightB.speed=0
    }
}

let timerId;

function startGame() {
    leftB.update();
    rightB.update();
    ballMove.update();
};
