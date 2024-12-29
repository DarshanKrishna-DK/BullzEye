import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; 
import dayjs from 'dayjs';

Chart.register(...registerables); 

const StockGraph = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      const today = dayjs();
      const isWeekend = today.day() === 0 || today.day() === 6; // 0 = Sunday, 6 = Saturday

      // Determine the date to fetch data for
      // const dateToFetch = isWeekend ? today.subtract(1, 'day').format('YYYY-MM-DD') : today.format('YYYY-MM-DD');

      // Fetch stock data from Alpha Vantage
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=LB8HPNKITOZYSI33`);
      const data = await response.json();
      console.log(data);

      // Access the time series data
      const timeSeries = data["Time Series (5min)"];
      
      // Convert the time series object into an array
      const entries = Object.entries(timeSeries).map(([time, values]) => ({
        time,
        price: parseFloat(values["4. close"]), // Get the closing price
      }));

      // Process the data to fit the chart format
      const labels = entries.map(entry => entry.time); // Extract time labels
      const prices = entries.map(entry => entry.price); // Extract price values

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Stock Price',
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      });
      setLoading(false);
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Stock Price Chart</h3>
      <Line data={chartData} />
    </div>
  );
};

export default StockGraph;