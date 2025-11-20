"use client";

import { useState, useCallback } from "react";
import { useCopilotReadable } from "@copilotkit/react-core";

export interface ProcessingState {
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
  currentStep: string;
  result?: any;
  error?: string;
  logs: string[];
  metadata?: {
    fileName?: string;
    fileSize?: number;
    serviceId?: string;
    startTime?: number;
    endTime?: number;
  };
}

export interface ProcessingAction {
  type: 'START' | 'UPDATE_PROGRESS' | 'UPDATE_STEP' | 'ADD_LOG' | 'COMPLETE' | 'ERROR' | 'RESET';
  payload?: any;
}

/**
 * Real-time processing state management hook using AG-UI shared state pattern
 * Enables bidirectional synchronization between agent and frontend
 */
export function useProcessingState() {
  const [state, setState] = useState<ProcessingState>({
    status: 'idle',
    progress: 0,
    currentStep: 'Ready',
    logs: [],
  });

  // Make processing state readable to the AI agent (AG-UI shared state pattern)
  useCopilotReadable({
    description: "Current document processing state including status, progress, and logs",
    value: {
      status: state.status,
      progress: state.progress,
      currentStep: state.currentStep,
      logsCount: state.logs.length,
      isProcessing: state.status === 'processing' || state.status === 'uploading',
      hasError: state.status === 'error',
      hasResult: state.status === 'complete',
      metadata: state.metadata,
      summary: `Processing ${state.metadata?.fileName || 'document'}: ${state.currentStep} (${state.progress}%)`,
    },
  });

  const dispatch = useCallback((action: ProcessingAction) => {
    setState((prev) => {
      switch (action.type) {
        case 'START':
          return {
            ...prev,
            status: 'uploading',
            progress: 0,
            currentStep: 'Uploading document...',
            logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] Starting upload`],
            metadata: {
              ...action.payload,
              startTime: Date.now(),
            },
          };

        case 'UPDATE_PROGRESS':
          return {
            ...prev,
            progress: action.payload.progress,
            status: action.payload.status || prev.status,
          };

        case 'UPDATE_STEP':
          return {
            ...prev,
            currentStep: action.payload.step,
            logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ${action.payload.step}`],
          };

        case 'ADD_LOG':
          return {
            ...prev,
            logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ${action.payload.message}`],
          };

        case 'COMPLETE':
          return {
            ...prev,
            status: 'complete',
            progress: 100,
            currentStep: 'Processing complete',
            result: action.payload.result,
            logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] Processing complete`],
            metadata: {
              ...prev.metadata,
              endTime: Date.now(),
            },
          };

        case 'ERROR':
          return {
            ...prev,
            status: 'error',
            error: action.payload.error,
            currentStep: 'Error occurred',
            logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] Error: ${action.payload.error}`],
            metadata: {
              ...prev.metadata,
              endTime: Date.now(),
            },
          };

        case 'RESET':
          return {
            status: 'idle',
            progress: 0,
            currentStep: 'Ready',
            logs: [],
          };

        default:
          return prev;
      }
    });
  }, []);

  return {
    state,
    dispatch,
    isProcessing: state.status === 'processing' || state.status === 'uploading',
    isComplete: state.status === 'complete',
    hasError: state.status === 'error',
  };
}
