"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileText, TrendingUp, FileEdit, Upload, ChevronRight } from "lucide-react";

const services = [
  { 
    id: "field-extractor", 
    name: "Field Extractor", 
    description: "Extract fields from invoices & forms",
    icon: FileText,
    color: "text-blue-500"
  },
  { 
    id: "quotation-compare", 
    name: "Quotation Comparison", 
    description: "Compare 2-10 vendor quotations",
    icon: TrendingUp,
    color: "text-green-500"
  },
  { 
    id: "rfp-creator", 
    name: "RFP Creator", 
    description: "Create professional RFPs",
    icon: FileEdit,
    color: "text-purple-500"
  },
  { 
    id: "rfp-summarizer", 
    name: "RFP Summarizer", 
    description: "Summarize RFP documents",
    icon: FileText,
    color: "text-orange-500"
  },
  { 
    id: "template-uploader", 
    name: "Template Uploader", 
    description: "Manage document templates",
    icon: Upload,
    color: "text-pink-500"
  },
];

export function ServicesListCard() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>📋 Available Services</CardTitle>
        <CardDescription>Choose a service to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => router.push(`/dashboard/services/${service.id}`)}
              className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-accent hover:border-brand-primary/40 transition-all group"
            >
              <div className={`p-2 rounded-md bg-muted ${service.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{service.name}</p>
                <p className="text-xs text-muted-foreground">{service.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-primary transition-colors" />
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
