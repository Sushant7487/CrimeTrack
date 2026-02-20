// ✅ FINAL FIXED CODE
// Hum standard import use kar rahe hain kyunki humne 'Alias' install kiya hai
const faceapi = require('@vladmandic/face-api');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
const path = require('path');

// 1. Environment Setup (Monkey Patch)
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// 2. Load Models
const loadModels = async () => {
    const modelPath = path.join(__dirname, '../models');
    
    try {
        // Explicitly CPU Backend set karein taaki koi confusion na ho
        // (Hamari Alias trick ke karan ye bina error ke chalega)
        if (!faceapi.tf.getBackend()) {
            await faceapi.tf.setBackend('cpu');
            await faceapi.tf.ready();
        }

        // Models load karein
        if (!faceapi.nets.ssdMobilenetv1.params) {
            console.log("⏳ Loading AI Models...");
            
            await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
            await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
            await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
            
            console.log("✅ AI Models Loaded Successfully!");
        }
    } catch (error) {
        console.error("❌ Model Load Error:", error);
    }
};

// 3. Get Descriptor
const getFaceDescriptor = async (imagePath) => {
    try {
        await loadModels();
        
        // Image Load
        const img = await canvas.loadImage(imagePath);

        // Detect Face
        const detection = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

        return detection ? detection.descriptor : null;
        
    } catch (error) {
        console.error("❌ AI Processing Error:", error.message);
        return null;
    }
};

module.exports = { getFaceDescriptor };