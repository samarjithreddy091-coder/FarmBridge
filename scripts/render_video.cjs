const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const slidesDir = '/tmp/farmbridge_slides';
if (!fs.existsSync(slidesDir)) {
  fs.mkdirSync(slidesDir, { recursive: true });
}

console.log('Rendering 1920x1080 slide frames for functionalities demonstration...');

// Assets paths
const onionImg = '/app/applet/src/assets/images/produce_nashik_onions_1793340680599.jpg';
const tomatoImg = '/app/applet/src/assets/images/produce_organic_tomatoes_1793340681144.jpg';
const heroImg = '/app/applet/src/assets/images/hero_agricultural_harvest_1793340680828.jpg';
const farmerImg = '/app/applet/src/assets/images/farmer_field_inspection_1793340682496.jpg';

// Helper to run bash command
function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

// Slide 1: Title & Overview (0:00 - 0:12)
run(`convert -size 1920x1080 xc:"#0c1910" \
  -fill "#22c55e" -pointsize 26 -annotate +120+240 "FARMBRIDGE AI · ARCHITECTURAL SYSTEM DEMONSTRATION" \
  -fill "#ffffff" -pointsize 64 -annotate +120+330 "Direct Agricultural Marketplace\n& Smart Agronomy Platform" \
  -fill "#a8a29e" -pointsize 30 -annotate +120+510 "Step-by-Step Functional Walkthrough of Core Platform Capabilities" \
  -fill "#166534" -draw "roundrectangle 120,590 600,680 16,16" \
  -fill "#dcfce7" -pointsize 24 -annotate +160+645 "APMC Mandi Benchmarking" \
  -fill "#1e293b" -draw "roundrectangle 620,590 1080,680 16,16" \
  -fill "#f8fafc" -pointsize 24 -annotate +660+645 "Gemini AI Crop Doctor" \
  -fill "#854d0e" -draw "roundrectangle 1100,590 1560,680 16,16" \
  -fill "#fef08a" -pointsize 24 -annotate +1140+645 "Instant Escrow UPI Settlements" \
  ${slidesDir}/slide1.png`);

// Slide 2: Step 1 - Produce Marketplace (0:12 - 0:31)
run(`convert -size 1920x1080 xc:"#0c1910" \
  -fill "#34d399" -pointsize 24 -annotate +100+140 "STEP 01 OF 06 · CORE BUYER DISCOVERY" \
  -fill "#ffffff" -pointsize 52 -annotate +100+210 "Direct Produce Marketplace & Verified Farm Lots" \
  -fill "#94a3b8" -pointsize 24 -annotate +100+270 "Categorized discovery, organic standards & live mandi savings benchmarks" \
  -fill "#1e293b" -draw "roundrectangle 100,340 1820,980 20,20" \
  -fill "#334155" -draw "roundrectangle 140,380 940,940 16,16" \
  -fill "#334155" -draw "roundrectangle 980,380 1780,940 16,16" \
  ${slidesDir}/slide2_base.png`);

// Composite image on slide 2
run(`convert ${slidesDir}/slide2_base.png \
  \\( ${onionImg} -resize 760x320^ -gravity center -extent 760x320 -quality 95 \\) -geometry +160+410 -composite \
  -fill "#22c55e" -pointsize 28 -annotate +160+780 "Nashik Red Sun-Cured Onions (Garwa Variety)" \
  -fill "#f8fafc" -pointsize 36 -annotate +160+835 "Direct Farm Gate: Rs 28/kg" \
  -fill "#94a3b8" -pointsize 22 -annotate +160+880 "Supermarket Retail: Rs 48/kg · Save 41.6% Direct" \
  -fill "#38bdf8" -pointsize 20 -annotate +160+915 "Harvested: Oct 24, 2026 · NPOP Organic Certified · Sahyadri Agro Cluster" \
  \\( ${tomatoImg} -resize 760x320^ -gravity center -extent 760x320 -quality 95 \\) -geometry +1000+410 -composite \
  -fill "#22c55e" -pointsize 28 -annotate +1000+780 "Vine-Ripened Heirloom Tomatoes (Arka Rakshak)" \
  -fill "#f8fafc" -pointsize 36 -annotate +1000+835 "Direct Farm Gate: Rs 34/kg" \
  -fill "#94a3b8" -pointsize 22 -annotate +1000+880 "Supermarket Retail: Rs 55/kg · Save 38.2% Direct" \
  -fill "#38bdf8" -pointsize 20 -annotate +1000+915 "Harvested: Oct 28, 2026 · PGS-India Certified · Reddy Bio-Farms Kolar" \
  ${slidesDir}/slide2.png`);

