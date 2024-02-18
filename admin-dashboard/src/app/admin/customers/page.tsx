"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import Improvements from "@/components/Improvements";

const ratingsData = {
  '2024-02-14': 5.0,
  '2024-02-13': 4.0,
  '2024-02-11': 3.6666666666666665,
  '2024-02-10': 5.0,
  '2024-02-09': 5.0,
  '2024-02-08': 5.0,
  '2024-02-07': 4.5,
  '2024-02-04': 5.0,
  '2024-02-03': 5.0,
  '2024-02-01': 5.0,
  '2024-01-29': 5.0,
  '2024-01-28': 1.0,
};

const months = Object.keys(ratingsData);

const Sales = () => {
  const totalRatings = months.map((month) => ratingsData[month]);

  const dataPointsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * dataPointsPerPage;
  const endIndex = startIndex + dataPointsPerPage;

  const chartData = {
    labels: months.slice(startIndex, endIndex),
    datasets: [
      {
        label: "Ratings",
        data: totalRatings.slice(startIndex, endIndex),
        borderColor: "rgb(99, 0, 111)",
        borderWidth: 2,
        fill: false,
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
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="md:pl-64 flex flex-row items-center justify-evenly pr-8 pt-8">
      <div className="mt-8 w-[700px]">
        <h2 className="text-2xl font-semibold mb-4">Ratings Over Time</h2>
        <div className="bg-white p-4 ">
          <Line data={chartData} options={chartOptions} />
          <div className="flex justify-between mt-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextPage}
              disabled={endIndex >= months.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Improvements />
    </div>
  );
};

export default Sales;
