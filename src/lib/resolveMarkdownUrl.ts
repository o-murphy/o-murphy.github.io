// Markdown fetched from an external URL (a GitHub README etc) may contain links/images
// relative to that document's own location, not to this site. Resolve them against the
// document's source URL so they still point at the right place.
const ABSOLUTE_OR_SPECIAL = /^([a-z][a-z0-9+.-]*:|#|\/\/)/i;

export function resolveMarkdownUrl(href: string, baseUrl?: string): string {
    if (!baseUrl || !href || ABSOLUTE_OR_SPECIAL.test(href)) return href;
    try {
        return new URL(href, baseUrl).toString();
    } catch {
        return href;
    }
}
