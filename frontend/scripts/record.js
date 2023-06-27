// Broadcasting client

// When WebSocket connection is established
socket.onopen = () => {
    // Capture audio and video streams
    navigator.mediaDevices.getUserMedia({ audio: true, video: {
        frameRate: { ideal: 15, max: 15 }
    } })
        .then(stream => {
            // Create MediaRecorder to encode the media streams
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs="vp8, opus"'
            });

            // When data is available from the MediaRecorder
            mediaRecorder.ondataavailable = (event) => {
                console.log('ondataavailable', event.data.size)
                // Send the data chunk over the WebSocket connection
                if (event.data && event.data.size > 0) {
                    socket.send(event.data);
                }
            };

            // Start recording the media streams
            mediaRecorder.start(5000); // For every 7 seconds, call ondataavailable
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
