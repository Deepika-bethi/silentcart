let model;
const video = document.getElementById("webcam");

function startDetection() {
  handTrack.startVideo(video).then(function(status) {
    if (status) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        runDetection();
      });
    }
  });
}

function runDetection() {
  model.detect(video).then(predictions => {
    if (predictions.length > 0) {
      console.log(predictions);
      const hand = predictions[0].label;
      alert(`Detected: ${hand}`);
    }
    requestAnimationFrame(runDetection);
  });
}

handTrack.load().then(lmodel => {
  model = lmodel;
});
