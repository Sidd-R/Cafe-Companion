import React from 'react';
import { Bar } from 'react-chartjs-2';

const topProducts = [
  { name: 'Product A', totalSales: 1500 },
  { name: 'Product B', totalSales: 1200 },
  { name: 'Product C', totalSales: 900 },
  // Add more products as needed
];

const Histogram = () => {
  const productNames = topProducts.map(product => product.name);
  const totalSales = topProducts.map(product => product.totalSales);

  const chartData = {
    labels: productNames,
    datasets: [
      {
        label: 'Total Sales',
        data: totalSales,
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,206,86,0.6)'],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  const containerStyle = {
    width: '500px',
    height: '400px',
    backgroundColor: 'white',
  };

  return (
    <div style={containerStyle} className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Top 3 Products</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Histogram;
