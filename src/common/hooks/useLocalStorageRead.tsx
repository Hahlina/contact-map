import { useCallback } from 'react';
import { parseJSON } from '@/common/utils/parseJSON';

export function useLocalStorageRead<T = undefined>(key: string) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return undefined as T;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : (undefined as T);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return undefined as T;
    }
  }, [key]);

  return readValue();
}
