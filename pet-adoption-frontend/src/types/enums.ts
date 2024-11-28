export const GenderEnum = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  UNKNOWN: 'UNKNOWN'
} as const;

export const SizeEnum = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE'
} as const;

export const PetStatusEnum = {
  AVAILABLE: 'AVAILABLE',
  PENDING: 'PENDING',
  ADOPTED: 'ADOPTED'
} as const;

export type GenderType = typeof GenderEnum[keyof typeof GenderEnum];
export type SizeType = typeof SizeEnum[keyof typeof SizeEnum];
export type PetStatusType = typeof PetStatusEnum[keyof typeof PetStatusEnum];
