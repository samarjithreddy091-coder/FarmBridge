# 🌾 FarmBridge AI — Direct Agricultural Marketplace & Agronomy Intelligence

> **Bypassing Intermediary Broker Chains. Better Prices for Farmers. Fresher Harvest for Everyone.**

FarmBridge AI is a full-stack digital agricultural ecosystem designed to empower Indian smallholder farmers, FPOs (Farmer Producer Organizations), culinary businesses, and households. By combining direct farm-gate lot listings, real-time APMC Mandi price benchmarking, and Gemini-powered foliar disease diagnostics, FarmBridge AI transforms agriculture from an opaque, broker-dominated system into a fair and transparent direct economy.

---

## 🚀 Key Features

1. **Direct Agricultural Marketplace**
   - Verified crop lots from regional agricultural clusters (Nashik, Kolar, Guntur, Dehradun, Shimla).
   - Real-time moisture indicators, harvest timestamps, and government APEDA / NPOP organic standards.
   - Farm-gate self-pickup (₹0 delivery fee) or refrigerated cold-chain transit.

2. **APMC Mandi Price Radar & Dynamic Corridors**
   - Real-time modal price benchmarks across APMC wholesale yards.
   - Algorithmic price corridors delivering **+42% higher farmer realization** while offering **35% buyer savings** compared to supermarket retail.

3. **Google Gemini AI Crop Doctor**
   - Multi-crop foliar symptom diagnostics for blights, rusts, and viral infections.
   - Actionable organic bio-remedies (Jeevamrutha, neem oil formulations) alongside calibrated scientific IPM prescriptions.
   - Conversational AI Agronomist for soil nutrition, NPK scheduling, and crop rotation.

4. **Farmer Producer Cockpit**
   - Manage active listings, available vs. reserved stocks.
   - Instant purchase order acceptance and tracking with zero intermediary commission deductions.
   - Milestone escrow protection and direct same-day UPI payouts.

5. **Multilingual Architecture**
   - Instant switching across **English**, **Telugu (తెలుగు)**, and **Hindi (हिंदी)** for all marketplace produce, mandi radars, crop doctor advisories, and producer tools.

6. **Full Walkthrough Demo Video**
   - Embedded 1080p MP4 video walkthrough with smooth, continuous Indian English male narration.
   - Standalone downloadable video asset (`/farmbridge_functionalities_walkthrough.mp4`).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend**: Node.js, Express, tsx
- **AI Engine**: Google Gen AI SDK (`@google/genai`, Gemini 3.8 Flash)
- **Audio & Media**: FFmpeg, ImageMagick, Gemini TTS
- **Build Tool**: Vite

---

## 📦 Getting Started

### 1. Clone or Extract the Repository
```bash
git clone https://github.com/samarjithreddy091-coder/farmbridge-ai.git
cd farmbridge-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` and add your Gemini API key:
```bash
cp .env.example .env
```
Inside `.env`:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
PORT=3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
├── public/                     # Static assets, MP4 demo video, narration WAV
│   ├── farmbridge_functionalities_walkthrough.mp4
│   └── farmbridge_narration.wav
├── src/
│   ├── assets/images/          # High-resolution agricultural imagery
│   ├── components/             # React UI components
│   │   ├── AICropDoctor.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── CropComparator.tsx
│   │   ├── FarmerPortal.tsx
│   │   ├── Footer.tsx
│   │   ├── HackathonDemoVideo.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── MandiIntelligence.tsx
│   │   ├── ProduceDetailModal.tsx
│   │   └── ProduceMarketplace.tsx
│   ├── data/                   # Verified produce batches & Mandi rates
│   ├── types/                  # TypeScript interface definitions
│   ├── utils/                  # Multilingual translation dictionaries (EN/TE/HI)
│   ├── App.tsx                 # Root application
│   ├── index.css               # Global typography & Tailwind styles
│   └── main.tsx                # React DOM entry point
├── server.ts                   # Express server with Gemini API proxy
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies and scripts
```

---

## 📜 License
Apache-2.0 License. Built for Indian Farmers & Consumers.
