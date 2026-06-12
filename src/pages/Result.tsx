import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Sparkles, 
  MessageCircle, 
  Mail, 
  Activity, 
  Heart, 
  Loader,
  Bell,
  ChevronRight,
  ChevronLeft,
  Compass,
  Footprints
} from 'lucide-react';
import { generateDetailedReading } from '../data/podomancy';
import appsoleLogo from '../assets/logo.png';

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

// Zodiac bull outline for Taurus sign in Daily Horoscope
const TaurusSymbol = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" style={{ opacity: 0.35, filter: 'drop-shadow(0 0 5px var(--accent))' }}>
    <circle cx="50" cy="55" r="15" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    <path d="M 32,30 C 40,43 60,43 68,30" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
  </svg>
);

// Zodiac lion outline for Leo sign in Daily Horoscope
const LeoSymbol = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" style={{ opacity: 0.35, filter: 'drop-shadow(0 0 5px var(--accent))' }}>
    <circle cx="42" cy="58" r="8" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    <path d="M 50,58 C 55,58 65,50 60,38 C 55,26 42,32 46,45 C 50,58 65,65 72,55" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
  </svg>
);

// Zodiac scales outline for Libra sign in Daily Horoscope
const LibraSymbol = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" style={{ opacity: 0.35, filter: 'drop-shadow(0 0 5px var(--accent))' }}>
    <line x1="25" y1="65" x2="75" y2="65" stroke="var(--accent)" strokeWidth="2.5" />
    <path d="M 25,52 L 40,52 C 40,40 60,40 60,52 L 75,52" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
  </svg>
);

