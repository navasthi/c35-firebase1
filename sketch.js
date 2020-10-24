var ball;
var database;
var position;

function setup(){
    createCanvas(500, 500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var lon = database.ref("Ball/Position"); //LOCATION.OF.NODE
    lon.on("value", readOp, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x, y) {
    database.ref("Ball/Position").set({
        X: ball.x + x,
        Y: ball.y + y
    })
}
function readOp(data) {
    position = data.val();
    ball.x = position.X;
    ball.y = position.Y;
}
function showError() {
    console.log("Error");

}
