// Core podomancy definitions based on astrological references

export const shapeTraits = [
  {
    type: { en: "Square (Peasant)", hi: "चौकोर (Square)" },
    future: {
      en: "A methodical approach will lead you to steady and reliable growth in your career. Trust your practical instincts.",
      hi: "एक व्यवस्थित दृष्टिकोण आपको अपने करियर में स्थिर और विश्वसनीय विकास की ओर ले जाएगा। अपनी व्यावहारिक प्रवृत्ति पर भरोसा करें।"
    },
    relationship: {
      en: "You are viewed as a highly trustworthy and dependable partner. Stability is your strongest asset.",
      hi: "आपको एक अत्यधिक भरोसेमंद और विश्वसनीय साथी के रूप में देखा जाता है। स्थिरता आपकी सबसे बड़ी संपत्ति है।"
    },
    personality: {
      en: "You are an anchor in your social circle, valuing old friends over passing acquaintances. You possess a pragmatic and resilient personality.",
      hi: "आप अपने सामाजिक दायरे में एक मजबूत स्तंभ हैं, जो नए परिचितों के बजाय पुराने दोस्तों को महत्व देते हैं। आपका व्यक्तित्व व्यावहारिक और लचीला है।"
    },
    suggestion: {
      en: "Practice grounding meditation to maintain your natural stability. Focus on building long-term habits.",
      hi: "अपनी स्वाभाविक स्थिरता बनाए रखने के लिए ग्राउंडिंग ध्यान का अभ्यास करें। दीर्घकालिक आदतें बनाने पर ध्यान दें।"
    }
  },
  {
    type: { en: "Roman/Common", hi: "रोमन (Roman)" },
    future: {
      en: "Your adventurous spirit will open up dynamic and unexpected career paths. Embrace new challenges.",
      hi: "आपकी साहसिक भावना गतिशील और अप्रत्याशित करियर के रास्ते खोलेगी। नई चुनौतियों को स्वीकार करें।"
    },
    relationship: {
      en: "Your outgoing and social nature makes it easy to form deep connections and attract vibrant partners.",
      hi: "आपके मिलनसार और सामाजिक स्वभाव के कारण गहरे संबंध बनाना और जीवंत भागीदारों को आकर्षित करना आसान हो जाता है।"
    },
    personality: {
      en: "You are the life of the party with a vibrant social life. Your personality is naturally charismatic and outgoing.",
      hi: "आप अपने जीवंत सामाजिक जीवन के साथ हर महफिल की जान हैं। आपका व्यक्तित्व स्वाभाविक रूप से करिश्माई और मिलनसार है।"
    },
    suggestion: {
      en: "Channel your adventurous energy into learning a new skill or hobby. Remember to take time for self-reflection.",
      hi: "अपनी साहसिक ऊर्जा को कोई नया कौशल या शौक सीखने में लगाएं। आत्म-निरीक्षण के लिए समय निकालना याद रखें।"
    }
  },
  {
    type: { en: "Egyptian", hi: "मिस्री (Egyptian)" },
    future: {
      en: "Your high intuition will guide you through complex professional decisions. Trust your gut feelings.",
      hi: "आपकी उच्च अंतर्ज्ञान आपको जटिल व्यावसायिक निर्णयों में मार्गदर्शन करेगी। अपनी आंतरिक भावनाओं पर भरोसा रखें।"
    },
    relationship: {
      en: "You value deep privacy and romance. You seek profound emotional connections over superficial bonds.",
      hi: "आप गहरी निजता और रोमांस को महत्व देते हैं। आप सतही बंधनों के बजाय गहरे भावनात्मक संबंधों की तलाश करते हैं।"
    },
    personality: {
      en: "You prefer a tight-knit circle of trusted friends. Your personality is introspective, carrying an air of mystery.",
      hi: "आप भरोसेमंद दोस्तों का एक छोटा दायरा पसंद करते हैं। आपका व्यक्तित्व आत्मनिरीक्षण करने वाला है, जिसमें रहस्य की भावना है।"
    },
    suggestion: {
      en: "Your intuition is a gift—spend time in quiet environments to recharge and listen to your inner voice.",
      hi: "आपका अंतर्ज्ञान एक उपहार है—रिचार्ज होने और अपनी अंतरात्मा की आवाज़ सुनने के लिए शांत वातावरण में समय बिताएं।"
    }
  }
];

