import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);
interface Props {
  chartData: number[];
}

function cssvar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

const Chart = ({ chartData }: Props) => {
  const labels = [...Array(chartData.length).keys()].slice(1);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: cssvar('--sub-color'),
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: 'WPM',
          color: cssvar('--sub-color'),
        },

        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
          color: cssvar('--sub-color'),
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        lineTension: 0.4,
        borderColor: cssvar('--main-color'),
        pointBorderColor: cssvar('--main-color'),
        pointBackgroundColor: cssvar('--main-color'),
        pointHoverRadius: 3,
        pointHoverBackgroundColor: cssvar('--main-color'),
        pointHoverBorderColor: cssvar('--main-color'),
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 5,
        data: chartData,
      },
    ],
  };

  return <Line width={'100%'} height={'100%'} options={options} data={data} />;
};

export default Chart;
