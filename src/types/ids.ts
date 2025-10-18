export type ID<T extends string> = `${T}_${string}`;

export function makeId<T extends string>(prefix: T): ID<T> {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${rand}` as ID<T>;
}