export const lineTraits = [
  {
    type: { en: "Strong Destiny Line & Deep Life Line", hi: "मजबूत भाग्य रेखा और गहरी जीवन रेखा" },
    future: {
      en: "You have a clear sense of purpose. A major breakthrough is on your horizon if you stay focused.",
      hi: "आपके पास उद्देश्य की स्पष्ट भावना है। यदि आप केंद्रित रहते हैं तो आपके क्षितिज पर एक बड़ी सफलता है।"
    },
    health: {
      en: "Your vitality is robust. Maintain your current balance to ensure long-term physical well-being.",
      hi: "आपकी जीवन शक्ति मजबूत है। दीर्घकालिक शारीरिक भलाई सुनिश्चित करने के लिए अपना वर्तमान संतुलन बनाए रखें।"
    },
    personality: {
      en: "You naturally command respect in group settings. Your character is strong-willed and confident.",
      hi: "समूह सेटिंग्स में स्वाभाविक रूप से आपका सम्मान किया जाता है। आपका चरित्र दृढ़ इच्छाशक्ति वाला और आत्मविश्वासी है।"
    },
    suggestion: {
      en: "Leverage your strong willpower by setting clear, ambitious goals. Don't shy away from leadership roles.",
      hi: "स्पष्ट और महत्वाकांक्षी लक्ष्य निर्धारित करके अपनी मजबूत इच्छाशक्ति का लाभ उठाएं। नेतृत्व की भूमिकाओं से न हिचकिचाएं।"
    }
  },
  {
    type: { en: "Faint or Broken Lines", hi: "धुंधली या टूटी रेखाएं" },
    future: {
      en: "Your path is unpredictable but full of potential. Adaptability will be the key to your success.",
      hi: "आपका रास्ता अप्रत्याशित है लेकिन संभावनाओं से भरा है। अनुकूलन क्षमता आपकी सफलता की कुंजी होगी।"
    },
    health: {
      en: "You may be prone to stress or circulation issues. Focus on grounding exercises and proper rest.",
      hi: "आपको तनाव या परिसंचरण की समस्या हो सकती है। ग्राउंडिंग व्यायाम और उचित आराम पर ध्यान दें।"
    },
    personality: {
      en: "Your social circle may change frequently as you evolve. You have an adaptable and deeply sensitive personality.",
      hi: "जैसे-जैसे आप विकसित होते हैं, आपका सामाजिक दायरा अक्सर बदल सकता है। आपका व्यक्तित्व अनुकूलनीय और गहराई से संवेदनशील है।"
    },
    suggestion: {
      en: "Embrace flexibility in your daily routine. Practice mindfulness to handle unpredictable changes with grace.",
      hi: "अपनी दिनचर्या में लचीलेपन को अपनाएं। अप्रत्याशित परिवर्तनों को शालीनता से संभालने के लिए माइंडफुलनेस का अभ्यास करें।"
    }
  },
  {
    type: { en: "Many Short Horizontal Lines", hi: "कई छोटी क्षैतिज रेखाएं" },
    future: {
      en: "You may face temporary obstacles, but they are stepping stones. Patience is required right now.",
      hi: "आपको अस्थायी बाधाओं का सामना करना पड़ सकता है, लेकिन वे सीढ़ियां हैं। अभी धैर्य की आवश्यकता है।"
    },
    health: {
      en: "These lines indicate minor, accumulated stress. Pay attention to emotional burdens and take time to detox.",
      hi: "ये रेखाएं मामूली, संचित तनाव का संकेत देती हैं। भावनात्मक बोझ पर ध्यान दें और डिटॉक्स करने के लिए समय निकालें।"
    },
    personality: {
      en: "You may often find yourself as the peacemaker among friends. Your personality is highly empathetic but prone to absorbing others' worries.",
      hi: "आप अक्सर खुद को दोस्तों के बीच शांतिदूत के रूप में पा सकते हैं। आपका व्यक्तित्व अत्यधिक सहानुभूतिपूर्ण है लेकिन दूसरों की चिंताओं को आसानी से अपना लेता है।"
    },
    suggestion: {
      en: "Incorporate stress-relief activities like yoga or deep breathing into your day. Learn to say 'no' to avoid burnout.",
      hi: "अपने दिन में योग या गहरी सांस लेने जैसी तनाव-मुक्ति गतिविधियों को शामिल करें। बर्नआउट से बचने के लिए 'ना' कहना सीखें।"
    }
  }
];

