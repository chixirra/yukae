/**
 * Detects the platform the user is on: electron instance (desktop), capacitor instance (mobile), or website.
 * @returns {'desktop' | 'mobile' | 'web'}
 */
export function getPlatform(): "desktop" | "mobile" | "website" {
  //   process.env.BUILD_TARGET as "desktop" | "mobile" | "website";

  // check for electron (desktop)
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    (window.process as any).type === "renderer"
  ) {
    return "desktop";
  }

  if (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    !!(process.versions as any).electron
  ) {
    return "desktop";
  }

  // check for capacitor (mobile)
  if (
    typeof window !== "undefined" &&
    typeof (window as any).Capacitor !== "undefined"
  ) {
    return "mobile";
  }

  // if none, then return default value as web
  return "website";
}
