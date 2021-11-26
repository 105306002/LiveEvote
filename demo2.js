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

var player2Data = 0;
var player2State = 0;
var player2Ref = database.ref('personB/score');

player2Ref.on('value', function(snapshot) {
    player2Data = snapshot.val();
});

const five = require("johnny-five");

let board2 = new five.Board({
    port: "/dev/tty.usbmodem14441",
    repl : false
});

board2.on("ready", function() {
    var servo2 = new five.Servo({pin:12,startAt: 90});

    setInterval(() => {
        if(player2Data > 4000 && player2State ==4){
            servo2.to(180);
            player2State = 5;
        }
        else if(player2Data > 3000 && player2State == 3){
            servo2.to(135);
            player2State = 4;
        }
        else if(player2Data > 2000 && player2State == 2){
            servo2.to(120);
            player2State = 3;
        }
        else if(player2Data > 1000 && player2State == 1){
            servo2.to(105);
            player2State = 2;
        }
        else if(player2Data < 1000 && player2State == 0){
            servo2.to(90);
            player2State = 1;
        }

    }, 1000);

});