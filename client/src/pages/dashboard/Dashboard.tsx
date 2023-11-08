import { FC } from 'react'
import { DataGraph } from '../../components/graph/DataGraph';



interface DashboardProps {

}


export const Dashboard: FC<DashboardProps> = ({ }) => {


    return (
        <div className='dashboard-page'>
            <h1>Elder Data</h1>
            <DataGraph />
        </div>
    );
};
