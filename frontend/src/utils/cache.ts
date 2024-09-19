const CACHE_PREFIX = 'ff_dashboard_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const setCache = <T>(key: string, data: T): void => {
  const item: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
};

export const getCache = <T>(key: string): T | null => {
  const item = localStorage.getItem(CACHE_PREFIX + key);
  if (!item) return null;

  const { data, timestamp }: CacheItem<T> = JSON.parse(item);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(CACHE_PREFIX + key);
    return null;
  }

  return data;
};

export const clearCache = (key: string): void => {
  localStorage.removeItem(CACHE_PREFIX + key);
};