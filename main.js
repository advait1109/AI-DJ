song="";
scoreLeftWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);

    if(scoreLeftWrist>0.2){
    fill("red");
    color("red");
    circle(leftWristX,leftWristY,20);
    inNumLeftWrist=Number(leftWristY);
    removeDecimals=floor(inNumLeftWrist);
    volume=removeDecimals/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}
function modelLoaded(){
    console.log("MODEL LOADED");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log(leftWristX+" "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log(rightWristX+" "+rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
    }
}