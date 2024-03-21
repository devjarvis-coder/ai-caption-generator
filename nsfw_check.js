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
