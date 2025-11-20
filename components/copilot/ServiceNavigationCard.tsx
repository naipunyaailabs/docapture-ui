"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FileText, TrendingUp, FileEdit, FilePlus, Upload } from "lucide-react";

interface ServiceNavigationCardProps {
  serviceId: string;
  serviceName: string;
  description: string;
  reason?: string;
}

const serviceIcons: Record<string, any> = {
  "field-extractor": FileText,
  "quotation-compare": TrendingUp,
  "rfp-creator": FileEdit,
  "rfp-summarizer": FileText,
  "template-uploader": Upload,
};

export function ServiceNavigationCard({ 
  serviceId, 
  serviceName, 
  description, 
  reason 
}: ServiceNavigationCardProps) {
  const router = useRouter();
  const Icon = serviceIcons[serviceId] || FilePlus;

  const handleNavigate = () => {
    router.push(`/dashboard/services/${serviceId}`);
  };

  return (
    <Card className="w-full max-w-md border-brand-primary/20 hover:border-brand-primary/40 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-primary/10">
            <Icon className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{serviceName}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {reason && (
          <p className="text-sm text-muted-foreground">
            💡 {reason}
          </p>
        )}
        <Button 
          onClick={handleNavigate} 
          className="w-full bg-brand-primary hover:bg-brand-primary/90"
        >
          Go to {serviceName}
        </Button>
      </CardContent>
    </Card>
  );
}
