"use client";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import axios from "axios";
/* This example requires Tailwind CSS v2.0+ */
const products = [
  {
    id: "AAPS0L",
    company: "Chase & Co.",
    share: "CAC",
    commission: "+$4.37",
    price: "$3,509.00",
    quantity: "12.00",
    netAmount: "$4,397.00",
  },
  // More products...
];

const testData = [
  { testNo: 1, score: 80 },
  { testNo: 2, score: 85 },
  { testNo: 3, score: 50 },
  { testNo: 4, score: 40 },
  { testNo: 5, score: 70 },
  { testNo: 6, score: 50 },
  { testNo: 7, score: 30 },
  { testNo: 8, score: 70 },
  { testNo: 9, score: 80 },
  { testNo: 10, score: 30 },
];

export default function Page() {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );
  const totalTests = testData.length;
  const [startIndex, setStartIndex] = useState(0);

  const endIndex = (startIndex + 5) % totalTests;

  // Handle infinite loop for Next and Prev clicks
  const handleNextClick = () => {
    setStartIndex((prevIndex) => (prevIndex + 5) % totalTests);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => (prevIndex - 5 + totalTests) % totalTests);
  };

  const slicedTestData =
    startIndex + 5 <= totalTests
      ? testData.slice(startIndex, startIndex + 5)
      : [...testData.slice(startIndex), ...testData.slice(0, endIndex)];

  const chartData = {
    labels: slicedTestData.map((test) => `Test ${test.testNo}`),
    datasets: [
      {
        label: "Score",
        data: slicedTestData.map((test) => test.score),
        borderColor: "#000000",
        fill: true,
        backgroundColor: "rgba(46, 91, 255, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#2E5BFF",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        position: "bottom",
      },
      y: {
        grid: {
          color: "#EAEAEA",
          borderColor: "#EAEAEA",
          borderWidth: 1,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        position: "left",
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(46, 91, 255, 0.8)",
        bodyColor: "#EAEAEA",
        titleColor: "#EAEAEA",
      },
    },
  };

  const [filterCategory, setFilterCategory] = useState("");
  const [products, setProducts] = useState([]);

  const filteredData = products.filter((item) => {
    return (
      (filterCategory === "" || item.category === filterCategory)
    );
  });
  
  const headers = {
    "ngrok-skip-browser-warning": "1231",
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}menu`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="px-4 mt-10 md:pl-72">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">Menu</h2>
        <div className="flex items-center">
          <label className="mr-2 text-gray-700">Filter by Category:</label>
          <select
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
          >
            <option value="">All</option>
            <option value="Hot Coffee">Hot Coffee</option>
            <option value="Cold Coffee">Cold Coffee</option>
            <option value="Manual Brew">Manual Brew</option>
            <option value="Not Coffee">Not Coffee</option>
            <option value="Coffee Coolers">Coffee Coolers</option>
            {/* Add other categories as needed */}
          </select>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 w-[1000px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Med Price
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Large Price
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredData.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {product.id}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {product.med_price === 0 ? "N/A" : product.med_price}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {product.large_price === 0 ? "N/A" : product.large_price}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500 max-w-[300px]">
                        {product.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
