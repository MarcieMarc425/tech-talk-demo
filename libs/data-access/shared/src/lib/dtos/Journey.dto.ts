import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { Journey, JourneyStatus } from '@prisma/client';
import { z } from 'zod';
import type { StripMeta } from '../types';

export const JourneyZ: z.ZodType<StripMeta<Journey>> = extendApi(
  z.object({
    journeyNumber: z.string(),
    policyNumber: z.string().nullable(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    status: z.enum([
      JourneyStatus.INIT,
      JourneyStatus.SUBMITTED,
      JourneyStatus.COMPLETED,
      JourneyStatus.COMPLETED,
    ]),
    dateOfBirth: z.preprocess((arg) => {
      if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
      return undefined;
    }, z.date()),
  })
);

export class JourneyDto extends createZodDto(JourneyZ) {}
