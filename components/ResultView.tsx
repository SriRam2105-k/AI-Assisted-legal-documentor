import React, { useRef, useState } from 'react';
import { GeneratedDocument } from '../types';
import { Download, Edit3, CheckCircle2, FileText, Bookmark } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ClauseCard from './ClauseCard';

interface ResultViewProps {
  document: GeneratedDocument;
  onEdit: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ document, onEdit }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [activeClause, setActiveClause] = useState<number | null>(0);

  const handleDownload = async () => {
    if (!printRef.current) return;
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${document.title.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      alert("Download failed. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 animate-fade-in">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 w-fit">
            <CheckCircle2 size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Ready for Review</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{document.title}</h1>
          <p className="text-slate-500 text-sm">Drafted with AI on {new Date(document.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onEdit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:border-brand-400 hover:text-brand-600 transition-all shadow-sm"
          >
            <Edit3 size={18} />
            Edit Inputs
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 shadow-lg shadow-brand-100 transition-all"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Explanatory Cards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between gap-4 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Review Mode</h3>
              <p className="text-slate-400 text-sm max-w-md">
                We've broken down the legalese into individual cards. Click a card to reveal the <strong>Plain English</strong> explanation.
              </p>
            </div>
            <FileText size={80} className="absolute -right-4 -bottom-4 text-slate-800 opacity-50 rotate-12" />
          </div>

          <div className="space-y-4">
            {document.clauses.map((clause, idx) => (
              <ClauseCard 
                key={idx}
                clause={clause}
                index={idx}
                isOpen={activeClause === idx}
                onToggle={() => setActiveClause(activeClause === idx ? null : idx)}
              />
            ))}
          </div>
        </div>

        {/* Right Col: Summary & Navigation */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-brand-600 font-black uppercase text-xs tracking-[0.2em] mb-4">
              <Bookmark size={14} />
              Quick Summary
            </div>
            <p className="text-slate-700 leading-relaxed text-sm italic font-serif bg-slate-50 p-4 rounded-xl border border-slate-100">
              "{document.summary}"
            </p>
          </div>

          <div className="bg-brand-900 rounded-2xl p-6 text-white shadow-xl">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-brand-500 w-2 h-2 rounded-full animate-pulse" />
              Next Steps
            </h4>
            <ul className="space-y-4 text-sm text-brand-100">
              <li className="flex gap-3">
                <span className="font-bold text-brand-400 shrink-0">01</span>
                Verify the specific amounts and dates highlighted in the draft.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-400 shrink-0">02</span>
                Download the formal PDF for printing.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-400 shrink-0">03</span>
                Execute on e-stamp paper for legal validity in India.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hidden Print Content */}
      <div className="fixed left-[-9999px] top-0">
        <div ref={printRef} className="w-[210mm] p-20 bg-white text-black font-serif text-[12pt] leading-relaxed">
          <h1 className="text-2xl font-bold uppercase text-center border-b-2 border-black pb-4 mb-10">
            {document.title}
          </h1>
          <div className="space-y-8">
            {document.clauses.map((c, i) => (
              <div key={i}>
                <h3 className="font-bold mb-2 uppercase">{i + 1}. {c.title}</h3>
                <p className="text-justify">{c.legalText}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 pt-10 border-t border-slate-300 flex justify-between">
            <div className="text-center w-64">
              <div className="h-16 border-b border-black mb-2" />
              <p className="font-bold">Party 1</p>
            </div>
            <div className="text-center w-64">
              <div className="h-16 border-b border-black mb-2" />
              <p className="font-bold">Party 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;