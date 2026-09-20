// Root-absolute hrefs written by hand in an `.astro` file skip Astro's base
// handling: they work on localhost and 404 on the deployed site. Markdown links
// and the theme's components are rewritten for us; hand-written ones are not.
//
// The theme already owns this logic and its components use it, so re-export it
// rather than keeping a second implementation that could disagree. Do not pass
// the result to a theme component -- `Card`, `Hero` and friends call `withBase`
// themselves, and prefixing twice is its own bug.
export { withBase as href } from "astro-theme-university/url";
