import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Journey } from '@prisma/client';
import { JourneyDto } from '@demo/shared-data-access';

import type { IJourneyController } from './journey.interface';
import { JourneyService } from './journey.service';

@ApiTags('Journeys')
@Controller({ path: 'journeys' })
export class JourneyController implements IJourneyController {
  private readonly logger = new Logger(JourneyController.name);

  constructor(private readonly journeyService: JourneyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all journeys' })
  async getJourneys(): Promise<Journey[]> {
    return this.journeyService.findAll();
  }

  @Get('/:journeyNumber')
  @ApiOperation({ summary: 'Get journey by journey number' })
  async getJourneyByJourneyNumber(
    @Param('journeyNumber') journeyNumber: string
  ): Promise<Journey> {
    this.logger.debug({ journeyNumber }, `Getting journey by journey number`);
    return this.journeyService.findUnique(journeyNumber);
  }

  @Post()
  @ApiOperation({ summary: 'Create journey' })
  @ApiBody({ type: JourneyDto })
  async createJourney(@Body() journey: JourneyDto): Promise<Journey> {
    this.logger.debug({ journey }, `Creating journey`);
    return this.journeyService.create(journey);
  }

  @Patch('/:journeyNumber')
  @ApiOperation({ summary: 'Update journey by journey number' })
  @ApiBody({ type: JourneyDto })
  async updateJourney(
    @Param('journeyNumber') journeyNumber: string,
    @Body() journey: Partial<JourneyDto>
  ): Promise<Journey> {
    this.logger.debug({ journeyNumber, journey }, `Updating journey`);
    return this.journeyService.update(journeyNumber, journey);
  }

  @Delete('/:journeyNumber')
  @ApiOperation({ summary: 'Delete journey by journey number' })
  deleteJourney(
    @Param('journeyNumber') journeyNumber: string
  ): Promise<Journey> {
    this.logger.debug({ journeyNumber }, `Removing user by journey number`);
    return this.journeyService.delete(journeyNumber);
  }
}
