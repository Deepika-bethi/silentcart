let model;
const video = document.getElementById("webcam");

function startDetection() {
  console.log("Starting webcam...");
  handTrack.startVideo(video).then(function(status) {
    if (status) {
      console.log("Webcam started!");
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        runDetection();
      });
    } else {
      console.log("Webcam access denied.");
    }
  });
}

function runDetection() {
  model.detect(video).then(predictions => {
    if (predictions.length > 0) {
      const handLabel = predictions[0].label;
      console.log("Detected hand:", handLabel);
      alert(`Detected: ${handLabel}`);
    } else {
      console.log("No hand detected.");
    }
    requestAnimationFrame(runDetection);
  });
}


handTrack.load().then(lmodel => {
  console.log("Model loaded ✅");
  model = lmodel;
});
