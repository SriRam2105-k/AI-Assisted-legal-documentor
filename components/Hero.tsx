import React from 'react';
import { FileText, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
      <div className="bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 inline-flex items-center gap-2">
        <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
        Now supporting Bharatiya Nyaya Sanhita (BNS) drafts
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
        Legal Documentation, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
          Simplified for Everyone.
        </span>
      </h2>
      
      <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
        Create professional rental agreements, NDAs, and employment contracts in seconds. 
        Our AI drafts the legal jargon and explains it to you in plain English.
      </p>
      
      <button 
        onClick={onStart}
        className="group bg-brand-600 hover:bg-brand-700 text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg shadow-brand-200 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3"
      >
        Create Legal Document
        <Zap className="w-5 h-5 group-hover:text-yellow-300 transition-colors" />
      </button>

      <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl w-full text-left">
        <FeatureCard 
          icon={<FileText className="w-6 h-6 text-brand-600" />}
          title="Smart Templates"
          description="Customized drafts for Rental, NDA, and Employment needs based on your specific inputs."
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-6 h-6 text-brand-600" />}
          title="Plain Language"
          description="We break down complex legal clauses into simple explanations anyone can understand."
        />
        <FeatureCard 
          icon={<Zap className="w-6 h-6 text-brand-600" />}
          title="Instant Drafts"
          description="Powered by advanced AI to generate robust starting drafts in seconds."
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Hero;