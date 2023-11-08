import {
    CategoryScale, Chart as ChartJS, ChartOptions, Legend, LineElement, LinearScale, PointElement, TimeScale, Title, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { graphColors } from '../../common/consts/graph-colors.const';
import { EventType } from '../../common/enums/event-type.enum';
import { useEventsData } from '../../contexts/SocketContext';
import './DataGraph.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);


const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'minute', // Display units as hours, you can customize this
                displayFormats: {
                    hour: 'HH:mm', // Format for hour labels,

                },
            },
            display: true,

            title: {
                display: true,
                text: 'Time', // X-axis title
            },
        },
        y: {
            beginAtZero: true,
            min: 0,
            max: 100,
            title: {
                display: true,
                text: 'Value', // Y-axis title
            },
        },
    },
};


interface DataGraphProps { }
export const DataGraph: FC<DataGraphProps> = ({ }) => {

    const eventsData = useEventsData();

    const chartData = {
        datasets: (Object.keys(eventsData) as EventType[]).map(type => ({
            label: type,
            data: eventsData[type].map(item => ({
                x: moment(new Date(item.date)), y: item.value
            })),
            borderColor: graphColors[type].border,
            backgroundColor: graphColors[type].fill
        }))
    }



    return (
        <div className='data-line-chart'>
            <Line
                options={options}
                data={chartData}
                title='Elder Events' id="ELDER" />
        </div>
    );
};
