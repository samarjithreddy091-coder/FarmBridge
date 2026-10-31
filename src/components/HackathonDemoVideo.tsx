import React, { useState, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  Download,
  X,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize2,
  Check,
  ShoppingBag,
  TrendingUp,
  Sparkles,
  Layers,
  CreditCard,
  Truck,
  ExternalLink,
  Film
} from 'lucide-react';
import { Language } from '../types';

interface FunctionalityChapter {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

interface HackathonDemoVideoProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HackathonDemoVideo: React.FC<HackathonDemoVideoProps> = ({ isOpen, onClose, language }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(146.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Video file path
  const videoUrl = '/farmbridge_functionalities_walkthrough.mp4';

  const chapters: FunctionalityChapter[] = useMemo(() => {
    if (language === 'te') {
      return [
        {
          id: 1,
          stepNumber: 'దశ 01',
          title: 'ప్రత్యక్ష వ్యవసాయ మార్కెట్‌ప్లేస్ & పంట లాట్లు',
          description: 'తేమ శాతం, APEDA మరియు NPOP సేంద్రీయ ధృవీకరణ మరియు స్పష్టమైన కోత తేదీలతో కూడిన తాజా పంట వివరాలను వీక్షించండి.',
          startTime: 0,
          endTime: 24,
          badge: 'ప్రత్యక్ష మార్కెట్',
          icon: ShoppingBag,
          tags: ['ధృవీకరించిన లాట్లు', 'సేంద్రీయ పంట', 'పొలం పికప్'],
        },
        {
          id: 2,
          stepNumber: 'దశ 02',
          title: 'APMC మండి ధరల రాడార్ & విశ్లేషణ',
          description: 'దేశంలోని ప్రధాన వ్యవసాయ యార్డుల తాజా వేలం ధరలు. రైతులకు +42% అదనపు ఆదాయం, కొనుగోలుదారులకు 35% ఆదా.',
          startTime: 24,
          endTime: 49,
          badge: 'మండి రాడార్',
          icon: TrendingUp,
          tags: ['APMC ధరలు', 'న్యాయమైన ధర', 'దళారీ రహితం'],
        },
        {
          id: 3,
          stepNumber: 'దశ 03',
          title: 'గూగుల్ జెమిని AI పంట డాక్టర్',
          description: 'ఆకుల వ్యాధులు, తెగుళ్లు మరియు వైరస్‌ల తక్షణ గుర్తింపు. జీవామృతం సహజ నివారణలతో పాటు శాస్త్రీయ IPM మందుల సలహాలు.',
          startTime: 49,
          endTime: 74,
          badge: 'AI పంట డాక్టర్',
          icon: Sparkles,
          tags: ['జెమిని నిర్ధారణ', 'సేంద్రీయ నివారణ', 'మందుల మోతాదు'],
        },
        {
          id: 4,
          stepNumber: 'దశ 04',
          title: 'రైతు నిర్వహణ డాష్‌బోర్డ్ & ఇన్వెంటరీ',
          description: 'రైతులు తమ పంట నిల్వలను నిర్వహించడం, ఆర్డర్లను ఆమోదించడం మరియు దళారీ కమీషన్లు లేకుండా వ్యాపారం చేయడం.',
          startTime: 74,
          endTime: 98,
          badge: 'రైతు డాష్‌బోర్డ్',
          icon: Layers,
          tags: ['స్టాక్ నిర్వహణ', 'ఆర్డర్ ఆమోదం', 'దళారులు లేరు'],
        },
        {
          id: 5,
          stepNumber: 'దశ 05',
          title: 'ప్రత్యక్ష ఎస్క్రో & తక్షణ UPI చెల్లింపులు',
          description: 'పారదర్శక ఎస్క్రో భద్రత మరియు 45 రోజుల అలస్యం లేకుండా నేరుగా రైతు ఖాతా లేదా UPIకి తక్షణ చెల్లింపు.',
          startTime: 98,
          endTime: 122,
          badge: 'ఎస్క్రో & UPI',
          icon: CreditCard,
          tags: ['తక్షణ UPI', 'ఎస్క్రో రక్షణ', 'వెంటనే చెల్లింపు'],
        },
        {
          id: 6,
          stepNumber: 'దశ 06',
          title: 'శీతల రవాణా లాజిస్టిక్స్ & ఆర్డర్ ట్రాకింగ్',
          description: 'నియంత్రిత ఉష్ణోగ్రత రవాణా, పొలం వద్దే పికప్ మరియు ఇంటి వద్దకే డెలివరీ స్థితి సమాచారం.',
          startTime: 122,
          endTime: 146.9,
          badge: 'శీతల రవాణా',
          icon: Truck,
          tags: ['శీతల వాహనాలు', 'పొలం పికప్', 'లైవ్ ట్రాకింగ్'],
        },
      ];
    }

    if (language === 'hi') {
      return [
        {
          id: 1,
          stepNumber: 'चरण 01',
          title: 'सीधा कृषि बाज़ार और सत्यापित फसल लॉट',
          description: 'नमी प्रतिशत, APEDA और NPOP जैविक प्रमाणन तथा ताज़ा कटाई की तारीखों के साथ खेतों से सीधी फसल लिस्टिंग।',
          startTime: 0,
          endTime: 24,
          badge: 'सीधा बाज़ार',
          icon: ShoppingBag,
          tags: ['सत्यापित लॉट', 'प्रमाणित जैविक', 'खेत से सीधा'],
        },
        {
          id: 2,
          stepNumber: 'चरण 02',
          title: 'APMC मंडी भाव रडार व मूल्य विश्लेषण',
          description: 'प्रमुख कृषि मंडियों की दैनिक नीलामी दरों का विश्लेषण। किसानों को +42% अधिक दाम और खरीदारों को 35% की बचत।',
          startTime: 24,
          endTime: 49,
          badge: 'मंडी रडार',
          icon: TrendingUp,
          tags: ['मंडी भाव', 'न्यायसंगत मूल्य', 'बिचौलिया मुक्त'],
        },
        {
          id: 3,
          stepNumber: 'चरण 03',
          title: 'गूगल जेमिनी AI फसल डॉक्टर व उपचार',
          description: 'पत्तियों के रोगों और कीटों का तुरंत निदान। जीवामृत व नीम के जैविक उपचार तथा प्रमाणित वैज्ञानिक सुरक्षा परामर्श।',
          startTime: 49,
          endTime: 74,
          badge: 'AI फसल डॉक्टर',
          icon: Sparkles,
          tags: ['जेमिनी निदान', 'जैविक उपचार', 'सटीक खुराक'],
        },
        {
          id: 4,
          stepNumber: 'चरण 04',
          title: 'किसान उत्पादक डैशबोर्ड व इन्वेंट्री नियंत्रण',
          description: 'उपलब्ध स्टॉक का प्रबंधन, सीधे खरीदारों के ऑर्डर स्वीकार करना और शून्य कमीशन के साथ पारदर्शी बिक्री।',
          startTime: 74,
          endTime: 98,
          badge: 'उत्पादक डैशबोर्ड',
          icon: Layers,
          tags: ['स्टॉक प्रबंधन', 'ऑर्डर स्वीकृति', 'शून्य बिचौलिया'],
        },
        {
          id: 5,
          stepNumber: 'चरण 05',
          title: 'पारदर्शी एस्क्रो व त्वरित UPI भुगतान',
          description: '45 दिन के लंबे इंतज़ार के बिना डिलीवरी मिलते ही किसान के बैंक खाते या UPI में तत्काल भुगतान।',
          startTime: 98,
          endTime: 122,
          badge: 'एस्क्रो व UPI',
          icon: CreditCard,
          tags: ['त्वरित UPI', 'एस्क्रो सुरक्षा', 'सीधा भुगतान'],
        },
        {
          id: 6,
          stepNumber: 'चरण 06',
          title: 'कोल्ड-चेन लॉजिस्टिक्स व लाइव ऑर्डर ट्रैकिंग',
          description: 'तापमान-नियंत्रित सुरक्षित परिवहन, खेत से सीधे पिकअप की सुविधा और घर तक सुरक्षित डिलीवरी।',
          startTime: 122,
          endTime: 146.9,
          badge: 'कोल्ड चेन',
          icon: Truck,
          tags: ['कोल्ड ट्रांसपोर्ट', 'खेत से पिकअप', 'लाइव ट्रैकिंग'],
        },
      ];
    }

    return [
      {
        id: 1,
        stepNumber: 'Step 01',
        title: 'Direct Agricultural Marketplace & Origin Batches',
        description: 'Browse verified farmer-listed harvests with moisture metrics, APEDA & NPOP organic certifications, and transparent harvest timestamps.',
        startTime: 0,
        endTime: 24,
        badge: 'Direct Marketplace',
        icon: ShoppingBag,
        tags: ['Verified Batches', 'Organic Certified', 'Direct Farm-Gate'],
      },
      {
        id: 2,
        stepNumber: 'Step 02',
        title: 'APMC Mandi Intelligence & Dynamic Price Radar',
        description: 'Real-time daily arrivals and modal price corridors calculated across major agricultural wholesale yards. Ensures +42% farmer income and 35% buyer savings.',
        startTime: 24,
        endTime: 49,
        badge: 'Mandi Radar',
        icon: TrendingUp,
        tags: ['APMC Arrivals', 'Fair Price Corridor', 'Anti-Cartel'],
      },
      {
        id: 3,
        stepNumber: 'Step 03',
        title: 'Google Gemini AI Crop Doctor & Bio-Remedies',
        description: 'Instant foliar diagnosis of blights, rusts, and viral infections. Provides certified organic formulations like Jeevamrutha alongside IPM recommendations.',
        startTime: 49,
        endTime: 74,
        badge: 'AI Crop Doctor',
        icon: Sparkles,
        tags: ['Gemini Diagnostics', 'Organic Formulations', 'Prescriptions'],
      },
      {
        id: 4,
        stepNumber: 'Step 04',
        title: 'Farmer Producer Cockpit & Inventory Control',
        description: 'Producers manage live inventory, reserve bulk allocations for restaurants or FPOs, and accept purchase orders with zero broker deduction.',
        startTime: 74,
        endTime: 98,
        badge: 'Producer Cockpit',
        icon: Layers,
        tags: ['Batch Management', 'Order Acceptance', 'Zero Middlemen'],
      },
      {
        id: 5,
        stepNumber: 'Step 05',
        title: 'Direct Escrow Settlement & Instant UPI Payments',
        description: 'Transparent milestone escrow and same-day UPI payouts replacing predatory 45-day wholesale payment delays.',
        startTime: 98,
        endTime: 122,
        badge: 'Escrow & UPI',
        icon: CreditCard,
        tags: ['Instant UPI', 'Milestone Escrow', 'Same-Day Settlement'],
      },
      {
        id: 6,
        stepNumber: 'Step 06',
        title: 'End-to-End Cold-Chain Logistics & Order Tracking',
        description: 'Live dispatch coordinates, temperature-monitored refrigerated transport, and farm-gate self-pickup scheduling.',
        startTime: 122,
        endTime: 146.9,
        badge: 'Cold Chain',
        icon: Truck,
        tags: ['Refrigerated Transit', 'Self-Pickup', 'Real-Time Tracking'],
      },
    ];
  }, [language]);

  // Active chapter based on video current time
  const activeChapter =
    chapters.find((c) => currentTime >= c.startTime && currentTime < c.endTime) ||
    chapters[chapters.length - 1];

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (newTime: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleJumpToChapter = (startTime: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = startTime;
    setCurrentTime(startTime);
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleCopyVideoLink = () => {
    const fullUrl = `${window.location.origin}${videoUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/92 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Outer Card */}
      <div className="relative w-full max-w-6xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        
        {/* Top Bar with Title, Badges & Download Action */}
        <div className="px-5 py-3.5 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-100 shadow-sm shrink-0">
              <Film className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold text-sm text-stone-100 font-serif">
                  {language === 'te'
                    ? 'ఫామ్‌బ్రిడ్జ్ AI — పూర్తి ప్లాట్‌ఫామ్ ఫీచర్ల డెమో వీడియో'
                    : language === 'hi'
                    ? 'फार्मब्रिज AI — पूर्ण कार्यप्रणाली वॉकथ्रू वीडियो'
                    : 'FarmBridge AI — Platform Functionalities Walkthrough'}
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-semibold">
                  1080p MP4
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-semibold">
                  🇮🇳 INDIAN ENGLISH MALE NARRATION
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                {language === 'te'
                  ? 'అన్ని 6 ప్రధాన ఫీచర్ల వివరణ · అంతరాయం లేని స్పష్టమైన వాయిస్‌ఓవర్'
                  : language === 'hi'
                  ? 'सभी 6 मुख्य कार्यप्रणालियों का विवरण · बिना रुके स्पष्ट भारतीय स्वर'
                  : 'Step-by-step walkthrough of all 6 platform features · Smooth continuous audio without gaps'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Direct Download Button */}
            <a
              href={videoUrl}
              download="farmbridge_functionalities_walkthrough.mp4"
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm hover:shadow"
              title="Download video in MP4 format (3.7 MB)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {language === 'te' ? 'వీడియో డౌన్‌లోడ్ (.MP4)' : language === 'hi' ? 'वीडियो डाउनलोड (.MP4)' : 'Download Video (.MP4)'}
              </span>
            </a>

            {/* Copy Video Link */}
            <button
              onClick={handleCopyVideoLink}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg transition-colors border border-stone-700 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (language === 'te' ? 'కాపీ అయింది' : language === 'hi' ? 'कॉपी हुआ' : 'Copied') : (language === 'te' ? 'లింక్ కాపీ' : language === 'hi' ? 'लिंक कॉपी' : 'Share URL')}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.pause();
                onClose();
              }}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close walkthrough video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Video Player + Chapter Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Side: Native Video Display & Custom Control Overlay */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-center items-center relative group min-h-[320px] sm:min-h-[440px]">
            <video
              ref={videoRef}
              src={videoUrl}
              playsInline
              preload="auto"
              onTimeUpdate={() => {
                if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
              }}
              onLoadedMetadata={() => {
                if (videoRef.current && videoRef.current.duration > 0) {
                  setDuration(videoRef.current.duration);
                }
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full max-h-[580px] object-contain"
            />

            {/* Floating Top Indicator showing current functionality step */}
            <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800 text-xs text-white flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold font-mono">{activeChapter.stepNumber}</span>
              <span className="text-stone-300">·</span>
              <span className="font-semibold">{activeChapter.badge}</span>
            </div>

            {/* Video Controls Bar */}
            <div className="w-full bg-stone-950/90 backdrop-blur-sm px-4 py-3 border-t border-stone-800 flex flex-col gap-2">
              
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-stone-400 tabular-nums">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 146.9}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 accent-emerald-500 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] font-mono text-stone-400 tabular-nums">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between text-stone-300 text-xs pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayPause}
                    className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 rounded-md font-bold transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => handleSeek(0)}
                    className="p-1.5 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleToggleMute}
                    className="p-1.5 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="hidden sm:inline text-[11px] text-stone-400 font-mono">
                    Indian English Voiceover (Continuous)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={videoUrl}
                    download="farmbridge_functionalities_walkthrough.mp4"
                    className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-emerald-400 font-medium text-xs rounded border border-stone-700 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">MP4 (3.7 MB)</span>
                  </a>

                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Side: Step-by-Step Functionalities Navigator */}
          <div className="lg:col-span-4 bg-stone-900 border-t lg:border-t-0 lg:border-l border-stone-800 p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono">
                  {language === 'te' ? 'వెబ్‌సైట్ ఫీచర్లు (6 దశలు)' : language === 'hi' ? 'वेबसाइट कार्यप्रणाली (6 चरण)' : 'Website Functionalities (6 Steps)'}
                </h3>
                <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-0.5 rounded font-mono">
                  {language === 'te' ? 'క్లిక్ చేసి చూడండి' : language === 'hi' ? 'क्लिक करके देखें' : 'Click to jump'}
                </span>
              </div>

              {/* Chapter List */}
              <div className="space-y-2 mt-3">
                {chapters.map((chapter) => {
                  const isActive = activeChapter.id === chapter.id;
                  const Icon = chapter.icon;

                  return (
                    <button
                      key={chapter.id}
                      onClick={() => handleJumpToChapter(chapter.startTime)}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-emerald-950/60 border-emerald-600/80 shadow-md ring-1 ring-emerald-500/30'
                          : 'bg-stone-950/50 hover:bg-stone-800/80 border-stone-800/70 text-stone-400'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isActive
                              ? 'bg-emerald-500 text-stone-950 font-bold'
                              : 'bg-stone-800 text-stone-400'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase">
                              {chapter.stepNumber}
                            </span>
                            <span className="text-[10px] font-mono text-stone-500">
                              {formatTime(chapter.startTime)}
                            </span>
                          </div>
                          <h4
                            className={`text-xs font-bold leading-tight mt-0.5 line-clamp-1 ${
                              isActive ? 'text-white' : 'text-stone-300'
                            }`}
                          >
                            {chapter.title}
                          </h4>
                          <p className="text-[11px] text-stone-400 leading-snug mt-1 line-clamp-2">
                            {chapter.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {chapter.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] bg-stone-800/80 text-stone-300 px-1.5 py-0.5 rounded font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Download Card */}
            <div className="mt-4 pt-3 border-t border-stone-800 bg-stone-950/60 p-3 rounded-xl border border-stone-800/60 text-xs">
              <div className="flex items-center justify-between text-stone-300 mb-1.5">
                <span className="font-semibold text-white">
                  {language === 'te' ? 'డౌన్‌లోడ్ సిద్ధంగా ఉంది' : language === 'hi' ? 'डाउनलोड तैयार है' : 'Download Ready'}
                </span>
                <span className="font-mono text-[10px] text-emerald-400">1080p · MP4 · 3.7 MB</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed mb-2.5">
                {language === 'te'
                  ? 'భారతీయ ఇంగ్లీష్ వాయిస్‌ఓవర్‌తో అన్ని ఫీచర్లను వివరించే పూర్తి వీడియో ఫైల్.'
                  : language === 'hi'
                  ? 'भारतीय अंग्रेजी आवाज के साथ सभी सुविधाओं को प्रदर्शित करने वाला पूर्ण वीडियो।'
                  : 'Full standalone video showcasing every feature step-by-step with authentic Indian English male narration.'}
              </p>
              <a
                href={videoUrl}
                download="farmbridge_functionalities_walkthrough.mp4"
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>
                  {language === 'te' ? 'వీడియో సేవ్ చేసుకోండి (.MP4)' : language === 'hi' ? 'वीडियो फ़ाइल सहेजें (.MP4)' : 'Save Video File (.MP4)'}
                </span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
