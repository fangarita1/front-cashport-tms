import { useState } from "react";
import { GenerateDebitNoteStep } from "../../constants/invoice-actions.constants";

export const useGenerateDebitNote = () => {
  const [currentStep, setCurrentStep] = useState<GenerateDebitNoteStep>(
    GenerateDebitNoteStep.SelectNotes
  );
  const [file, setFile] = useState<File | null>(null);

  const handleSelectNotesContinue = () => {
    setCurrentStep(GenerateDebitNoteStep.DefineAmount);
  };

  const handleDefineAmountContinue = () => {
    setCurrentStep(GenerateDebitNoteStep.Evidence);
  };

  return {
    currentStep,
    file,
    setFile,
    handleSelectNotesContinue,
    handleDefineAmountContinue
  };
};
