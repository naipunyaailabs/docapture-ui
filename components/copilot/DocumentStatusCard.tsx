"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, XCircle } from "lucide-react";

interface DocumentStatusCardProps {
  documents: string[];
  status?: "ready" | "processing" | "error";
}

export function DocumentStatusCard({ documents, status = "ready" }: DocumentStatusCardProps) {
  const statusConfig = {
    ready: {
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      label: "Ready",
      badgeVariant: "default" as const
    },
    processing: {
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      label: "Processing",
      badgeVariant: "secondary" as const
    },
    error: {
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      label: "Error",
      badgeVariant: "destructive" as const
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <StatusIcon className={`h-4 w-4 ${config.color}`} />
            </div>
            <CardTitle className="text-lg">Document Status</CardTitle>
          </div>
          <Badge variant={config.badgeVariant}>{config.label}</Badge>
        </div>
        <CardDescription>
          {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {documents.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No documents uploaded yet
            </p>
          ) : (
            documents.map((doc, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate flex-1">{doc}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
