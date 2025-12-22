import { MetadataRoute } from "next"
import { config } from "@/lib/config"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = config.baseUrl

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/auth/", "/api/", "/admin/", "/_next/", "/private/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
