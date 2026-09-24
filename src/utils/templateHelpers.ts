import { FontFamily, FontSizeScale, LineHeightScale, MarginSizeScale } from '../types';

export function getFontFamilyClass(fontFamily: FontFamily): string {
  switch (fontFamily) {
    case 'serif':
      return 'font-serif';
    case 'mono':
      return 'font-mono';
    case 'sans':
    default:
      return 'font-sans';
  }
}

export function getFontSizeClasses(fontSize: FontSizeScale) {
  switch (fontSize) {
    case 'compact':
      return {
        name: 'text-2xl sm:text-3xl font-bold',
        title: 'text-sm sm:text-base font-semibold',
        sectionHeader: 'text-xs uppercase tracking-wider font-bold',
        body: 'text-xs leading-relaxed',
        subText: 'text-[11px] text-gray-600',
        badge: 'text-[10px] px-1.5 py-0.5'
      };
    case 'large':
      return {
        name: 'text-3xl sm:text-4xl font-extrabold',
        title: 'text-lg sm:text-xl font-medium',
        sectionHeader: 'text-base uppercase tracking-wider font-bold',
        body: 'text-sm sm:text-base leading-relaxed',
        subText: 'text-xs sm:text-sm text-gray-600',
        badge: 'text-xs px-2.5 py-1'
      };
    case 'standard':
    default:
      return {
        name: 'text-2xl sm:text-3xl font-bold',
        title: 'text-base sm:text-lg font-medium',
        sectionHeader: 'text-sm uppercase tracking-wider font-bold',
        body: 'text-xs sm:text-sm leading-relaxed',
        subText: 'text-xs text-gray-600',
        badge: 'text-xs px-2 py-0.5'
      };
  }
}

export function getLineHeightClass(lineHeight: LineHeightScale): string {
  switch (lineHeight) {
    case 'tight':
      return 'leading-tight space-y-1.5';
    case 'relaxed':
      return 'leading-relaxed space-y-3.5';
    case 'normal':
    default:
      return 'leading-normal space-y-2.5';
  }
}

export function getMarginSizeClass(marginSize: MarginSizeScale): string {
  switch (marginSize) {
    case 'compact':
      return 'p-4 sm:p-6 space-y-3';
    case 'spacious':
      return 'p-8 sm:p-12 space-y-7';
    case 'standard':
    default:
      return 'p-6 sm:p-8 space-y-5';
  }
}

export function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(37, 99, 235, ${alpha})`;
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}
