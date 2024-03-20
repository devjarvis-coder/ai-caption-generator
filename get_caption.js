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
