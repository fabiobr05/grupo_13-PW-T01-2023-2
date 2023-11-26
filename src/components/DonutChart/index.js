import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map(item => item.label),
          datasets: [{
            label: 'Donut Chart',
            data: data.map(item => item.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DonutChart;
