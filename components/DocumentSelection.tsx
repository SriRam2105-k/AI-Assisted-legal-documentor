import React from 'react';
import { DocumentType } from '../types';
import { Building, Briefcase, Lock } from 'lucide-react';

interface DocumentSelectionProps {
  onSelect: (type: DocumentType) => void;
  onBack: () => void;
}

const DocumentSelection: React.FC<DocumentSelectionProps> = ({ onSelect, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button 
        onClick={onBack}
        className="text-slate-500 hover:text-slate-800 text-sm font-medium mb-8 flex items-center gap-1"
      >
        &larr; Back
      </button>

      <h2 className="text-3xl font-bold text-slate-900 mb-2">What document do you need?</h2>
      <p className="text-slate-600 mb-10">Select a category to get started with your draft.</p>

      <div className="grid md:grid-cols-3 gap-6">
        <SelectionCard 
          type={DocumentType.RENTAL_AGREEMENT}
          icon={<Building className="w-8 h-8" />}
          title="Rental Agreement"
          description="For landlords and tenants. Covers rent, deposit, and property maintenance."
          onClick={() => onSelect(DocumentType.RENTAL_AGREEMENT)}
        />
        <SelectionCard 
          type={DocumentType.NDA}
          icon={<Lock className="w-8 h-8" />}
          title="NDA"
          description="Non-Disclosure Agreement. Protects confidential business information."
          onClick={() => onSelect(DocumentType.NDA)}
        />
        <SelectionCard 
          type={DocumentType.EMPLOYMENT_AGREEMENT}
          icon={<Briefcase className="w-8 h-8" />}
          title="Employment Contract"
          description="For hiring employees. Defines role, salary, and termination terms."
          onClick={() => onSelect(DocumentType.EMPLOYMENT_AGREEMENT)}
        />
      </div>
    </div>
  );
};

interface SelectionCardProps {
  type: DocumentType;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ icon, title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col text-left p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-500 hover:shadow-lg hover:shadow-brand-50/50 hover:-translate-y-1 transition-all group"
  >
    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:text-brand-600 group-hover:bg-brand-50 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </button>
);

export default DocumentSelection;