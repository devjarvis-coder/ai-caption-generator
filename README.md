# Image and Video Captioning API Code

This repository provides a simple way to generate captions for images and videos using a Flask API. It utilizes Axios to send HTTP requests to the API endpoints.

## Prerequisites
- Node.js installed on your computer
- Basic knowledge of JavaScript and HTTP requests

## Setup

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Ensure that you have a Flask API running locally or replace `API_URL` with the appropriate endpoint URL.

## Usage

### Generating Image Captions

```javascript
const axios = require('axios');

// Define the API endpoint
const API_URL = 'http://127.0.0.1:5000/generate_image_caption'; // Change to your API endpoint URL

// Example image URL and text
const imgURL = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/demo.jpg';
const text = 'a photography of';

// JSON data to be sent in the request
const data = {
    img_url: imgURL,
    text: text
};

// Send a POST request to the API endpoint
axios.post(API_URL, data)
    .then(response => {
        console.log('Generated caption:', response.data.caption);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
```

### Generating Video Captions

```javascript
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
```

### checking NSFW content
```javascript
const axios = require('axios');

// Function to classify NSFW image using Flask API
async function classifyImage(imgUrl) {
    try {
        const response = await axios.post('http://127.0.0.1:5000/nsfw_check', {
            img_url: imgUrl
        });
        return response.data.predicted_class;
    } catch (error) {
        console.error('Error:', error.response.data.error);
        return null;
    }
}

// Example usage
const imageUrl = 'http://sigmapic.com/images/xxxsexpic.net/100/384_a_wet.jpg';
classifyImage(imageUrl)
    .then(predictedClass => {
        if (predictedClass) {
            console.log('image content:', predictedClass);
        } else {
            console.log('Unable to classify image.');
        }
    })
    .catch(error => console.error('Error:', error));
```
## Integration with JavaScript Frameworks

You can integrate this code into JavaScript frameworks like Node.js, React.js, or Next.js by following these steps:

1. Install Axios and Form-Data packages in your project.
2. Copy the relevant code snippets into your application files.
3. Modify the API endpoint URLs as necessary.
4. Ensure that your backend (Flask API) is running and accessible from your frontend application.

That's it! You can now use this functionality within your JavaScript applications to generate captions for images and videos.
