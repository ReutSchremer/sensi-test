import { EventType } from "../enums/event-type.enum";

export type ElderEvent = {
    type: EventType;
    value: number;
    time: Date;
}