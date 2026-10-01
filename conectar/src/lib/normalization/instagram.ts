export function normalizeInstagram(value: string | null | undefined): string | null {
  let username = value?.trim() ?? "";
  if (!username) return "";

  if (/^(?:https?:\/\/)?(?:www\.)?instagram\.com\//i.test(username)) {
    try {
      const url = new URL(username.includes("://") ? username : `https://${username}`);
      if (!["instagram.com", "www.instagram.com"].includes(url.hostname.toLowerCase())) return null;
      const segments = url.pathname.split("/").filter(Boolean);
      if (segments.length !== 1) return null;
      username = segments[0];
    } catch {
      return null;
    }
  }

  username = username.replace(/^@/, "");
  if (!/^[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?$/.test(username) || username.includes("..")) return null;
  return `@${username.toLowerCase()}`;
}

export function instagramProfileUrl(value: string | null | undefined) {
  const handle = normalizeInstagram(value);
  return handle ? `https://www.instagram.com/${handle.slice(1)}/` : undefined;
}
