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
        let label = item[xKey]
        if (typeof(label)=='string' && label.length>5){
          label = label.slice(0,6)+'..';
        }

        return label
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
