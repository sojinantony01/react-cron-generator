/**
 * Custom hook for translation functionality
 * Centralizes translation logic and provides memoization
 */

import { useCallback, useMemo } from 'react';
import translations from '../localization/translation.json';

interface TranslationDictionary {
  [key: string]: string;
}

export interface UseTranslationOptions {
  locale?: string;
  translateFn?: (key: string) => string;
}

export interface UseTranslationReturn {
  translate: (key: string) => string;
  locale: string;
}

/**
 * Custom hook for handling translations
 * @param options - Translation options including locale and custom translate function
 * @returns Translation function and current locale
 */
export function useTranslation(options: UseTranslationOptions = {}): UseTranslationReturn {
  const { locale = 'en', translateFn } = options;

  // Memoize the translation dictionary
  const translationDict = useMemo(
    () => translations as TranslationDictionary,
    []
  );

  /**
   * Translate a key to the appropriate language
   */
  const translate = useCallback(
    (key: string): string => {
      // Use custom translation function if provided
      if (translateFn) {
        const translated = translateFn(key);
        if (typeof translated !== 'string') {
          throw new Error('translateFn expects a string translation');
        }
        return translated;
      }

      // Use built-in translations
      if (translationDict[key]) {
        return translationDict[key];
      }

      // Return key as fallback
      return key;
    },
    [translateFn, translationDict]
  );

  return {
    translate,
    locale,
  };
}


