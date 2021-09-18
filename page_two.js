img = "";
status = "";
objects = [];
function preload(){
    img = loadImage("images.jpg");
}
function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetection = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = " : detecting objects";
}
function modelLoaded(){
    console.log("MODEL LOADED");
    status = true;
    objectDetection.detect(img,gotResults);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(img,0,0,640,420);
    if(status != ""){
        for(var i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = " : objectDetected";
            fill("purple");
            c = floor(objects[i].confidence*100);
            console.log(c);
            text(objects[i].label+" "+c+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("purple");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}