// Connect to the WebSocket server
const socket = new WebSocket('ws://localhost:8080');

// Get access to the webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.srcObject = stream;

    const mediaSource = new MediaSource();
    videoPlayer.src = URL.createObjectURL(mediaSource);

    // Create a MediaRecorder to capture video data
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8"' });
    mediaRecorder.ondataavailable = function(e) {
      if (e.data && e.data.size > 0) {
        socket.send(e.data);
      }
    };

    // Start recording video
    mediaRecorder.start();

    // Stop recording and close the WebSocket connection when the page is unloaded
    window.addEventListener('beforeunload', function() {
      mediaRecorder.stop();
      socket.close();
    });
  })
  .catch(function(error) {
    console.error('Error accessing webcam:', error);
  });

// Receive video data from the server and play it in the video player
socket.onmessage = function(event) {
  const videoData = event.data;
  const videoPlayer = document.getElementById('videoPlayer');
  const mediaSource = videoPlayer.srcObject;

  mediaSource.addEventListener('sourceopen', function() {
    const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    sourceBuffer.addEventListener('updateend', function() {
      mediaSource.endOfStream();
    });
    sourceBuffer.appendBuffer(videoData);
  });
};
