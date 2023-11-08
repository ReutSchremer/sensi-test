import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventsScale } from 'src/common/consts/events-scale';
import { EventType } from 'src/common/enums/event-type.enum';

@Injectable()
export class FakeDataService {

    private logger = new Logger(FakeDataService.name);

    constructor(private eventEmitter: EventEmitter2) {

        //Start creating fake data.
        //TODO change to cron?
        setTimeout(() => {
            this.createFakeData()
        }, 1000);


    }






    async createFakeData() {
        const events = Object.keys(EventType) as EventType[];
        const randomEvent = events[Math.floor(Math.random() * events.length)];

        const randomValue = Math.random() * EventsScale[randomEvent];

        this.eventEmitter.emit(`elderEvent.${randomEvent}`, { type: randomEvent, value: randomValue });
        this.logger.log("Fired event " + randomEvent);


        setTimeout(this.createFakeData.bind(this), (Math.random() * 60) * 500);

    }
}
