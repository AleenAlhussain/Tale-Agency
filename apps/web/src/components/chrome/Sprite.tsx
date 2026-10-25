import { BRAND } from '@talal-at/shared/dist/brand';

/** The signature, the icon and the wordmark, drawn once and reused with <use href="#…">. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="sig" viewBox={BRAND.signature.viewBox}>
        <path fillRule="evenodd" d={BRAND.signature.d} />
      </symbol>
      <symbol id="icon" viewBox={BRAND.icon.viewBox}>
        <path d={BRAND.icon.sun} />
        <path d={BRAND.icon.roof} />
        <path d={BRAND.icon.door} />
      </symbol>
      <symbol id="word" viewBox={BRAND.wordmark.viewBox}>
        <path fillRule="evenodd" d={BRAND.wordmark.d} />
      </symbol>
    </svg>
  );
}
