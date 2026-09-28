import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import DocumentSelection from './components/DocumentSelection';
import DocumentForm from './components/DocumentForm';
import ResultView from './components/ResultView';
import { AppStep, DocumentType, FormData, GeneratedDocument } from './types';
import { generateLegalDocument } from './services/ai';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('home');
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(null);
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStart = () => setStep('selection');

  const handleSelectDoc = (type: DocumentType) => {
    setSelectedDocType(type);
    setStep('form');
  };

  const handleBackToSelection = () => {
    setSelectedDocType(null);
    setStep('selection');
  };

  const handleBackToHome = () => {
    setStep('home');
    setSelectedDocType(null);
    setGeneratedDoc(null);
  };

  const handleFormSubmit = async (data: FormData) => {
    if (!selectedDocType) return;
    setIsGenerating(true);
    setStep('generating');
    try {
      const doc = await generateLegalDocument(selectedDocType, data);
      setGeneratedDoc(doc);
      setStep('result');
    } catch (error) {
      alert("Error generating document. Please try again.");
      setStep('form');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      <Header onHomeClick={handleBackToHome} />
      
      <main className="flex-grow">
        {step === 'home' && <Hero onStart={handleStart} />}
        
        {step === 'selection' && (
          <DocumentSelection 
            onSelect={handleSelectDoc} 
            onBack={handleBackToHome} 
          />
        )}
        
        {(step === 'form' || step === 'generating') && selectedDocType && (
          <DocumentForm 
            docType={selectedDocType}
            onSubmit={handleFormSubmit}
            onBack={handleBackToSelection}
            isGenerating={isGenerating}
          />
        )}
        
        {step === 'result' && generatedDoc && (
          <ResultView 
            document={generatedDoc} 
            onEdit={() => setStep('form')} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;