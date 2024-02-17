"use client";
import React, { useState } from "react";

// Replace this with your actual sales data
const salesData = [
  {
    timestamp: "22-02-14 12:30",
    orderType: "Dine-in",
    itemName: "Burger",
    quantity: 2,
    total: 20.0,
    category: "Food",
    customerName: "John Doe",
  },
  {
    timestamp: "22-02-14 18:45",
    orderType: "Delivery",
    itemName: "Pizza",
    quantity: 1,
    total: 15.0,
    category: "Food",
    customerName: "Jane Smith",
  },
  {
    timestamp: "22-02-13 14:15",
    orderType: "Dine-in",
    itemName: "Salad",
    quantity: 1,
    total: 12.0,
    category: "Food",
    customerName: "Bob Johnson",
  },
];

const SalesDataPage = () => {
  const [filteredData, setFilteredData] = useState(salesData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle filtering
  const handleFilter = (filterType, filterValue) => {
    const filtered = salesData.filter((item) => {
      if (filterType === "orderType") {
        return item.orderType === filterValue;
      }
      if (filterType === "category") {
        return item.category === filterValue;
      }
      return true; // No filter
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Sales Data</h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order Type:
          </label>
          <select
            onChange={(e) => handleFilter("orderType", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All</option>
            <option value="Dine-in">Dine-in</option>
            {/* Add more options based on your data */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            onChange={(e) => handleFilter("category", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All</option>
            <option value="Food">Food</option>
            {/* Add more options based on your data */}
          </select>
        </div>
      </div>

      {/* Sales Data Table */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Timestamp</th>
              <th className="text-left">Order Type</th>
              <th className="text-left">Item Name</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Total</th>
              <th className="text-left">Category</th>
              <th className="text-left">Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.timestamp}</td>
                <td>{item.orderType}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.total}</td>
                <td>{item.category}</td>
                <td>{item.customerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center">
        {Array.from({
          length: Math.ceil(filteredData.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 p-2 text-sm rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SalesDataPage;