export const sizeTraits = [
  {
    type: { en: "Large / Wide Foot", hi: "बड़े / चौड़े पैर" },
    relationship: {
      en: "You are grounded and solid. Partners rely on your resilience and trustworthy nature during hard times.",
      hi: "आप जमीन से जुड़े और ठोस हैं। कठिन समय के दौरान साथी आपके लचीलेपन और भरोसेमंद स्वभाव पर भरोसा करते हैं।"
    },
    health: {
      en: "You possess a strong physical foundation. Be careful of taking on too much of others' emotional weight.",
      hi: "आपके पास एक मजबूत शारीरिक आधार है। दूसरों का बहुत अधिक भावनात्मक भार लेने से सावधान रहें।"
    },
    personality: {
      en: "You are widely recognized as a dependable friend. You project a calm, assertive, and steadfast aura.",
      hi: "आपको व्यापक रूप से एक भरोसेमंद दोस्त के रूप में पहचाना जाता है। आप एक शांत, मुखर और दृढ़ आभा प्रदर्शित करते हैं।"
    },
    suggestion: {
      en: "Since you carry the weight for others, establish healthy emotional boundaries. Make sure to prioritize your own needs.",
      hi: "चूंकि आप दूसरों का भार उठाते हैं, इसलिए स्वस्थ भावनात्मक सीमाएं स्थापित करें। अपनी जरूरतों को प्राथमिकता देना सुनिश्चित करें।"
    }
  },
  {
    type: { en: "Small / Narrow Foot", hi: "छोटे / संकरे पैर" },
    relationship: {
      en: "You are highly imaginative and sensitive. You require a partner who understands your delicate emotional depth.",
      hi: "आप अत्यधिक कल्पनाशील और संवेदनशील हैं। आपको ऐसे साथी की आवश्यकता है जो आपकी नाजुक भावनात्मक गहराई को समझे।"
    },
    health: {
      en: "Your sensitive nature means you feel environmental shifts acutely. Keep a calm environment to prevent burnout.",
      hi: "आपके संवेदनशील स्वभाव का मतलब है कि आप पर्यावरणीय परिवर्तनों को तीव्रता से महसूस करते हैं। बर्नआउट को रोकने के लिए शांत वातावरण रखें।"
    },
    personality: {
      en: "You shine in intimate, creative social gatherings. Your personality is artistic, gentle, and uniquely expressive.",
      hi: "आप अंतरंग, रचनात्मक सामाजिक समारोहों में चमकते हैं। आपका व्यक्तित्व कलात्मक, कोमल और विशिष्ट रूप से अभिव्यंजक है।"
    },
    suggestion: {
      en: "Protect your sensitive energy by curating a peaceful living space. Engage regularly in creative outlets.",
      hi: "शांतिपूर्ण रहने की जगह बनाकर अपनी संवेदनशील ऊर्जा को सुरक्षित रखें। रचनात्मक कार्यों में नियमित रूप से भाग लें।"
    }
  }
];