// Slide 3: Step 2 - Crop Comparator (0:31 - 0:49)
run(`convert -size 1920x1080 xc:"#0c1910" \
  -fill "#38bdf8" -pointsize 24 -annotate +100+140 "STEP 02 OF 06 · BUYER EVALUATION & TRANSPARENCY" \
  -fill "#ffffff" -pointsize 52 -annotate +100+210 "Side-by-Side Crop & Price Comparator" \
  -fill "#94a3b8" -pointsize 24 -annotate +100+270 "Transparent multi-lot matrix: unit pricing, harvest freshness, shelf-life, and net farmer realization" \
  -fill "#1e293b" -draw "roundrectangle 100,340 1820,980 20,20" \
  -fill "#0f172a" -draw "roundrectangle 140,380 660,940 16,16" \
  -fill "#0f172a" -draw "roundrectangle 700,380 1220,940 16,16" \
  -fill "#0f172a" -draw "roundrectangle 1260,380 1780,940 16,16" \
  -fill "#f8fafc" -pointsize 28 -annotate +170+440 "Nashik Red Onions" \
  -fill "#22c55e" -pointsize 32 -annotate +170+490 "Rs 28 / kg" \
  -fill "#94a3b8" -pointsize 22 -annotate +170+550 "APMC Mandi: Rs 19/kg" \
  -fill "#94a3b8" -pointsize 22 -annotate +170+600 "Supermarket: Rs 48/kg" \
  -fill "#38bdf8" -pointsize 22 -annotate +170+650 "Buyer Savings: ~41%" \
  -fill "#f8fafc" -pointsize 22 -annotate +170+700 "Harvest Freshness: 45 Days" \
  -fill "#22c55e" -pointsize 22 -annotate +170+750 "Farmer Extra Income: +47%" \
  -fill "#f8fafc" -pointsize 28 -annotate +730+440 "Kolar Heirloom Tomatoes" \
  -fill "#22c55e" -pointsize 32 -annotate +730+490 "Rs 34 / kg" \
  -fill "#94a3b8" -pointsize 22 -annotate +730+550 "APMC Mandi: Rs 22/kg" \
  -fill "#94a3b8" -pointsize 22 -annotate +730+600 "Supermarket: Rs 55/kg" \
  -fill "#38bdf8" -pointsize 22 -annotate +730+650 "Buyer Savings: ~38%" \
  -fill "#f8fafc" -pointsize 22 -annotate +730+700 "Harvest Freshness: 10 Days" \
  -fill "#22c55e" -pointsize 22 -annotate +730+750 "Farmer Extra Income: +54%" \
  -fill "#f8fafc" -pointsize 28 -annotate +1290+440 "Aged Dehradun Basmati" \
  -fill "#22c55e" -pointsize 32 -annotate +1290+490 "Rs 110 / kg" \
  -fill "#94a3b8" -pointsize 22 -annotate +1290+550 "APMC Mandi: Rs 78/kg" \
  -fill "#94a3b8" -pointsize 22 -annotate +1290+600 "Supermarket: Rs 175/kg" \
  -fill "#38bdf8" -pointsize 22 -annotate +1290+650 "Buyer Savings: ~37%" \
  -fill "#f8fafc" -pointsize 22 -annotate +1290+700 "Shelf Life: 365 Days" \
  -fill "#22c55e" -pointsize 22 -annotate +1290+750 "Farmer Extra Income: +41%" \
  ${slidesDir}/slide3.png`);

