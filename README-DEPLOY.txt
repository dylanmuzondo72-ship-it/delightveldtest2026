# Delight Veld website — repaired package

This package preserves the current GitHub website layout and its existing local assets.

## Deploying to Vercel
- Upload/commit the **contents of this folder** to the repository root.
- Vercel Project Settings → Build & Development Settings: Framework Preset = Other; Build Command = empty; Output Directory = `.`; Root Directory = `.`.
- Do not upload the enclosing ZIP folder as an extra nested directory. `index.html`, `styles.css`, and `script.js` must sit at the repository root.

## Media behaviour
- Homepage video: muted inline autoplay is attempted. If the browser blocks autoplay, a Play video control appears.
- Development video: native controls and metadata preload; a direct-open fallback link is retained.
- Gallery: Cloudflare R2 URLs remain primary. If an R2 image cannot load, the packaged local service image is shown instead, preventing broken-image icons. Tap an image to open the full-screen lightbox.
- WhatsApp floating control, mobile menu, quote form and gallery modal use the root `script.js`.

## Important
This is a source-level repair package. Browser autoplay restrictions and availability/permissions of external Cloudflare R2 objects still depend on the visitor's browser and the R2 configuration. The Cloudflare object URLs could not be reached from this build environment for live HTTP verification.
