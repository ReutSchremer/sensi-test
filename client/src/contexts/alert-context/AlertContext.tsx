import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { ElderEvent } from '../../common/types/elder-event.type';
import './AlertContext.scss';

interface AlertContextProps {
    children: ReactNode;
}

const AlertContext = createContext<(data: ElderEvent) => void>(() => { });


export const AlertContextProvider: FC<AlertContextProps> = ({ children }) => {

    const [data, setData] = useState<null | ElderEvent>();

    return (
        <AlertContext.Provider value={setData}>
            {children}

            <Dialog open={!!data} fullWidth className='Alert-Comp' >
                <div className='alert-container'>
                    <DialogTitle> Alert!</DialogTitle>
                    <DialogContent>
                        {data?.type} is {data?.value}
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='error' className='close-button' onClick={() => setData(null)}>
                            Ok, got it
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </AlertContext.Provider>
    );
};

export const useOpenAlert = () => useContext(AlertContext);
