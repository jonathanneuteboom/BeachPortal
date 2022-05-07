export interface Cachable<T> {
  setEntity(entity: T): void;
  getCacheKey: () => string;
  stringify: (entity: T) => string;
  parse: (cacheString: string) => T | null;
}
