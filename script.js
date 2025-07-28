// Load your model (adjust paths as needed)
let model;
async function loadModel() {
    model = await tf.loadLayersModel('model/model.json');
    console.log("Model loaded");
}
loadModel();

// Handle form submission
document.getElementById('prediction-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const age = parseFloat(document.getElementById('age').value);
    const symptoms = parseFloat(document.getElementById('symptoms').value);
    
    // Preprocess input (customize for your model)
    const inputTensor = tf.tensor2d([[age, symptoms]]);
    
    // Predict
    const prediction = model.predict(inputTensor);
    const result = prediction.dataSync()[0];
    const confidence = (result * 100).toFixed(2);
    
    // Display result
    document.getElementById('prediction-output').textContent = 
        result > 0.5 ? "High risk of Chagas Disease" : "Low risk";
    document.getElementById('confidence').textContent = `Confidence: ${confidence}%`;
    document.getElementById('result').classList.remove('hidden');
});
