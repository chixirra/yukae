/**
 * Detects the platform the user is on: electron instance (desktop), capacitor instance (mobile), or website.
 * @returns {'desktop' | 'mobile' | 'web'}
 */
export function getPlatform(): "desktop" | "mobile" | "website" {
  // Electron (renderer or preload with contextIsolation)
  const isElectron =
    typeof navigator === "object" &&
    navigator.userAgent.toLowerCase().includes("electron");

  if (isElectron) return "desktop";

  // Capacitor (mobile)
  if (
    typeof window !== "undefined" &&
    typeof (window as any).Capacitor !== "undefined"
  ) {
    return "mobile";
  }

  return "website";
}
