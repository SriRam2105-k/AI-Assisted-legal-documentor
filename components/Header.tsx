import React from 'react';
import { Scale } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          onClick={onHomeClick} 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="bg-brand-600 p-2 rounded-lg text-white">
            <Scale size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">NyayaSahayak</h1>
            <p className="text-xs text-slate-500 font-medium">AI Legal Assistant for India</p>
          </div>
        </div>
        <nav>
          <button 
            onClick={onHomeClick}
            className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
          >
            Start Over
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;