// Slide 4: Step 3 - Mandi Radar & Margin Calculator (0:49 - 1:09)
run(`convert -size 1920x1080 xc:"#0c1910" \
  -fill "#f59e0b" -pointsize 24 -annotate +100+140 "STEP 03 OF 06 · MARKET INTELLIGENCE ENGINE" \
  -fill "#ffffff" -pointsize 52 -annotate +100+210 "Real-Time APMC Mandi Radar & Margin Calculator" \
  -fill "#94a3b8" -pointsize 24 -annotate +100+270 "Live market yard feeds and interactive simulation of farmer extra revenue and consumer savings" \
  -fill "#1e293b" -draw "roundrectangle 100,340 1150,980 20,20" \
  -fill "#0f172a" -draw "roundrectangle 1190,340 1820,980 20,20" \
  -fill "#f8fafc" -pointsize 28 -annotate +140+410 "Live APMC Mandi Benchmarks Across India" \
  -fill "#94a3b8" -pointsize 20 -annotate +140+470 "Lasalgaon APMC (Nashik Onion)  | Mandi: Rs 19/kg  | FarmBridge: Rs 28/kg  | Trend: +6.2%" \
  -fill "#94a3b8" -pointsize 20 -annotate +140+530 "Kolar APMC (Hybrid Tomato)      | Mandi: Rs 22/kg  | FarmBridge: Rs 34/kg  | Trend: Steady" \
  -fill "#94a3b8" -pointsize 20 -annotate +140+590 "Karnal Mandi (Basmati Rice)     | Mandi: Rs 78/kg  | FarmBridge: Rs 110/kg | Trend: +3.8%" \
  -fill "#94a3b8" -pointsize 20 -annotate +140+650 "Guntur Mirchi Yard (Teja Chilli) | Mandi: Rs 165/kg | FarmBridge: Rs 220/kg | Trend: +8.5%" \
  -fill "#94a3b8" -pointsize 20 -annotate +140+710 "Agra Mandi (Jyoti Fresh Potato)  | Mandi: Rs 16/kg  | FarmBridge: Rs 24/kg  | Trend: -2.4%" \
  -fill "#22c55e" -pointsize 22 -annotate +140+810 "Government market arrival feeds updated daily at dawn" \
  -fill "#f8fafc" -pointsize 28 -annotate +1230+410 "Interactive Lot Simulation (200 kg)" \
  -fill "#14532d" -draw "roundrectangle 1230,470 1780,670 16,16" \
  -fill "#bbf7d0" -pointsize 22 -annotate +1260+520 "EXTRA FARMER EARNINGS" \
  -fill "#ffffff" -pointsize 48 -annotate +1260+590 "+ Rs 1,800.00" \
  -fill "#86efac" -pointsize 18 -annotate +1260+635 "Farmer receives Rs 5,600 vs broker auction Rs 3,800" \
  -fill "#78350f" -draw "roundrectangle 1230,710 1780,910 16,16" \
  -fill "#fde68a" -pointsize 22 -annotate +1260+760 "CONSUMER / RESTAURANT CASH SAVINGS" \
  -fill "#ffffff" -pointsize 48 -annotate +1260+830 "Rs 4,000.00 Saved" \
  -fill "#fef08a" -pointsize 18 -annotate +1260+875 "Paid Rs 5,600 instead of retail supermarket Rs 9,600" \
  ${slidesDir}/slide4.png`);

// Slide 5: Step 4 - Gemini AI Crop Doctor (1:09 - 1:30)
run(`convert -size 1920x1080 xc:"#0c1910" \
  -fill "#a855f7" -pointsize 24 -annotate +100+140 "STEP 04 OF 06 · SCIENTIFIC AGRONOMIC INTELLIGENCE" \
  -fill "#ffffff" -pointsize 52 -annotate +100+210 "Google Gemini AI Crop Doctor & Diagnostics" \
  -fill "#94a3b8" -pointsize 24 -annotate +100+270 "Immediate disease identification, organic bio-formulations & calibrated IPM prescriptions" \
  -fill "#1e293b" -draw "roundrectangle 100,340 1820,980 20,20" \
  -fill "#0f172a" -draw "roundrectangle 140,380 780,940 16,16" \
  -fill "#f8fafc" -pointsize 28 -annotate +170+430 "Symptom Selector Input" \
  -fill "#22c55e" -pointsize 22 -annotate +170+490 "Selected Crop: Tomato (Arka Rakshak)" \
  -fill "#e2e8f0" -pointsize 20 -annotate +170+540 "Observed Symptoms:" \
  -fill "#94a3b8" -pointsize 18 -annotate +170+580 "- Dark concentric target-board spots on foliage\n- Lower leaf yellowing and stem browning\n- Post-monsoon high humidity onset" \
  -fill "#a855f7" -pointsize 20 -annotate +170+720 "Trained on ICAR & State Agri University protocols" \
  -fill "#14532d" -draw "roundrectangle 820,380 1780,640 16,16" \
  -fill "#bbf7d0" -pointsize 24 -annotate +850+430 "ORGANIC BIO-CONTROL FORMULATION (100% NATURAL)" \
  -fill "#ffffff" -pointsize 22 -annotate +850+480 "Spray 5ml Neem Oil (10,000 ppm) + fermented sour buttermilk spray (50ml/L).\nApply fermented Jeevamrutha at the root zone to restore soil bacterial defenses." \
  -fill "#78350f" -draw "roundrectangle 820,670 1780,940 16,16" \
  -fill "#fde68a" -pointsize 24 -annotate +850+720 "CERTIFIED IPM PRESCRIPTION (CALIBRATED SAFE DOSAGE)" \
  -fill "#ffffff" -pointsize 22 -annotate +850+770 "Mancozeb 75% WP @ 2.5g per liter or Azoxystrobin 18.2% + Difenoconazole 11.4% SC\nOnly apply if infection crosses 20% foliage threshold." \
  ${slidesDir}/slide5.png`);

