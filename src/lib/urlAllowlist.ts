// Patterns match a hostname, optionally scoped to a path prefix:
//   "raw.githubusercontent.com"          - any path on that host
//   "raw.githubusercontent.com/o-murphy" - only paths under /o-murphy (i.e. that account's repos)
//   "*.github.io"                        - any subdomain (leading wildcard, no path scoping)
export function isTrustedSource(url: string, patterns: string[]): boolean {
    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        return false;
    }

    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;

    const hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();

    return patterns.some((pattern) => {
        const slashIndex = pattern.indexOf('/');
        const hostPattern = (slashIndex === -1 ? pattern : pattern.slice(0, slashIndex)).toLowerCase();
        const pathPrefix = slashIndex === -1 ? null : `/${pattern.slice(slashIndex + 1).replace(/\/+$/, '')}`;

        const hostMatches = hostPattern.startsWith('*.')
            ? hostname.endsWith(hostPattern.slice(1)) && hostname.length > hostPattern.length - 1
            : hostname === hostPattern;

        if (!hostMatches) return false;
        if (!pathPrefix) return true;

        return pathname === pathPrefix || pathname.startsWith(`${pathPrefix}/`);
    });
}
