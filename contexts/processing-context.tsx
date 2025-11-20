"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useProcessingState, type ProcessingState, type ProcessingAction } from "@/hooks/useProcessingState";

interface ProcessingContextValue {
  state: ProcessingState;
  dispatch: (action: ProcessingAction) => void;
  isProcessing: boolean;
  isComplete: boolean;
  hasError: boolean;
}

const ProcessingContext = createContext<ProcessingContextValue | undefined>(undefined);

export function ProcessingProvider({ children }: { children: ReactNode }) {
  const processingState = useProcessingState();

  return (
    <ProcessingContext.Provider value={processingState}>
      {children}
    </ProcessingContext.Provider>
  );
}

export function useProcessing() {
  const context = useContext(ProcessingContext);
  if (!context) {
    throw new Error("useProcessing must be used within ProcessingProvider");
  }
  return context;
}
