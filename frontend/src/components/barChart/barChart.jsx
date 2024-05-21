import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ['Students'],
    datasets: [
      {
        label: '5 Good Students',
        data: [120], 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Other Students',
        data: [80], 
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
        text: 'Number of Students with and without 5 Good Title',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        suggestedMax: 200,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-80">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
