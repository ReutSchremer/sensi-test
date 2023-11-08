import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { ElderEvent } from 'src/common/types/elder-event.type';

@WebSocketGateway({
    cors: { origin: '*', }, transports: ['websocket']
})
@Injectable()
export class EventsGateway {
    private logger = new Logger(EventsGateway.name);

    @WebSocketServer()
    socket: Server;

    @OnEvent('elderEvent.*')
    handleOrderCreatedEvent(payload: ElderEvent) {
        this.socket.emit(`elderEvent`, { ...payload, date: Date.now() });
    }
}
