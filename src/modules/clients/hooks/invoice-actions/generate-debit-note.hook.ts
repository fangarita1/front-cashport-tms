import { useState } from "react";
import { GenerateDebitNoteStep } from "../../constants/invoice-actions.constants";

export const useGenerateDebitNote = () => {
  const [currentStep, setCurrentStep] = useState<GenerateDebitNoteStep>(
    GenerateDebitNoteStep.SelectNotes
  );

  return {
    currentStep
  };
};
