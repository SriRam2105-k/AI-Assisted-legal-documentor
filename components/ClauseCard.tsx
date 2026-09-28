import React from 'react';
import { Clause } from '../types';
import { Bot, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface ClauseCardProps {
  clause: Clause;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const ClauseCard: React.FC<ClauseCardProps> = ({ clause, index, isOpen, onToggle }) => {
  return (
    <div className={`
      group bg-white rounded-xl border transition-all duration-300 overflow-hidden
      ${isOpen ? 'border-brand-500 shadow-lg ring-1 ring-brand-500' : 'border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300'}
    `}>
      <div 
        className="p-6 cursor-pointer select-none flex items-start gap-4" 
        onClick={onToggle}
      >
        <span className={`
          flex-shrink-0 w-8 h-8 rounded-full font-serif font-bold flex items-center justify-center text-sm border transition-colors
          ${isOpen ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-50 text-slate-400 border-slate-200 group-hover:text-brand-600 group-hover:bg-brand-50'}
        `}>
          {index + 1}
        </span>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className={`font-bold text-lg transition-colors ${isOpen ? 'text-brand-700' : 'text-slate-900'}`}>
              {clause.title}
            </h3>
            <div className={`p-1 rounded-full transition-colors ${isOpen ? 'text-brand-600 bg-brand-50' : 'text-slate-400'}`}>
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          
          <p className="font-serif text-slate-800 leading-relaxed text-base italic border-l-4 border-slate-100 pl-4 py-1">
            {clause.legalText}
          </p>
        </div>
      </div>

      <div className={`
        bg-brand-50/50 border-t border-brand-100 transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-[500px] opacity-100 visible py-6 px-6 ml-12' : 'max-h-0 opacity-0 invisible overflow-hidden'}
      `}>
        <div className="flex items-start gap-3">
          <div className="bg-white p-2 rounded-lg text-brand-600 shadow-sm">
            <Bot size={18} />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-700 uppercase tracking-widest mb-1 block">
              What this means for you
            </span>
            <p className="text-slate-700 text-sm leading-relaxed">
              {clause.explanation}
            </p>
          </div>
        </div>
      </div>

      {!isOpen && (
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="w-full py-2 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-brand-600 hover:bg-brand-50 transition-all flex items-center justify-center gap-2 border-t border-slate-100"
        >
          <Info size={12} />
          Explain Clause
        </button>
      )}
    </div>
  );
};

export default ClauseCard;