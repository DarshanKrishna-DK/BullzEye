import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const StockGraph = ({ initialPrice, setCurrentPrice }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Stock Price', // This label will be removed from the legend
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    let currentPrice = initialPrice; // Start with the initial price
    const interval = setInterval(() => {
      const fluctuation = (Math.random() * 2 - 1) * 0.5; // Random decimal between -0.5 and 0.5
      currentPrice = parseFloat((currentPrice + fluctuation).toFixed(2)); // Update current price
      setCurrentPrice(currentPrice); // Update the current price in parent component

      // Update chart data
      setChartData(prevData => {
        const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
        const newData = [...prevData.datasets[0].data, currentPrice];

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [initialPrice, setCurrentPrice]);

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
    },
    scales: {
      x: {
        ticks: {
          display: false, // Hide x-axis labels (time values)
        },
      },
      y: {
        ticks: {
          display: true, // Show y-axis labels (stock price)
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockGraph;