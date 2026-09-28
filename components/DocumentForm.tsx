import React, { useState } from 'react';
import { DocumentType, FormData } from '../types';
import { Info, Wand2 } from 'lucide-react';

interface DocumentFormProps {
  docType: DocumentType;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  isGenerating: boolean;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ docType, onSubmit, onBack, isGenerating }) => {
  const [formData, setFormData] = useState<FormData>({
    party1Name: '',
    party2Name: '',
    duration: '',
    terms: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getLabels = (type: DocumentType) => {
    switch (type) {
      case DocumentType.RENTAL_AGREEMENT:
        return {
          p1: "Landlord Name (Property Owner)",
          p2: "Tenant Name (Renter)",
          dur: "Lease Duration (e.g., 11 months)",
          terms: "Rent Amount, Security Deposit, & Specific Rules"
        };
      case DocumentType.NDA:
        return {
          p1: "Disclosing Party (Sharer)",
          p2: "Receiving Party (Receiver)",
          dur: "Confidentiality Duration (e.g., 5 years)",
          terms: "Scope of Confidential Information"
        };
      case DocumentType.EMPLOYMENT_AGREEMENT:
        return {
          p1: "Employer Name (Company)",
          p2: "Employee Name",
          dur: "Employment Type (e.g., Permanent, Contract)",
          terms: "Role Title, Salary, & Key Responsibilities"
        };
      default:
        return { p1: "Party 1", p2: "Party 2", dur: "Duration", terms: "Terms" };
    }
  };

  const labels = getLabels(docType);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
       <button 
        onClick={onBack}
        className="text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 flex items-center gap-1"
        disabled={isGenerating}
      >
        &larr; Back to Selection
      </button>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">{docType}</h2>
          <p className="text-slate-500 text-sm mt-1">Fill in the details to generate your draft.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {labels.p1}
              </label>
              <input
                type="text"
                name="party1Name"
                required
                value={formData.party1Name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {labels.p2}
              </label>
              <input
                type="text"
                name="party2Name"
                required
                value={formData.party2Name}
                onChange={handleChange}
                placeholder="e.g. Priya Patel"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {labels.dur}
            </label>
            <input
              type="text"
              name="duration"
              required
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 11 months starting from Jan 1st"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2">
              {labels.terms}
              <div className="group relative">
                <Info className="w-4 h-4 text-slate-400 cursor-help" />
                <div className="absolute right-0 bottom-6 w-64 bg-slate-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Provide as much detail as possible for better results.
                </div>
              </div>
            </label>
            <textarea
              name="terms"
              required
              value={formData.terms}
              onChange={handleChange}
              rows={4}
              placeholder="Enter details like rent amount, notice period, specific rules, etc."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              isGenerating 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-100'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Drafting Document...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Document
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentForm;