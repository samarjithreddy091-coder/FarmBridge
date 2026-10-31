import React, { useState, useEffect } from 'react';
import { Sparkles, Send, Stethoscope, Leaf, FlaskConical, Shield, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, getLocalizedCropDoctorData } from '../utils/translations';

interface AICropDoctorProps {
  language: Language;
}

export const AICropDoctor: React.FC<AICropDoctorProps> = ({ language }) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  const [activeMode, setActiveMode] = useState<'diagnostic' | 'chat'>('diagnostic');

  // Localized crops and symptoms
  const { crops, symptomPresets } = getLocalizedCropDoctorData(language);

  // Diagnostic state
  const [selectedCrop, setSelectedCrop] = useState<string>(crops[0]);
  const [selectedSymptom, setSelectedSymptom] = useState<string>(symptomPresets[0]);
  const [customSymptom, setCustomSymptom] = useState<string>('');
  const [diagnosing, setDiagnosing] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);

  // Update selections when language changes
  useEffect(() => {
    setSelectedCrop(crops[0]);
    setSelectedSymptom(symptomPresets[0]);
    setDiagnosticResult(null);
  }, [language]);

  // Chat state
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: t('doctor.chatGreeting'),
    },
  ]);

  // Update initial greeting on language change
  useEffect(() => {
    setChatHistory([
      {
        sender: 'ai',
        text: t('doctor.chatGreeting'),
      },
    ]);
  }, [language]);

  const handleRunDiagnosis = async () => {
    setDiagnosing(true);
    setDiagnosticResult(null);

    const symptomText = customSymptom.trim() || selectedSymptom;

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCrop,
          symptoms: symptomText,
          partsAffected: language === 'te' ? 'ఆకులు మరియు కాండం' : language === 'hi' ? 'पत्तियां और तना' : 'Leaves and Stems',
          language,
        }),
      });

      if (!res.ok) throw new Error('Diagnosis service failed');
      const data = await res.json();
      setDiagnosticResult(data);
    } catch {
      // Localized Fallbacks
      if (language === 'te') {
        setDiagnosticResult({
          diagnosis: `${selectedCrop} పంటలో వైరస్ తెగులు లేదా ఆకు మచ్చ తెగులు లక్షణాలు గుర్తించబడ్డాయి`,
          severity: 'మధ్యస్థం (Moderate)',
          organicRemedy: 'లీటరు నీటికి 5 మి.లీ వేప నూనె (10,000 ppm) + 2 గ్రాముల బేకింగ్ సోడా కలిపి పిచికారీ చేయండి. వేర్ల వద్ద జీవామృతం లేదా పంచగవ్యను అందించండి.',
          chemicalRemedy: 'తెల్లదోమ నివారణకు ఇమిడాక్లోప్రిడ్ 17.8% SL @ 0.5 మి.లీ లేదా మాంకోజెబ్ 75% WP @ 2 గ్రా/లీటరు పిచికారీ చేయండి.',
          prevention: 'ఎకరాకు 15 పసుపు రంగు జిగురు పూసిన అట్టలను అమర్చండి. మొక్కల మధ్య గాలి వెలుతురు ఉండేలా 60 సెం.మీ దూరం పాటించండి.',
        });
      } else if (language === 'hi') {
        setDiagnosticResult({
          diagnosis: `${selectedCrop} में पर्ण कुंचन विषाणु या अगेती झुलसा रोग के लक्षण`,
          severity: 'मध्यम (Moderate)',
          organicRemedy: '5 मिली नीम का तेल (10,000 ppm) + 2 ग्राम बेकिंग सोडा प्रति लीटर पानी में मिलाकर छिड़काव करें। जड़ों में जीवामृत दें।',
          chemicalRemedy: 'सफेद मक्खी नियंत्रण हेतु इमिडाक्लोप्रिड 17.8% SL @ 0.5 मिली/लीटर या मैंकोजेब 75% WP @ 2 ग्राम/लीटर का छिड़काव करें।',
          prevention: 'प्रति एकड़ 15 पीले चिपचिपे ट्रैप लगाएं। पौधों के बीच हवा के आवागमन के लिए 60 सेमी की दूरी रखें।',
        });
      } else {
        setDiagnosticResult({
          diagnosis: `Suspected Leaf Curl Virus or Early Fungal Blight on ${selectedCrop}`,
          severity: 'Moderate',
          organicRemedy: 'Spray 5ml Neem Oil (10,000 ppm) + 2g baking soda per liter of water. Apply fermented Jeevamrutha at the root zone.',
          chemicalRemedy: 'Spray Mancozeb 75% WP @ 2g/L or Imidacloprid 17.8% SL @ 0.5ml/L to control vector whiteflies.',
          prevention: 'Install yellow sticky traps (15 per acre). Maintain proper plant spacing (60cm) to allow cross-ventilation.',
        });
      }
    } finally {
      setDiagnosing(false);
    }
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || chatInput;
    if (!promptToSend.trim() || chatLoading) return;

    const userMsg = promptToSend;
    setChatInput('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          language,
          cropContext: selectedCrop,
        }),
      });

      if (!res.ok) throw new Error('Advisor API request failed');
      const data = await res.json();
      setChatHistory((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch {
      const fallbackReply =
        language === 'te'
          ? `**${selectedCrop} కోసం వ్యవసాయ సలహా**:\n- **నీటిపారుదల**: ఆకులపై తేమ త్వరగా ఆరిపోయేలా తెల్లవారుజామున బిందు సేద్యం చేయండి.\n- **ఎరువులు**: ఎదుగుదల దశలో 19:19:19 నీటిలో కరిగే ఎరువును లీటరుకు 3 గ్రాములు పిచికారీ చేయండి.\n- **భూసార రక్షణ**: వర్మీకంపోస్ట్ లేదా వేపపిండిని క్రమం తప్పకుండా వేయండి.`
          : language === 'hi'
          ? `**${selectedCrop} हेतु कृषि वैज्ञानिक सलाह**:\n- **सिंचाई**: सुबह के समय ड्रिप सिंचाई करें जिससे पत्तियों पर नमी न ठहरे।\n- **पोषण**: वानस्पतिक वृद्धि के समय 19:19:19 घुलनशील खाद 3 ग्राम/लीटर का छिड़काव करें।\n- **मिट्टी संवर्धन**: खेत में सड़ी गोबर की खाद और केंचुआ खाद का प्रयोग करें।`
          : `**Agronomic Guidance for ${selectedCrop}**:\n- **Irrigation**: Ensure drip lines run in early morning hours to minimize foliar evaporation.\n- **Fertility**: Apply balanced 19:19:19 water-soluble grade at 3g/L during vegetative growth.\n- **Soil Microbes**: Incorporate organic compost and neem cake regularly.`;

      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: fallbackReply,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <section id="doctor" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('doctor.kicker')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif">
            {t('doctor.title')}
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl">
            {t('doctor.subtitle')}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 shrink-0">
          <button
            onClick={() => setActiveMode('diagnostic')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeMode === 'diagnostic'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t('doctor.tabDiagnostic')}
          </button>
          <button
            onClick={() => setActiveMode('chat')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t('doctor.tabChat')}
          </button>
        </div>
      </div>

      {/* Mode 1: Symptom Diagnostic */}
      {activeMode === 'diagnostic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Diagnostic Input Form */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-5">
            
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <Stethoscope className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                {t('doctor.stepCrop')}
              </h3>
            </div>

            {/* Crop Selector */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {crops.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`py-1.5 px-2 text-xs rounded-lg text-center transition-colors cursor-pointer truncate ${
                      selectedCrop === crop
                        ? 'bg-emerald-800 text-white font-semibold'
                        : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Common Symptom Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                {t('doctor.stepSymptom')}
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {symptomPresets.map((symp) => (
                  <button
                    key={symp}
                    onClick={() => {
                      setSelectedSymptom(symp);
                      setCustomSymptom('');
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors cursor-pointer border ${
                      selectedSymptom === symp && !customSymptom
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {symp}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom description option */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                {t('doctor.orCustom')}
              </label>
              <textarea
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                placeholder={t('doctor.customPlaceholder')}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none h-20"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleRunDiagnosis}
              disabled={diagnosing}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-400 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              {diagnosing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('doctor.analyzing')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t('doctor.btnDiagnose')} ({selectedCrop})</span>
                </>
              )}
            </button>

          </div>

          {/* Diagnostic Results Presentation */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 shadow-2xs min-h-[420px] flex flex-col justify-between">
            {diagnosing ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
                  <Stethoscope className="w-5 h-5 text-emerald-800" />
                </div>
                <h4 className="text-sm font-bold text-stone-800">
                  {t('doctor.analyzing')}
                </h4>
                <p className="text-xs text-stone-500 max-w-sm">
                  {language === 'te'
                    ? `${selectedCrop} పంట వ్యాధి లక్షణాలను ICAR మార్గదర్శకాలతో సరిపోల్చి నివారణలను సిద్ధం చేస్తున్నాము...`
                    : language === 'hi'
                    ? `${selectedCrop} के रोग लक्षणों का ICAR वैज्ञानिक मानकों के साथ विश्लेषण किया जा रहा है...`
                    : `Analyzing symptom patterns for ${selectedCrop} against ICAR & State Agriculture University disease protocols...`}
                </p>
              </div>
            ) : diagnosticResult ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                
                {/* Result Top Banner */}
                <div className="pb-4 border-b border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      {t('doctor.resultTitle')} · {selectedCrop}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {t('doctor.severity')}: {diagnosticResult.severity || 'Moderate'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mt-1 font-serif">
                    {diagnosticResult.diagnosis}
                  </h3>
                </div>

                {/* Report Content */}
                <div className="space-y-4">
                  
                  {/* Organic Remedy Box */}
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                      <Leaf className="w-4 h-4 text-emerald-700" />
                      <span>{t('doctor.organicTitle')}</span>
                    </div>
                    <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                      {diagnosticResult.organicRemedy}
                    </p>
                  </div>

                  {/* Certified Chemical Remedy Box */}
                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <FlaskConical className="w-4 h-4 text-amber-700" />
                      <span>{t('doctor.chemicalTitle')}</span>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed font-medium">
                      {diagnosticResult.chemicalRemedy}
                    </p>
                  </div>

                  {/* Preventative cultural practices */}
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                      <Shield className="w-4 h-4 text-stone-600" />
                      <span>{t('doctor.preventionTitle')}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {diagnosticResult.prevention}
                    </p>
                  </div>

                </div>

                <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between border-t border-stone-100">
                  <span>{t('doctor.chatDisclaimer')}</span>
                  <button
                    onClick={() => {
                      setActiveMode('chat');
                      handleSendMessage(
                        language === 'te'
                          ? `${selectedCrop} కోసం సేంద్రీయ మందులను తయారుచేసే విధానం వివరంగా చెప్పండి.`
                          : language === 'hi'
                          ? `${selectedCrop} के लिए जैविक दवा बनाने की विधि विस्तार से बताएं।`
                          : `Can you give me step-by-step instructions for preparing the organic remedy for ${selectedCrop}?`
                      );
                    }}
                    className="text-emerald-800 font-semibold hover:underline cursor-pointer"
                  >
                    {language === 'te' ? 'నిపుణుడిని అడగండి →' : language === 'hi' ? 'विशेषज्ञ से पूछें →' : 'Ask Agronomist Follow-Up →'}
                  </button>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-3 text-stone-500">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-stone-800">
                  {language === 'te' ? 'పంట తెగులు నిర్ధారణ ఇంకా చేయలేదు' : language === 'hi' ? 'कोई सक्रिय निदान लोड नहीं है' : 'No Active Diagnosis Loaded'}
                </h4>
                <p className="text-xs text-stone-500 max-w-sm">
                  {language === 'te'
                    ? 'ఎడమవైపు మీ పంట మరియు కనిపించే లక్షణాలను ఎంచుకుని తక్షణ సేంద్రీయ మరియు శాస్త్రీయ నివారణలను పొందండి.'
                    : language === 'hi'
                    ? 'बाईं ओर अपनी फसल और लक्षण चुनें और तुरंत जैविक व वैज्ञानिक उपचार प्राप्त करें।'
                    : 'Select your crop and symptoms on the left to immediately receive organic and scientific remedies.'}
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Mode 2: Interactive Agronomist Chat */}
      {activeMode === 'chat' && (
        <div className="bg-white border border-stone-200 rounded-xl shadow-2xs overflow-hidden flex flex-col h-[520px]">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 font-serif">
                  {language === 'te' ? 'డా. ఫామ్‌బ్రిడ్జ్ (వ్యవసాయ నిపుణుడు)' : language === 'hi' ? 'डॉ. फार्मब्रिज (वरिष्ठ कृषि वैज्ञानिक)' : 'Dr. FarmBridge (Senior Agronomist)'}
                </div>
                <div className="text-[11px] text-stone-500">
                  {language === 'te' ? 'భారతీయ వ్యవసాయ మరియు మండి మార్కెట్ నిపుణుడు' : language === 'hi' ? 'भारतीय कृषि जलवायु व मंडी अर्थशास्त्र विशेषज्ञ' : 'Specialized in Indian Agro-Climatic Zones & Mandi Economics'}
                </div>
              </div>
            </div>

            {/* Quick Prompt Pills */}
            <div className="hidden md:flex items-center gap-1.5 text-xs">
              <button
                onClick={() => handleSendMessage(language === 'te' ? 'వరికి NPK ఎరువుల మోతాదు ఎంత?' : language === 'hi' ? 'धान के लिए NPK खाद का समय और मात्रा?' : 'What is the ideal NPK fertilization schedule for Basmati rice?')}
                className="px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 rounded-md text-stone-700 text-[11px] cursor-pointer"
              >
                {language === 'te' ? 'వరి NPK ఎరువులు' : language === 'hi' ? 'धान NPK खाद' : 'Basmati NPK Schedule'}
              </button>
              <button
                onClick={() => handleSendMessage(language === 'te' ? 'టమోటాలో ఆకుమచ్చ తెగులుకు సేంద్రీయ నివారణ ఏమిటి?' : language === 'hi' ? 'टमाटर में झुलसा रोग की जैविक दवा क्या है?' : 'How to cure early blight in tomatoes organically?')}
                className="px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 rounded-md text-stone-700 text-[11px] cursor-pointer"
              >
                {language === 'te' ? 'టమోటా ఆకుమచ్చ' : language === 'hi' ? 'टमाटर झुलसा' : 'Tomato Blight'}
              </button>
            </div>
          </div>

          {/* Chat Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-br-2xs shadow-xs'
                      : 'bg-stone-100 text-stone-800 rounded-bl-2xs whitespace-pre-line border border-stone-200/60'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-100 text-stone-600 rounded-xl p-3.5 text-xs rounded-bl-2xs border border-stone-200/60 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>
                    {language === 'te' ? 'వ్యవసాయ సలహా సిద్ధం చేయబడుతోంది...' : language === 'hi' ? 'कृषि विशेषज्ञ उत्तर तैयार कर रहे हैं...' : 'Dr. FarmBridge is formulating advisory...'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-stone-200 bg-stone-50 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={t('doctor.chatPlaceholder')}
              className="flex-1 text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={chatLoading || !chatInput.trim()}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{language === 'te' ? 'పంపు' : language === 'hi' ? 'भेजें' : 'Send'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
