import { ThemeKeyType } from './slice/types';

/* istanbul ignore next line */
export const isSystemDark = false;

export function saveTheme(theme: ThemeKeyType) {
    window.localStorage && localStorage.setItem('selectedTheme', theme);
}

/* istanbul ignore next line */
export function getThemeFromStorage(): ThemeKeyType | null {
    return window.localStorage
        ? (localStorage.getItem('selectedTheme') as ThemeKeyType) || null
        : null;
}
