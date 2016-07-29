$(function() {
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
            var r = Math.floor(Math.random() * 20)
            var g = Math.floor(Math.random() * 60)
            var b = Math.floor(Math.random() * 256)
            var div = $('<div>')
            .addClass('color')
            .attr('id', i + '-' + j)
            .css({
                'background-color': '#008AD4'
            })
            .appendTo('.changjing');
        }
    }
    
    //蛇初定为
    var she = [
    { x: 5, y: 3}, 
    { x: 5, y: 4}, 
    { x: 5, y: 5}
    ];
    var ooo = {
        '0-0': true,
        '0-1': true,
        '0-2': true
    }
//添加蛇类
    for (var i = 0; i < she.length; i++) {
        $('#' + she[i].x + '-' + she[i].y)
        .addClass('she');
    }
//放食物
    function fangshiwu() {
        var a = Math.floor(Math.random() * 30);
        var b = Math.floor(Math.random() * 30);
        $('#' + a + '-' + b).addClass('shiwu');
        return {
            x: a,
            y: b
        };
    }
    /* do{ shiwu = 'fangshiwu()' }while(ooo[shiwu.x'-'+shiwu.y]);*/
    shiwu = fangshiwu();
    fangxiang = 'you';
//移动
    var audio = $('audio').get(0);
    var move = function() {
        var jiutou = she[she.length - 1];
        //是否右撞墙
        if (fangxiang === 'you') {
            var xintou = {
                x: jiutou.x,
                y: jiutou.y + 1
            }
            
            if (xintou.y > 29) {
                $('<div>').addClass('out').appendTo('.changjing');
                zantin();
                audio.src = 'music/8.mp3'
                audio.play();
                return
            }
        }
        //是否左撞墙
        if (fangxiang === 'zuo') {
            var xintou = {
                x: jiutou.x,
                y: jiutou.y - 1
            }
            if (xintou.y < 0) {
                $('<div>').addClass('out').appendTo('.changjing');
                zantin();
                audio.src = 'music/8.mp3'
                audio.play();
                return
            }
        }
        //是否下撞墙
        if (fangxiang === 'xia') {
            var xintou = {
                x: jiutou.x + 1,
                y: jiutou.y
            }
            if (xintou.x > 29) {
                $('<div>').addClass('out').appendTo('.changjing');
                zantin();
                audio.src = 'music/8.mp3'
                audio.play();
                return
            }
        }
        //是否上撞墙
        if (fangxiang === 'shang') {
            var xintou = {
                x: jiutou.x - 1,
                y: jiutou.y
            }
            if (xintou.x < 0) {
                $('<div>').addClass('out').appendTo('.changjing');
                zantin();
                audio.src = 'music/8.mp3'
                audio.play();
                return
            }
        }
        //是否撞自己
        if (ooo[xintou.x + '-' + xintou.y]) {
            $('<div>').addClass('out').appendTo('.changjing');
            zantin();
            audio.src = 'music/8.mp3'
            audio.play();
            return;
        }
        //插入新头 减去尾巴 放食物
        she.push(xintou);
        ooo[xintou.x + '-' + xintou.y] = true;
        $('#' + xintou.x + '-' + xintou.y).addClass('she');
        
        if (xintou.x === shiwu.x && xintou.y === shiwu.y) {
            $('#' + shiwu.x + '-' + shiwu.y).removeClass('shiwu');
            /*do{shiwu = fangshiwu();}while(ooo[shiwu.x'-'+shiwu.y]);*/
            shiwu = fangshiwu();
        } else {
            var weiba = she.shift();
            delete ooo[weiba.x + '-' + weiba.y];
            $('#' + weiba.x + '-' + weiba.y).removeClass('she');
        }
    
    }
    //移动 暂停
    var jiandan;
    var kaishi = function() {
        jiandan = setInterval(move, 200);
    }
    var zantin = function() {
        clearInterval(jiandan)
    }
    //判断方向
    $(document).on('keyup', function(e) {
        e.precentDefault;
        var biao = {
            'zuo': 37,
            'you': 39,
            'shang': 38,
            'xia': 40
        }
        if (Math.abs(e.keyCode - biao[fangxiang]) === 2) {
            return
        }
        if (e.keyCode === 37) {
            fangxiang = 'zuo';
        }
        if (e.keyCode === 39) {
            fangxiang = 'you';
        }
        if (e.keyCode === 38) {
            fangxiang = 'shang';
        }
        if (e.keyCode === 40) {
            fangxiang = 'xia';
        }
    });
//开始游戏
    $('.play').on('click', function() {
        kaishi();
        audio.play()
    })
//再来一次
    $('.again').on('click', function() {
        location.reload();
    })
//点击暂停
    $('.stop').on('click', function() {
        zantin()
    })
//点击开始游戏
    $('.kai').on('click', function() {
        $('.donghua').addClass('one')
    })
})
