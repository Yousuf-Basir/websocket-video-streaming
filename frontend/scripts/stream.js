// Viewer client

// Initialize WebSocket connection
const socket = new WebSocket('ws://localhost:8080');
socket.binaryType = 'arraybuffer';
const notConnectedMessage = document.getElementById('not_connected_message');

// Create a MediaSource object
var mediaSource = new MediaSource();

// When the MediaSource is successfully opened
mediaSource.addEventListener('sourceopen', () => {
  // Create a new SourceBuffer
  const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8, opus"');

  // When a chunk of data is received from the WebSocket
  socket.onmessage = (event) => {
    const arrayU8 = new Uint8Array(event.data);
    // Append the received data to the SourceBuffer
    sourceBuffer.appendBuffer(arrayU8);
  };

  // When the SourceBuffer has enough data to start playing
  sourceBuffer.addEventListener('updateend', () => {
    // If the video element is not already playing, start playing it
    if (video.paused) {
      video.play();
      // hide the not connected message
      notConnectedMessage.style.display = 'none';
    }
  });
});


// When a WebSocket error occurs
socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// When the WebSocket connection is closed
socket.onclose = () => {
  console.log('WebSocket connection closed.');
};

// Create a video element to display the streamed video
const video = document.getElementById('video');

// Assign the MediaSource object to the video element
video.src = URL.createObjectURL(mediaSource);
