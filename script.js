let model;
const video = document.getElementById("webcam");
const cards = document.querySelectorAll('.card');
let selectedIndex = 0;

// Highlight the selected product card
function highlightCard(index) {
  cards.forEach((card, i) => {
    card.style.border = i === index ? "3px solid #0077b6" : "none";
    card.style.background = i === index ? "#b5ead7" : "#d8f3dc";
  });
}

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
      const hand = predictions[0];
      const x = hand.bbox[0]; // X position of hand
      console.log("Hand X position:", x);

      // Simple logic to scroll items
      if (x < 100 && selectedIndex > 0) {
        selectedIndex--;
        highlightCard(selectedIndex);
      } else if (x > 250 && selectedIndex < cards.length - 1) {
        selectedIndex++;
        highlightCard(selectedIndex);
      }
    }

    requestAnimationFrame(runDetection);
  });
}

// Load the handtrack.js model
handTrack.load().then(lmodel => {
  console.log("Model loaded ✅");
  model = lmodel;
});
