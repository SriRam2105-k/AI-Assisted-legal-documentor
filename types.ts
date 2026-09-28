export enum DocumentType {
  RENTAL_AGREEMENT = 'Rental Agreement',
  NDA = 'Non-Disclosure Agreement (NDA)',
  EMPLOYMENT_AGREEMENT = 'Employment Agreement',
}

export interface FormData {
  party1Name: string; 
  party2Name: string; 
  duration: string;
  terms: string;
}

export interface Clause {
  title: string;
  legalText: string;
  explanation: string;
}

export interface GeneratedDocument {
  title: string;
  summary: string;
  clauses: Clause[];
  createdAt: string;
}

export type AppStep = 'home' | 'selection' | 'form' | 'generating' | 'result';