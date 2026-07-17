import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
    ...nextCoreWebVitals,
    ...nextTypescript,
    {
        ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    },
    {
        rules: {
            // Flags the standard hydration-safe "mounted" flag pattern (setMounted(true) in a
            // []-effect) used throughout this codebase (theme-toggle, art page) as if it were a
            // bug. That pattern is exactly what effects are for — there's no way to know the
            // client has mounted without one.
            'react-hooks/set-state-in-effect': 'off',
        },
    },
];

export default eslintConfig;