// Slide 6: Step 5 - Farmer Producer Cockpit (1:30 - 1:50)
run(`convert -size 1920x1080 xc:"#0c1910" \
  -fill "#22c55e" -pointsize 24 -annotate +100+140 "STEP 05 OF 06 · GROWER INVENTORY & ORDERS" \
  -fill "#ffffff" -pointsize 52 -annotate +100+210 "Farmer Producer Cockpit & Fulfillment Pipeline" \
  -fill "#94a3b8" -pointsize 24 -annotate +100+270 "Real-time order statuses, inventory balance (available vs reserved), and instant UPI payouts" \
  -fill "#1e293b" -draw "roundrectangle 100,340 1820,980 20,20" \
  -fill "#0f172a" -draw "roundrectangle 140,380 520,530 14,14" \
  -fill "#94a3b8" -pointsize 18 -annotate +165+425 "Gross Payout" \
  -fill "#22c55e" -pointsize 36 -annotate +165+480 "Rs 4,150" \
  -fill "#0f172a" -draw "roundrectangle 550,380 930,530 14,14" \
  -fill "#94a3b8" -pointsize 18 -annotate +575+425 "Active Listings" \
  -fill "#ffffff" -pointsize 36 -annotate +575+480 "6 Lots" \
  -fill "#0f172a" -draw "roundrectangle 960,380 1340,530 14,14" \
  -fill "#94a3b8" -pointsize 18 -annotate +985+425 "Incoming Orders" \
  -fill "#f59e0b" -pointsize 36 -annotate +985+480 "2 Pending" \
  -fill "#0f172a" -draw "roundrectangle 1370,380 1780,530 14,14" \
  -fill "#94a3b8" -pointsize 18 -annotate +1395+425 "Dispatches in Queue" \
  -fill "#38bdf8" -pointsize 36 -annotate +1395+480 "1 Ready" \
  -fill "#0f172a" -draw "roundrectangle 140,560 1780,940 16,16" \
  -fill "#f8fafc" -pointsize 26 -annotate +170+615 "Live Order Pipeline & 1-Click Status Progression" \
  -fill "#e2e8f0" -pointsize 20 -annotate +170+670 "ORD-7291 | Green Leaf Bistro & Kitchen (Restaurant) | 50kg Tomato, 30kg Onion | Payout: Rs 2,290" \
  -fill "#22c55e" -pointsize 20 -annotate +170+710 "Action: [ ACCEPT ORDER ] -> Transitions lot to Reserved Inventory" \
  -fill "#e2e8f0" -pointsize 20 -annotate +170+770 "ORD-7288 | Priya Narayanan (Apartment Co-op) | 15kg Onion, 10kg Basmati | Payout: Rs 1,520" \
  -fill "#f59e0b" -pointsize 20 -annotate +170+810 "Action: [ MARK PACKED & READY ] -> Cold transport vehicle dispatched" \
  -fill "#e2e8f0" -pointsize 20 -annotate +170+870 "ORD-7282 | Karthik Somayaji (Self-Pickup) | 10kg Tomato | Payout: Rs 340" \
  -fill "#38bdf8" -pointsize 20 -annotate +170+910 "Action: [ CONFIRM HANDOVER ] -> Instant same-day UPI bank release (Zero debt cycle)" \
  ${slidesDir}/slide6.png`);

