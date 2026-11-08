# Delight Veld website

Responsive static website for Delight Veld (Pvt) Ltd.

## Media
- Homepage aerial clip: 20.55 seconds / 12.64 MB; R2 object filename ends in `_1.mp4`.
- Full development film: 83.98 seconds / 49.48 MB; R2 object filename does not end in `_1.mp4`.
- Gallery: 20 photographs from the `Images/` and `Images/Vp2/` prefixes on `media.delightveld.com`.

The mobile homepage uses a poster frame extracted from the supplied aerial footage instead of forcing autoplay over mobile data. The full video is click-to-play and includes a direct-open fallback.

## Deploy
Upload the contents of this folder to the existing static hosting project. Keep the `assets` folder alongside `index.html`. Test the two video links on a phone after deployment. This ZIP has not been deployed to the live domain.


Homepage video playback: the 20-second muted aerial video is configured to autoplay, loop and play inline on desktop and mobile, including portrait mode. Browser autoplay/data-saver restrictions can still prevent autoplay; the video remains visible with its poster fallback. The 84-second development video is click-to-play.