const getPrintReportDetails = (isEarth: boolean, isWater: boolean, isFire: boolean, isAir: boolean) => {
  if (isWater) {
    // Read to satisfy TS compiler unused variable check
  }
  if (isEarth) {
    return {
      en: {
        title: "Detailed Astrological Metrics",
        lifePathNum: "8",
        lifePathTitle: "Life Path Number: 8 (The Executive)",
        lifePathDesc: "You are a natural planner, builder, and organizer of material wealth.",
        destinyTitle: "✦ Life Path & Destiny",
        destinyText: "Your foot outline coordinates align closely with Life Path Number 8, indicating a highly practical, stable, and career-driven destiny. You are meant to create lasting systems and achieve material success.",
        destinyHighlightsTitle: "Destiny Highlights:",
        destinyHighlights: [
          "You build your life on solid, realistic foundations.",
          "Your patience is your superpower in achieving goals.",
          "You have strong executive leadership potential."
        ],
        strengthsTitle: "✦ Strengths & Challenges",
        strengthsLabel: "Core Strengths:",
        strengthsText: "Your practical sole structure gives you great resilience. You have a balanced mind and can stay calm in chaotic situations. Loyalty is your biggest asset.",
        challengesLabel: "Cosmic Challenges:",
        challengesText: "You can be stubborn and resistant to unexpected changes. Remember that flexibility is also a strength. Focus on opening your heart chakra.",
        compatibilityTitle: "✦ Love & Compatibility",
        compatibilityText: "Your foot structure is naturally aligned with stable forces. Here is your cosmic compatibility index:",
        compatibilityIndices: [
          { label: "Love & Romance:", value: "90% (Highly Compatible with Earth & Water Foot)" },
          { label: "Friendship:", value: "95% (Aligned with stable Earth elements)" },
          { label: "Business Partnerships:", value: "88% (Best with target-oriented Earth elements)" }
        ],
        remediesTitle: "✦ Remedies & Guidance",
        remediesText: "To balance your planetary elements and remove obstacles, perform these customized remedies:",
        remedies: [
          { name: "Grounding Practice", desc: "Walk barefoot on green grass for 10 minutes every morning to align your Earth element." },
          { name: "Gemstone Suggestion", desc: "Wearing a Tiger's Eye or Hessonite quartz will enhance focus and ward off negative planetary transits." },
          { name: "Cosmic Mantra", desc: "Chant 'Om Budhaya Namah' or 'Om Namo Bhagavate Vasudevaya' 108 times daily to harmonize your inner energy." }
        ],
        horoscopeSign: "Taurus",
        horoscopeSymbol: "♉",
        horoscopeText: "Focus on grounding yourself today. Stability will bring you peace.",
        horoscopeSymbolIcon: <TaurusSymbol />
      },
      hi: {
        title: "विस्तृत ज्योतिषीय विश्लेषण (Astrological Metrics)",
        lifePathNum: "8",
        lifePathTitle: "जीवन पथ संख्या: 8 (कार्यकारी)",
        lifePathDesc: "आप भौतिक संपदा के एक प्राकृतिक योजनाकार, निर्माता और आयोजक हैं।",
        destinyTitle: "✦ जीवन पथ और नियति (Life Path & Destiny)",
        destinyText: "आपके पैर की रूपरेखा के समन्वय जीवन पथ संख्या 8 के साथ संरेखित हैं, जो एक व्यावहारिक और स्थिर भाग्य का संकेत देते हैं। आप स्थायी प्रणालियाँ बनाने और भौतिक सफलता प्राप्त करने के हकदार हैं।",
        destinyHighlightsTitle: "नियति की मुख्य विशेषताएं (Destiny Highlights):",
        destinyHighlights: [
          "आप अपने जीवन का निर्माण ठोस आधार पर करते हैं।",
          "लक्ष्यों को प्राप्त करने में आपका धैर्य आपकी सबसे बड़ी शक्ति है।",
          "आपके पास मजबूत नेतृत्व क्षमता है।"
        ],
        strengthsTitle: "✦ ताकत और चुनौतियां (Strengths & Challenges)",
        strengthsLabel: "मुख्य ताकत (Core Strengths):",
        strengthsText: "आपके पास एक संतुलित दिमाग है और आप अराजक परिस्थितियों में भी शांत रह सकते हैं। वफादारी आपकी सबसे बड़ी पूंजी है।",
        challengesLabel: "ब्रह्मांडीय चुनौतियां (Cosmic Challenges):",
        challengesText: "आप कभी-कभी जिद्दी हो सकते हैं और अप्रत्याशित परिवर्तनों का विरोध कर सकते हैं। याद रखें कि लचीलापन भी एक ताकत है। अपने हृदय चक्र को जागृत करने पर ध्यान दें।",
        compatibilityTitle: "✦ प्रेम और अनुकूलता (Love Compatibility)",
        compatibilityText: "आपका पैर ढांचा स्वाभाविक रूप से स्थिर शक्तियों के साथ संरेखित है। यहाँ आपका ब्रह्मांडीय अनुकूलता सूचकांक है:",
        compatibilityIndices: [
          { label: "प्रेम और रोमांस (Love & Romance):", value: "90% (पृथ्वी और जल पैर के साथ अत्यधिक अनुकूल)" },
          { label: "मित्रता (Friendship):", value: "95% (स्थिर पृथ्वी तत्वों के साथ संरेखित)" },
          { label: "व्यावसायिक साझेदारी (Business Partnerships):", value: "88% (लक्षय-उन्मुख पृथ्वी तत्वों के साथ सर्वोत्तम)" }
        ],
        remediesTitle: "✦ उपाय और मार्गदर्शन (Remedies & Guidance)",
        remediesText: "अपने ग्रहीय तत्वों को संतुलित करने और बाधाओं को दूर करने के लिए, इन अनुकूलित उपायों का पालन करें:",
        remedies: [
          { name: "ग्राउंडिंग अभ्यास (Grounding Practice)", desc: "अपने पृथ्वी तत्व को संतुलित करने के लिए हर सुबह 10 मिनट हरी घास पर नंगे पैर चलें।" },
          { name: "रत्न सुझाव (Gemstone Suggestion)", desc: "टाइगर आई या गोमेद धारण करना ध्यान को बढ़ाएगा और नकारात्मक ग्रहीय प्रभावों को दूर करेगा।" },
          { name: "ब्रह्मांडीय मंत्र (Cosmic Mantra)", desc: "अपने आंतरिक ऊर्जा नोड्स को अनुकूल बनाने के लिए प्रतिदिन 108 बार 'ॐ बुधाय नमः' या 'ॐ नमो भगवते वासुदेवाय' का जाप करें।" }
        ],
        horoscopeSign: "वृषभ (Taurus)",
        horoscopeSymbol: "♉",
        horoscopeText: "आज अपने आप को स्थिर करने पर ध्यान दें। स्थिरता आपको शांति प्रदान करेगी।",
        horoscopeSymbolIcon: <TaurusSymbol />
      }
    };
  } else if (isFire) {
    return {
      en: {
        title: "Detailed Astrological Metrics",
        lifePathNum: "1",
        lifePathTitle: "Life Path Number: 1 (The Leader)",
        lifePathDesc: "You are a charismatic, independent, and goal-oriented leader.",
        destinyTitle: "✦ Life Path & Destiny",
        destinyText: "Your foot outline coordinates align closely with Life Path Number 1, indicating an adventurous, passionate, and pioneering destiny. You are built for leadership, creation, and inspiring others.",
        destinyHighlightsTitle: "Destiny Highlights:",
        destinyHighlights: [
          "You thrive in competitive and high-energy roles.",
          "Your charisma attracts opportunities and powerful allies.",
          "You are destined to initiate change and break new ground."
        ],
        strengthsTitle: "✦ Strengths & Challenges",
        strengthsLabel: "Core Strengths:",
        strengthsText: "Your vibrant energy, courage, and motivation are unmatched. You naturally take charge and possess a magnetic presence.",
        challengesLabel: "Cosmic Challenges:",
        challengesText: "Impatience and quick temper can sometimes cloud your judgment. Practicing breath control helps channel fire constructively.",
        compatibilityTitle: "✦ Love & Compatibility",
        compatibilityText: "Your foot structure is naturally aligned with fiery forces. Here is your cosmic compatibility index:",
        compatibilityIndices: [
          { label: "Love & Romance:", value: "92% (Highly Compatible with Fire & Air Foot)" },
          { label: "Friendship:", value: "85% (Best with active Fire elements)" },
          { label: "Business Partnerships:", value: "82% (Best with communicative Air elements)" }
        ],
        remediesTitle: "✦ Remedies & Guidance",
        remediesText: "To balance your planetary elements and remove obstacles, perform these customized remedies:",
        remedies: [
          { name: "Sun Salutation (Surya Namaskar)", desc: "Perform 5 rounds of Surya Namaskar at sunrise to channel your inner solar plexus energy." },
          { name: "Gemstone Suggestion", desc: "Wearing Red Coral or Ruby will boost focus, energy direction, and neutralize planetary stress." },
          { name: "Cosmic Mantra", desc: "Chant 'Om Ghrini Suryaya Namah' or 'Om Mangalaya Namah' 108 times daily to balance your fiery transits." }
        ],
        horoscopeSign: "Leo",
        horoscopeSymbol: "♌",
        horoscopeText: "Your natural charisma shines today. Step into the spotlight.",
        horoscopeSymbolIcon: <LeoSymbol />
      },
      hi: {
        title: "विस्तृत ज्योतिषीय विश्लेषण (Astrological Metrics)",
        lifePathNum: "1",
        lifePathTitle: "जीवन पथ संख्या: 1 (नेता)",
        lifePathDesc: "आप एक करिश्माई, स्वतंत्र और लक्ष्य-उन्मुख नेता हैं।",
        destinyTitle: "✦ जीवन पथ और नियति (Life Path & Destiny)",
        destinyText: "आपके पैर की रूपरेखा के समन्वय जीवन पथ संख्या 1 के साथ संरेखित हैं, जो एक साहसिक, उत्साही और अग्रणी भाग्य का संकेत देते हैं। आप नेतृत्व, निर्माण और दूसरों को प्रेरित करने के लिए बने हैं।",
        destinyHighlightsTitle: "नियति की मुख्य विशेषताएं (Destiny Highlights):",
        destinyHighlights: [
          "आप प्रतिस्पर्धी और उच्च ऊर्जा वाली भूमिकाओं में फलते-फूलते हैं।",
          "आपका आकर्षण अवसरों और शक्तिशाली सहयोगियों को आकर्षित करता है।",
          "आप बदलाव शुरू करने और नई जमीन तोड़ने के हकदार हैं।"
        ],
        strengthsTitle: "✦ ताकत और चुनौतियां (Strengths & Challenges)",
        strengthsLabel: "मुख्य ताकत (Core Strengths):",
        strengthsText: "आपकी जीवंत ऊर्जा, साहस और प्रेरणा बेजोड़ हैं। आप स्वाभाविक रूप से जिम्मेदारी लेते हैं और एक चुंबकीय उपस्थिति रखते हैं।",
        challengesLabel: "ब्रह्मांडीय चुनौतियां (Cosmic Challenges):",
        challengesText: "अधीरता और गुस्सा कभी-कभी आपके निर्णय को प्रभावित कर सकते हैं। श्वास नियंत्रण का अभ्यास करने से अग्नि ऊर्जा को सकारात्मक रूप से प्रसारित करने में मदद मिलती है।",
        compatibilityTitle: "✦ प्रेम और अनुकूलता (Love Compatibility)",
        compatibilityText: "आपका पैर ढांचा स्वाभाविक रूप से उग्र शक्तियों के साथ संरेखित है। यहाँ आपका ब्रह्मांडीय अनुकूलता सूचकांक है:",
        compatibilityIndices: [
          { label: "प्रेम और रोमांस (Love & Romance):", value: "92% (अग्नि और वायु पैर के साथ अत्यधिक अनुकूल)" },
          { label: "मित्रता (Friendship):", value: "85% (सक्रिय अग्नि तत्वों के साथ सर्वोत्तम)" },
          { label: "व्यावसायिक साझेदारी (Business Partnerships):", value: "82% (संचार-कुशल वायु तत्वों के साथ सर्वोत्तम)" }
        ],
        remediesTitle: "✦ उपाय और मार्गदर्शन (Remedies & Guidance)",
        remediesText: "अपने ग्रहीय तत्वों को संतुलित करने और बाधाओं को दूर करने के लिए, इन अनुकूलित उपायों का पालन करें:",
        remedies: [
          { name: "सूर्य नमस्कार (Surya Namaskar)", desc: "अपनी आंतरिक सौर ऊर्जा को प्रसारित करने के लिए सूर्योदय के समय 5 चक्र सूर्य नमस्कार करें।" },
          { name: "रत्न सुझाव (Gemstone Suggestion)", desc: "लाल मूंगा या माणिक धारण करना ध्यान और ऊर्जा को बढ़ावा देगा और ग्रहीय तनाव को कम करेगा।" },
          { name: "ब्रह्मांडीय मंत्र (Cosmic Mantra)", desc: "अपने उग्र गोचर को संतुलित करने के लिए प्रतिदिन 108 बार 'ॐ घृणि सूर्याय नमः' या 'ॐ मंगलाय नमः' का जाप करें।" }
        ],
        horoscopeSign: "सिंह (Leo)",
        horoscopeSymbol: "♌",
        horoscopeText: "आपका स्वाभाविक आकर्षण आज चमकेगा। सुर्खियों में कदम रखें और आगे बढ़ें।",
        horoscopeSymbolIcon: <LeoSymbol />
      }
    };
  } else if (isAir) {
    return {
      en: {
        title: "Detailed Astrological Metrics",
        lifePathNum: "5",
        lifePathTitle: "Life Path Number: 5 (The Visionary)",
        lifePathDesc: "You are a creative thinker, communicator, and lover of freedom.",
        destinyTitle: "✦ Life Path & Destiny",
        destinyText: "Your foot outline coordinates align closely with Life Path Number 5, indicating an intellectual, communicative, and free-spirited destiny. You are meant to share ideas, travel, and bring people together.",
        destinyHighlightsTitle: "Destiny Highlights:",
        destinyHighlights: [
          "You possess an insatiable curiosity about the world.",
          "Your eloquence and quick wit resolve conflicts easily.",
          "You are destined to explore diverse environments and cultures."
        ],
        strengthsTitle: "✦ Strengths & Challenges",
        strengthsLabel: "Core Strengths:",
        strengthsText: "Highly analytical, rational, and adaptable. You are an excellent mediator and hold a broad, open-minded perspective.",
        challengesLabel: "Cosmic Challenges:",
        challengesText: "Overthinking and mental restlessness can cause sleep disruption or indecisiveness. Grounding your thoughts is key.",
        compatibilityTitle: "✦ Love & Compatibility",
        compatibilityText: "Your foot structure is naturally aligned with air elements. Here is your cosmic compatibility index:",
        compatibilityIndices: [
          { label: "Love & Romance:", value: "85% (Highly Compatible with Air & Fire Foot)" },
          { label: "Friendship:", value: "90% (Great with intellectual Air elements)" },
          { label: "Business Partnerships:", value: "86% (Best with stable Earth elements)" }
        ],
        remediesTitle: "✦ Remedies & Guidance",
        remediesText: "To balance your planetary elements and remove obstacles, perform these customized remedies:",
        remedies: [
          { name: "Pranayama Breathing", desc: "Practice Anulom Vilom or alternate nostril breathing for 10 minutes daily to quieten the nervous system." },
          { name: "Gemstone Suggestion", desc: "Wearing Emerald or Aquamarine will balance throat chakra expression and promote mental clarity." },
          { name: "Cosmic Mantra", desc: "Chant 'Om Shram Shreem Shrom Sah Budhaya Namah' or 'Om Shukraya Namah' 108 times daily to harmonize your intellect." }
        ],
        horoscopeSign: "Libra",
        horoscopeSymbol: "♎",
        horoscopeText: "Seek balance in your relationships. Harmony is within reach.",
        horoscopeSymbolIcon: <LibraSymbol />
      },
      hi: {
        title: "विस्तृत ज्योतिषीय विश्लेषण (Astrological Metrics)",
        lifePathNum: "5",
        lifePathTitle: "जीवन पथ संख्या: 5 (दूरदर्शी)",
        lifePathDesc: "आप एक रचनात्मक विचारक, संचारक और स्वतंत्रता के प्रेमी हैं।",
        destinyTitle: "✦ जीवन पथ और नियति (Life Path & Destiny)",
        destinyText: "आपके पैर की रूपरेखा के समन्वय जीवन पथ संख्या 5 के साथ संरेखित हैं, जो एक बौद्धिक, संचारी और स्वतंत्र भाग्य का संकेत देते हैं। आप विचारों को साझा करने, यात्रा करने और लोगों को एक साथ लाने के लिए बने हैं।",
        destinyHighlightsTitle: "नियति की मुख्य विशेषताएं (Destiny Highlights):",
        destinyHighlights: [
          "आपके पास दुनिया के बारे में एक अतृप्त जिज्ञासा है।",
          "आपकी वाक्पटुता और त्वरित बुद्धि संघर्षों को आसानी से सुलझाती है।",
          "आप विविध वातावरणों और संस्कृतियों का पता लगाने के हकदार हैं।"
        ],
        strengthsTitle: "✦ ताकत और चुनौतियां (Strengths & Challenges)",
        strengthsLabel: "मुख्य ताकत (Core Strengths):",
        strengthsText: "अत्यधिक विश्लेषणात्मक, तर्कसंगत और अनुकूलनीय। आप एक उत्कृष्ट मध्यस्थ हैं और एक व्यापक, खुले विचारों वाले दृष्टिकोण रखते हैं।",
        challengesLabel: "ब्रह्मांडीय चुनौतियां (Cosmic Challenges):",
        challengesText: "अति-सोच (overthinking) और मानसिक बेचैनी नींद में व्यवधान या अनिर्णय का कारण बन सकती है। अपने विचारों को स्थिर रखना महत्वपूर्ण है।",
        compatibilityTitle: "✦ प्रेम और अनुकूलता (Love Compatibility)",
        compatibilityText: "का पैर ढांचा स्वाभाविक रूप से वायु तत्वों के साथ संरेखित है। यहाँ आपका ब्रह्मांडीय अनुकूलता सूचकांक है:",
        compatibilityIndices: [
          { label: "प्रेम और रोमांस (Love & Romance):", value: "85% (वायु और अग्नि पैर के साथ अत्यधिक अनुकूल)" },
          { label: "मित्रता (Friendship):", value: "90% (बौद्धिक वायु तत्वों के साथ बढ़िया)" },
          { label: "व्यावसायिक साझेदारी (Business Partnerships):", value: "86% (स्थिर पृथ्वी तत्वों के साथ सर्वोत्तम)" }
        ],
        remediesTitle: "✦ उपाय और मार्गदर्शन (Remedies & Guidance)",
        remediesText: "अपने ग्रहीय तत्वों को संतुलित करने और बाधाओं को दूर करने के लिए, इन अनुकूलित उपायों का पालन करें:",
        remedies: [
          { name: "प्राणायाम श्वास अभ्यास (Pranayama)", desc: "तंत्रिका तंत्र को शांत करने के लिए प्रतिदिन 10 मिनट अनुलोम विलोम प्राणायाम का अभ्यास करें।" },
          { name: "रत्न सुझाव (Gemstone Suggestion)", desc: "पन्ना या एक्वामरीन धारण करना विशुद्ध चक्र की अभिव्यक्ति को संतुलित करेगा और मानसिक स्पष्टता को बढ़ावा देगा।" },
          { name: "ब्रह्मांडीय मंत्र (Cosmic Mantra)", desc: "अपनी बुद्धि को सामंजस्यपूर्ण बनाने के लिए प्रतिदिन 108 बार 'ॐ बुं बुधाय नमः' या 'ॐ शुक्राय नमः' का जाप करें।" }
        ],
        horoscopeSign: "तुला (Libra)",
        horoscopeSymbol: "♎",
        horoscopeText: "अपने रिश्तों में संतुलन तलाशें। आपसी सद्भाव और शांति अब आपकी पहुंच में है।",
        horoscopeSymbolIcon: <LibraSymbol />
      }
    };
  } else {
    // Default to Water (Egyptian / Cancer)
    return {
      en: {
        title: "Detailed Astrological Metrics",
        lifePathNum: "7",
        lifePathTitle: "Life Path Number: 7 (The Seeker)",
        lifePathDesc: "You are a deep thinker and searcher of truth.",
        destinyTitle: "✦ Life Path & Destiny",
        destinyText: "Your foot outline coordinates align closely with Life Path Number 7, indicating a highly spiritual, introspective, and analytical path. You are naturally drawn to mystical sciences, wisdom, and deep life questions.",
        destinyHighlightsTitle: "Destiny Highlights:",
        destinyHighlights: [
          "You find peace in solitary reflection.",
          "You are highly intuitive—your gut feelings rarely lead you astray.",
          "Your destiny calls you to teach or share deep wisdom with the world."
        ],
        strengthsTitle: "✦ Strengths & Challenges",
        strengthsLabel: "Core Strengths:",
        strengthsText: "Your practical sole structure gives you great resilience. You have a balanced mind and can stay calm in chaotic situations. Loyalty is your biggest asset.",
        challengesLabel: "Cosmic Challenges:",
        challengesText: "You sometimes struggle to trust others, leading to isolation. Remember that vulnerability is not weakness. Focus on opening your heart chakra.",
        compatibilityTitle: "✦ Love & Compatibility",
        compatibilityText: "Your foot structure is naturally aligned with certain elemental forces. Here is your cosmic compatibility index:",
        compatibilityIndices: [
          { label: "Love & Romance:", value: "88% (Highly Compatible with Water Foot)" },
          { label: "Friendship:", value: "92% (Aligned with Earth & Air elements)" },
          { label: "Business Partnerships:", value: "80% (Best with stable Earth elements)" }
        ],
        remediesTitle: "✦ Remedies & Guidance",
        remediesText: "To balance your planetary elements and remove obstacles, perform these customized remedies:",
        remedies: [
          { name: "Grounding Practice", desc: "Walk barefoot on green grass for 10 minutes every morning to align your Earth element." },
          { name: "Gemstone Suggestion", desc: "Wearing a yellow sapphire or carrying tiger's eye quartz will enhance focus and ward off negative planetary transits." },
          { name: "Cosmic Mantra", desc: "Chant \"Om Namah Shivaya\" 108 times daily to harmonize your inner energy nodes." }
        ],
        horoscopeSign: "Cancer",
        horoscopeSymbol: "♋",
        horoscopeText: "Trust your intuition, it is stronger than ever right now.",
        horoscopeSymbolIcon: <CancerSymbol />
      },
      hi: {
        title: "विस्तृत ज्योतिषीय विश्लेषण (Astrological Metrics)",
        lifePathNum: "7",
        lifePathTitle: "जीवन पथ संख्या: 7 (The Seeker)",
        lifePathDesc: "आप सत्य के गहरे विचारक और खोजक हैं।",
        destinyTitle: "✦ जीवन पथ और नियति (Life Path & Destiny)",
        destinyText: "आपके पैर की रूपरेखा के समन्वय जीवन पथ संख्या 7 के साथ निकटता से संरेखित होते हैं, जो एक अत्यधिक आध्यात्मिक, आत्मनिरीक्षण और विश्लेषणात्मक जीवन पथ का संकेत देते हैं। आप स्वाभाविक रूप से रहस्यमय विज्ञान, ज्ञान और गहरे जीवन के प्रश्नों की ओर आकर्षित हैं।",
        destinyHighlightsTitle: "नियति की मुख्य विशेषताएं (Destiny Highlights):",
        destinyHighlights: [
          "आप एकांत चिंतन में शांति पाते हैं।",
          "आप अत्यधिक सहज हैं—यानी आपकी आंतरिक भावनाएं (gut feelings) शायद ही कभी गलत साबित होती हैं।",
          "आपकी नियति आपको दुनिया के साथ गहरा ज्ञान साझा करने या सिखाने के लिए बुलाती है।"
        ],
        strengthsTitle: "✦ ताकत और चुनौतियां (Strengths & Challenges)",
        strengthsLabel: "मुख्य ताकत (Core Strengths):",
        strengthsText: "आपके पास एक संतुलित दिमाग है और आप अराजक परिस्थितियों में भी शांत रह सकते हैं। वफादारी आपकी सबसे बड़ी पूंजी है।",
        challengesLabel: "ब्रह्मांडीय चुनौतियां (Cosmic Challenges):",
        challengesText: "आप कभी-कभी दूसरों पर भरोसा करने में संघर्ष करते हैं, जिससे अलगाव की भावना पैदा हो सकती है। याद रखें कि अपनी कोमल भावनाएं जताना (vulnerability) कमजोरी नहीं है। अपने हृदय चक्र (heart chakra) को जागृत करने पर ध्यान दें।",
        compatibilityTitle: "✦ प्रेम और अनुकूलता (Love Compatibility)",
        compatibilityText: "आपका पैर ढांचा स्वाभाविक रूप से कुछ तत्वों की शक्तियों के साथ संरेखित है। यहाँ आपका ब्रह्मांडीय अनुकूलता सूचकांक है:",
        compatibilityIndices: [
          { label: "प्रेम और रोमांस (Love & Romance):", value: "88% (जल पैर के साथ अत्यधिक अनुकूल)" },
          { label: "मित्रता (Friendship):", value: "92% (पृथ्वी और वायु तत्वों के साथ संरेखित)" },
          { label: "व्यावसायिक साझेदारी (Business Partnerships):", value: "80% (स्थिर पृथ्वी तत्वों के साथ सर्वोत्तम)" }
        ],
        remediesTitle: "✦ उपाय और मार्गदर्शन (Remedies & Guidance)",
        remediesText: "अपने ग्रहीय तत्वों को संतुलित करने और बाधाओं को दूर करने के लिए, इन अनुकूलित उपायों का पालन करें:",
        remedies: [
          { name: "अर्थिंग / ग्राउंडिंग अभ्यास (Grounding Practice)", desc: "अपने पृथ्वी तत्व को संतुलित करने के लिए हर सुबह 10 मिनट हरी घास पर नंगे पैर चलें।" },
          { name: "रत्न सुझाव (Gemstone Suggestion)", desc: "पुखराज (yellow sapphire) धारण करना या टाइगर आई क्वार्ट्ज पास रखना ध्यान को बढ़ाएगा और नकारात्मक ग्रहीय प्रभावों को दूर करेगा।" },
          { name: "ब्रह्मांडीय मंत्र (Cosmic Mantra)", desc: "अपने आंतरिक ऊर्जा नोड्स को अनुकूल बनाने के लिए प्रतिदिन 108 बार \"ओम नमः शिवाय\" का जाप करें।" }
        ],
        horoscopeSign: "Cancer",
        horoscopeSymbol: "♋",
        horoscopeText: "Trust your intuition, it is stronger than ever right now.",
        horoscopeSymbolIcon: <CancerSymbol />
      }
    };
  }
};

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { name = 'User', language: stateLanguage = 'en' } = location.state || {};
  
  const [reading, setReading] = useState<ReturnType<typeof generateDetailedReading> | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>(stateLanguage);
  
  // Tab control: 'overview' | 'left' | 'right'
  const [activeTab, setActiveTab] = useState<'overview' | 'left' | 'right'>('overview');
  
  // Metric expansion state
  const [expandedMetrics, setExpandedMetrics] = useState<Record<string, boolean>>({
    destiny: false,
    strengths: false,
    compatibility: false,
    remedies: false
  });

  const toggleMetric = (key: string) => {
    setExpandedMetrics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Paywall states
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);



  useEffect(() => {
    // Generate reading once on mount
    setReading(generateDetailedReading());

    // Dynamically inject Razorpay Checkout script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = async () => {
    setIsPaying(true);
    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

    if (!keyId) {
      alert("Razorpay Key ID is missing! Please configure VITE_RAZORPAY_KEY_ID in your .env file to run payments.");
      setIsPaying(false);
      return;
    }

    try {
      // 1. Try to create Order ID via backend API
      let orderId = "";
      try {
        const response = await fetch('/api/create-order', {
          method: 'POST',
        });
        if (response.ok) {
          const order = await response.json();
          orderId = order.id;
        }
      } catch (backendError) {
        console.warn("Backend order creation failed, falling back to client-side checkout:", backendError);
      }

      const options = {
        key: keyId,
        amount: 1100, // ₹11.00 (1100 paise)
        currency: "INR",
        name: "AstroSole",
        description: "Unlock Premium AstroSole Astrological Report",
        ...(orderId ? { order_id: orderId } : {}), // Bind order_id if backend succeeded
        handler: async function (paymentResponse: { razorpay_order_id?: string; razorpay_payment_id: string; razorpay_signature?: string }) {
          setIsPaying(true);
          
          // If backend generated the order, verify signature on backend
          if (orderId && paymentResponse.razorpay_signature) {
            try {
              const verifyResponse = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                }),
              });

              const verifyResult = await verifyResponse.json();
              if (verifyResult.success) {
                setIsUnlocked(true);
                setShowPaymentModal(false);
              } else {
                alert(verifyResult.message || "Payment verification failed.");
              }
            } catch (verifyError) {
              console.error("Verification failed:", verifyError);
              alert("An error occurred during payment verification.");
            } finally {
              setIsPaying(false);
            }
          } else {
            // Client-side checkout fallback (for local test/demo environments)
            setIsUnlocked(true);
            setShowPaymentModal(false);
            setIsPaying(false);
          }
        },
        prefill: {
          name: name,
          email: "user@astrosole.in",
          contact: "9999999999"
        },
        theme: {
          color: "#A855F7",
        },
        modal: {
          ondismiss: function() {
            setIsPaying(false);
          }
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to initiate payment. Please try again.");
      setIsPaying(false);
    }
  };

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

  const handleFeedback = () => {
    const message = `Hello AstroSole Team, I would like to share feedback:`;
    window.open(`https://wa.me/917003891953?text=${encodeURIComponent(message)}`, '_blank');
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
      `• Toe Alignment: ${reading.detected.toe[langLabel]}`,
      `• Arch Profile: ${reading.detected.arch[langLabel]}`,
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

  // Dynamic Foot Type details
  const isEarth = reading.detected.shape.en.includes("Earth") || reading.detected.shape.en.includes("Roman");
  const isWater = reading.detected.shape.en.includes("Water") || reading.detected.shape.en.includes("Egyptian");
  const isFire = reading.detected.shape.en.includes("Fire") || reading.detected.shape.en.includes("Greek");
  const isAir = reading.detected.shape.en.includes("Air") || reading.detected.shape.en.includes("Square");

  const printReportDetails = getPrintReportDetails(isEarth, isWater, isFire, isAir);
  const pData = printReportDetails[language];

  // Elements percentages
  const elements = [
    { name: language === 'hi' ? 'पृथ्वी (Earth)' : 'Earth', val: isEarth ? 60 : 15, color: "var(--accent)", symbol: <EarthSymbol /> },
    { name: language === 'hi' ? 'जल (Water)' : 'Water', val: isWater ? 60 : 15, color: "#2B7DE9", symbol: <WaterSymbol /> },
    { name: language === 'hi' ? 'अग्नि (Fire)' : 'Fire', val: isFire ? 60 : 15, color: "#FF6B6B", symbol: <FireSymbol /> },
    { name: language === 'hi' ? 'वायु (Air)' : 'Air', val: isAir ? 60 : 10, color: "#EAEAEA", symbol: <AirSymbol /> }
  ];
  // Sort elements so highest is first
  elements.sort((a, b) => b.val - a.val);

  const footTypeTitle = isEarth ? "Earth Foot" : isWater ? "Water Foot" : isFire ? "Fire Foot" : "Air Foot";
  const footTypeDesc = isEarth 
    ? (language === 'hi' ? "व्यावहारिक, स्थिर और भरोसेमंद। आप सुरक्षा और सच्चाई को महत्व देते हैं।" : "Grounded, stable and practical. You are dependable and value security.")
    : isWater
    ? (language === 'hi' ? "रहस्यमयी, संवेदनशील और अत्यंत सहज। आप रचनात्मक और भावनात्मक हैं।" : "Mysterious, fluid and highly intuitive. You are creative and emotional.")
    : isFire
    ? (language === 'hi' ? "साहसी, ऊर्जावान और करिश्माई। आप स्वभाव से एक नेता हैं।" : "Adventurous, energetic and charismatic. You are a natural leader.")
    : (language === 'hi' ? "दार्शनिक, मिलनसार और स्वतंत्र। आप बौद्धिक विचारों को महत्व देते हैं।" : "Idealistic, communicative and free. You value intellect and ideas.");

  const footTypeSymbol = isEarth ? <EarthSymbol /> : isWater ? <WaterSymbol /> : isFire ? <FireSymbol /> : <AirSymbol />;

  // Dynamic Highlight tags
  const highlights = [];
  if (isEarth) {
    highlights.push(language === 'hi' ? "स्थिर मन" : "Grounded Mind", language === 'hi' ? "भरोसेमंद" : "Dependable");
  }
  if (isWater) {
    highlights.push(language === 'hi' ? "तीव्र अंतर्ज्ञान" : "High Intuition", language === 'hi' ? "रचनात्मक" : "Creative");
  }
  if (isFire) {
    highlights.push(language === 'hi' ? "साहसी" : "Adventurous", language === 'hi' ? "करिश्माई" : "Charismatic");
  }
  if (isAir) {
    highlights.push(language === 'hi' ? "तार्किक" : "Logical", language === 'hi' ? "मुक्त विचार" : "Open-Minded");
  }
  highlights.push(language === 'hi' ? "स्वतंत्र" : "Independent", language === 'hi' ? "वफादार" : "Loyal");

  // Element Badge details
  const shapeNameEn = reading.detected.shape.en;
  let elementBadge = { text: 'Earth Element 🪨', color: '#E0C097', bg: 'rgba(224, 192, 151, 0.15)' };
  if (shapeNameEn.includes('Water') || shapeNameEn.includes('Egyptian')) {
    elementBadge = { text: language === 'hi' ? 'जल तत्व 💧' : 'Water Element 💧', color: '#2B7DE9', bg: 'rgba(43, 125, 233, 0.15)' };
  } else if (shapeNameEn.includes('Fire') || shapeNameEn.includes('Greek')) {
    elementBadge = { text: language === 'hi' ? 'अग्नि तत्व 🔥' : 'Fire Element 🔥', color: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.15)' };
  } else if (shapeNameEn.includes('Air') || shapeNameEn.includes('Square')) {
    elementBadge = { text: language === 'hi' ? 'वायु तत्व 💨' : 'Air Element 💨', color: '#EAEAEA', bg: 'rgba(234, 234, 234, 0.15)' };
  } else {
    elementBadge = { text: language === 'hi' ? 'पृथ्वी तत्व 🪨' : 'Earth Element 🪨', color: 'var(--accent)', bg: 'rgba(224, 192, 151, 0.15)' };
  }

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
    <div className="container fade-in-up" style={{ paddingBottom: '32px' }}>
      
      {/* Top Navbar Header */}
      <header className="app-header" style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ChevronLeft color="var(--accent)" size={22} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
          <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={appsoleLogo} alt="AstroSole Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="lang-toggle-btn" onClick={toggleLanguage}>
            {language === 'en' ? "हिन्दी" : "English"}
          </button>
          <Bell color="var(--accent)" size={20} style={{ cursor: 'pointer' }} />
        </div>
      </header>

      {/* Dynamic Mirror Symmetry Info Box */}
      <div style={{ maxWidth: '600px', margin: '0 auto 15px', padding: '0 10px' }}>
        <div style={{
          fontSize: '12.5px',
          color: 'var(--text-secondary)',
          border: '1px solid rgba(224, 192, 151, 0.25)',
          background: 'rgba(30, 10, 50, 0.4)',
          backdropFilter: 'blur(8px)',
          padding: '16px',
          borderRadius: '16px',
          textAlign: 'justify',
          lineHeight: '1.5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent)', fontWeight: 'bold', fontFamily: 'Cinzel', fontSize: '13px' }}>
            <Footprints size={18} />
            <span>
              {language === 'hi' ? "दोहरा-पैर विश्लेषण और समरूपता (Dual-Foot Symmetry Mapping)" : "Dual-Foot Symmetry Mapping"}
            </span>
          </div>
          {language === 'hi'
            ? "यद्यपि आपने केवल एक पैर की छवि अपलोड की है, हमारे एआई इंजन ने दोनों पैरों का पूर्ण विश्लेषण करने के लिए द्विपक्षीय शारीरिक समरूपता (Bilateral Structural Symmetry) का उपयोग किया है। मानव शरीर में दोनों पैरों की चौड़ाई, मेहराब और उंगलियों के अनुपात में 98% तक प्राकृतिक दर्पण-समरूपता होती है। आपका सक्रिय पैर (दायां) आपके बाहरी भविष्य और करियर को दर्शाता है, जबकि निष्क्रिय पैर (बायां) आपके जन्मजात स्वभाव को दर्शाता है। इस प्रकार, एक पैर के सटीक स्कैन से दोनों पैरों की ग्रहीय रेखाओं का आकलन किया जाता है।"
            : "Even though you uploaded a single foot picture, our AI engine reconstructs the bilateral structural symmetries to map both feet. In Podomancy, the human body exhibits mirrored skeletal dimensions (width, arch, and toe length ratios), which are 98% symmetrical. The active foot (usually right) represents your outer path and career, while the passive foot (left) maps your innate character and past karmas. By analyzing the contours of your uploaded sole, AstroSole accurately mirrors the structural baseline and extrapolates the corresponding energy nodes."
          }
        </div>
      </div>

      {!isUnlocked ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto', padding: '10px' }}>
          {/* Overall Details Paragraph */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'left', margin: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Sparkles color="var(--accent)" size={32} style={{ margin: '0 auto 12px' }} className="animate-pulse" />
              <h2 style={{ fontFamily: 'Cinzel', fontSize: '20px', color: 'var(--accent)', marginBottom: '8px' }}>
                {language === 'hi' ? "पैर का विश्लेषण (Foot Analysis Summary)" : "Foot Analysis Summary"}
              </h2>
            </div>

            {/* Paragraph 1 */}
            <p style={{ fontSize: '14.5px', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '16px', textAlign: 'justify' }}>
              {language === 'hi'
                ? `प्रिय ${name === 'User' ? 'उपयोगकर्ता' : name}, एस्ट्रोसोल एआई टेलीमेट्री ने आपके पैर के तलवे की रूपरेखा का सफलतापूर्वक मानचित्रण कर लिया है। आपके पैर का ढांचा ${reading?.detected?.shape?.hi || 'पृथ्वी तत्व'} के संरेखण में है, जो व्यावहारिक स्वभाव, महान सहनशीलता और भावनात्मक स्थिरता को दर्शाता है। आपके तलवे की रेखाओं के सूक्ष्म विश्लेषण से पता चलता है कि आपके जीवन पथ की दिशा मजबूत आध्यात्मिक विकास, छिपे हुए रहस्यों के प्रति रुचि और उत्कृष्ट बौद्धिक क्षमता की ओर संकेत करती है।`
                : `Dear ${name === 'User' ? 'User' : name}, the AstroSole AI telemetry has successfully mapped your sole contour coordinates. Your foot shape aligns with the ${reading?.detected?.shape?.en || 'Earth Foot'} structure, reflecting a highly grounded nature, remarkable resilience, and emotional stability. The coordinate readings show strong cosmic alignment with Destiny Node 7, pointing toward unique spiritual growth, natural intuitive insights, and an analytical future path.`
              }
            </p>

            {/* Structural Breakdown (Checklist) */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <h4 style={{ fontFamily: 'Cinzel', fontSize: '14px', color: 'var(--accent)', marginTop: 0, marginBottom: '10px' }}>
                {language === 'hi' ? "खोजे गए ग्रहीय प्रभाव (Detected Planetary Influences)" : "Detected Planetary Influences"}
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>{language === 'hi' ? "बायां पैर (चंद्र संरेखण - जन्मजात प्रतिभा): " : "Left Foot (Moon Alignment - Innate Talents): "}</strong>
                  {language === 'hi' ? "उच्च अंतर्ज्ञान, मजबूत जड़ें और मजबूत भावनात्मक गहराई।" : "High intuition, robust grounding, and emotional depth."}
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>{language === 'hi' ? "दायां पैर (सूर्य संरेखण - भविष्य का मार्ग): " : "Right Foot (Sun Alignment - Future Path): "}</strong>
                  {language === 'hi' ? "आगामी करियर विकास, जीवन पथ 4 के साथ तालमेल और नेतृत्व की क्षमता।" : "Upcoming career acceleration, alignment with Life Path 4, and hidden leadership capacity."}
                </li>
                <li>
                  <strong>{language === 'hi' ? "मुख्य मेहराब और रेखाएं: " : "Arch Profile & Line Mapping: "}</strong>
                  {language === 'hi' ? "सफलता और लचीलेपन का संकेत देने वाला संतुलित संरेखण।" : "Balanced configuration indicating upcoming transformation and high adaptability."}
                </li>
              </ul>
            </div>

            {/* Paragraph 2 */}
            <p style={{ fontSize: '14.5px', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>
              {language === 'hi'
                ? "आपके पैर की रेखाएं एक महत्वपूर्ण आध्यात्मिक चौराहे की ओर इशारा करती हैं। आपके बृहस्पति पर्वत पर मजबूत ग्रहीय प्रभाव है, जो आपके रिश्तों और करियर में नेतृत्व की एक बड़ी छिपी हुई क्षमता को दर्शाता है। इसके अलावा, आपकी उंगलियों की लंबाई और आकार आपके गहरे भावनात्मक संवाद के बारे में अद्वितीय रहस्यों को प्रकट करते हैं, जिन्हें आपके लव इंडेक्स में विस्तृत किया गया है।"
                : "Your foot lines indicate a significant cosmic crossroads approaching. The Mount of Jupiter shows a strong active presence, hinting at a hidden leadership potential that is yet to manifest in your relationships and career. In addition, the length and shape of your toes reveal unique traits about how you communicate your deepest feelings, which we have detailed in your personal Love Index."
              }
            </p>
          </div>

          {/* Paywall Card */}
          <div className="glass-card destiny-glow-card" style={{ 
            padding: '30px 24px', 
            textAlign: 'center', 
            margin: 0,
            border: '2px solid rgba(224, 192, 151, 0.95)',
            background: 'linear-gradient(135deg, rgba(30, 10, 50, 0.85) 0%, rgba(15, 5, 29, 0.95) 100%)',
          }}>
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: '#FFFFFF', marginBottom: '8px' }}>
              {language === 'hi' ? "पूर्ण ज्योतिषीय रिपोर्ट अनलॉक करें" : "Unlock Full Astrological Report"}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.4' }}>
              {language === 'hi'
                ? "सभी प्रमुख खंडों को प्रकट करें: जीवन पथ और नियति, शक्तियाँ और चुनौतियाँ, प्रेम अनुकूलता और ग्रहों के उपाय।"
                : "Reveal all core sections: Life Path & Destiny details, Strengths & Cosmic Challenges, Love Compatibility Index, and Personalized Planetary Remedies."}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '6px', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--accent)' }}>₹0</span>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>₹499</span>
              <span style={{ fontSize: '12px', color: 'yellowgreen', fontWeight: 'bold' }}>(100% OFF)</span>
            </div>

            <button 
              className="btn" 
              onClick={() => setIsUnlocked(true)}
              style={{ 
                width: '100%', 
                maxWidth: '300px', 
                padding: '14px 0', 
                fontSize: '14px', 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #FFE3C0 0%, #F5A623 100%)',
                color: '#0F051D',
                boxShadow: '0 0 25px rgba(245, 166, 35, 0.75)',
                margin: '0 auto',
                display: 'block'
              }}
            >
              {language === 'hi' ? "पूर्ण रिपोर्ट अनलॉक करें" : "Unlock Complete Report"}
            </button>
          </div>

          {/* Complete Pilgrimage Button */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 16px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/')} 
              style={{ width: '100%', maxWidth: '280px', padding: '14px 0' }}
            >
              {t.doneBtn}
            </button>
          </div>
        </div>
      ) : (
        <>
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
                    {language === 'hi'
                      ? (isEarth ? "पृथ्वी पैर (Earth)" : isWater ? "जल पैर (Water)" : isFire ? "अग्नि पैर (Fire)" : "वायु पैर (Air)")
                      : footTypeTitle}
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

            {/* Toe Reading Insights */}
            <div className="glass-card" style={{ margin: 0, padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {language === 'hi' ? "उंगली पठन अंतर्दृष्टि" : "Toe Reading Insights"}
                  </span>
                  <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: '#FFFFFF', margin: '4px 0 8px' }}>
                    {reading.detected.toe[language]}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', maxWidth: '380px', margin: 0 }}>
                    {reading.predictions.toeInsight[language]}
                  </p>
                </div>
                <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px var(--accent))' }}>👣</div>
              </div>
            </div>

            {/* Arch & Balance Profile */}
            <div className="glass-card" style={{ margin: 0, padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {language === 'hi' ? "मेहराब और संतुलन विश्लेषण" : "Arch & Balance Profile"}
                  </span>
                  <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: '#FFFFFF', margin: '4px 0 8px' }}>
                    {reading.detected.arch[language]}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', maxWidth: '380px', margin: 0 }}>
                    {reading.predictions.archInsight[language]}
                  </p>
                </div>
                <div style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px var(--accent))' }}>⚖️</div>
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
                <h4 style={{ fontSize: '12px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {language === 'hi' ? "दैनिक राशिफल" : "Daily Horoscope"}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px', color: 'var(--accent)' }}>{pData.horoscopeSymbol}</span>
                  <h3 style={{ fontFamily: 'Cinzel', fontSize: '20px', color: '#FFFFFF', margin: 0 }}>{pData.horoscopeSign}</h3>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.4', maxWidth: '320px', margin: 0 }}>
                  {pData.horoscopeText}
                </p>
              </div>
              <div>
                {pData.horoscopeSymbolIcon}
              </div>
            </div>

          </div>

          {/* Right Column (Constitutes 40% of layout on desktop) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Detailed Cosmic Readings Card */}
            <div className="glass-card" style={{ margin: 0, padding: '24px' }}>
              <h4 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', marginBottom: '14px', textAlign: 'center' }}>
                {language === 'hi' ? "विस्तृत ब्रह्मांडीय विश्लेषण" : "Detailed Cosmic Readings"}
              </h4>
              
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <ZodiacMeditationOutline />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h5 style={{ color: 'var(--accent)', fontSize: '13.5px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    👤 {language === 'hi' ? "व्यक्तित्व अंतर्दृष्टि" : "Personality Insights"}
                  </h5>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    {reading.predictions.personality[language]}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(224,192,151,0.1)', paddingTop: '12px' }}>
                  <h5 style={{ color: 'var(--accent)', fontSize: '13.5px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🔮 {language === 'hi' ? "भविष्य और करियर" : "Future & Career Forecast"}
                  </h5>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    {reading.predictions.future[language]}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(224,192,151,0.1)', paddingTop: '12px' }}>
                  <h5 style={{ color: 'var(--accent)', fontSize: '13.5px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ❤️ {language === 'hi' ? "प्रेम और संबंध" : "Love & Relationships"}
                  </h5>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    {reading.predictions.relationship[language]}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(224,192,151,0.1)', paddingTop: '12px' }}>
                  <h5 style={{ color: 'var(--accent)', fontSize: '13.5px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🌿 {language === 'hi' ? "स्वास्थ्य और ऊर्जा" : "Health & Energy Vitality"}
                  </h5>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    {reading.predictions.health[language]}
                  </p>
                </div>
              </div>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Astrological Metrics</span>
                {elementBadge && (
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 'bold',
                    color: elementBadge.color, 
                    backgroundColor: elementBadge.bg, 
                    padding: '3px 10px', 
                    borderRadius: '20px',
                    border: `1px solid ${elementBadge.color}40`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {elementBadge.text}
                  </span>
                )}
              </div>
              
              <div className="menu-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', border: 'none', background: 'transparent', padding: 0 }}>
                {/* 1. Life Path & Destiny */}
                <div>
                  <div 
                    className="menu-item-row" 
                    onClick={() => toggleMetric('destiny')} 
                    style={{ margin: 0, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span className="menu-item-left">
                      <Sparkles color="var(--accent)" size={16} />
                      {language === 'hi' ? 'जीवन पथ और नियति (Life Path & Destiny)' : 'Life Path & Destiny'}
                    </span>
                    <ChevronRight 
                      className="screen-only"
                      color="var(--accent)" 
                      size={16} 
                      style={{ 
                        transform: expandedMetrics.destiny ? 'rotate(90deg)' : 'none', 
                        transition: 'transform 0.2s ease' 
                      }} 
                    />
                  </div>
                  <div 
                    className={`metric-content-wrapper ${expandedMetrics.destiny ? 'expanded' : ''}`}
                    style={{ borderBottom: '1px solid rgba(224,192,151,0.1)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(122, 75, 148, 0.15)', padding: '10px', borderRadius: '8px', marginBottom: '12px', marginTop: '10px' }}>
                      <span style={{ fontSize: '24px', color: 'var(--accent)', fontFamily: 'Cinzel' }}>7</span>
                      <div>
                        <h4 style={{ color: '#FFFFFF', fontSize: '13px', margin: 0 }}>Life Path Number: 7 (The Seeker)</h4>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>{language === 'hi' ? 'आप सत्य के गहरे विचारक और खोजक हैं।' : 'You are a deep thinker and searcher of truth.'}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 10px' }}>
                      {pData.destinyText}
                    </p>
                    <h5 style={{ color: 'var(--accent)', fontSize: '13px', margin: '10px 0 4px', fontWeight: 'bold' }}>{pData.destinyHighlightsTitle}</h5>
                    <ul style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: '0 0 10px', paddingLeft: '16px' }}>
                      {pData.destinyHighlights.map((hl, idx) => (
                        <li key={idx} style={{ color: 'var(--text-secondary)' }}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 2. Strengths & Challenges */}
                <div>
                  <div 
                    className="menu-item-row" 
                    onClick={() => toggleMetric('strengths')} 
                    style={{ margin: 0, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span className="menu-item-left">
                      <Activity color="var(--accent)" size={16} />
                      {language === 'hi' ? 'ताकत और चुनौतियां (Strengths & Challenges)' : 'Strengths & Challenges'}
                    </span>
                    <ChevronRight 
                      className="screen-only"
                      color="var(--accent)" 
                      size={16} 
                      style={{ 
                        transform: expandedMetrics.strengths ? 'rotate(90deg)' : 'none', 
                        transition: 'transform 0.2s ease' 
                      }} 
                    />
                  </div>
                  <div 
                    className={`metric-content-wrapper ${expandedMetrics.strengths ? 'expanded' : ''}`}
                    style={{ borderBottom: '1px solid rgba(224,192,151,0.1)' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', paddingBottom: '10px' }}>
                      <div>
                        <h5 style={{ color: 'var(--success)', fontSize: '13px', margin: '0 0 4px', fontWeight: 'bold' }}>{pData.strengthsLabel}</h5>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                          {pData.strengthsText}
                        </p>
                      </div>
                      <div>
                        <h5 style={{ color: 'var(--danger)', fontSize: '13px', margin: '0 0 4px', fontWeight: 'bold' }}>{pData.challengesLabel}</h5>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                          {pData.challengesText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Compatibility */}
                <div>
                  <div 
                    className="menu-item-row" 
                    onClick={() => toggleMetric('compatibility')} 
                    style={{ margin: 0, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span className="menu-item-left">
                      <Heart color="var(--accent)" size={16} />
                      {language === 'hi' ? 'प्रेम और अनुकूलता (Compatibility)' : 'Compatibility'}
                    </span>
                    <ChevronRight 
                      className="screen-only"
                      color="var(--accent)" 
                      size={16} 
                      style={{ 
                        transform: expandedMetrics.compatibility ? 'rotate(90deg)' : 'none', 
                        transition: 'transform 0.2s ease' 
                      }} 
                    />
                  </div>
                  <div 
                    className={`metric-content-wrapper ${expandedMetrics.compatibility ? 'expanded' : ''}`}
                    style={{ borderBottom: '1px solid rgba(224,192,151,0.1)' }}
                  >
                    <div style={{ marginTop: '10px', paddingBottom: '10px' }}>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 10px' }}>
                        {pData.compatibilityText}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                        {pData.compatibilityIndices.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                            <span style={{ color: '#FFFFFF', fontSize: '12.5px' }}>{item.label}</span>
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '12.5px', textAlign: 'right' }}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Remedies & Guidance */}
                <div>
                  <div 
                    className="menu-item-row" 
                    onClick={() => toggleMetric('remedies')} 
                    style={{ margin: 0, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span className="menu-item-left">
                      <Compass color="var(--accent)" size={16} />
                      {language === 'hi' ? 'उपाय और मार्गदर्शन (Remedies & Guidance)' : 'Remedies & Guidance'}
                    </span>
                    <ChevronRight 
                      className="screen-only"
                      color="var(--accent)" 
                      size={16} 
                      style={{ 
                        transform: expandedMetrics.remedies ? 'rotate(90deg)' : 'none', 
                        transition: 'transform 0.2s ease' 
                      }} 
                    />
                  </div>
                  <div 
                    className={`metric-content-wrapper ${expandedMetrics.remedies ? 'expanded' : ''}`}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', paddingBottom: '10px' }}>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 6px' }}>
                        {pData.remediesText}
                      </p>
                      {pData.remedies.map((item, idx) => (
                        <div key={idx} style={{ backgroundColor: 'rgba(15, 5, 29, 0.5)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(224, 192, 151, 0.1)' }}>
                          <h5 style={{ color: 'var(--accent)', fontSize: '13px', margin: '0 0 4px', fontWeight: 'bold' }}>{item.name}</h5>
                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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
        </>
      )}

      {/* Print-Only Detailed Astrology Report Sections */}
      {isUnlocked && reading && (
        <div className="print-only-report-data" style={{ marginTop: '30px' }}>
          <h2 style={{ fontFamily: 'Cinzel', fontSize: '22px', borderBottom: '2px solid black', paddingBottom: '8px', marginBottom: '20px', color: 'black' }}>
            {pData.title}
          </h2>
          
          {/* Destiny Section */}
          <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', margin: '0 0 10px', color: 'black' }}>{pData.destinyTitle}</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 10px', color: 'black' }}>
              {pData.destinyText}
            </p>
            <p style={{ fontSize: '13.5px', lineHeight: '1.5', fontWeight: 'bold', color: 'black' }}>{pData.destinyHighlightsTitle}</p>
            <p style={{ fontSize: '13.5px', lineHeight: '1.5', color: 'black' }}>
              {pData.destinyHighlights.map((hl, idx) => (
                <span key={idx}>• {hl}<br/></span>
              ))}
            </p>
          </div>

          {/* Strengths & Challenges Section */}
          <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', margin: '0 0 10px', color: 'black' }}>{pData.strengthsTitle}</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 8px', color: 'black' }}>
              <strong>{pData.strengthsLabel}</strong> {pData.strengthsText}
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'black' }}>
              <strong>{pData.challengesLabel}</strong> {pData.challengesText}
            </p>
          </div>

          {/* Toe Reading Section */}
          <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', margin: '0 0 10px', color: 'black' }}>
              {language === 'hi' ? "✦ उंगली पठन अंतर्दृष्टि" : "✦ Toe Reading Insights"}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 8px', color: 'black' }}>
              <strong>{reading.detected.toe[language]}:</strong> {reading.predictions.toeInsight[language]}
            </p>
          </div>

          {/* Arch & Balance Section */}
          <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', margin: '0 0 10px', color: 'black' }}>
              {language === 'hi' ? "✦ मेहराब और संतुलन विश्लेषण" : "✦ Arch & Balance Profile"}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 8px', color: 'black' }}>
              <strong>{reading.detected.arch[language]}:</strong> {reading.predictions.archInsight[language]}
            </p>
          </div>

          {/* Love Compatibility Section */}
          <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', margin: '0 0 10px', color: 'black' }}>{pData.compatibilityTitle}</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 10px', color: 'black' }}>
              {pData.compatibilityText}
            </p>
            <ul style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, paddingLeft: '20px', color: 'black' }}>
              {pData.compatibilityIndices.map((item, idx) => (
                <li key={idx}><strong>{item.label}</strong> {item.value}</li>
              ))}
            </ul>
          </div>

          {/* Remedies & Guidance Section */}
          <div style={{ marginBottom: '24px', pageBreakInside: 'avoid' }}>
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', margin: '0 0 10px', color: 'black' }}>{pData.remediesTitle}</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 10px', color: 'black' }}>
              {pData.remediesText}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pData.remedies.map((item, idx) => (
                <div key={idx} style={{ color: 'black' }}>
                  <strong>{idx + 1}. {item.name}:</strong> {item.desc}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}




      {/* Payment simulation gateway modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-card" style={{ maxWidth: '400px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <Sparkles color="var(--accent)" size={36} style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontFamily: 'Cinzel', fontSize: '18px', color: 'var(--accent)', marginBottom: '16px' }}>
              {language === 'hi' ? "सुरक्षित भुगतान गेटवे" : "Secure Payment Gateway"}
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.4' }}>
              {language === 'hi' 
                ? "यह एक डेमो भुगतान अनुकरण (payment simulation) है। अपनी पूर्ण ज्योतिषीय रिपोर्ट तक पहुंचने के लिए नीचे 'भुगतान करें' पर क्लिक करें।"
                : "This is a simulated payment gateway. Click 'Proceed to Pay' to securely unlock your full astrological report."}
            </p>
            
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid rgba(224,192,151,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{language === 'hi' ? "उत्पाद:" : "Product:"}</span>
                <span style={{ color: '#FFF', fontWeight: 'bold' }}>AstroSole Premium Report</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{language === 'hi' ? "राशि:" : "Amount:"}</span>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>₹11.00</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowPaymentModal(false)}
                style={{ flex: 1, padding: '12px 0', fontSize: '13px' }}
              >
                {language === 'hi' ? "रद्द करें" : "Cancel"}
              </button>
              <button 
                className="btn" 
                disabled={isPaying}
                onClick={handleRazorpayPayment}
                style={{ 
                  flex: 1, 
                  padding: '12px 0', 
                  fontSize: '13px',
                  background: 'linear-gradient(135deg, #FFE3C0 0%, #F5A623 100%)',
                  color: '#0F051D',
                  fontWeight: 'bold'
                }}
              >
                {isPaying ? (
                  <Loader className="animate-spin" size={14} style={{ margin: '0 auto' }} />
                ) : (
                  language === 'hi' ? "भुगतान करें" : "Proceed to Pay"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Astrologer Button */}
      <button 
        onClick={handleWhatsApp} 
        className="astrologer-fab"
        title={language === 'hi' ? "ज्योतिषी से बात करें" : "Talk to Astrologer"}
      >
        <MessageCircle size={18} />
        <span>{language === 'hi' ? "ज्योतिषी" : "Astrologer"}</span>
      </button>

      {/* Floating Feedback Button */}
      <button 
        onClick={handleFeedback} 
        className="feedback-fab"
        title={language === 'hi' ? "प्रतिक्रिया भेजें" : "Send Feedback"}
      >
        <MessageCircle size={18} />
        <span>{language === 'hi' ? "प्रतिक्रिया" : "Feedback"}</span>
      </button>

    </div>
  );
}
