// Viewer client

// Initialize WebSocket connection
const socket = new WebSocket('ws://localhost:8080');
// Create a video element to display the streamed video
const video = document.createElement('video');
video.controls = true;
document.body.appendChild(video);

// Create a MediaSource object
const mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);

// When the MediaSource is successfully opened
mediaSource.addEventListener('sourceopen', () => {
  // Create a new SourceBuffer
  const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8, opus"');

  // When a chunk of data is received from the WebSocket
  socket.onmessage = (event) => {
    const data = event.data;
    // Append the chunk of data into the SourceBuffer
    sourceBuffer.appendBuffer(data);
  };

  // When the SourceBuffer has enough data to start playing
  sourceBuffer.addEventListener('updateend', () => {
    // If the video element is not already playing, start playing it
    if (video.paused) {
      video.play();
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



// Assign the MediaSource object to the video element
// video.src = URL.createObjectURL(mediaSource);
