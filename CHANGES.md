# Site update - July 2026

## New
- `highlights.html` - CH.08 broadcast highlights page. Edit the HIGHLIGHTS
  array at the top of the script to add clips (instructions are in the
  comments). Supports YouTube IDs (recommended) and small self-hosted mp4s.
- `.nojekyll` - tells GitHub Pages to skip the Jekyll build and deploy the
  files as-is. Faster deploys, one less moving part.

## Modified
- `index.html`
  - Head: favicon (inline SVG, RL mark), canonical URL, Open Graph and
    Twitter Card tags (rich link previews on LinkedIn/iMessage/Discord),
    theme-color, JSON-LD Person schema for search engines.
  - Nav: added Highlights link; added aria-label; added a skip-to-content
    link for keyboard users.
  - On Air section: added a "Watch broadcast highlights" button.
  - Profile photo: loading="lazy" and decoding="async".
  - Footer: removed the dangling middot after the copyright line.
- `athletics.html`, `experience.html`, `projects.html`, `courses.html`
  - Replaced the old multi-page design with instant redirects to the
    matching section of the new single page, so old bookmarks still work.

## Recommended deletions (run in the repo root)
    git rm style.css script.js database.json _config.yml
    git rm "images/profile[0].jpg" package-lock.json
- style.css / script.js / database.json: only the old pages used them.
- _config.yml: ignored once .nojekyll exists.
- images/profile[0].jpg: unused 592 KB duplicate of the profile photo.
- package-lock.json: there are no npm dependencies; it locks nothing.

## Verify manually
- LinkedIn URL: the site links to linkedin.com/in/rykerlee but the profile
  appears to live at linkedin.com/in/ryker-1ee. If the short URL is not a
  claimed custom URL, every LinkedIn button 404s.
- Contact email: the site uses Ryker.Lee@trojans.dsu.edu everywhere. If the
  iCloud address is preferred for recruiters, swap it in the hero button
  and the CH.07 contact card.
- Consider adding Fall 2026 courses (CSC 387, CSC 321) to the COURSES array
  as status "in_progress" once you confirm the official course titles; the
  in-progress style already exists and sorts them to the top.
