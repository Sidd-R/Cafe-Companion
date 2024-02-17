// SalesDistributionPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const dineInSales = 5000;
const deliverySales = 3000;

const SalesDistributionPieChart = () => {
  const chartData = {
    labels: ['Dine-in', 'Delivery'],
    datasets: [
      {
        data: [dineInSales, deliverySales],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        radius: 100,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
  };


  return (
    <div className="max-w-lg mt-8 max-h-[400px]">
      <h2 className="text-2xl font-semibold mb-4">Sales Distribution</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SalesDistributionPieChart;
