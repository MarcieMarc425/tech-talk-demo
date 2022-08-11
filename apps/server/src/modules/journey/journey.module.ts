import { Logger, Module } from '@nestjs/common';
import { PrismaProvider } from '../../providers/prisma';
import { JourneyController } from './journey.controller';

import { JourneyService } from './journey.service';

@Module({
  providers: [Logger, PrismaProvider, JourneyService],
  controllers: [JourneyController],
})
export class JourneyModule {}
