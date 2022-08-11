import type { Omit } from 'utility-types';

export type StripMeta<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
