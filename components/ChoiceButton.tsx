
import React from 'react';

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-left p-4 bg-slate-700/50 border border-yellow-400/30 rounded-md text-amber-100
                 hover:bg-slate-600/70 hover:border-yellow-400/60 transition-all duration-300 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-75
                 disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <span className="group-hover:text-yellow-200 transition-colors duration-300">{text}</span>
    </button>
  );
};

export default ChoiceButton;
