import { MetadataRoute } from "next"
import { config } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.baseUrl

  // Main pages
  const routes = [
    "",
    "/about",
    "/pricing",
    "/contact",
    "/auth/login",
    "/auth/register",
    "/services",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Service pages (hardcoded based on existing folders)
  const services = [
    "document-summarizer",
    "field-extractor",
    "rfp-creator",
    "rfp-summarizer",
    "template-uploader",
  ].map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  return [...routes, ...services]
}
