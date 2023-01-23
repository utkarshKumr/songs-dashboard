import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  

  
const ScatterChart = ({data, xKey, yKey, chartHeading}) => {
    const labels = data.map(item => {
        return {x: item[xKey], y:item[yKey] };
    });

    const finalData = {
        datasets: [
          {
            label: chartHeading,
            data: labels,
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      };
    


    return <Scatter options={options} data={finalData} />;
  }

export default ScatterChart;