//点击开始游戏--动态生成100个小格
//leftClick 没有雷就显示周围雷数 扩散--当前周围八个格没有雷
// 有雷就游戏结束
//rightClick 标记红旗 有标记就取消标记 
//10个标记正确提示成功

var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var closeBtn = document.getElementById('close');
var score = document.getElementById('score');
var minesNum;
var mineOver;
var block;
var mineMap = [];
var startGameBool = true;



bindEvent();
function bindEvent() {
    startBtn.onclick = function () {
        if (startGameBool) {
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            startGameBool = false;
        }
    }
    box.oncontextmenu = function () {
        return false;
    }
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            console.log('333');
            leftClick(event);
            console.log('444');
        } else if (e.which == 3) {
            console.log('555');
            rightClick(event);
            console.log('666');
        }
    }
    close.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = ' ';
        startGameBool = true;
    }

}

function init() {
    minesNum = 10;
    mineOver = 10;
    score.innerHTML = mineOver;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({ mine: 0 });
        }
    }
    block = document.getElementsByClassName('block');
    console.log('111');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if (mineMap[mineIndex].mine === 0) {
            block[mineIndex].classList.add('isLei');
            minesNum--;
        }
    }
    console.log('222');
}

function leftClick(dom) {
    if (dom.classList.contains('flag')) {
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) {
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("img/over.jpg")';
        }, 800)
    } else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        console.log('11');
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isLei')) {
                    n++;
                }
            }
        }
        console.log('22');
        dom && (dom.innerHTML = n);
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    console.log('33');
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                            console.log('44');
                        }
                    }
                }
            }
        }
    }
}

function rightClick(dom) {
    if (dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('flag');
    if (dom.classList.contains('isLei') && dom.classList.contains('flag')) {
        mineOver--;
    }
    if (dom.classList.contains('isLei') && !dom.classList.contains('flag')) {
        mineOver++;
    }
    score.innerHTML = mineOver;
    if (mineOver == 0) {
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("img/success.gif")';
    }
}