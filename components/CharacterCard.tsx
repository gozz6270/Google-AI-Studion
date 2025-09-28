import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  disabled: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect, disabled }) => {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className="flex flex-col items-center text-center p-6 bg-slate-700/40 border border-yellow-400/30 rounded-lg 
                 hover:bg-slate-600/60 hover:border-yellow-400/70 transition-all duration-300 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-75
                 disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <div 
        className="text-yellow-300 mb-4 group-hover:text-yellow-200 transition-colors"
        dangerouslySetInnerHTML={{ __html: character.icon }} 
      />
      <h3 className="font-cinzel text-2xl text-amber-100 group-hover:text-white transition-colors">{character.name}</h3>
      <p className="text-amber-200 mt-2 text-sm leading-relaxed">{character.description}</p>
    </button>
  );
};

export default CharacterCard;
