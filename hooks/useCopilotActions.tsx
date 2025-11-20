"use client";

import { useFrontendTool, useCopilotReadable, useRenderToolCall, useCopilotAction } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ServiceNavigationCard } from "@/components/copilot/ServiceNavigationCard";
import { ServicesListCard } from "@/components/copilot/ServicesListCard";
import { DocumentStatusCard } from "@/components/copilot/DocumentStatusCard";
import { ProcessingStatusCard } from "@/components/copilot/ProcessingStatusCard";
import { useProcessingState } from "@/hooks/useProcessingState";

export function useCopilotActions() {
  const router = useRouter();
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const processingState = useProcessingState();

  // Make uploaded documents readable to the AI
  useCopilotReadable({
    description: "List of currently uploaded documents in the session",
    value: uploadedDocuments.length > 0 
      ? `User has uploaded ${uploadedDocuments.length} document(s): ${uploadedDocuments.join(", ")}`
      : "No documents have been uploaded yet in this session.",
  });

  // Tool: Navigate to a specific service page
  useFrontendTool({
    name: "navigateToService",
    description: "Navigate the user to a specific document processing service page. Use this when the user wants to access a particular service.",
    parameters: [
      {
        name: "serviceId",
        type: "string",
        description: "The service ID to navigate to. Options: 'field-extractor', 'quotation-compare', 'rfp-creator', 'rfp-summarizer', 'template-uploader'",
        required: true,
      },
      {
        name: "reason",
        type: "string",
        description: "Brief explanation of why navigating to this service",
        required: false,
      },
    ],
    handler: async ({ serviceId, reason }) => {
      const validServices = ['field-extractor', 'quotation-compare', 'rfp-creator', 'rfp-summarizer', 'template-uploader'];
      
      if (!validServices.includes(serviceId)) {
        return `Invalid service ID. Available services are: ${validServices.join(", ")}`;
      }

      router.push(`/dashboard/services/${serviceId}`);
      return `Navigating to ${serviceId} service${reason ? `: ${reason}` : ''}. The page will load shortly.`;
    },
  });

  // Tool: Show available services
  useFrontendTool({
    name: "showAvailableServices",
    description: "Display a list of all available document processing services with descriptions",
    parameters: [],
    handler: async () => {
      const services = [
        { id: "field-extractor", name: "Field Extractor", description: "Extract specific fields from invoices, receipts, and forms" },
        { id: "quotation-compare", name: "Quotation Comparison", description: "Compare 2-10 vendor quotations and get AI recommendations (batch processing only)" },
        { id: "rfp-creator", name: "RFP Creator", description: "Create professional Request for Proposals" },
        { id: "rfp-summarizer", name: "RFP Summarizer", description: "Summarize RFP documents" },
        { id: "template-uploader", name: "Template Uploader", description: "Upload and manage document templates" },
      ];

      return {
        message: "Here are all available services:",
        services: services.map(s => `${s.name} (${s.id}): ${s.description}`).join("\n"),
        count: services.length
      };
    },
  });

  // Tool: Trigger file upload dialog
  useFrontendTool({
    name: "promptDocumentUpload",
    description: "Prompt the user to upload documents. Use this when the user indicates they want to upload files.",
    parameters: [
      {
        name: "serviceType",
        type: "string",
        description: "The type of service they're uploading for (summarization, extraction, comparison, etc.)",
        required: false,
      },
    ],
    handler: async ({ serviceType }) => {
      // This will be rendered in the chat
      return {
        action: "upload_prompt",
        serviceType: serviceType || "general",
        message: `I can help you upload documents${serviceType ? ` for ${serviceType}` : ''}. Please use the file upload button below or navigate to the appropriate service page.`
      };
    },
  });

  // Tool: Track uploaded documents
  useFrontendTool({
    name: "trackDocumentUpload",
    description: "Internal tool to track when a user uploads a document",
    parameters: [
      {
        name: "documentName",
        type: "string",
        description: "Name of the uploaded document",
        required: true,
      },
    ],
    handler: async ({ documentName }) => {
      setUploadedDocuments(prev => [...prev, documentName]);
      return `Document "${documentName}" has been tracked. Total documents: ${uploadedDocuments.length + 1}`;
    },
  });

  // Tool: Get user's current page/context
  useFrontendTool({
    name: "getCurrentContext",
    description: "Get information about the user's current location and context in the application",
    parameters: [],
    handler: async () => {
      const currentPath = window.location.pathname;
      const isOnServicePage = currentPath.includes('/dashboard/services/');
      const serviceId = isOnServicePage ? currentPath.split('/').pop() : null;

      return {
        currentPath,
        isOnServicePage,
        serviceId,
        uploadedDocumentsCount: uploadedDocuments.length,
        message: isOnServicePage 
          ? `User is currently on the ${serviceId} service page with ${uploadedDocuments.length} document(s) uploaded.`
          : `User is on the dashboard. ${uploadedDocuments.length} document(s) uploaded in this session.`
      };
    },
  });

  // Human-in-the-Loop: Confirm action before execution (AG-UI tool pattern)
  useCopilotAction({
    name: "confirmAction",
    description: "Ask the user to confirm a critical action before proceeding. Use this for approvals or important decisions.",
    parameters: [
      {
        name: "action",
        type: "string",
        description: "Description of the action requiring confirmation",
        required: true,
      },
      {
        name: "details",
        type: "string",
        description: "Additional details about the action",
        required: false,
      },
    ],
    handler: async ({ action, details }) => {
      // This creates a human-in-the-loop confirmation
      const confirmed = await new Promise<boolean>((resolve) => {
        const result = window.confirm(
          `${action}${details ? `

${details}` : ''}

Do you want to proceed?`
        );
        resolve(result);
      });
      
      return confirmed 
        ? { approved: true, message: "Action approved by user" }
        : { approved: false, message: "Action rejected by user" };
    },
  });

  // Real-time processing status tool
  useFrontendTool({
    name: "getProcessingStatus",
    description: "Get the current real-time processing status of documents",
    parameters: [],
    handler: async () => {
      return {
        status: processingState.state.status,
        progress: processingState.state.progress,
        currentStep: processingState.state.currentStep,
        isProcessing: processingState.isProcessing,
        logs: processingState.state.logs.slice(-5), // Last 5 logs
        message: processingState.isProcessing 
          ? `Currently processing: ${processingState.state.currentStep} (${processingState.state.progress}%)`
          : processingState.isComplete
          ? "Processing complete"
          : "No active processing",
      };
    },
  });

  return { 
    uploadedDocuments, 
    setUploadedDocuments,
    processingState,
  };
}

