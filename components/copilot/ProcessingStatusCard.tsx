"use client";

import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, AlertCircle, Loader2, FileText } from "lucide-react";
import type { ProcessingState } from "@/hooks/useProcessingState";

interface ProcessingStatusCardProps {
  state: ProcessingState;
}

export function ProcessingStatusCard({ state }: ProcessingStatusCardProps) {
  const getStatusIcon = () => {
    switch (state.status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (state.status) {
      case 'uploading':
      case 'processing':
        return 'text-blue-600';
      case 'complete':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDuration = () => {
    if (!state.metadata?.startTime) return null;
    const endTime = state.metadata.endTime || Date.now();
    const duration = Math.round((endTime - state.metadata.startTime) / 1000);
    return `${duration}s`;
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm max-w-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {getStatusIcon()}
        <div className="flex-1">
          <h3 className="font-semibold text-sm">
            {state.metadata?.fileName || 'Document Processing'}
          </h3>
          <p className={`text-xs ${getStatusColor()}`}>
            {state.currentStep}
          </p>
        </div>
        {formatDuration() && (
          <span className="text-xs text-gray-500">{formatDuration()}</span>
        )}
      </div>

      {/* Progress Bar */}
      {state.status !== 'idle' && state.status !== 'error' && (
        <div className="mb-4">
          <Progress value={state.progress} className="h-2" />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-medium">{state.progress}%</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {state.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      {/* Logs */}
      {state.logs.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Processing Logs</h4>
          <ScrollArea className="h-32 rounded border bg-gray-50 p-2">
            <div className="space-y-1">
              {state.logs.map((log, index) => (
                <p key={index} className="text-xs text-gray-600 font-mono">
                  {log}
                </p>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Metadata */}
      {state.metadata && state.status === 'complete' && (
        <div className="mt-3 pt-3 border-t">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {state.metadata.fileSize && (
              <div>
                <span className="text-gray-500">File Size:</span>
                <span className="ml-1 font-medium">
                  {(state.metadata.fileSize / 1024).toFixed(1)} KB
                </span>
              </div>
            )}
            {state.metadata.serviceId && (
              <div>
                <span className="text-gray-500">Service:</span>
                <span className="ml-1 font-medium capitalize">
                  {state.metadata.serviceId.replace(/-/g, ' ')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
