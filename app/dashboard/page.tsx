"use client"

import {
  Loader2,
  AlertCircle,
  Grid3x3,
  History,
  Settings2,
  CreditCard,
  ChevronRight,
  FileStack,
  Workflow,
  LayoutDashboard
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { UsageStatus } from "@/components/dashboard/usage-status"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { SubscriptionDetails } from "@/components/dashboard/subscription-details"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardOverviewPage() {
  const router = useRouter()
  const { user, logout, isLoading: authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="flex h-full flex-1 items-center justify-center p-4 md:p-8">
        <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center px-4 md:px-8">
        <AlertCircle className="w-16 h-16 text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-8">Please log in to access the dashboard.</p>
        <Button asChild>
          <Link href="/auth/login">Log In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 md:p-8">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-secondary to-black p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
            Welcome back, <span className="text-brand-primary">{user?.name}</span>!
          </h1>
          <p className="text-lg text-slate-300 mb-6">
            Leverage our advanced AI solutions to transform your document processing workflows.
            All your tools are ready and waiting.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-black font-semibold">
              <Link href="/dashboard/services">
                Explore Services <Grid3x3 className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-slate-600 hover:bg-slate-800 text-white">
              <Link href="/dashboard/history">
                View Recent Activity <History className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        {/* Abstract background element */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/10 blur-3xl opacity-50" />
        <div className="absolute right-20 bottom-0 h-32 w-32 rounded-full bg-brand-accent/20 blur-2xl opacity-30" />
      </section>

      {/* Main Stats Grid */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UsageStatus onStatusChange={() => { }} />
        <AnalyticsOverview />
      </section>

      {/* Quick Access to Core Documented Tools */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">AI Power Tools</h2>
          <Button variant="link" asChild className="text-brand-primary font-medium">
            <Link href="/dashboard/services" className="flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-brand-primary transition-all cursor-pointer group" onClick={() => router.push('/dashboard/services/field-extractor')}>
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-2 group-hover:bg-brand-primary group-hover:text-black transition-colors">
                <Grid3x3 className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Data Extraction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Extract structured data from unstructured docs.</p>
            </CardContent>
          </Card>

          <Card className="hover:border-brand-primary transition-all cursor-pointer group" onClick={() => router.push('/dashboard/services/quotation-compare')}>
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-2 group-hover:bg-brand-primary group-hover:text-black transition-colors">
                <FileStack className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Quotations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Side-by-side vendor pricing comparison.</p>
            </CardContent>
          </Card>

          <Card className="hover:border-brand-primary transition-all cursor-pointer group" onClick={() => router.push('/dashboard/services/rfp-creator')}>
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-2 group-hover:bg-brand-primary group-hover:text-black transition-colors">
                <Workflow className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">RFP Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Generate professional RFP structures instantly.</p>
            </CardContent>
          </Card>

          <Card className="hover:border-brand-primary transition-all cursor-pointer group" onClick={() => router.push('/dashboard/services/document-summarizer')}>
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-2 group-hover:bg-brand-primary group-hover:text-black transition-colors">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Summarizer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Distill documents into actionable summaries.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Account Support / Subscription Teaser */}
      <section className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <SubscriptionDetails />

        <Card className="md:col-span-1 border-brand-primary/20 bg-brand-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings2 className="mr-2 h-5 w-5 text-brand-primary" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/profile">Manage Profile</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/billing">Billing Information</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => logout()}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
