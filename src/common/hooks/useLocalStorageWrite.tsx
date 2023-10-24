import { useCallback } from 'react';

export function useLocalStorageWrite(key: string) {
  const writeValue = useCallback(
    (value: any) => {
      if (typeof window === 'undefined') {
        return;
      }

      try {
        const serializedValue = JSON.stringify(value);
        window.localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.warn(`Error writing to localStorage key “${key}”:`, error);
      }
    },
    [key],
  );

  return writeValue;
}
