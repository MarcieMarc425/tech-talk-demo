import type { Journey } from '@prisma/client';
import type { JourneyDto } from '@demo/shared-data-access';

export interface IJourneyController {
  getJourneys(): Promise<Journey[]>;
  getJourneyByJourneyNumber(journeyNumber: string): Promise<Journey>;
  createJourney(journey: JourneyDto): Promise<Journey>;
  updateJourney(
    journeyNumber: string,
    journey: Partial<JourneyDto>
  ): Promise<Journey>;
  deleteJourney(journeyNumber: string): Promise<Journey>;
}

export interface IJourneyService {
  findAll(): Promise<Journey[]>;
  findUnique(journeyNumber: string): Promise<Journey>;
  create(journey: JourneyDto): Promise<Journey>;
  update(journeyNumber: string, journey: Partial<JourneyDto>): Promise<Journey>;
  delete(journeyNumber: string): Promise<Journey>;
}
