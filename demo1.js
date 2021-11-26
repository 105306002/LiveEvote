var firebase = require("firebase");
// 初始化 Firebase
var config = {
    apiKey: "AIzaSyCjVPsmuBr5RNeojfFvK1-_htqW5gAqyZI",
    authDomain: "liveevote.firebaseapp.com",
    databaseURL: "https://liveevote.firebaseio.com",
    projectId: "liveevote",
    storageBucket: "liveevote.appspot.com",
    messagingSenderId: "697026562798"
};
firebase.initializeApp(config);
// 建立 DB
var database = firebase.database();

var player1Data = 0;
var player1State = 0;
var player1Ref = database.ref('personA/score');

player1Ref.on('value', function(snapshot) {
    player1Data = snapshot.val();
});


const five = require("johnny-five");
let board1 = new five.Board({
    port: "/dev/tty.usbmodem14421",
    repl : false
});

board1.on("ready", function() {
    var servo = new five.Servo({pin:8,startAt: 90});

    setInterval(() => {
        if(player1Data > 4000 && player1State ==4){
            servo.to(180);
            player1State = 5;
        }
        else if(player1Data > 3000 && player1State == 3){
            servo.to(135);
            player1State = 4;
        }
        else if(player1Data > 2000 && player1State == 2){
            servo.to(120);
            player1State = 3;
        }
        else if(player1Data > 1000 && player1State == 1){
            servo.to(105);
            player1State = 2;
        }
        else if(player1Data < 1000 && player1State == 0){
            servo.to(90);
            player1State = 1;
        }

    }, 1000);

});