import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    image: '/assets/generated/hero-banner-1.dim_1440x560.jpg',
    badge: '🎰 NEW GAME',
    headline: 'MEGA JACKPOT SLOTS',
    subheading: 'Win up to ৳10,00,000 in our latest slot machines',
    cta: 'Play Now',
    ctaStyle: 'gold',
  },
  {
    image: '/assets/generated/hero-banner-2.dim_1440x560.jpg',
    badge: '🎁 WELCOME BONUS',
    headline: '200% WELCOME BONUS',
    subheading: 'Get up to ৳50,000 on your first deposit today',
    cta: 'Claim Bonus',
    ctaStyle: 'blue',
  },
  {
    image: '/assets/generated/hero-banner-3.dim_1440x560.jpg',
    badge: '👑 VIP REWARDS',
    headline: 'EXCLUSIVE VIP CLUB',
    subheading: 'Join our elite VIP program and unlock premium rewards',
    cta: 'Join VIP',
    ctaStyle: 'gold',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning]);

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(220px, 40vw, 480px)' }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${slide.image})`,
          opacity: isTransitioning ? 0.6 : 1,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className={`max-w-lg transition-all duration-400 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <span className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 border border-gold/50 text-gold bg-gold/10">
            {slide.badge}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-3 leading-tight glow-text-gold">
            {slide.headline}
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-6 max-w-sm">
            {slide.subheading}
          </p>
          <button
            className={slide.ctaStyle === 'gold'
              ? 'btn-gold px-8 py-3 text-base rounded-sm font-heading tracking-widest uppercase'
              : 'btn-outline-blue px-8 py-3 text-base rounded-sm font-heading tracking-widest uppercase'
            }
          >
            {slide.cta}
          </button>
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/20 text-white hover:border-gold hover:text-gold transition-all duration-150"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/20 text-white hover:border-gold hover:text-gold transition-all duration-150"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-200 ${i === current ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
}
