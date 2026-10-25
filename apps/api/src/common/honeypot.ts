/* Bots fill every field. People never see this one. */
export function isBot(body: { website?: string | null }): boolean {
  return !!(body && typeof body.website === 'string' && body.website.trim().length > 0);
}
