import { EventType } from "../enums/event-type.enum";

export const graphColors: Record<EventType, { border: string, fill: string }> = {
    FALL: { border: 'red', fill: "#ff00004f" },
    TOILET: { border: 'yellow', fill: "#ffff006b" },
    VISIT: { border: 'green', fill: "#00800078" },
    WAKE_UP: { border: 'pink', fill: "#ffc0cb96" }
}