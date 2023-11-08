import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { ElderEvent } from '../common/types/elder-event.type';



interface AlertContextProps {
    children: ReactNode;
}

const AlertContext = createContext<(data: ElderEvent) => void>(() => { });


export const AlertContextProvider: FC<AlertContextProps> = ({ children }) => {

    const [data, setData] = useState<null | ElderEvent>();

    return (
        <AlertContext.Provider value={setData}>
            {children}
            <Dialog open={!!data} onClose={() => setData(null)} fullWidth>
                <DialogTitle> Alert!</DialogTitle>
                <DialogContent>  {data?.type} is {data?.value}</DialogContent>
            </Dialog>
        </AlertContext.Provider>
    );
};

export const useOpenAlert = () => useContext(AlertContext);
