var song1 = "";
var song2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

song_variable = "";

  
function preload() {
    song1 = loadSound("Forget.mp3");
    song2 = loadSound("metamorph.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Posenet is intialized');
}

function gotPoses(results) {
    if(results.length > 0) 
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score; 
        scoreRightWrist = results[0].pose.keypoints[10].score; 
	    console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
        
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
    }

}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_playing = song1.isPlaying();
    song2_playing = song2.isPlaying();

    fill("#40E0D0");
    stroke("#40E0D0");

    if(scoreLeftWrist > 0.2) 
    {
        circle(leftWristX, leftWristY, 20);

        song2.stop();

        if(song1_playing = true) 
        {   
            song1.play();

            document.getElementById("song").innerHTML = "Forget Is Playing."
        }
    }

    if(scoreRightWrist > 0.2) 
    {
        circle(rightWristX, rightWristY, 20);

        song1.stop();

        if(song2_playing = true) 
        {   
            song2.play();

            document.getElementById("song").innerHTML = "Metamorphosis Is Playing."
        }
    }
}




