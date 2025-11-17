import { DynamicServiceClient } from "@/components/dynamic-service-client"

export default async function ServicePage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  return <DynamicServiceClient serviceId={serviceId} />
}

// For static export, we need to define which service IDs to pre-render
// In a real application, you would fetch these from your API
export async function generateStaticParams() {
  // Return service IDs to pre-render
  return [
    { serviceId: 'template-uploader' },
    { serviceId: 'quotation-compare' }
  ]
}

export const dynamicParams = false