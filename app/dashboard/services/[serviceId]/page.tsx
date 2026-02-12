import { DynamicServiceClient } from "@/components/dynamic-service-client"

export default async function ServicePage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  return <DynamicServiceClient serviceId={serviceId} />
}

// For static export, we need to define which service IDs to pre-render
// In a real application, you would fetch these from your API
export async function generateStaticParams() {
  // Return documented service IDs to pre-render
  return [
    { serviceId: 'document-summarizer' },
    { serviceId: 'quotation-compare' },
    { serviceId: 'rfp-creator' },
    { serviceId: 'field-extractor' },
    { serviceId: 'rfp-summarizer' }
  ]
}

export const dynamicParams = true // Allow dynamic params for future services