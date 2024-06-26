// src/pages/ViewSchema.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SchemaCard from "../components/SchemaCard"; // Import the SchemaCard component

const ViewSchema = () => {
  const [schemas, setSchemas] = useState([]);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
const response = await axios.get(
  `https://cms-backend-yu8p.onrender.com/user/getUserSchema`,
  {
    params: { userId: localStorage.getItem("userId") },
  }
);
          console.log(response.data);
        setSchemas(response.data.data); // Make sure this matches the structure of your API response
      } catch (error) {
        console.error("Error fetching schemas:", error);
      }
    };

    fetchSchemas();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="container mx-auto p-6 md:p-12 bg-gradient-to-r from-orange-50 to-orange-100">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-900 font-serif">
          View Schemas
        </h1>
        <p className="text-gray-900 font-bold">OPEN BOX TO DO CRUD ON DATA</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemas.map((schema) => (
            <SchemaCard key={schema._id} data={[schema]} />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default ViewSchema;
