/** Public canonical origin for Rotten Potatoes (no trailing slash). */
export const SITE_URL = "https://rottenpotatoes-ai.lovable.app";

export const canonical = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
