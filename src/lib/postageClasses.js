// Postage classes and regions — plain data, safe to use in the browser.

export const POSTAGE_CLASSES = [
  { id: 'leather', label: 'Leatherwork' },
  { id: 'small', label: 'Fire prop — small (pairs under 1m)' },
  { id: 'medium', label: 'Fire prop — medium (up to 1.5m)' },
  { id: 'large', label: 'Fire prop — large (over 1.5m)' },
];

// Countries Stripe will accept a delivery address for, per region.
export const REGIONS = {
  uk: {
    label: 'UK',
    deliveryName: 'UK delivery',
    // UK plus the Isle of Man and Channel Islands
    countries: ['GB', 'IM', 'JE', 'GG'],
  },
  europe: {
    label: 'Europe',
    deliveryName: 'European delivery',
    countries: [
      // EU
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
      'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
      // Outside the EU
      'NO', 'CH', 'IS',
    ],
  },
};
export const REGION_IDS = Object.keys(REGIONS);

// The piece's postage class. Older leather pieces default to "leather".
export function postageClassOf(piece) {
  if (POSTAGE_CLASSES.some((c) => c.id === piece?.postage)) return piece.postage;
  if (piece?.category === 'leather') return 'leather';
  return null;
}
