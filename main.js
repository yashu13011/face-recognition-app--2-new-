object = "";
confidence = 0;

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="captured_img">'
    });
}

console.log('ml5 version: ' , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SxWBw9usJ/model.json' , modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results[0].label;
        confidence = results[0].confidence.toFixed(3);
        document.getElementById("result_object_name").innerHTML = object;
        document.getElementById("result_object_accuracy").innerHTML = confidence;
    }
}