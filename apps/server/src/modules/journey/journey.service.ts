import { Inject, Logger } from '@nestjs/common';
import type { Journey } from '@prisma/client';
import type { JourneyDto } from '@demo/shared-data-access';
import { ProviderTypes } from '../../constants/ProviderTypes';
import type { PrismaService } from '../../providers/prisma';
import type { IJourneyService } from './journey.interface';

export class JourneyService implements IJourneyService {
  private readonly logger = new Logger(JourneyService.name);

  constructor(
    @Inject(ProviderTypes.PrismaService)
    private readonly prismaService: PrismaService
  ) {}

  findAll(): Promise<Journey[]> {
    return this.prismaService.journey.findMany();
  }

  findUnique(journeyNumber: string): Promise<Journey> {
    return this.prismaService.journey.findUniqueOrThrow({
      where: {
        journeyNumber,
      },
    });
  }

  create(journey: JourneyDto): Promise<Journey> {
    return this.prismaService.journey.create({
      data: journey,
    });
  }

  async update(
    journeyNumber: string,
    journey: Partial<JourneyDto>
  ): Promise<Journey> {
    const foundJourney = await this.findUnique(journeyNumber);

    return this.prismaService.journey.update({
      where: {
        journeyNumber,
      },
      data: {
        ...foundJourney,
        ...journey,
      },
    });
  }

  delete(journeyNumber: string): Promise<Journey> {
    return this.prismaService.journey.delete({
      where: {
        journeyNumber,
      },
    });
  }
}
