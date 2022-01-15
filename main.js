// 各要素を取得
const player1Btn = document.getElementById("player1Btn")
const player2Btn = document.getElementById("player2Btn")
const setPlayer1dice = document.getElementById("setPlayer1dice")
const setPlayer2dice = document.getElementById("setPlayer2dice")
const result = document.getElementById("result")

// 変数を定義
let player1Timer;
let player2Timer;
let player1Num = 1;
let player2Num = 1;
let turn = 2;

// サイコロの初期値
// サイコロ１の初期値
let player1Dice = `./img/saikoro${player1Num}.png`;
setPlayer1dice.setAttribute("src", player1Dice);
// サイコロ２の初期値
let player2Dice = `./img/saikoro${player2Num}.png`;
setPlayer2dice.setAttribute("src", player2Dice);

// 関数定義(createPlayerDice(player))
// 意味：関数を呼び出した際に引数が(1)だった場合player1Numに1~6の数字をランダムで1つ代入
//      関数を呼び出した際に引数が(2)だった場合player2Numに1~6の数字をランダムで1つ代入する。
//      その後、定数playerdiceにランダムで1~6の画像を代入し、返す
const createPlayerDice = (player) => {
    // playerNumに1~6の数字をランダムに代入
    const playerNum = Math.floor(Math.random() * 6 + 1);
    // 引数(player)が1だった場合player1Numに1~6の数字をランダムに代入
    if(player === 1) {
        player1Num = playerNum;
        // 引数(player)が2だった場合player2Numに1~6の数字をランダムに代入
    }else if(player === 2) {
        player2Num = playerNum;
    }
    // 定数playerdiceに1~6の数字をランダムに１つ代入
    const playerdice = `./img/saikoro${playerNum}.png`
    // playerdiceを返す
    return playerdice;
};

// 関数定義(playerRandom(player))
// 意味：関数(createPlayerDice(player))で出た1~6の数字をplayerDiceに代入
// 関数を呼び出した際に引数が(1)だった場合1~6の画像をランダムで表示
// 関数を呼び出した際に引数が(2)だった場合1~6の画像をランダムで表示
const playerRandom = (player) => {
    playerDice = createPlayerDice(player); // playerDiceに関数createPlayerDice(player)を代入
    if (player === 1) {                    // playerが1だった場合にランダムで1~6の画像を表示
        setPlayer1dice.setAttribute("src", playerDice);        
    } else if (player === 2) {             // playerが2だった場合にランダムで1~6の画像を表示
        setPlayer2dice.setAttribute("src", playerDice);
    }
};

// ボタン
const player1 = 1;
const player2 = 2;

// プレイヤー１のボタンをクリックした時の処理
player1Btn.addEventListener("click", () => {
    clearInterval(player1Timer);   // バグ処理    
    player1Timer = setInterval(() => playerRandom(player1), 100);   // 0.1秒でランダムに画像が変わる機能をplayer1Timerに代入(引数1)
    player1Btn.disabled = true;    // ボタンが押せなくなる
    asyncFunc(player1);
});

// プレイヤー2ボタンをクリックした時の処理
player2Btn.addEventListener("click", () => {
    clearInterval(player2Timer)   // バグ処理
    player2Timer = setInterval(() => playerRandom(player2), 100);   // 0.1秒でランダムに画像が切り替わる機能をplayer2Timerに代入(引数２)
    player2Btn.disabled = true;    // ボタンが押せなくなる
    asyncFunc(player2);
});

// 対戦の判定
const check = () => {
    if (turn !== 0) {   // turnが0じゃなかった場合return(終了という意味)
        return;
    } 
    if (player1Num > player2Num) {   // player1Numがplayer2Numより大きかった場合player1の勝利!と表示
        result.textContent = "player1の勝利!";
    } else if (player1Num === player2Num) {   // player1Numがplayer2Numと同じ場合引き分けと表示
        result.textContent = "引き分け";
    } else {   // player1Numがplayer2Numより大きかった場合player2の勝利!と表示
        result.textContent = "player2の勝利!";
    }
    // ボタンが押せるようになる
    player1Btn.disabled = false;
    player2Btn.disabled = false;
    // turnに2を代入
    // こうすることで何度でも実行が可能となる
    turn = 2;
};

// asyncFunc定義引数(player)
const asyncFunc = async (player) => {
    const random = async () => {   // random関数定義
        await new Promise((resolve) => {   // Promice処理が返ってくるまで一時停止
            result.textContent = "???";//
            setTimeout(() => {   // 3秒後にタイマーを止める関数
                resolve();
                if (player === 1) {   // プレイヤー１の場合
                    clearInterval(player1Timer);
                } else if (player === 2) {   // プレイヤー２の場合
                    clearInterval(player2Timer)
                }
            }, 500);
        });
    };

    await random();
    turn--;   // turnマイナス１
    check();   // check関数実行
};