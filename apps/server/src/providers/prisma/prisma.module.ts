import { Module, Provider } from '@nestjs/common';

import { ProviderTypes } from '../../constants/ProviderTypes';
import { PrismaService } from './prisma.service';

export const PrismaProvider: Provider = {
  provide: ProviderTypes.PrismaService,
  useClass: PrismaService,
};

@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class PrismaModule {}
