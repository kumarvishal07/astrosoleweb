import { useEffect, useRef } from 'react';
import { dailyHoroscope } from '../data/podomancy';

interface HoroscopeCarouselProps {
  language?: 'en' | 'hi';
}

export default function HoroscopeCarousel({ language = 'en' }: HoroscopeCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;

    const interval = setInterval(() => {
      if (isScrolling || !container) return;
      
      const card = container.querySelector('.glass-card') as HTMLDivElement;
      const cardWidth = card ? card.offsetWidth + 12 : container.clientWidth * 0.5;
      
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3500);

    const handleInteract = () => {
      isScrolling = true;
      setTimeout(() => { isScrolling = false; }, 4000);
    };

    container.addEventListener('touchstart', handleInteract);
    container.addEventListener('wheel', handleInteract);

    return () => {
      clearInterval(interval);
      container.removeEventListener('touchstart', handleInteract);
      container.removeEventListener('wheel', handleInteract);
    };
  }, []);

  const todayDate = new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div style={{ margin: '0', width: '100%', overflow: 'hidden' }}>
      <h3 style={{ fontSize: '16.5px', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '10px', paddingLeft: '20px', fontFamily: 'Cinzel' }}>
        {language === 'hi' ? 'दैनिक राशिफल' : 'Daily Horoscope'}
      </h3>
      <div 
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '20px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '0 20px',
          gap: '12px'
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {dailyHoroscope.map((item) => (
          <div 
            key={item.symbol}
            className="glass-card"
            style={{
              minWidth: '240px',
              maxWidth: '280px',
              scrollSnapAlign: 'start',
              flexShrink: 0,
              padding: '12px',
              margin: '0',
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(224, 192, 151, 0.1)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '19.5px', marginRight: '6px' }}>{item.symbol}</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>{item.sign[language]}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{todayDate}</p>
              <p style={{ fontSize: '12.5px', lineHeight: '1.4', color: 'var(--text-secondary)' }}>{item.horoscope[language]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

