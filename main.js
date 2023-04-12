song="";
scoreRightwrist=0;
scoreLeftwrist=0;
Right_x=0;
Left_x=0;
Right_y=0;
Left_y=0;

function preload() {
    song=loadSound("music.mp3");
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',Gotposes);
}
    

function modelLoaded() {
    console.log("Model has loaded");
}
function Gotposes(results) {
    if(results.length>0) {
        console.log(results);
        scoreRightwrist=results[0].pose.keypoints[10].score;
        scoreLeftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreRightwrist = "+scoreRightwrist+ " scoreLeftwrist = "+scoreLeftwrist);

        Right_x=results[0].pose.rightWrist.x;
        Right_y=results[0].pose.rightWrist.y;
        console.log("Right x = "+Right_x+" Right y = "+Right_y);

        Left_y=results[0].pose.leftWrist.y;
        Left_x=results[0].pose.leftWrist.x;
        console.log("Left x = "+Left_x+" Left y = "+Left_y);


    }
}
function draw() {
    image(video,0,0,600,500);
    fill("#fc0390");
    stroke("#2003fc");
    if ( scoreRightwrist>0.2) {
        circle(Right_x,Right_y,20);
        if(Right_y>0 && Right_y< 100){
            document.getElementById("speed").innerHTML="Speed is 0.5x";
            song.rate(0.5);
        } 

        if(Right_y>100 && Right_y< 200){
            document.getElementById("speed").innerHTML="Speed is 1x";
            song.rate(1);
        }

        if(Right_y>200 && Right_y< 300){
            document.getElementById("speed").innerHTML="Speed is 1.5x";
            song.rate(1.5);
        }

        if(Right_y>300 && Right_y< 400){
            document.getElementById("speed").innerHTML="Speed is 2x";
            song.rate(2);
        }

        if(Right_y> 400){
            document.getElementById("speed").innerHTML="Speed is 2.5x";
            song.rate(2.5);
        }
    }
    
    if(scoreLeftwrist>0.2){
        circle(Left_x,Left_y,20);
        nho=number(Left_y)
        number=floor(nho*2);
        volume=number/1000;
        document.getElementById("vol").innerHTML="Volume ="+volume;
        song.setVolume(volume);
    }

    }

function play() {
    song.play();
song.rate(1);
song.setVolume(1);
}
