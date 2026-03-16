import React from 'react';
import { Play } from 'lucide-react';

interface GameCardProps {
  image: string;
  title: string;
  category: string;
  provider?: string;
  isHot?: boolean;
  isNew?: boolean;
}

export default function GameCard({ image, title, category, provider, isHot, isNew }: GameCardProps) {
  return (
    <div className="card-game group cursor-pointer relative">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        {isNew && (
          <span className="px-1.5 py-0.5 text-xs font-bold rounded bg-neon-blue text-black">NEW</span>
        )}
        {isHot && (
          <span className="px-1.5 py-0.5 text-xs font-bold rounded bg-gold text-black">HOT</span>
        )}
      </div>

      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button className="flex items-center gap-2 bg-gold text-black font-heading font-bold px-5 py-2 rounded-sm text-sm tracking-wider uppercase transition-all duration-150 hover:brightness-110 glow-gold">
            <Play size={14} fill="black" />
            Play Now
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-heading font-semibold text-white text-sm truncate">{title}</h3>
        {provider && <p className="text-xs text-gray-500 mt-0.5">{provider}</p>}
      </div>
    </div>
  );
}
