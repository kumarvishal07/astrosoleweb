import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  MessageCircle, 
  Mail, 
  Activity, 
  Heart, 
  Loader,
  Bell,
  ChevronRight,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { generateDetailedReading } from '../data/podomancy';

// Constellation Left/Right Foot Component
const FootConstellation = ({ isLeft }: { isLeft: boolean }) => (
  <svg 
    width="95" 
    height="170" 
    viewBox="0 0 100 200" 
    style={{ filter: 'drop-shadow(0 0 12px rgba(224, 192, 151, 0.45))', margin: '0 auto' }}
  >
    {/* Foot Contour Silhouette */}
    <path
      d={isLeft 
        ? "M 50,190 C 20,180 15,160 15,130 C 15,90 35,70 25,30 C 20,20 28,10 38,12 C 48,15 45,30 50,30 C 55,30 52,15 62,12 C 72,10 80,20 75,30 C 65,70 85,90 85,130 C 85,160 80,180 50,190 Z"
        : "M 50,190 C 80,180 85,160 85,130 C 85,90 65,70 75,30 C 80,20 72,10 62,12 C 52,15 55,30 50,30 C 45,30 48,15 38,12 C 28,10 20,20 25,30 C 35,70 15,90 15,130 C 15,160 20,180 50,190 Z"
      }
      fill="none"
      stroke="rgba(224, 192, 151, 0.35)"
      strokeWidth="2.5"
    />
    
    {/* Star Constellation Connecting Lines */}
    <line x1="50" y1="180" x2="35" y2="140" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="50" y1="180" x2="65" y2="140" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="35" y1="140" x2="30" y2="90" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="65" y1="140" x2="70" y2="90" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="30" y1="90" x2="50" y2="60" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="70" y1="90" x2="50" y2="60" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="50" y1="60" x2="30" y2="25" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="50" y1="60" x2="45" y2="22" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="50" y1="60" x2="55" y2="22" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="50" y1="60" x2="70" y2="25" stroke="rgba(224, 192, 151, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
    
    {/* Constellation Nodes (Stars) */}
    <circle cx="50" cy="180" r="4.5" fill="var(--accent)" />
    <circle cx="35" cy="140" r="4" fill="var(--accent)" />
    <circle cx="65" cy="140" r="4" fill="var(--accent)" />
    <circle cx="30" cy="90" r="4.5" fill="var(--accent)" />
    <circle cx="70" cy="90" r="4.5" fill="var(--accent)" />
    <circle cx="50" cy="60" r="6" fill="var(--accent-light)" />
    
    {/* Toe Stars */}
    <circle cx="28" cy="20" r="3.5" fill="var(--accent)" />
    <circle cx="42" cy="16" r="3" fill="var(--accent)" />
    <circle cx="58" cy="16" r="3" fill="var(--accent)" />
    <circle cx="72" cy="20" r="3.5" fill="var(--accent)" />
  </svg>
);