// Slide 7: Step 6 - Transparent Basket & Checkout (1:50 - 2:06)
run(`convert -size 1920x1080 xc:"#0c1910" \
  -fill "#38bdf8" -pointsize 24 -annotate +100+140 "STEP 06 OF 06 · FULFILMENT & ESCROW" \
  -fill "#ffffff" -pointsize 52 -annotate +100+210 "Fresh Harvest Basket & Dual-Fulfilment Checkout" \
  -fill "#94a3b8" -pointsize 24 -annotate +100+270 "Orders grouped by farm origin with Farm-Gate Pickup (Rs 0) or Cold Transport" \
  -fill "#1e293b" -draw "roundrectangle 100,340 1820,980 20,20" \
  -fill "#0f172a" -draw "roundrectangle 140,380 940,940 16,16" \
  -fill "#0f172a" -draw "roundrectangle 980,380 1780,940 16,16" \
  -fill "#f8fafc" -pointsize 28 -annotate +170+435 "Fulfilment Selection" \
  -fill "#166534" -draw "roundrectangle 170,480 910,610 12,12" \
  -fill "#f8fafc" -pointsize 24 -annotate +200+535 "Farm-Gate Self-Pickup" \
  -fill "#bbf7d0" -pointsize 20 -annotate +200+575 "Zero Delivery Fee (Rs 0) · Collect directly from grower" \
  -fill "#1e293b" -draw "roundrectangle 170,640 910,770 12,12" \
  -fill "#f8fafc" -pointsize 24 -annotate +200+695 "Direct Cold-Logistics Delivery" \
  -fill "#94a3b8" -pointsize 20 -annotate +200+735 "Rs 60 standard cold transit to your kitchen doorstep" \
  -fill "#f8fafc" -pointsize 28 -annotate +1010+435 "Itemized Price Transparency Receipt" \
  -fill "#94a3b8" -pointsize 22 -annotate +1010+510 "Produce Value (100% to Grower Ramesh Patil):   Rs 1,400.00" \
  -fill "#94a3b8" -pointsize 22 -annotate +1010+570 "Logistics & Handover (Farm Pickup Selected):    Rs     0.00" \
  -fill "#22c55e" -pointsize 32 -annotate +1010+660 "Total Payable: Rs 1,400.00" \
  -fill "#38bdf8" -pointsize 22 -annotate +1010+730 "Middleman Commission Surcharge: Rs 0.00 (Zero Brokerage)" \
  -fill "#166534" -draw "roundrectangle 1010,790 1740,890 14,14" \
  -fill "#ffffff" -pointsize 26 -annotate +1120+845 "Confirm & Place Direct Order (Instant Settlement)" \
  ${slidesDir}/slide7.png`);

console.log('Slides created successfully! Now generating video with ffmpeg...');

// Encode video with ffmpeg:
// Slide timings matching the 126.4s audio narration:
// Slide 1: 12s  (0 to 12)
// Slide 2: 19s  (12 to 31)
// Slide 3: 18s  (31 to 49)
// Slide 4: 20s  (49 to 69)
// Slide 5: 21s  (69 to 90)
// Slide 6: 20s  (90 to 110)
// Slide 7: 17s  (110 to 127)

const concatFile = '/tmp/farmbridge_concat.txt';
const concatContent = `file '${slidesDir}/slide1.png'
duration 12.0
file '${slidesDir}/slide2.png'
duration 19.0
file '${slidesDir}/slide3.png'
duration 18.0
file '${slidesDir}/slide4.png'
duration 20.0
file '${slidesDir}/slide5.png'
duration 21.0
file '${slidesDir}/slide6.png'
duration 20.0
file '${slidesDir}/slide7.png'
duration 17.0
file '${slidesDir}/slide7.png'
`;

fs.writeFileSync(concatFile, concatContent);

const audioPath = '/app/applet/public/farmbridge_narration.wav';
const outMp4 = '/app/applet/public/farmbridge_functionalities_walkthrough.mp4';

// Run ffmpeg with H.264 video + AAC audio, faststart for streaming and instant download
const ffmpegCmd = `ffmpeg -y -f concat -safe 0 -i ${concatFile} -i ${audioPath} \
  -c:v libx264 -pix_fmt yuv420p -r 25 -c:a aac -b:a 192k -shortest -movflags +faststart \
  ${outMp4}`;

console.log('Running ffmpeg encoding command...');
run(ffmpegCmd);

const stats = fs.statSync(outMp4);
console.log(`Video generated successfully at ${outMp4} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
