import { DynamicServiceClient } from "@/components/dynamic-service-client"

export default function ServicePage({ params }: { params: { serviceId: string } }) {
  return <DynamicServiceClient serviceId={params.serviceId} />
}

// For static export, we need to define which service IDs to pre-render
// In a real application, you would fetch these from your API
export async function generateStaticParams() {
  // Return a specific service ID to pre-render
  // This is just for testing purposes
  return [{ serviceId: 'template-uploader' }]
}

export const dynamicParams = false