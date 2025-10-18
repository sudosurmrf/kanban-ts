
export interface Store<T> {
  get(): T | null;
  set(value: T): void;
  clear(): void;
}


export const createJSONStore = <T>(key:string): Store<T> => {
  return {
    get: (): T | null => {
      const raw = localStorage.getItem(key);
      if(!raw) return null;
      try{
        return JSON.parse(raw) as T;
        
      }catch{
        return null;
      }
    },
    set: (value: T): void => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    clear: (): void => {
      localStorage.removeItem(key);
    }
  }
};
