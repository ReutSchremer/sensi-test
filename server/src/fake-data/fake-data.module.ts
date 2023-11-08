import { Module } from '@nestjs/common';
import { FakeDataService } from './fake-data.service';

@Module({
  providers: [FakeDataService]
})
export class FakeDataModule {}
