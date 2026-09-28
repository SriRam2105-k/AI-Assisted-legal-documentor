import { GoogleGenAI, Type } from "@google/genai";
import { DocumentType, FormData, GeneratedDocument } from '../types';

const MOCK_DATA: Record<DocumentType, GeneratedDocument> = {
  [DocumentType.RENTAL_AGREEMENT]: {
    title: "Residential Rental Agreement",
    summary: "A standard lease agreement for residential premises in India, defining the landlord-tenant relationship.",
    createdAt: new Date().toISOString(),
    clauses: [
      {
        title: "1. Possession and Use",
        legalText: "The Landlord hereby demises to the Tenant the Premises for residential use only, together with the right to use common areas.",
        explanation: "You can only live in this house; you can't run a business here. You also have the right to use shared spaces like the stairs or lift."
      },
      {
        title: "2. Monthly Rent & Taxes",
        legalText: "The Tenant shall pay a monthly sum of INR [Amount] towards rent, exclusive of utility charges and inclusive of property taxes.",
        explanation: "You must pay your rent every month. This covers the stay and property tax, but you still have to pay your own electricity and water bills."
      }
    ]
  },
  [DocumentType.NDA]: {
    title: "Mutual Non-Disclosure Agreement",
    summary: "An agreement to protect sensitive business information shared between two parties.",
    createdAt: new Date().toISOString(),
    clauses: [
      {
        title: "1. Definition of Confidential Information",
        legalText: "Confidential Information means any non-public information, technical data, or know-how, including research and product plans.",
        explanation: "Basically, any secret business info, plans, or technical details you learn from the other party must stay secret."
      }
    ]
  },
  [DocumentType.EMPLOYMENT_AGREEMENT]: {
    title: "Employment Agreement",
    summary: "A contract defining the terms of employment, compensation, and duties of the employee.",
    createdAt: new Date().toISOString(),
    clauses: [
      {
        title: "1. Probationary Period",
        legalText: "The Employee shall be on probation for a period of 3 months from the date of joining, which may be extended at the Employer's discretion.",
        explanation: "Your first 3 months are a trial. If things don't work out, the company can extend this trial period."
      }
    ]
  }
};

export const generateLegalDocument = async (
  docType: DocumentType,
  formData: FormData
): Promise<GeneratedDocument> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("Using mock data due to missing API key.");
    await new Promise(r => setTimeout(r, 1500));
    return MOCK_DATA[docType];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a formal ${docType} for ${formData.party1Name} (Party 1) and ${formData.party2Name} (Party 2) for a duration of ${formData.duration}. Additional context: ${formData.terms}.`,
      config: {
        systemInstruction: `You are an expert Indian Legal Drafting Assistant. 
        Your goal is to produce a valid legal document draft followed by plain-English explanations for each clause.
        Return ONLY a JSON object matching this schema:
        {
          "title": string,
          "summary": string,
          "clauses": Array<{ "title": string, "legalText": string, "explanation": string }>
        }`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            clauses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  legalText: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["title", "legalText", "explanation"]
              }
            }
          },
          required: ["title", "summary", "clauses"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return { ...result, createdAt: new Date().toISOString() };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return MOCK_DATA[docType];
  }
};