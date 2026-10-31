const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const { GoogleGenAI } = require('@google/genai');

async function generateNarration() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('No GEMINI_API_KEY found');
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  const script = `Welcome to the step-by-step functionality demonstration of FarmBridge AI, an agricultural marketplace directly connecting verified Indian farmers with buyers.

Step one: The Fresh Produce Marketplace. Buyers can browse verified farm listings across vegetables, fruits, grains, and pulses, with instant filtering for certified organic produce. Every crop card displays verified harvest dates, farm cluster origins, available stock, and live mandi savings comparing direct farm prices with supermarket rates.

Step two: The Side-by-Side Crop Comparator. Users can select multiple produce lots to directly compare unit prices, wholesale APMC rates, shelf life, and net farmer realization side-by-side in a transparent comparison matrix.

Step three: The Real-Time APMC Mandi Radar. This intelligence engine benchmarks live market arrivals across Lasalgaon, Kolar, and Guntur mandis. The interactive margin calculator enables buyers and growers to simulate order quantities and compute exact farmer earnings and buyer savings.

Step four: The AI Crop Doctor powered by Google Gemini. Farmers select their crop and observed symptoms to receive instant pathological diagnoses, organic bio-remedies like Jeevamrutha and neem oil, and calibrated chemical pest management prescriptions.

Step five: The Farmer Producer Cockpit. Growers manage active listings, balance reserved and available stock, accept incoming buyer requests, and update order fulfillment statuses in real time.

Step six: The Transparent Harvest Basket and Dual-Fulfilment Checkout. Orders are organized by individual farm clusters, offering direct farm-gate pickup with zero delivery fees or refrigerated cold transport, backed by instant UPI settlement.

FarmBridge AI: Better prices for farmers, fresher harvest for everyone. Thank you.`;

  console.log('Generating Indian English narration with Gemini TTS...');

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash-lite-tts',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: script,
            speechMetadata: {
              style: 'Indian English male accent. Articulate, smooth, dignified Indian English professional presenter explaining software functionalities step by step with clear and natural pronunciation',
            },
          },
        ],
      },
    ],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Fenrir' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    throw new Error('No audio data received from Gemini');
  }

  const outPath = path.join(__dirname, '../public/farmbridge_narration.wav');
  fs.writeFileSync(outPath, Buffer.from(base64Audio, 'base64'));
  console.log(`Audio successfully written to ${outPath} (${(base64Audio.length / 1024).toFixed(1)} KB)`);
}

generateNarration().catch((err) => {
  console.error('Audio generation failed:', err);
  process.exit(1);
});
