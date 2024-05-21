import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = () => {
  const data = {
    labels: ['5 Good Students', 'Other Students'],
    datasets: [
      {
        data: [120, 80], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        hoverBackgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Percentage of Students with and without 5 Good Title',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-80">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