// Hook to render custom UI components in the chat
export function useCopilotRenderers() {
  // Render navigation cards when AI suggests a service
  useRenderToolCall({
    name: "navigateToService",
    render: ({ args, status }) => {
      if (status === "executing" || status === "complete") {
        const serviceNames: Record<string, string> = {
          "field-extractor": "Field Extractor",
          "quotation-compare": "Quotation Comparison",
          "rfp-creator": "RFP Creator",
          "rfp-summarizer": "RFP Summarizer",
          "template-uploader": "Template Uploader",
        };

        const serviceDescriptions: Record<string, string> = {
          "field-extractor": "Extract specific fields from invoices, receipts, and forms",
          "quotation-compare": "Compare 2-10 vendor quotations and get AI recommendations",
          "rfp-creator": "Create professional Request for Proposals",
          "rfp-summarizer": "Summarize RFP documents",
          "template-uploader": "Upload and manage document templates",
        };

        return (
          <ServiceNavigationCard
            serviceId={args.serviceId}
            serviceName={serviceNames[args.serviceId] || args.serviceId}
            description={serviceDescriptions[args.serviceId] || ""}
            reason={args.reason}
          />
        );
      }
      return "";
    },
  });

  // Render services list card
  useRenderToolCall({
    name: "showAvailableServices",
    render: ({ status }) => {
      if (status === "executing" || status === "complete") {
        return <ServicesListCard />;
      }
      return "";
    },
  });

  // Render real-time processing status
  useRenderToolCall({
    name: "getProcessingStatus",
    render: ({ status, result }) => {
      if (status === "executing" || status === "complete") {
        // Processing status is shared via useCopilotReadable in useProcessingState
        return <div className="text-sm text-gray-600">Check the processing panel for real-time status</div>;
      }
      return "";
    },
  });
}
