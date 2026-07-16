// theme.ts
// Color palette for the hand-drawn illustration SVGs in src/components/images/.
export const svgTheme = {
    white: '#fff',
    brightGray: '#ebebeb',
    chineseWhite: '#e0e0e0',
    splash: '#37474f',
    hair: '#cba773',
    deepSpaceSparkle: '#455a64',
    cultured: '#f5f5f5',
    platinum: '#e6e6e6',
    lotion: '#fafafa',
    blackCoral: '#5a636b',
    caramel: '#ffdf93',
    outerSpace: '#444247',
    antiFlashWhite: '#f0f0f0',
    antiFlashWhite2: '#f3f3f3',
    macaroniAndCheese: '#f6af8c',
    lightFrenchBeige: '#cba773',
    copper: '#e18966',
    copperPenny: '#b16668',
    tulip: '#f28f8f',
    steelBlue: '#4584b6',
    mustard: '#ffde57',
    lightSalmonPink: '#ffa8a7',
    americanSilver: '#cfcfcf',
};

// `highlight` and `splashDark` are the two shapes per illustration that need enough contrast to
// read on both a white and a near-black page background, so they're driven by CSS variables
// (defined alongside --background/--foreground in globals.css) instead of a fixed hex value.
export const chosenSvgTheme = {
    ...svgTheme,
    highlight: 'var(--svg-illustration-highlight)',
    splashDark: 'var(--svg-illustration-splash-dark)',
};
