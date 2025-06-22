import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Sidebar } from "@/components/layout/sidebar"
import { HeroSection } from "@/components/landing-page/HeroSection"
import { WelcomeSection } from "@/components/landing-page/WelcomeSection"
import { heroContent, welcomeContent } from "@/lib/data"


export default function Home() {

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection content={heroContent} />

        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <Sidebar />
            <WelcomeSection content={welcomeContent} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