// Meditating Human Figure inside Zodiac Coordinate Circle
const ZodiacMeditationOutline = () => (
  <svg 
    width="120" 
    height="120" 
    viewBox="0 0 100 100" 
    style={{ margin: '0 auto 12px', display: 'block', filter: 'drop-shadow(0 0 10px rgba(122, 75, 148, 0.5))' }}
  >
    {/* Outer Coordinates */}
    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(122, 75, 148, 0.25)" strokeWidth="1" />
    <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(224, 192, 151, 0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
    
    {/* Rays */}
    <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(122, 75, 148, 0.15)" strokeWidth="0.5" />
    <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(122, 75, 148, 0.15)" strokeWidth="0.5" />
    <line x1="18" y1="18" x2="82" y2="82" stroke="rgba(122, 75, 148, 0.15)" strokeWidth="0.5" />
    <line x1="18" y1="82" x2="82" y2="18" stroke="rgba(122, 75, 148, 0.15)" strokeWidth="0.5" />
    
    {/* Human Figure */}
    <circle cx="50" cy="30" r="5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    <path d="M 50,35 C 50,35 53,44 55,54 C 57,64 50,72 50,72 Z" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    <path d="M 50,35 C 50,35 47,44 45,54 C 43,64 50,72 50,72 Z" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    <path d="M 44,42 C 38,44 36,52 41,58 C 44,62 50,62 50,62" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
    <path d="M 56,42 C 62,44 64,52 59,58 C 56,62 50,62 50,62" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
    <path d="M 38,68 C 30,69 30,75 38,76 C 46,77 50,75 50,75" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    <path d="M 62,68 C 70,69 70,75 62,76 C 54,77 50,75 50,75" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    
    {/* Chakra Nodes */}
    <circle cx="50" cy="30" r="1.2" fill="#EAEAEA" />
    <circle cx="50" cy="40" r="1" fill="#7A4B94" />
    <circle cx="50" cy="47" r="1" fill="#2B7DE9" />
    <circle cx="50" cy="54" r="1" fill="#28A745" />
    <circle cx="50" cy="61" r="1" fill="var(--accent)" />
    <circle cx="50" cy="68" r="1" fill="#FF6B6B" />
  </svg>
);

// Mountain symbol for Earth element
const EarthSymbol = () => (
  <svg width="50" height="50" viewBox="0 0 60 60" style={{ filter: 'drop-shadow(0 0 6px var(--accent))' }}>
    <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(224, 192, 151, 0.2)" strokeWidth="1" />
    <path d="M 15,44 L 30,17 L 45,44 Z" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    <path d="M 23,44 L 32,27 L 40,44 Z" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
    <line x1="10" y1="44" x2="50" y2="44" stroke="var(--accent)" strokeWidth="2" />
  </svg>
);

// Waves for Water element
const WaterSymbol = () => (
  <svg width="50" height="50" viewBox="0 0 60 60" style={{ filter: 'drop-shadow(0 0 6px #2B7DE9)' }}>
    <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(43, 125, 233, 0.2)" strokeWidth="1" />
    <path d="M 15,24 C 20,19 25,29 30,24 C 35,19 40,29 45,24" fill="none" stroke="#2B7DE9" strokeWidth="2.5" />
    <path d="M 15,32 C 20,27 25,37 30,32 C 35,27 40,37 45,32" fill="none" stroke="#2B7DE9" strokeWidth="2.5" />
    <path d="M 15,40 C 20,35 25,45 30,40 C 35,35 40,45 45,40" fill="none" stroke="#2B7DE9" strokeWidth="2" opacity="0.6" />
  </svg>
);

// Flame for Fire element
const FireSymbol = () => (
  <svg width="50" height="50" viewBox="0 0 60 60" style={{ filter: 'drop-shadow(0 0 6px #FF6B6B)' }}>
    <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(255, 107, 107, 0.2)" strokeWidth="1" />
    <path d="M 30,13 C 35,23 42,30 40,41 C 38,47 30,47 30,47 C 30,47 22,47 20,41 C 18,30 25,23 30,13 Z" fill="none" stroke="#FF6B6B" strokeWidth="2.5" />
    <path d="M 30,23 C 33,28 37,33 35,38 C 34,42 30,42 30,42 C 30,42 26,42 25,38 C 23,33 27,28 30,23 Z" fill="none" stroke="#FF6B6B" strokeWidth="1.5" opacity="0.7" />
  </svg>
);

// Clouds for Air element
const AirSymbol = () => (
  <svg width="50" height="50" viewBox="0 0 60 60" style={{ filter: 'drop-shadow(0 0 6px #EAEAEA)' }}>
    <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
    <path d="M 20,37 A 5,5 0 0 1 20,27 A 7,7 0 0 1 34,23 A 9,9 0 0 1 47,30 A 5,5 0 0 1 43,39 L 20,37 Z" fill="none" stroke="#EAEAEA" strokeWidth="2.5" />
  </svg>
);

// Zodiac crab outline for Cancer sign in Daily Horoscope
const CancerSymbol = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" style={{ opacity: 0.35, filter: 'drop-shadow(0 0 5px var(--accent))' }}>
    {/* Body */}
    <ellipse cx="50" cy="55" rx="16" ry="12" fill="none" stroke="var(--accent)" strokeWidth="2" />
    {/* Claws */}
    <path d="M 38,45 C 30,35 40,20 48,32" fill="none" stroke="var(--accent)" strokeWidth="2" />
    <path d="M 62,45 C 70,35 60,20 52,32" fill="none" stroke="var(--accent)" strokeWidth="2" />
    {/* Legs */}
    <path d="M 34,55 C 24,55 24,65 30,70" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    <path d="M 34,60 C 24,62 24,72 30,77" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    <path d="M 66,55 C 76,55 76,65 70,70" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    <path d="M 66,60 C 76,62 76,72 70,77" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
  </svg>
);

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name = 'Seeker', language: stateLanguage = 'en' } = location.state || {};
  
  const [reading, setReading] = useState<ReturnType<typeof generateDetailedReading> | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>(stateLanguage);
  
  // Tab control: 'overview' | 'left' | 'right'
  const [activeTab, setActiveTab] = useState<'overview' | 'left' | 'right'>('overview');
  
  // Menu Modal State
  const [activeModal, setActiveModal] = useState<'destiny' | 'strengths' | 'compatibility' | 'remedies' | null>(null);

  useEffect(() => {
    // Generate reading once on mount
    setReading(generateDetailedReading());
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleWhatsApp = () => {
    const text = `Hi AstroSole! I'm ${name} and I just completed my foot reading. I'd like a detailed consultation.`;
    window.open(`https://wa.me/917003891953?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmail = () => {
    const subject = `Detailed AstroSole Consultation for ${name}`;
    const body = `Hi AstroSole Team,\n\nI just completed my foot sole scan and would love to get a comprehensive consultation regarding my astrological path.\n\nBest,\n${name}`;
    window.location.href = `mailto:mybusiness7795@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const [copied, setCopied] = useState(false);

  const getReportText = () => {
    if (!reading) return '';
    const divider = '========================================';
    const langLabel = language === 'hi' ? 'hi' : 'en';
    
    return [
      `🔮 ASTROSOLE PODOMANCY REPORT 🔮`,
      `Name: ${name}`,
      `Date: ${new Date().toLocaleDateString()}`,
      divider,
      `👣 DETECTED SOLE CHARACTERISTICS:`,
      `• Foot Shape: ${reading.detected.shape[langLabel]}`,
      `• Sole Lines: ${reading.detected.lines[langLabel]}`,
      `• Foot Size: ${reading.detected.size[langLabel]}`,
      divider,
      `✨ PERSONALITY ANALYSIS:`,
      reading.predictions.personality[langLabel],
      divider,
      `🔮 FUTURE FORECAST:`,
      reading.predictions.future[langLabel],
      divider,
      `❤️ LOVE & RELATIONSHIPS:`,
      reading.predictions.relationship[langLabel],
      divider,
      `🌿 HEALTH & ENERGY VITALITY:`,
      reading.predictions.health[langLabel],
      divider,
      `💫 SPIRITUAL GUIDANCE & REMEDIES:`,
      reading.predictions.suggestion[langLabel].replace(/• /g, '\n• '),
      divider,
      `Consult live at: www.astrosole.in`,
      `Generated by AstroSole - AI Podomancy (Foot Reading)`
    ].join('\n\n');
  };

  const shareOnWhatsApp = () => {
    const reportText = getReportText();
    const intro = language === 'hi' 
      ? `नमस्ते! यहाँ मेरा एस्ट्रोसोल पैर विश्लेषण (Podomancy) रिपोर्ट है:\n\n`
      : `Hi! Here is my AstroSole Foot Analysis (Podomancy) Report:\n\n`;
    const fullText = intro + reportText;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`, '_blank');
  };

  const shareOnEmail = () => {
    const reportText = getReportText();
    const subject = language === 'hi'
      ? `एस्ट्रोसोल पैर विश्लेषण रिपोर्ट - ${name}`
      : `AstroSole Foot Analysis Report for ${name}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(reportText)}`;
  };

  const copyReportToClipboard = () => {
    const reportText = getReportText();
    navigator.clipboard.writeText(reportText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  if (!reading) {
    return (
      <div className="container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
          <Loader className="animate-spin" size={48} color="var(--accent)" />
          <p style={{ color: 'var(--accent)', fontFamily: 'Cinzel', fontSize: '18px', marginTop: '16px' }}>
            Unveiling your destiny...
          </p>
        </div>
      </div>
    );
  }

  // Generate consistent scores based on character seeds
  const getScoreFromName = (username: string) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return 80 + (Math.abs(hash) % 16);
  };
  const score = getScoreFromName(name);
  const scoreText = score >= 90 ? "Excellent" : score >= 85 ? "Very Good" : "Good";

  // Elements percentages
  const elements = [
    { name: "Earth", val: 60, color: "var(--accent)", symbol: <EarthSymbol /> },
    { name: "Water", val: 20, color: "#2B7DE9", symbol: <WaterSymbol /> },
    { name: "Fire", val: 10, color: "#FF6B6B", symbol: <FireSymbol /> },
    { name: "Air", val: 10, color: "#EAEAEA", symbol: <AirSymbol /> }
  ];

  // Dynamic Foot Type details
  const isEarth = reading.detected.shape.en.includes("Square") || reading.detected.shape.en.includes("Roman");
  const isWater = reading.detected.shape.en.includes("Egyptian");

  const footTypeTitle = isEarth ? "Earth Foot" : isWater ? "Water Foot" : "Air Foot";
  const footTypeDesc = isEarth 
    ? "Grounded, stable and practical. You are dependable and value security."
    : isWater
    ? "Mysterious, fluid and highly intuitive. You are creative and emotional."
    : "Idealistic, communicative and free. You value intellect and travel.";

  const footTypeSymbol = isEarth ? <EarthSymbol /> : isWater ? <WaterSymbol /> : <AirSymbol />;

  // Dynamic Highlight tags
  const highlights = ["Balanced Mind", "Strong Intuition", "Loyal", "Hardworking", "Practical", "Independent"];

  // Translations
  const textDict = {
    en: {
      doneBtn: "Complete Pilgrimage"
    },
    hi: {
      doneBtn: "पूर्ण करें"
    }
  };
  const t = textDict[language];

  return (
    <div className="container" style={{ paddingBottom: '32px' }}>
      
      {/* Top Navbar Header */}
      <header className="app-header" style={{ marginBottom: '18px', padding: '12px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Menu color="var(--accent)" size={22} style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
          <h1 className="logo-text" style={{ fontSize: '20px', fontFamily: 'Cinzel', letterSpacing: '1px' }}>Your Foot Analysis</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="lang-toggle-btn" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={toggleLanguage}>
            {language === 'en' ? "हिन्दी" : "English"}
          </button>
          <Bell color="var(--accent)" size={20} style={{ cursor: 'pointer' }} />
        </div>
      </header>

      {/* Tab Selectors */}
      <div className="tabs-selector">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {language === 'hi' ? "अवलोकन (Overview)" : "Overview"}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'left' ? 'active' : ''}`}
          onClick={() => setActiveTab('left')}
        >
          {language === 'hi' ? "बायां पैर" : "Left Foot"}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'right' ? 'active' : ''}`}
          onClick={() => setActiveTab('right')}
        >
          {language === 'hi' ? "दायां पैर" : "Right Foot"}
        </button>
      </div>

      {/* Overview Layout */}
      {activeTab === 'overview' && (
        <div className="responsive-grid" style={{ gap: '20px', marginBottom: '24px' }}>
          
          {/* Left Column (Constitutes 60% of layout on desktop) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Constellation Diagrams + Score circle */}
            <div className="foot-score-card">
              <div style={{ textAlign: 'center' }}>
                <FootConstellation isLeft={true} />
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Left Foot</p>
              </div>

              {/* Dotted score center */}
              <div className="score-circle-container">
                <span className="score-title">Overall Score</span>
                <span className="score-num">{score}</span>
                <span className="score-label">{scoreText}</span>
              </div>

              <div style={{ textAlign: 'center' }}>
                <FootConstellation isLeft={false} />
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Right Foot</p>
              </div>
            </div>

            {/* Foot Type details */}
            <div className="glass-card" style={{ margin: 0, padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Foot Type</span>
                  <h3 style={{ fontFamily: 'Cinzel', fontSize: '20px', color: '#FFFFFF', margin: '4px 0 8px' }}>
                    {language === 'hi' ? (isEarth ? "पृथ्वी पैर (Earth)" : "जल पैर (Water)") : footTypeTitle}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', maxWidth: '380px' }}>
                    {footTypeDesc}
                  </p>
                </div>
                <div>
                  {footTypeSymbol}
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="glass-card" style={{ margin: 0, padding: '20px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Key Highlights</h4>
              <div className="highlights-container">
                {highlights.map((tag, idx) => (
                  <span key={idx} className="highlight-chip">{tag}</span>
                ))}
              </div>
            </div>

            {/* Daily Horoscope Box (Moved here to align with tablet mockup) */}
            <div className="glass-card" style={{ margin: 0, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '12px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Daily Horoscope</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px', color: 'var(--accent)' }}>♋</span>
                  <h3 style={{ fontFamily: 'Cinzel', fontSize: '20px', color: '#FFFFFF', margin: 0 }}>Cancer</h3>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Saturday, May 23</p>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.4', maxWidth: '320px', margin: 0 }}>
                  Focus on self-care today. Nurture your mind and body. Positive changes are coming.
                </p>
              </div>
              <div>
                <CancerSymbol />
              </div>
            </div>

          </div>

          {/* Right Column (Constitutes 40% of layout on desktop) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Personality Insights Card */}
            <div className="glass-card" style={{ margin: 0, padding: '24px', textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', marginBottom: '14px' }}>Personality Insights</h4>
              
              <ZodiacMeditationOutline />

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {reading.predictions.personality[language]}
              </p>
            </div>

            {/* Element Influence Progress Bars */}
            <div className="glass-card" style={{ margin: 0, padding: '20px' }}>
              <h4 style={{ fontFamily: 'Cinzel', fontSize: '16px', color: 'var(--accent)', marginBottom: '16px' }}>Element Influence</h4>
              
              {elements.map((el, idx) => (
                <div key={idx} className="element-row">
                  <div className="element-header">
                    <span className="element-name">
                      <span style={{ display: 'inline-block', width: '16px', height: '16px', scale: '0.7' }}>{el.symbol}</span>
                      {el.name}
                    </span>
                    <span className="element-percentage" style={{ color: el.color }}>{el.val}%</span>
                  </div>
                  <div className="element-bar-bg">
                    <div 
                      className="element-bar-fill" 
                      style={{ width: `${el.val}%`, backgroundColor: el.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Menu List Card (Moved here to align with tablet mockup) */}
            <div className="glass-card" style={{ margin: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Astrological Metrics</span>
                <span style={{ fontSize: '11px', color: 'var(--accent)', cursor: 'pointer', opacity: 0.8 }} onClick={() => navigate('/')}>View All</span>
              </div>
              
              <div className="menu-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', border: 'none', background: 'transparent', padding: 0 }}>
                <div className="menu-item-row" onClick={() => setActiveModal('destiny')} style={{ margin: 0 }}>
                  <span className="menu-item-left">
                    <Sparkles color="var(--accent)" size={16} />
                    Life Path & Destiny
                  </span>
                  <ChevronRight color="var(--accent)" size={16} />
                </div>
                <div className="menu-item-row" onClick={() => setActiveModal('strengths')} style={{ margin: 0 }}>
                  <span className="menu-item-left">
                    <Activity color="var(--accent)" size={16} />
                    Strengths & Challenges
                  </span>
                  <ChevronRight color="var(--accent)" size={16} />
                </div>
                <div className="menu-item-row" onClick={() => setActiveModal('compatibility')} style={{ margin: 0 }}>
                  <span className="menu-item-left">
                    <Heart color="var(--accent)" size={16} />
                    Compatibility
                  </span>
                  <ChevronRight color="var(--accent)" size={16} />
                </div>
                <div className="menu-item-row" onClick={() => setActiveModal('remedies')} style={{ margin: 0 }}>
                  <span className="menu-item-left">
                    <Compass color="var(--accent)" size={16} />
                    Remedies & Guidance
                  </span>
                  <ChevronRight color="var(--accent)" size={16} />
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Left Foot Specific Details */}
      {activeTab === 'left' && (
        <div className="responsive-grid" style={{ gap: '20px', marginBottom: '20px' }}>
          <div className="glass-card" style={{ margin: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <FootConstellation isLeft={true} />
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '20px', color: 'var(--accent)', marginTop: '16px' }}>Left Foot Astrological Signs</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '400px', marginTop: '8px' }}>
              Your left foot coordinates represent your maternal karmic paths, internal emotions, and the hidden desires of your soul.
            </p>
          </div>
          <div className="glass-card" style={{ margin: 0, padding: '24px' }}>
            <h4 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', marginBottom: '14px' }}>Left Sole Readings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid rgba(224,192,151,0.1)', paddingBottom: '12px' }}>
                <h5 style={{ color: '#FFFFFF', fontSize: '14.5px', marginBottom: '4px' }}>✦ Line of Destiny (भाग्य रेखा)</h5>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {reading.predictions.future[language]}
                </p>
              </div>
              <div>
                <h5 style={{ color: '#FFFFFF', fontSize: '14.5px', marginBottom: '4px' }}>✦ Vitality Contour (स्वास्थ्य रेखा)</h5>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {reading.predictions.health[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Foot Specific Details */}
      {activeTab === 'right' && (
        <div className="responsive-grid" style={{ gap: '20px', marginBottom: '20px' }}>
          <div className="glass-card" style={{ margin: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <FootConstellation isLeft={false} />
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '20px', color: 'var(--accent)', marginTop: '16px' }}>Right Foot Astrological Signs</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '400px', marginTop: '8px' }}>
              Your right foot coordinates represent your worldly actions, career projections, and the path you are actively carving in society.
            </p>
          </div>
          <div className="glass-card" style={{ margin: 0, padding: '24px' }}>
            <h4 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', marginBottom: '14px' }}>Right Sole Readings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid rgba(224,192,151,0.1)', paddingBottom: '12px' }}>
                <h5 style={{ color: '#FFFFFF', fontSize: '14.5px', marginBottom: '4px' }}>✦ Karma and Career (कर्म और आजीविका)</h5>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {reading.predictions.future[language]}
                </p>
              </div>
              <div>
                <h5 style={{ color: '#FFFFFF', fontSize: '14.5px', marginBottom: '4px' }}>✦ Heart and Relationship (प्रेम रेखा)</h5>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {reading.predictions.relationship[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share & Save Report Section */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '24px 20px', margin: '20px 0 0' }}>
        <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', margin: 0 }}>
          {language === 'hi' ? "रिपोर्ट सहेजें और साझा करें" : "Save & Share Report"}
        </h3>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '500px', lineHeight: '1.5', margin: 0 }}>
          {language === 'hi' 
            ? "अपने पैर के विश्लेषण की रिपोर्ट को पीडीएफ के रूप में सहेजें या इसे व्हाट्सएप/ईमेल पर साझा करें।"
            : "Save your detailed foot analysis report as a PDF, copy it, or share it with friends and family."}
        </p>

        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '440px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Save as PDF */}
          <button 
            className="btn" 
            onClick={() => window.print()} 
            style={{ 
              flex: '1 1 calc(50% - 6px)', 
              background: 'linear-gradient(135deg, #FFE3C0 0%, #F5A623 100%)', 
              color: '#0F051D', 
              fontSize: '13px', 
              padding: '12px',
              fontWeight: 'bold',
              boxShadow: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} />
            {language === 'hi' ? "PDF सहेजें" : "Save as PDF"}
          </button>
          
          {/* Share via WhatsApp */}
          <button 
            className="btn" 
            onClick={shareOnWhatsApp} 
            style={{ 
              flex: '1 1 calc(50% - 6px)', 
              background: '#25D366', 
              color: 'white', 
              fontSize: '13px', 
              padding: '12px',
              boxShadow: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <MessageCircle size={15} />
            {language === 'hi' ? "व्हाट्सएप शेयर" : "WhatsApp Share"}
          </button>

          {/* Share via Email */}
          <button 
            className="btn btn-secondary" 
            onClick={shareOnEmail} 
            style={{ 
              flex: '1 1 calc(50% - 6px)', 
              fontSize: '13px', 
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Mail size={15} />
            {language === 'hi' ? "ईमेल शेयर" : "Email Share"}
          </button>

          {/* Copy Report */}
          <button 
            className="btn btn-secondary" 
            onClick={copyReportToClipboard} 
            style={{ 
              flex: '1 1 calc(50% - 6px)', 
              fontSize: '13px', 
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Activity size={15} />
            {copied ? (language === 'hi' ? "कॉपी हो गया!" : "Copied!") : (language === 'hi' ? "रिपोर्ट कॉपी करें" : "Copy Report")}
          </button>
        </div>
      </div>

      {/* Done & Astrologer contact triggers */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '24px 20px', margin: '20px 0 24px' }}>
        <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', margin: 0 }}>
          {language === 'hi' ? "ज्योतिषीय कुंडली परामर्श" : "Detailed Astrologer Consultations"}
        </h3>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '500px', lineHeight: '1.5' }}>
          {language === 'hi' 
            ? "अपनी रीडिंग पर विस्तृत चर्चा के लिए सीधे हमारे ज्योतिषी से परामर्श करें।"
            : "Seeking further planetary remedies? Connect with our astrologer to discuss your reading results."}
        </p>

        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '440px', justifyContent: 'center' }}>
          <button 
            className="btn" 
            onClick={handleWhatsApp} 
            style={{ 
              flex: 1, 
              background: '#25D366', 
              color: 'white', 
              fontSize: '13px', 
              padding: '12px',
              boxShadow: 'none'
            }}
          >
            <MessageCircle size={16} />
            {language === 'hi' ? "ज्योतिषी से बात करें" : "Talk to Astrologer"}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleEmail} 
            style={{ flex: 1, fontSize: '13px', padding: '12px' }}
          >
            <Mail size={16} />
            {language === 'hi' ? "हमें ईमेल करें" : "Email Us"}
          </button>
        </div>
      </div>

      {/* Complete Pilgrimage Button */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 16px' }}>
        <button 
          className="btn" 
          onClick={() => navigate('/')} 
          style={{ width: '100%', maxWidth: '280px', padding: '14px 0' }}
        >
          {t.doneBtn}
        </button>
      </div>

      {/* Interactive Detail Modals */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-card" style={{ maxWidth: '500px', textAlign: 'left', alignItems: 'flex-start' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px', borderBottom: '1px solid rgba(224,192,151,0.2)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles color="var(--accent)" size={20} />
                <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', margin: 0 }}>
                  {activeModal === 'destiny' && "Life Path & Destiny"}
                  {activeModal === 'strengths' && "Strengths & Challenges"}
                  {activeModal === 'compatibility' && "Love Compatibility"}
                  {activeModal === 'remedies' && "Remedies & Guidance"}
                </h3>
              </div>
              <X color="var(--text-secondary)" size={20} style={{ cursor: 'pointer' }} onClick={() => setActiveModal(null)} />
            </div>

            {/* Destiny Modal Content */}
            {activeModal === 'destiny' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'rgba(122, 75, 148, 0.15)', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px', color: 'var(--accent)', fontFamily: 'Cinzel' }}>7</span>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '14px', margin: 0 }}>Life Path Number: 7 (The Seeker)</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>You are a deep thinker and searcher of truth.</span>
                  </div>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
                  Your foot outline coordinates align closely with Life Path Number 7, indicating a highly spiritual, introspective, and analytical path. You are naturally drawn to mystical sciences, wisdom, and deep life questions.
                </p>
                <h5 style={{ color: 'var(--accent)', fontSize: '14px', margin: '14px 0 6px' }}>Destiny Highlights:</h5>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  • You find peace in solitary reflection.<br/>
                  • You are highly intuitive—your gut feelings rarely lead you astray.<br/>
                  • Your destiny calls you to teach or share deep wisdom with the world.
                </p>
              </div>
            )}

            {/* Strengths & Challenges Content */}
            {activeModal === 'strengths' && (
              <div>
                <h5 style={{ color: 'var(--success)', fontSize: '14px', marginBottom: '6px' }}>Core Strengths:</h5>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                  Your practical sole structure gives you great resilience. You have a balanced mind and can stay calm in chaotic situations. Loyalty is your biggest asset.
                </p>
                <h5 style={{ color: 'var(--danger)', fontSize: '14px', marginBottom: '6px' }}>Cosmic Challenges:</h5>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  You sometimes struggle to trust others, leading to isolation. Remember that vulnerability is not weakness. Focus on opening your heart chakra.
                </p>
              </div>
            )}

            {/* Compatibility Content */}
            {activeModal === 'compatibility' && (
              <div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  Your {footTypeTitle} is naturally aligned with certain elemental forces. Here is your cosmic compatibility index:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                    <span style={{ color: '#FFFFFF', fontSize: '13.5px' }}>Love & Romance:</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>88% (Highly Compatible with Water Foot)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                    <span style={{ color: '#FFFFFF', fontSize: '13.5px' }}>Friendship:</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>92% (Aligned with Earth & Air elements)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                    <span style={{ color: '#FFFFFF', fontSize: '13.5px' }}>Business Partnerships:</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>80% (Best with stable Earth elements)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Remedies & Guidance Content */}
            {activeModal === 'remedies' && (
              <div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  To balance your planetary elements and remove obstacles, perform these customized remedies:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ backgroundColor: 'rgba(15, 5, 29, 0.5)', padding: '10px', borderRadius: '8px' }}>
                    <h5 style={{ color: 'var(--accent)', fontSize: '13.5px', margin: '0 0 4px' }}>Grounding Practice</h5>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>Walk barefoot on green grass for 10 minutes every morning to align your Earth element.</p>
                  </div>
                  <div style={{ backgroundColor: 'rgba(15, 5, 29, 0.5)', padding: '10px', borderRadius: '8px' }}>
                    <h5 style={{ color: 'var(--accent)', fontSize: '13.5px', margin: '0 0 4px' }}>Gemstone Suggestion</h5>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>Wearing a yellow sapphire or carrying tiger's eye quartz will enhance focus and ward off negative planetary transits.</p>
                  </div>
                  <div style={{ backgroundColor: 'rgba(15, 5, 29, 0.5)', padding: '10px', borderRadius: '8px' }}>
                    <h5 style={{ color: 'var(--accent)', fontSize: '13.5px', margin: '0 0 4px' }}>Cosmic Mantra</h5>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>Chant "Om Namah Shivaya" 108 times daily to harmonize your inner energy nodes.</p>
                  </div>
                </div>
              </div>
            )}

            <button 
              className="btn" 
              onClick={() => setActiveModal(null)}
              style={{ width: '100%', marginTop: '20px', padding: '12px 0', fontSize: '13px' }}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
