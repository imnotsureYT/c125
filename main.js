noseX=0;
noseY=0;

leftWristX=0;
rightWristX=0;

difference=0;

textinput = "";
colorinput = "black";
Bcolorinput = "white";

function preload()
{

}

function setup()
{
    canvas = createCanvas(550,500);
    canvas.position(150, 250);

    video = createCapture(VIDEO);
    video.size(550,500);
    video.position(800,250);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.warn(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log('noseX = '+noseX+' noseY = '+noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX-rightWristX);
        console.log('leftWristX = '+leftWristX+' rightWristX = '+rightWristX+' difference = '+difference);
    }
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function draw()
{
    textinput = document.getElementById('textinput').value;
    colorinput = document.getElementById('colorinput').value;
    Bcolorinput = document.getElementById('Bcolorinput').value;
    if (document.getElementById('textinput').value!="")
    {
        background(Bcolorinput);
        textSize(difference);
        fill(colorinput);
        stroke(colorinput);
        text(textinput, noseX, noseY);
    }
}