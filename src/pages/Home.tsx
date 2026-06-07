import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, Mail, HelpCircle, CheckCircle2 } from 'lucide-react';
import HoroscopeCarousel from '../components/HoroscopeCarousel';
import appsoleLogo from '../assets/logo.png';
import sampleImg from '../assets/sample.png';

export default function Home() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleWhatsApp = () => {
    const message = `Hello Astrologer, I would like to know more about Podomancy.`;
    window.open(`https://wa.me/917003891953?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    const subject = `AstroSole Consultation Inquiry`;
    const body = `Hello,\n\nI would like to request a detailed podomancy reading.`;
    window.location.href = `mailto:mybusiness7795@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const textDict = {
    en: {
      subtitle: "Unlock the Secrets of your Sole",
      description: "Discover your true self, destiny, and future through the ancient mystical science of foot reading.",
      buttonText: "Start Foot Reading",
      talkToAstrologer: "Talk to Astrologer",
      emailUs: "Email Us",
      langToggle: "हिन्दी",
      infoToggle: "What is Podomancy?",
      whatIsTitle: "What is Podomancy?",
      whatIsDesc: "Podomancy (also known as Solistry) is the ancient astrological practice of reading the shapes and lines of the foot sole. Just as palmistry maps the hands to represent the mind, your soles represent your foundation—how you walk your path, stand in the world, and fulfill your earthly destiny.",
      features: [
        "Capture or upload a clear, bare vertical sole photo",
        "AI telemetry maps structural curves, contours, and depths",
        "Unveil distinct predictions for Career, Health, Love, and Fate"
      ],
      consultationTitle: "Sacred Astro Consultations",
      consultationDesc: "Seeking deeper planetary remedies? Connect directly with our grand astrologer.",
      closeBtn: "Close Guide"
    },
    hi: {
      subtitle: "अपने तलवों के रहस्यों को जानें",
      description: "पैर की रीडिंग (पोडोमेंसी) के प्राचीन विज्ञान के माध्यम से अपने वास्तविक स्वरूप और भविष्य की खोज करें।",
      buttonText: "पैर की रीडिंग शुरू करें",
      talkToAstrologer: "ज्योतिषी से बात करें",
      emailUs: "हमें ईमेल करें",
      langToggle: "English",
      infoToggle: "पोडोमेंसी क्या है?",
      whatIsTitle: "पोडोमेंसी क्या है?",
      whatIsDesc: "पोडोमेंसी (तलवों की हस्तरेखा) पैर के तलवे की रेखाओं और आकार को पढ़ने का प्राचीन ज्योतिषीय विज्ञान है। जैसे हस्तरेखा मस्तिष्क का प्रतिनिधित्व करती है, वैसे ही आपके तलवे आपके जीवन की नींव का प्रतिनिधित्व करते हैं—आप कैसे चलते हैं और अपने भाग्य को कैसे पूरा करते हैं।",
      features: [
        "अपने नंगे पैर के तलवे की एक लंबवत (vertical) तस्वीर लें या चुनें",
        "एआई टेलीमेट्री पैर की बनावट, मेहराब और गहराई का मानचित्रण करती है",
        "करियर, स्वास्थ्य, प्रेम और भाग्य के लिए विस्तृत भविष्यवाणियां प्राप्त करें"
      ],
      consultationTitle: "पवित्र ज्योतिषीय परामर्श",
      consultationDesc: "क्या आप कुंडली विश्लेषण चाहते हैं? सीधे हमारे ज्योतिषी से संपर्क करें।",
      closeBtn: "गाइड बंद करें"
    }
  };

  const t = textDict[language];

  return (
    <div className="container" style={{ padding: '16px 0', minHeight: 'auto' }}>
      {/* Mystical Top Navbar */}
      <header className="app-header" style={{ marginBottom: '16px' }}>
        <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={appsoleLogo} alt="AstroSole Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="info-toggle-btn" onClick={() => setShowInfoModal(true)}>
            {t.infoToggle}
          </button>
          <button className="lang-toggle-btn" onClick={toggleLanguage}>
            {t.langToggle}
          </button>
        </div>
      </header>

      {/* Home Main Grid */}
      <div className="home-grid">
        {/* Left Column: Hero Banner */}
        <div className="glass-card hero-card" style={{
          margin: 0,
          padding: 0,
          height: '350px',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url(/images/astrologer_reading.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%'
        }}>
          {/* Semi-transparent dark overlay for background depth */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 5, 29, 0.2)',
            zIndex: 1
          }} />

          {/* Top-aligned Glassmorphic Text Card */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '14px',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              textAlign: 'center',
              width: '94%',
              padding: '10px 16px'
            }}>
              <h2 style={{ fontFamily: 'Cinzel', fontSize: '15px', color: 'var(--accent)', marginBottom: '4px', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                {t.subtitle}
              </h2>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 'bold', lineHeight: '1.3', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}>
                {t.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Horoscope Carousel */}
        <div className="glass-card carousel-card" style={{ margin: 0, padding: '12px 0', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <HoroscopeCarousel language={language} />
        </div>

        {/* Left Column: Start Foot Reading Box - Highly highlighted primary CTA */}
        <div className="glass-card destiny-glow-card foot-reading-card" style={{
          margin: 0,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 12px',
          minHeight: '140px',
          height: 'auto',
          border: '2.5px solid rgba(224, 192, 151, 0.95)',
          background: 'linear-gradient(135deg, rgba(40, 15, 70, 0.85) 0%, rgba(15, 5, 29, 0.95) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Stylish background element */}
          <Sparkles
            color="rgba(224, 192, 151, 0.18)"
            size={54}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              transform: 'rotate(15deg)',
              pointerEvents: 'none'
            }}
          />
          <Sparkles color="var(--accent)" size={22} className="animate-pulse" style={{ marginBottom: '4px', zIndex: 1 }} />
          <h3 style={{ fontFamily: 'Cinzel', fontSize: '16px', color: '#FFFFFF', marginBottom: '3px', letterSpacing: '0.5px', zIndex: 1 }}>
            {language === 'hi' ? "अपने भविष्य को उजागर करें" : "Reveal Your Destiny"}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px', maxWidth: '280px', lineHeight: '1.2', zIndex: 1 }}>
            {language === 'hi'
              ? "प्राचीन रेखाओं के साथ ग्रहों की चाल का विश्लेषण करें।"
              : "Analyze sole coordinates to trace planetary lines."}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', maxWidth: '240px', zIndex: 1 }}>
            <button
              className="btn"
              onClick={() => navigate('/scan', { state: { language } })}
              style={{
                width: '100%',
                padding: '8px 0',
                fontSize: '12.5px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: 'linear-gradient(135deg, #FFE3C0 0%, #F5A623 100%)',
                color: '#0F051D',
                boxShadow: '0 0 15px rgba(245, 166, 35, 0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <Sparkles size={12} style={{ marginRight: '4px' }} />
              {t.buttonText}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowSampleModal(true)}
              style={{
                width: '100%',
                padding: '6px 0',
                fontSize: '11.5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: '1px dashed var(--accent)',
                backgroundColor: 'rgba(224, 192, 151, 0.05)',
                color: 'var(--accent)'
              }}
            >
              {language === 'hi' ? "उदाहरण / नमूना रिपोर्ट" : "View Example Report"}
            </button>
          </div>
        </div>

        {/* Right Column: Astrologer Consultation Card */}
        <div className="glass-card consultations-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 12px', minHeight: '140px', height: 'auto' }}>
          <h3 style={{ fontFamily: 'Cinzel', fontSize: '15px', color: 'var(--accent)', marginBottom: '4px' }}>
            {t.consultationTitle}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.2', marginBottom: '10px' }}>
            {t.consultationDesc}
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn"
              onClick={handleWhatsApp}
              style={{
                flex: 1,
                background: '#25D366',
                color: 'white',
                fontSize: '11.5px',
                padding: '8px',
                boxShadow: 'none'
              }}
            >
              <MessageCircle size={12} />
              {t.talkToAstrologer}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleEmail}
              style={{ flex: 1, fontSize: '11.5px', padding: '8px' }}
            >
              <Mail size={12} />
              {t.emailUs}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Guide Popup Modal (What is Podomancy) */}
      {showInfoModal && (
        <div className="modal-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="modal-card" style={{ maxWidth: '500px', textAlign: 'left', alignItems: 'flex-start' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', width: '100%' }}>
              <HelpCircle color="var(--accent)" size={28} />
              <h3 style={{ fontFamily: 'Cinzel', fontSize: '20px', color: 'var(--accent)', margin: 0 }}>
                {t.whatIsTitle}
              </h3>
            </div>

            <p style={{ fontSize: '13.5px', color: '#EAEAEA', lineHeight: '1.6', marginBottom: '20px' }}>
              {t.whatIsDesc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', width: '100%' }}>
              {t.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 color="var(--accent)" size={16} style={{ marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{feature}</span>
                </div>
              ))}
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => setShowInfoModal(false)}
              style={{ width: '100%', padding: '12px 0', fontSize: '13px' }}
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}
      {showSampleModal && (
        <div className="modal-overlay" onClick={() => setShowSampleModal(false)}>
          <div className="modal-card" style={{ maxWidth: '600px', textAlign: 'center', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '16px', borderBottom: '1px solid rgba(224,192,151,0.2)', paddingBottom: '10px' }}>
              <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', margin: 0 }}>
                {language === 'hi' ? "उदाहरण ज्योतिषीय रिपोर्ट" : "Example Astrological Report"}
              </h3>
              <button 
                onClick={() => setShowSampleModal(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-secondary)', 
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', borderRadius: '8px' }}>
              <img 
                src={sampleImg} 
                alt="Example Astrological Report" 
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} 
              />
            </div>
            <button
              className="btn"
              onClick={() => setShowSampleModal(false)}
              style={{ width: '100%', marginTop: '20px', padding: '12px 0', fontSize: '13px' }}
            >
              {language === 'hi' ? "बंद करें" : "Close Example"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
