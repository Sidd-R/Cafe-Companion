"use client";
import axios from "axios";
// src/components/SalesHistory.js

import React, { useEffect, useState } from "react";

const SalesHistory = () => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterOrderType, setFilterOrderType] = useState("");

  const [data, setData] = useState([]);
  const headers = {
    "ngrok-skip-browser-warning": "1231",
  };

  useEffect(() => {
    axios
      .get(`https://52b0-14-139-125-227.ngrok-free.app/getorders`,{
        headers: headers,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredData = data.filter((item) => {
    return (
      (filterCategory === "" || item.Category === filterCategory) &&
      (filterOrderType === "" || item.Order_type === filterOrderType)
    );
  });

  function formatTimestamp(timestampString) {
    // Create a Date object from the timestamp string
    var timestamp = new Date(timestampString);

    // Format the date as a readable string
    var formattedDate = timestamp.toLocaleString();

    // Return the formatted date
    return formattedDate;
  }

  return (
    <div className="container mt-8 md:pl-72 px-4">
      <h2 className="text-2xl font-semibold mb-4">Sales History</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="mr-2 text-gray-700">Filter by Category:</label>
          <select
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
          >
            <option value="">All</option>
            <option value="Food Menu">Food Menu</option>
            <option value="Cold Coffee">Cold Coffee</option>
            {/* Add other categories as needed */}
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2 text-gray-700">Filter by Order Type:</label>
          <select
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
            onChange={(e) => setFilterOrderType(e.target.value)}
            value={filterOrderType}
          >
            <option value="">All</option>
            <option value="Dine In">Dine In</option>
            <option value="Pick Up">Pick Up</option>
            {/* Add other order types as needed */}
          </select>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        {/* Table header */}
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Timestamp</th>
            <th className="py-2 px-4 border-b">Item Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Customer Number</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {filteredData.map((item, index) => (
            <tr
              key={index}
              className="transition duration-300 hover:bg-gray-50"
            >
              <td className="py-2 px-4 border-b">{formatTimestamp(item.time_stamp)}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.quantity}</td>
              <td className="py-2 px-4 border-b">{item.total}</td>
              <td className="py-2 px-4 border-b">{item.type}</td>
              <td className="py-2 px-4 border-b">{item.customer_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