// Retaining daily horoscope for the carousel
export const dailyHoroscope = [
  { 
    sign: { en: "Aries", hi: "मेष (Aries)" }, 
    symbol: "♈", 
    horoscope: { 
      en: "Your energetic drive is at its peak. Take that leap of faith!", 
      hi: "आपकी ऊर्जावान शक्ति अपने चरम पर है। विश्वास की वह छलांग लगाएं!" 
    } 
  },
  { 
    sign: { en: "Taurus", hi: "वृषभ (Taurus)" }, 
    symbol: "♉", 
    horoscope: { 
      en: "Focus on grounding yourself today. Stability will bring you peace.", 
      hi: "आज अपने आप को स्थिर करने पर ध्यान दें। स्थिरता आपको शांति प्रदान करेगी।" 
    } 
  },
  { 
    sign: { en: "Gemini", hi: "मिथुन (Gemini)" }, 
    symbol: "♊", 
    horoscope: { 
      en: "Communication is key today. Speak your truth but listen closely.", 
      hi: "आज संचार ही सफलता की कुंजी है। अपनी सच्चाई बोलें लेकिन दूसरों की भी ध्यान से सुनें।" 
    } 
  },
  { 
    sign: { en: "Cancer", hi: "कर्क (Cancer)" }, 
    symbol: "♋", 
    horoscope: { 
      en: "Trust your intuition, it is stronger than ever right now.", 
      hi: "अपने अंतर्ज्ञान पर भरोसा करें, यह इस समय सबसे मजबूत और सटीक है।" 
    } 
  },
  { 
    sign: { en: "Leo", hi: "सिंह (Leo)" }, 
    symbol: "♌", 
    horoscope: { 
      en: "Your natural charisma shines today. Step into the spotlight.", 
      hi: "आपका स्वाभाविक आकर्षण आज चमकेगा। सुर्खियों में कदम रखें और आगे बढ़ें।" 
    } 
  },
  { 
    sign: { en: "Virgo", hi: "कन्या (Virgo)" }, 
    symbol: "♍", 
    horoscope: { 
      en: "Attention to detail will help you solve a complex problem.", 
      hi: "बारीकियों पर ध्यान देने से आपको एक जटिल समस्या को हल करने में मदद मिलेगी।" 
    } 
  },
  { 
    sign: { en: "Libra", hi: "तुला (Libra)" }, 
    symbol: "♎", 
    horoscope: { 
      en: "Seek balance in your relationships. Harmony is within reach.", 
      hi: "अपने रिश्तों में संतुलन तलाशें। आपसी सद्भाव और शांति अब आपकी पहुंच में है।" 
    } 
  },
  { 
    sign: { en: "Scorpio", hi: "वृश्चिक (Scorpio)" }, 
    symbol: "♏", 
    horoscope: { 
      en: "Embrace transformation. A change of perspective is needed.", 
      hi: "बदलाव को स्वीकार करें। आपके दृष्टिकोण में एक सकारात्मक बदलाव की आवश्यकता है।" 
    } 
  },
  { 
    sign: { en: "Sagittarius", hi: "धनु (Sagittarius)" }, 
    symbol: "♐", 
    horoscope: { 
      en: "Adventure calls. Explore a new idea or physical space.", 
      hi: "साहसिक यात्राएं आपका आह्वान कर रही हैं। किसी नए विचार या स्थान की खोज करें।" 
    } 
  },
  { 
    sign: { en: "Capricorn", hi: "मकर (Capricorn)" }, 
    symbol: "♑", 
    horoscope: { 
      en: "Hard work pays off. Keep your eyes on your long-term goals.", 
      hi: "कड़ी मेहनत का फल ज़रूर मिलता है। अपने दीर्घकालिक लक्ष्यों पर अपनी नज़रें जमाए रखें।" 
    } 
  },
  { 
    sign: { en: "Aquarius", hi: "कुंभ (Aquarius)" }, 
    symbol: "♒", 
    horoscope: { 
      en: "Your innovative ideas will inspire those around you today.", 
      hi: "आपके लीक से हटकर नए विचार आज आपके आस-पास के लोगों को गहराई से प्रेरित करेंगे।" 
    } 
  },
  { 
    sign: { en: "Pisces", hi: "मीन (Pisces)" }, 
    symbol: "♓", 
    horoscope: { 
      en: "Your creative energy is flowing. Channel it into something beautiful.", 
      hi: "आपकी रचनात्मक ऊर्जा आज पूरे प्रवाह में है। इसे किसी सुंदर काम में लगाएं।" 
    } 
  }
];

export const generateDetailedReading = () => {
  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  
  const shape = getRandom(shapeTraits);
  const lines = getRandom(lineTraits);
  const size = getRandom(sizeTraits);
  
  return {
    detected: {
      shape: shape.type,
      lines: lines.type,
      size: size.type,
    },
    predictions: {
      future: {
        en: `${shape.future.en} ${lines.future.en}`,
        hi: `${shape.future.hi} ${lines.future.hi}`
      },
      health: {
        en: `${lines.health.en} ${size.health.en}`,
        hi: `${lines.health.hi} ${size.health.hi}`
      },
      relationship: {
        en: `${shape.relationship.en} ${size.relationship.en}`,
        hi: `${shape.relationship.hi} ${size.relationship.hi}`
      },
      personality: {
        en: `${shape.personality.en} ${lines.personality.en} ${size.personality.en}`,
        hi: `${shape.personality.hi} ${lines.personality.hi} ${size.personality.hi}`
      },
      suggestion: {
        en: `• ${shape.suggestion.en}\n• ${lines.suggestion.en}\n• ${size.suggestion.en}`,
        hi: `• ${shape.suggestion.hi}\n• ${lines.suggestion.hi}\n• ${size.suggestion.hi}`
      }
    }
  };
};

export const generateReading = () => {
  const detailed = generateDetailedReading();
  return {
    predictions: [
      detailed.predictions.future.en,
      detailed.predictions.health.en,
      detailed.predictions.relationship.en,
      detailed.predictions.personality.en
    ],
    suggestions: detailed.predictions.suggestion.en.split('\n').map(s => s.replace('• ', '').trim()).filter(Boolean)
  };
};
