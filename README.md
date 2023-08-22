# Websocket Video Streaming

This project demonstrates a real-time video streaming application using WebSockets. It consists of both frontend and backend components that work together to enable broadcasting and viewing video streams over the web.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Websocket Video Streaming Project showcases how to establish a WebSocket connection to stream video from a broadcasting client to multiple viewing clients. It's built with modern web technologies, utilizing HTML, JavaScript, Node.js, and the WebSocket API.

## Features

- **Broadcasting:** The broadcasting client captures audio and video streams from the user's device using the `getUserMedia` API. It encodes the streams into a video format and sends the data to the WebSocket server.

- **Viewing:** The viewing clients connect to the WebSocket server and receive the video stream data. The received data is decoded and displayed using the HTML5 `<video>` element.

## How It Works

1. The broadcasting client establishes a WebSocket connection to the server.

2. The broadcasting client captures audio and video streams from the user's device using `getUserMedia`.

3. The captured media streams are encoded using the `MediaRecorder` API, and data chunks are sent over the WebSocket connection to the server.

4. The viewing clients also connect to the WebSocket server.

5. When the server receives data from the broadcasting client, it broadcasts the data to all connected viewing clients.

6. The viewing clients receive the video data and decode it using the `MediaSource` API. The decoded video frames are displayed using the HTML5 `<video>` element.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/websocket-video-streaming.git
   ```

2. Install dependencies for the server and frontend:
   ```bash
   cd websocket-video-streaming
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your web browser and navigate to `http://localhost:3000/stream` to access the video streaming page.

5. Grant necessary permissions for the browser to access your camera and microphone.

6. Open another browser tab/window to simulate a viewing client and navigate to the same URL (`http://localhost:3000/stream`).

7. You should now see the broadcasting client's video stream on the viewing client's page.

## Contributing

Contributions are welcome! If you find any issues or want to enhance this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Disclaimer: This project is a experiment and require modifications for production use.*