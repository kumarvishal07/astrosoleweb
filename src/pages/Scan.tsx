import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Camera,
  Upload,
  User,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ArrowLeft,
  Loader,
  Scan as ScanIcon,
  Footprints,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { verifyIsFootImage, hasGeminiApiKey } from '../lib/gemini';
import appsoleLogo from '../assets/logo.png';
import { track } from '@vercel/analytics';

interface ErrorState {
  name?: string;
  mobile?: string;
  email?: string;
}


export default function Scan() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get language from Home screen state, default to 'en'
  const initialLanguage = (location.state as any)?.language || 'en';
  const [language] = useState<'en' | 'hi'>(initialLanguage);

  // Inputs refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<ErrorState>({});
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [showScannerInstructions, setShowScannerInstructions] = useState(true);

  // Scanner State
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'orient' | 'contour' | 'lines' | 'final'>('idle');
  const [scanError, setScanError] = useState<string | null>(null);

  // AI Verification State
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // References to active timeouts to clear them if scan fails
  const timeoutsRef = useRef<any[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMobile = mobile.trim();
    const trimmedEmail = email.trim();
    const trimmedAddress = address.trim();

    const newErrors: ErrorState = {};

    if (!trimmedName) {
      newErrors.name = language === 'hi' ? "नाम दर्ज करना आवश्यक है" : "Name is required";
    }
    if (!trimmedMobile) {
      newErrors.mobile = language === 'hi' ? "मोबाइल नंबर आवश्यक है" : "Mobile number is required";
    } else {
      const mobileRegex = /^\+?[0-9]{10,15}$/;
      if (!mobileRegex.test(trimmedMobile.replace(/[-\s]/g, ''))) {
        newErrors.mobile = language === 'hi'
          ? "एक वैध मोबाइल नंबर दर्ज करें (10-15 अंक)"
          : "Enter a valid mobile number (10-15 digits)";
      }
    }

    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        newErrors.email = language === 'hi' ? "एक वैध ईमेल पता दर्ज करें" : "Enter a valid email address";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Send lead details to WhatsApp link
    const leadMessage = `New Lead from AstroSole:\nName: ${trimmedName}\nMobile: ${trimmedMobile}\nEmail: ${trimmedEmail || 'N/A'}\nAddress: ${trimmedAddress || 'N/A'}`;
    const whatsappUrl = `https://wa.me/917003891953?text=${encodeURIComponent(leadMessage)}`;

    window.open(whatsappUrl, '_blank');
    setIsFormCompleted(true);
    setShowScannerInstructions(true);
  };

  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValidationError(null);
      setScanError(null);

      // Check if API key is configured first
      if (!hasGeminiApiKey()) {
        setValidationError(
          language === 'hi'
            ? "सत्यापन त्रुटि: जेमिनी एपीआई कुंजी (API Key) कॉन्फ़िगर नहीं है। कृपया .env फ़ाइल में VITE_GEMINI_API_KEY जोड़ें।"
            : "Verification Error: Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file."
        );
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (galleryInputRef.current) galleryInputRef.current.value = '';
        return;
      }

      setIsValidating(true);

      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;

      img.onload = async () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        const ratio = height / width;
        if (ratio < 1.15) {
          setValidationError(
            language === 'hi'
              ? "अमान्य पहलू अनुपात: पैर के स्कैन के लिए एक लंबवत (वर्टिकल) पोर्ट्रेट फोटो की आवश्यकता होती है।"
              : "Invalid aspect ratio: A proper foot scan requires a vertical (portrait) photo where the height is greater than the width."
          );
          setIsValidating(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
          if (galleryInputRef.current) galleryInputRef.current.value = '';
          return;
        }

        try {
          const isFoot = await verifyIsFootImage(file);

          if (isFoot) {
            setImageUri(imageUrl);
            setImageWidth(width);
            setImageHeight(height);
          } else {
            setValidationError(
              language === 'hi'
                ? "अमान्य छवि: कृपया सटीक ज्योतिषीय विश्लेषण के लिए केवल अपने पैर (तलवा या ऊपर की तरफ) की एक स्पष्ट तस्वीर ही अपलोड करें।"
                : "Invalid image: Please upload or capture a clear photo of your foot (either sole or top) for accurate astrological analysis."
            );
            if (fileInputRef.current) fileInputRef.current.value = '';
            if (galleryInputRef.current) galleryInputRef.current.value = '';
          }
        } catch (error: any) {
          console.error("AI verification error", error);
          const errMsg = error?.message || String(error);
          
          try {
            track('ai_verification_error', { message: errMsg });
          } catch (trackErr) {
            console.error("Failed to send telemetry", trackErr);
          }

          setValidationError(
            language === 'hi'
              ? `एआई सत्यापन विफल रहा: ${errMsg}। कृपया इंटरनेट कनेक्शन की जांच करें या पुनः प्रयास करें।`
              : `AI verification failed: ${errMsg}. Please check your internet connection or try again.`
          );
          if (fileInputRef.current) fileInputRef.current.value = '';
          if (galleryInputRef.current) galleryInputRef.current.value = '';
        } finally {
          setIsValidating(false);
        }
      };
    }
  };

  const startScan = () => {
    if (!imageUri) return;

    setIsScanning(true);
    setScanStep('orient');
    setScanError(null);
    timeoutsRef.current = [];

    // Step 2: Contour Scan (1.5 seconds)
    const t2 = setTimeout(() => {
      setScanStep('contour');

      const isLowRes = imageWidth > 0 && (imageWidth < 300 || imageHeight < 300);

      if (isLowRes) {
        timeoutsRef.current.forEach(t => clearTimeout(t));
        setIsScanning(false);
        setScanStep('idle');

        setScanError(
          language === 'hi'
            ? "छवि की गुणवत्ता बहुत कम है। एस्ट्रोसोल एआई इंजन को पैर के तलवे की ज्योतिषीय रेखाओं का पता लगाने के लिए एक स्पष्ट, उच्च रिज़ॉल्यूशन वाली तस्वीर की आवश्यकता होती है।"
            : "Image quality is too low. The AstroSole AI engine requires a clear, high-resolution portrait photo of your foot sole to detect astrological line structures."
        );
      }
    }, 1500);
    timeoutsRef.current.push(t2);

    // Step 3: Mapping Lines (3.0 seconds)
    const t3 = setTimeout(() => {
      setScanStep('lines');
    }, 3000);
    timeoutsRef.current.push(t3);

    // Step 4: Finalizing (4.5 seconds)
    const t4 = setTimeout(() => {
      setScanStep('final');
    }, 4500);
    timeoutsRef.current.push(t4);

    // Step 5: Complete & Navigate (6.0 seconds)
    const t5 = setTimeout(() => {
      setIsScanning(false);
      setScanStep('idle');
      navigate('/result', {
        state: { name: name || 'Seeker', address, mobile, email, language }
      });
    }, 6000);
    timeoutsRef.current.push(t5);
  };

  const textDict = {
    en: {
      detailsTitle: "Alignment Registration",
      detailsSubtitle: "Align your celestial signature with active coordinates",
      nameLabel: "Full Name *",
      namePlaceholder: "Full Name",
      mobileLabel: "Active Contact (WhatsApp) *",
      mobilePlaceholder: "10-15 digit mobile number",
      emailLabel: "Cosmic Mailing (Email) (Optional)",
      emailPlaceholder: "Email Address",
      addressLabel: "Earthy Alignment Location (Optional)",
      addressPlaceholder: "Address or city coordinates",
      proceedBtn: "Initiate Astrological Scan",
      skipBtn: "Skip for now",

      scanTitle: "Sole Scanning Camera",
      scanSubtitle: "Capture your sole to map planetary contours",
      alignSole: "Align Foot Sole Here",
      aiVerifying: "🤖 TELEMETRY AI VERIFYING...",
      aiVerifyingSub: "Local vision models checking for bare sole layout.",

      stepOrient: "🔍 STEP 1: VERIFYING ORIENTATION...",
      stepOrientSub: "Programmatic check: Portrait alignment valid.",
      stepContour: "👣 STEP 2: EXTRACTING SOLE CONTOUR...",
      stepContourSub: "Mapping foot structure, arch, and toe layout.",
      stepLines: "⚡ STEP 3: MAPPING ASTROLOGICAL LINES...",
      stepLinesSub: "Locating Destiny, Life, and Health patterns.",
      stepFinal: "✨ FINALIZING: UNVEILING COSMIC PROFILE...",
      stepFinalSub: "Generating complete Podomancy reading.",

      takePicture: "Take Picture",
      uploadImage: "Upload Image",
      discardImage: "Discard Image",
      analyzeFoot: "Analyze Foot",

      scanErrorTitle: "⚠️ Scan Verification Failed",
      errorSocks: "• Avoid wearing socks, shoes, or bandages.",
      errorBright: "• Place your foot in a brightly lit environment.",
      errorVisible: "• Make sure the bottom of your foot is fully visible.",
      errorAlign: "• Align your foot sole directly with the guide silhouette.",
      discard: "Discard",
      retake: "Retake Photo",

      aiErrorTitle: "⚠️ AI Verification Failed",
      aiRule1: "• Make sure you uploaded a clear, vertical photo of a human foot.",
      aiRule2: "• Avoid background clutter, shoes, socks, or hands blocking the view.",
      aiRule3: "• Use good lighting if taking a photo.",
      clear: "Clear",
      tryAgain: "Try Again",

      fallbackTitle: "AI Alignment Telemetry",
      fallbackText: "AstroSole local telemetry is analyzing the uploaded image coordinate system. Please verify if the photo shows a bare human foot sole.",
      fallbackQuestion: "Does this image contain a clear bare foot sole?",
      noRetake: "No, Retake",
      yesConfirm: "Yes, Confirm",

      infoTextTitle: "Celestial Verification",
      infoTextDesc: "To align your physical coordinates with celestial charts, we require your active identity parameters. This generates a clean birth signature to process against ancient podomancy paths. Your details are securely mapped for this scan."
    },
    hi: {
      detailsTitle: "संरेखण पंजीकरण",
      detailsSubtitle: "अपने ग्रहों की स्थिति के साथ अपने विवरण को संरेखित करें",
      nameLabel: "पूरा नाम *",
      namePlaceholder: "पूरा नाम",
      mobileLabel: "सक्रिय संपर्क (WhatsApp) *",
      mobilePlaceholder: "10-15 अंकों का मोबाइल नंबर",
      emailLabel: "ईमेल पता (वैकल्पिक)",
      emailPlaceholder: "ईमेल पता",
      addressLabel: "पृथ्वी संरेखण स्थान (वैकल्पिक)",
      addressPlaceholder: "पता या शहर के निर्देशांक",
      proceedBtn: "ज्योतिषीय स्कैन शुरू करें",
      skipBtn: "अभी छोड़ें",

      scanTitle: "तलवा स्कैनिंग कैमरा",
      scanSubtitle: "ग्रहों की रेखाओं का मानचित्रण करने के लिए तस्वीर लें",
      alignSole: "पैर के तलवे को यहाँ संरेखित करें",
      aiVerifying: "🤖 टेलीमेट्री एआई सत्यापन...",
      aiVerifyingSub: "स्थानीय विज़न मॉडल पैर के तलवे की बनावट की जांच कर रहे हैं।",

      stepOrient: "🔍 चरण 1: अभिविन्यास का सत्यापन...",
      stepOrientSub: "प्रोग्रामेटिक जांच: पोर्ट्रेट संरेखण मान्य है।",
      stepContour: "👣 चरण 2: तलवे की रूपरेखा निकालना...",
      stepContourSub: "पैर की संरचना, मेहराब और पैर की अंगुली के लेआउट का मानचित्रण।",
      stepLines: "⚡ चरण 3: ज्योतिषीय रेखाओं का मानचित्रण...",
      stepLinesSub: "भाग्य, जीवन और स्वास्थ्य पैटर्न का पता लगाना।",
      stepFinal: "✨ अंतिम रूप: ब्रह्मांडीय प्रोफ़ाइल का अनावरण...",
      stepFinalSub: "पूर्ण पोडोमेंसी रीडिंग उत्पन्न की जा रही है।",

      takePicture: "तस्वीर लें",
      uploadImage: "छवि अपलोड करें",
      discardImage: "छवि हटाएं",
      analyzeFoot: "पैर का विश्लेषण करें",

      scanErrorTitle: "⚠️ स्कैन सत्यापन विफल",
      errorSocks: "• मोज़े, जूते या पट्टियाँ पहनने से बचें।",
      errorBright: "• अपने पैर को तेज़ रोशनी वाले वातावरण में रखें।",
      errorVisible: "• सुनिश्चित करें कि आपके पैर का निचला हिस्सा पूरी तरह से दिखाई दे रहा है।",
      errorAlign: "• अपने पैर के तलवे को सीधे गाइड सिल्हूट के साथ संरेखित करें।",
      discard: "हटाएं",
      retake: "फिर से लें",

      aiErrorTitle: "⚠️ एआई सत्यापन विफल",
      aiRule1: "• सुनिश्चित करें कि आपने मानव पैर की एक स्पष्ट, ऊर्ध्वाधर तस्वीर अपलोड की है।",
      aiRule2: "• पृष्ठभूमि में अव्यवस्था, जूते, मोज़े या दृश्य को अवरुद्ध करने वाले हाथों से बचें।",
      aiRule3: "• यदि फोटो ले रहे हैं तो अच्छी रोशनी का उपयोग करें।",
      clear: "साफ़ करें",
      tryAgain: "पुनः प्रयास करें",

      fallbackTitle: "एआई एलाइनमेंट टेलीमेट्री",
      fallbackText: "एस्ट्रोसोल स्थानीय टेलीमेट्री अपलोड की गई छवि समन्वय प्रणाली का विश्लेषण कर रही है। कृपया सत्यापित करें कि क्या फोटो एक नंगे मानव पैर के तलवे को दिखाती है।",
      fallbackQuestion: "क्या इस छवि में एक स्पष्ट नंगे पैर का तलवा है?",
      noRetake: "नहीं, फिर से लें",
      yesConfirm: "हाँ, पुष्टि करें",

      infoTextTitle: "खगोलीय सत्यापन",
      infoTextDesc: "चार्ट के साथ आपकी स्थिति को संरेखित करने के लिए आपके संपर्क मापदंडों की आवश्यकता होती है। यह प्राचीन पोडोमेंसी के खिलाफ संसाधित करने के लिए एक साफ जन्म हस्ताक्षर बनाता है।"
    }
  };

  const t = textDict[language];

  return (
    <div className="container">
      {/* Top Navbar Header */}
      <header className="app-header">
        <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={appsoleLogo} alt="AstroSole Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <button className="lang-toggle-btn" onClick={() => navigate('/')}>
          {language === 'hi' ? 'मुख्य पृष्ठ' : 'Go Home'}
        </button>
      </header>

      {/* Hidden inputs */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageCapture}
      />
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        style={{ display: 'none' }}
        onChange={handleImageCapture}
      />

      {/* 1. Alignment Registration Form Phase */}
      {!isFormCompleted ? (
        <div className="responsive-grid">

          {/* Left Column: Astrologer explanation graphics/card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <ShieldCheck color="var(--accent)" size={32} />
                  <h3 style={{ fontFamily: 'Cinzel', fontSize: '20px', color: 'var(--accent)', margin: 0 }}>
                    {t.infoTextTitle}
                  </h3>
                </div>

                {/* Genuine celestial validation image */}
                <div style={{ width: '100%', height: '220px', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px', border: '1px solid rgba(224, 192, 151, 0.15)', background: '#070114', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src="/images/celestial_verification.png"
                    alt="Celestial Verification Map"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  {t.infoTextDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="glass-card" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Sparkles color="var(--accent)" size={20} />
              <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>
                {t.detailsTitle}
              </h3>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">{t.nameLabel}</label>
                <div className={`form-input-container ${errors.name ? 'error' : ''}`}>
                  <User className="form-input-icon" size={18} />
                  <input
                    className="form-input"
                    placeholder={t.namePlaceholder}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                  />
                </div>
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">{t.mobileLabel}</label>
                <div className={`form-input-container ${errors.mobile ? 'error' : ''}`}>
                  <Phone className="form-input-icon" size={18} />
                  <input
                    type="tel"
                    className="form-input"
                    placeholder={t.mobilePlaceholder}
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (errors.mobile) setErrors(prev => ({ ...prev, mobile: undefined }));
                    }}
                  />
                </div>
                {errors.mobile && <p className="error-text">{errors.mobile}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">{t.emailLabel}</label>
                <div className={`form-input-container ${errors.email ? 'error' : ''}`}>
                  <Mail className="form-input-icon" size={18} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                  />
                </div>
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">{t.addressLabel}</label>
                <div className="form-input-container" style={{ alignItems: 'flex-start' }}>
                  <MapPin className="form-input-icon" size={18} style={{ marginTop: '14px' }} />
                  <textarea
                    className="form-input form-textarea"
                    placeholder={t.addressPlaceholder}
                    value={address}
                    rows={3}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn"
                style={{ marginTop: '24px', width: '100%' }}
              >
                {t.proceedBtn}
              </button>

              <button
                type="button"
                onClick={() => { setIsFormCompleted(true); setShowScannerInstructions(true); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  textDecoration: 'underline',
                  width: '100%',
                  padding: '16px 0 0',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {t.skipBtn}
              </button>
            </form>
          </div>

        </div>
      ) : showScannerInstructions ? (
        /* 2. Instruction Guide Page ("Scan Your Feet") */
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <header className="page-header" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', border: 'none', background: 'transparent', boxShadow: 'none', marginBottom: '10px', paddingTop: '10px' }}>
            <button
              onClick={() => setIsFormCompleted(false)}
              style={{
                position: 'absolute',
                left: 0,
                background: 'none',
                border: 'none',
                color: '#E0C097',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="page-header-title" style={{ fontFamily: 'Cinzel', fontSize: '24px', color: '#E0C097', margin: 0, fontWeight: 'bold' }}>
              {language === 'hi' ? 'अपने पैर स्कैन करें' : 'Scan Your Feet'}
            </h1>
          </header>

          <p style={{ color: '#A097B4', fontSize: '14px', marginTop: '4px', marginBottom: '24px', maxWidth: '400px', textAlign: 'center', lineHeight: '1.4' }}>
            {language === 'hi'
              ? 'कुछ सरल चरणों में अपने पैरों को स्कैन करके सटीक अंतर्दृष्टि प्राप्त करें।'
              : 'Get accurate insights by scanning your feet in a few simple steps.'}
          </p>

          {/* Large pulsing neon circle with constellation foot visual */}
          <div style={{
            width: '230px',
            height: '230px',
            borderRadius: '50%',
            border: '4px solid #A855F7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 28px',
            boxShadow: '0 0 35px rgba(168, 85, 247, 0.8), inset 0 0 25px rgba(168, 85, 247, 0.5)',
            backgroundColor: 'rgba(12, 4, 25, 0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img
              src="/images/constellation_feet.png"
              alt="Constellation Feet"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 2
              }}
            />
            <div className="absolute inset-0 rounded-full animate-ping" style={{ border: '1px solid rgba(168, 85, 247, 0.35)', pointerEvents: 'none' }} />
          </div>

          {/* Steps List */}
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '32px',
            backgroundColor: 'rgba(20, 10, 35, 0.35)',
            borderRadius: '16px',
            border: '1.2px solid rgba(168, 85, 247, 0.15)',
            overflow: 'hidden'
          }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: '1px solid rgba(168, 85, 247, 0.12)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                <MapPin size={18} color="#E0C097" />
              </div>
              <span style={{ fontSize: '14px', color: '#DFD5E6', fontWeight: 500 }}>
                {language === 'hi' ? "1. अपने पैरों को समतल सतह पर रखें" : "1. Place your feet on a flat surface"}
              </span>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: '1px solid rgba(168, 85, 247, 0.12)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                <Sparkles size={18} color="#E0C097" />
              </div>
              <span style={{ fontSize: '14px', color: '#DFD5E6', fontWeight: 500 }}>
                {language === 'hi' ? "2. अच्छी रोशनी सुनिश्चित करें" : "2. Ensure good lighting"}
              </span>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: '1px solid rgba(168, 85, 247, 0.12)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                <Camera size={18} color="#E0C097" />
              </div>
              <span style={{ fontSize: '14px', color: '#DFD5E6', fontWeight: 500 }}>
                {language === 'hi' ? "3. कैमरा स्थिर रखें और कैप्चर करें" : "3. Hold camera steady and capture"}
              </span>
            </div>

            {/* Step 4 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                <ScanIcon size={18} color="#E0C097" />
              </div>
              <span style={{ fontSize: '14px', color: '#DFD5E6', fontWeight: 500 }}>
                {language === 'hi' ? "4. हम विश्लेषण करेंगे और आपकी रीडिंग उत्पन्न करेंगे" : "4. We'll analyze and generate your reading"}
              </span>
            </div>
          </div>

          {/* Begin Scan Button */}
          <button
            className="btn"
            onClick={() => setShowScannerInstructions(false)}
            style={{
              width: '100%',
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              background: '#E6C59E',
              color: '#0F051D',
              borderRadius: '35px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(230, 197, 158, 0.45)',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              display: 'block'
            }}
          >
            {language === 'hi' ? 'स्कैन शुरू करें' : 'Begin Scan'}
          </button>
        </div>
      ) : (
        /* 3. Foot Scanner Camera Phase */
        <div style={{ width: '100%' }}>
          <header className="page-header">
            <button className="sub-back-btn" onClick={() => setShowScannerInstructions(true)}>
              <ChevronLeft size={16} />
              {language === 'hi' ? 'पीछे' : 'Back'}
            </button>
            <h1 className="page-header-title">{t.scanTitle}</h1>
          </header>

          <div className="responsive-grid" style={{ marginTop: '20px' }}>

            {/* Left Column: Image Preview Box */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: '480px',
                  backgroundColor: '#1E0B36',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '2px solid var(--accent)',
                  position: 'relative',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                {isValidating ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(15, 5, 29, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '20px',
                      textAlign: 'center',
                      zIndex: 20
                    }}
                  >
                    <Loader size={40} color="var(--accent)" className="animate-spin" />
                    <h3 style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 'bold', marginTop: '16px' }}>
                      {t.aiVerifying}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '6px', lineHeight: '1.4' }}>
                      {t.aiVerifyingSub}
                    </p>
                  </div>
                ) : imageUri ? (
                  <>
                    <img
                      src={imageUri}
                      alt="Foot Sole"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Guide Silhouette Overlay */}
                    {!isScanning && !scanError && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(15, 5, 29, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          pointerEvents: 'none'
                        }}
                      >
                        <Footprints color="rgba(224, 192, 151, 0.25)" size={140} style={{ transform: 'rotate(-5deg)' }} />
                        <span
                          style={{
                            color: 'rgba(224, 192, 151, 0.75)',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            backgroundColor: 'rgba(15, 5, 29, 0.75)',
                            padding: '4px 10px',
                            borderRadius: '8px'
                          }}
                        >
                          {t.alignSole}
                        </span>
                      </div>
                    )}

                    {/* Scanning Laser Beam */}
                    {isScanning && <div className="scanner-beam" />}

                    {/* Scanning Step-by-Step Info Overlay */}
                    {isScanning && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(15, 5, 29, 0.9)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '20px',
                          zIndex: 25
                        }}
                      >
                        <div style={{ textAlign: 'center' }}>
                          {scanStep === 'orient' && (
                            <>
                              <h3 style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 'bold' }}>{t.stepOrient}</h3>
                              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '6px' }}>{t.stepOrientSub}</p>
                            </>
                          )}
                          {scanStep === 'contour' && (
                            <>
                              <h3 style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 'bold' }}>{t.stepContour}</h3>
                              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '6px' }}>{t.stepContourSub}</p>
                            </>
                          )}
                          {scanStep === 'lines' && (
                            <>
                              <h3 style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 'bold' }}>{t.stepLines}</h3>
                              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '6px' }}>{t.stepLinesSub}</p>
                            </>
                          )}
                          {scanStep === 'final' && (
                            <>
                              <h3 style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 'bold' }}>{t.stepFinal}</h3>
                              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '6px' }}>{t.stepFinalSub}</p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.7 }}>
                    <ScanIcon color="var(--accent)" size={54} />
                    <span style={{ color: 'var(--text-secondary)', marginTop: '10px', fontSize: '15px', fontWeight: 500 }}>
                      {language === 'hi' ? "कोई छवि नहीं चुनी गई" : "No image selected"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Actions, Tips, and Errors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Control Panel Card */}
              <div className="glass-card" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Sparkles color="var(--accent)" size={20} />
                  <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>
                    {t.scanTitle}
                  </h3>
                </div>

                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '24px' }}>
                  {language === 'hi'
                    ? "तलवे के ज्योतिषीय संरेखण की जांच करने के लिए फोटो लें या गैलरी से चित्र अपलोड करें। फिर विश्लेषण करें पर क्लिक करें।"
                    : "Capture a vertical, bare photo of your sole. Align with the guide footprints. Trigger the AI telemetry scan sequence."}
                </p>

                {/* Action Buttons */}
                {!isScanning && !imageUri && !isValidating && (
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                      className="btn"
                      style={{ flex: 1, padding: '14px 0', fontSize: '14px' }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={16} />
                      {t.takePicture}
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '14px 0', fontSize: '14px' }}
                      onClick={() => galleryInputRef.current?.click()}
                    >
                      <Upload size={16} />
                      {t.uploadImage}
                    </button>
                  </div>
                )}

                {imageUri && !isScanning && !scanError && (
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '14px 0', fontSize: '14px' }}
                      onClick={() => {
                        setImageUri(null);
                        setScanError(null);
                        setValidationError(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                        if (galleryInputRef.current) galleryInputRef.current.value = '';
                      }}
                    >
                      {t.discardImage}
                    </button>
                    <button
                      className="btn"
                      style={{ flex: 1, padding: '14px 0', fontSize: '14px' }}
                      onClick={startScan}
                    >
                      {t.analyzeFoot}
                    </button>
                  </div>
                )}
              </div>

              {/* Verification Heuristic Error Box */}
              {imageUri && !isScanning && scanError && (
                <div className="glass-card" style={{ backgroundColor: 'var(--danger-bg)', borderColor: 'var(--danger)', margin: 0, padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <AlertCircle color="var(--danger)" size={18} />
                    <h3 style={{ color: 'var(--danger)', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>
                      {t.scanErrorTitle}
                    </h3>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#EAEAEA', lineHeight: '1.4', marginBottom: '14px' }}>
                    {scanError}
                  </p>

                  <div style={{ backgroundColor: 'rgba(15, 5, 29, 0.6)', border: '1px solid rgba(255, 107, 107, 0.2)', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
                    <h4 style={{ color: 'var(--accent)', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {language === 'hi' ? "सफल स्कैन के नियम:" : "Rules for a successful scan:"}
                    </h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0' }}>{t.errorSocks}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0' }}>{t.errorBright}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0' }}>{t.errorVisible}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0' }}>{t.errorAlign}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '10px', fontSize: '13px', borderColor: 'var(--text-secondary)', color: 'var(--text-secondary)' }}
                      onClick={() => { setImageUri(null); setScanError(null); }}
                    >
                      {t.discard}
                    </button>
                    <button
                      className="btn"
                      style={{ flex: 1, padding: '10px', fontSize: '13px', background: 'var(--danger)', color: 'white', boxShadow: 'none' }}
                      onClick={() => { setScanError(null); fileInputRef.current?.click(); }}
                    >
                      {t.retake}
                    </button>
                  </div>
                </div>
              )}

              {/* AI Image Verification Hard Error Box */}
              {!imageUri && !isValidating && validationError && (
                <div className="glass-card" style={{ backgroundColor: 'var(--danger-bg)', borderColor: 'var(--danger)', margin: 0, padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <AlertCircle color="var(--danger)" size={18} />
                    <h3 style={{ color: 'var(--danger)', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>
                      {t.aiErrorTitle}
                    </h3>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#EAEAEA', lineHeight: '1.4', marginBottom: '14px' }}>
                    {validationError}
                  </p>

                  <div style={{ backgroundColor: 'rgba(15, 5, 29, 0.6)', border: '1px solid rgba(255, 107, 107, 0.2)', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
                    <h4 style={{ color: 'var(--accent)', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {language === 'hi' ? "स्कैन नियम:" : "Scan rules:"}
                    </h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0' }}>{t.aiRule1}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0' }}>{t.aiRule2}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0' }}>{t.aiRule3}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                      onClick={() => setValidationError(null)}
                    >
                      {t.clear}
                    </button>
                    <button
                      className="btn"
                      style={{ flex: 1, padding: '10px', fontSize: '13px', background: 'var(--danger)', color: 'white', boxShadow: 'none' }}
                      onClick={() => { setValidationError(null); fileInputRef.current?.click(); }}
                    >
                      {t.tryAgain}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
