import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex items-start gap-3 text-left">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Legal Disclaimer:</strong> This document is AI-generated for informational and draft purposes only. 
            It does not constitute professional legal advice or create an attorney-client relationship. 
            Laws in India vary by state and context. Please consult a qualified advocate to review and finalize any legal documents.
          </p>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} NyayaSahayak. Built for easy access to justice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;