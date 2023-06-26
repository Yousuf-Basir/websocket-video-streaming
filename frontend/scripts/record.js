// Broadcasting client

// Initialize WebSocket connection
// const socket = new WebSocket('ws://localhost:8080');

// When WebSocket connection is established
socket.onopen = () => {
    // Capture audio and video streams
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => {
            // Create MediaRecorder to encode the media streams
            const mediaRecorder = new MediaRecorder(stream);

            // When data is available from the MediaRecorder
            mediaRecorder.ondataavailable = (event) => {
                // Send the data chunk over the WebSocket connection
                if (event.data && event.data.size > 0) {
                    console.log('sending data')
                    socket.send(event.data);
                }
            };

            // Start recording the media streams
            mediaRecorder.start();

            // Stop recording after a specified duration (e.g., 10 seconds)
            setTimeout(() => {
                mediaRecorder.stop();
            }, 3000);
        })
        .catch(error => {
            console.error('Error accessing media devices:', error);
        });
};

// When a WebSocket error occurs
socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

// When the WebSocket connection is closed
socket.onclose = () => {
    console.log('WebSocket connection closed.');
};
