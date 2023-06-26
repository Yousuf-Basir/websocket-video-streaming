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
            mediaRecorder.start();
            var chunks = [];

            // When data is available from the MediaRecorder
            mediaRecorder.ondataavailable = (event) => {
                // Store the data chunk in the buffer
                chunks.push(event.data);
            };

            setInterval(() => {
                mediaRecorder.stop();
                // Convert the chunks into a single Blob
                const blob = new Blob(chunks, { type: 'video/webm' });
                // Send the Blob data over the WebSocket connection
                console.log('sending data')
                socket.send(blob);
                chunks = [];
                mediaRecorder.start();
            }, 5000);
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
