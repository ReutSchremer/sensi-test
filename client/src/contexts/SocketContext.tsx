import { FC, ReactNode, createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useImmer } from "use-immer";
import { EventType } from "../common/enums/event-type.enum";
import { ElderEvent } from "../common/types/elder-event.type";

type EventsData = Record<EventType, { time: Date, value: number }[]>;

const SocketContext = createContext<null | EventsData>(null);

const socketUri = 'http://localhost:8080';

export const socket = io(socketUri, {
    transports: ['websocket']
});


interface SocketContextProps {
    children: ReactNode
}
export const SocketContextProvider: FC<SocketContextProps> = ({ children }) => {

    const [data, setData] = useImmer<EventsData>(initData());

    useEffect(() => {
        socket.on('elderEvent', handleNewEvent);

        return () => { socket.removeListener('elderEvent'); }
    }, [])


    function handleNewEvent(data: ElderEvent) {
        console.log("DATA", data)
        setData(draft => {
            draft[data.type].push({ time: data.time, value: data.value });
        })

    }

    return (
        <SocketContext.Provider value={data}>
            {children}
        </SocketContext.Provider>
    );
};




function initData() {
    const types = Object.keys(EventType) as EventType[];
    const obj: Partial<EventsData> = {};
    types.forEach(type => { obj[type] = [] })
    return obj as EventsData;
}