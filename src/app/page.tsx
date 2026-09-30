"use client";

import { SiteHeader } from "@/components/kolez/header";
import { SiteFooter } from "@/components/kolez/footer";
import { HomePage } from "@/components/kolez/pages/home";
import { AboutPage } from "@/components/kolez/pages/about";
import { AuthorsPage } from "@/components/kolez/pages/authors";
import { ExperiencePage } from "@/components/kolez/pages/experience";
import { VoicesPage } from "@/components/kolez/pages/voices";
import { SubmitPage } from "@/components/kolez/pages/submit";
import { ContactPage } from "@/components/kolez/pages/contact";
import { useHashRoute, usePageSeo, useScrollTopOnRouteChange } from "@/lib/router";

export default function KolezBukClubApp() {
  const { route } = useHashRoute();
  usePageSeo(route);
  useScrollTopOnRouteChange(route);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader currentRoute={route} />

      <main key={route} id="main">
        {route === "home" && <HomePage />}
        {route === "about" && <AboutPage />}
        {route === "authors" && <AuthorsPage />}
        {route === "experience" && <ExperiencePage />}
        {route === "voices" && <VoicesPage />}
        {route === "submit" && <SubmitPage />}
        {route === "contact" && <ContactPage />}
      </main>

      <SiteFooter />
    </div>
  );
}
