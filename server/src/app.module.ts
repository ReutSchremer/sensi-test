import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { FakeDataModule } from './fake-data/fake-data.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventsModule,
    FakeDataModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
