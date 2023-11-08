import { FC, ReactNode, createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useImmer } from "use-immer";
import { EventType } from "../common/enums/event-type.enum";
import { ElderEvent } from "../common/types/elder-event.type";
import { useOpenAlert } from "./alert-context/AlertContext";
import { ALERT_LIMIT } from "../common/consts/constants";

type EventsData = Record<EventType, ElderEvent[]>;

const SocketContext = createContext<EventsData>(initData());

const socketUri = 'http://localhost:8080';

export const socket = io(socketUri, {
    transports: ['websocket']
});


interface SocketContextProps {
    children: ReactNode
}
export const SocketContextProvider: FC<SocketContextProps> = ({ children }) => {

    const [data, setData] = useImmer<EventsData>(initData());
    const openAlert = useOpenAlert();
    useEffect(() => {
        socket.on('elderEvent', handleNewEvent);
        return () => { socket.removeListener('elderEvent'); }
    }, [])


    function handleNewEvent(data: ElderEvent) {
        setData(draft => {
            draft[data.type].push(data);
        })

        if (data.value >= ALERT_LIMIT)
            openAlert(data);
    }

    return (
        <SocketContext.Provider value={data}>
            {children}
        </SocketContext.Provider>
    );
};


export const useEventsData = () => useContext(SocketContext);



function initData() {
    const types = Object.keys(EventType) as EventType[];
    const obj: Partial<EventsData> = {};
    types.forEach(type => { obj[type] = [] })
    return obj as EventsData;
}