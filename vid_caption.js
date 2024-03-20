const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

// Function to send a POST request to the Flask API to get the video caption
async function getVideoCaption(videoFilePath) {
    try {
        // Read video file as a stream
        const videoFile = fs.createReadStream(videoFilePath);

        // Create form data
        const formData = new FormData();
        formData.append('video_path', videoFile);

        // Send POST request to Flask API
        const response = await axios.post('http://127.0.0.1:5000/generate_video_caption', formData, {
            headers: formData.getHeaders()
        });

        // Log the caption
        console.log('Caption:', response.data.caption);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage
const videoFilePath = 'demo.mp4';
getVideoCaption(videoFilePath);
