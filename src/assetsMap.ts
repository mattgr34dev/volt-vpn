const BASE = import.meta.env.BASE_URL;

/**
 * Local static assets downloaded from Figma design `VPN [Kiss Offer]` (node 3798:4178).
 * All files reside locally in `public/assets/figma/` with exact original SVG root dimensions.
 */
export const FIGMA_ASSETS = {
  // Brand & Header
  bolt: `${BASE}assets/figma/bolt.svg`, // 20x20

  // Concept 01 — Hero 3D Shield Scene & Floating Status
  shieldArtwork: `${BASE}assets/figma/shield-artwork.png`, // 1280x889
  fadeTop: `${BASE}assets/figma/fade-top.svg`, // 874x72
  fadeRight: `${BASE}assets/figma/fade-right.svg`, // 100x510
  fadeBottom: `${BASE}assets/figma/fade-bottom.svg`, // 874x56
  statusDotLime: `${BASE}assets/figma/status-dot-lime.svg`, // 6x6
  checkIcon: `${BASE}assets/figma/check-icon.svg`, // 20x20

  // Speedometer dials
  dialPromoMeasuring: `${BASE}assets/figma/dial-promo-measuring.svg`, // 300x151.875
  dialPromoResult: `${BASE}assets/figma/dial-promo-result.svg`, // 300x151.875
  dialDashboardResult: `${BASE}assets/figma/dial-dashboard-result.svg`, // 340x172.125

  // Concept 02 — Liquid Blue Glass Wave
  liquidBlueGlass: `${BASE}assets/figma/liquid-blue-glass.svg`, // 236x145

  // Checkout Card Benefits & Arrows
  benefitGlobe: `${BASE}assets/figma/benefit-globe.svg`, // 18.15x18.15
  benefitDevices: `${BASE}assets/figma/benefit-devices.svg`, // 18.15x17.2333
  benefitTraffic: `${BASE}assets/figma/benefit-traffic.svg`, // 18.15x8.98333
  benefitShield: `${BASE}assets/figma/benefit-shield.svg`, // 16.3167x18.15
  arrowDark: `${BASE}assets/figma/arrow-dark.svg`, // 22x22 (Lime CTA button)
  arrowWhite: `${BASE}assets/figma/arrow-white.svg`, // 22x22 (Blue CTA button)

  // Information Page
  chatSupport: `${BASE}assets/figma/chat-support.svg`, // 28x28
  telegram: `${BASE}assets/figma/telegram.svg`, // 20x20
  arrowExternal: `${BASE}assets/figma/arrow-external.svg`, // 18x18
  dotBlue: `${BASE}assets/figma/dot-blue.svg`, // 6x6
} as const;
