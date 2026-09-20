import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";
import { courseMeta } from "./course-config";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see. This course meets in a studio: three hours at the
// machine on the same artefact, every week.
export const sessionLabels = {
  singular: "Studio",
  plural: "Studios",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",

  // Eight items is the ceiling before the nav stops being scannable at
  // 390px. Readings and the glossary are reachable from Overview, from every
  // week page, and from the footer of the course rather than from here.
  links: [
    { text: "Overview", href: "/overview/" },
    { text: "Calendar", href: "/calendar/" },
    { text: sessionLabels.plural, href: "/sessions/" },
    { text: "Lectures", href: "/lectures/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "Simulator", href: "/simulator/" },
    { text: "People", href: "/people/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  socialImage: "/src/assets/images/card.png",
  socialImageAlt: `A preview card for ${courseMeta.code}: ${courseMeta.title}`,
});
