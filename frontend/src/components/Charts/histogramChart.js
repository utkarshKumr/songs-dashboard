import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const HistogramChart = ({data = [], chartHeading, legendHeading, xKey, yKey, chartColor}) => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: chartHeading,
          },
        },
      };

      const labels = data.map(item =>{
        return item[xKey]
      })

      const values = data.map(item =>{
        return item[yKey]
      })

      const finalData = {
        labels,
        datasets: [
          {
            label: legendHeading,
            data: values,
            backgroundColor: chartColor || 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };


      return <Bar options={options} data={finalData} />;


}

export default HistogramChart;
