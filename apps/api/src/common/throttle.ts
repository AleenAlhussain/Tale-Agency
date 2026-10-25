/* Public forms: a few submissions per minute per visitor is plenty for a person and stops floods. */
export const formThrottle = { default: { limit: Number(process.env.FORM_THROTTLE_LIMIT || 6), ttl: 60_000 } };
