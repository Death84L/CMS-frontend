// src/pages/SchemaContents.js
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const SchemaContents = () => {
  const { id } = useParams(); // schema ID from route params
  const [data, setData] = useState([]);
  const [schema, setSchema] = useState(null);
  const [newData, setNewData] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedData, setSelectedData] = useState(null); // State for selected data
  const userId = localStorage.getItem("userId"); // Replace with actual user ID from auth

  useEffect(() => {
    const fetchSchemaData = async () => {
      try {
        // Fetch the schema details
        const schemaResponse = await axios.get(
          `http://localhost:8000/user/getUserSchema`,
          {
            params: { userId },
          }
        );

        const selectedSchema = schemaResponse.data.data.find(
          (s) => s._id === id
        );

        setSchema(selectedSchema);

        // Fetch the data based on the schema
        const dataResponse = await axios.post(
          `http://localhost:8000/user/getData`,
          {
            schemaId: id,
            userId,
          }
        );

        setData(dataResponse.data.returnData);
      } catch (error) {
        console.error("Error fetching schema data:", error);
      }
    };

    fetchSchemaData();
  }, [id, userId]);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:8000/user/deleteData/${itemId}`,
        {
          data: { userId },
        }
      );
      setData(data.filter((item) => item._id !== itemId));
      toast.success("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to add/update data. Please try again later.6");
    }
  };

  const handleAddData = async () => {
    try {
      if (selectedData) {
        // Update existing data
        const response = await axios.put(
          `http://localhost:8000/user/updateData/${
            selectedData._id
          }`,
          {
            userId,
            data: newData,
          }
        );
        setData(
          data.map((item) =>
            item._id === selectedData._id ? response.data.updatedData : item
          )
        );
        setSelectedData(null); // Clear the selected data after updating
        toast.success("Data added successfully");
      } else {
        // Add new data
        console.log("7476")
        const response = await axios.post(
          `http://localhost:8000/user/addData`,
          {
            schemaId: id,
            userId,
            data: newData,
          }
        );
        setData([...data, response.data.newData]);
      }
      setNewData({});
    } catch (error) {
      console.error("Error adding/updating data:", error);
      toast.error("Failed to add/update data. Please try again later.7");
    }
  };
  
 const handleAddDataClick = () => {
   const newErrors = {};
   schema.fields.forEach((field) => {
     if (
       !newData[field.columnName] ||
       (field.dataType === "string" && newData[field.columnName].trim() === "")
     ) {
       newErrors[field.columnName] = "This field is required";
     } else if (
       field.dataType === "number" &&
       isNaN(newData[field.columnName])
     ) {
       newErrors[field.columnName] = "Value must be a number";
     }
   });

   if (Object.keys(newErrors).length === 0) {
     handleAddData(newData);
     setNewData({});
   } else {
     setErrors(newErrors);
   }
 };
  const handleUpdate = (item) => {
    setNewData(item.data);
    setSelectedData(item);
  };

// const [error, setError] = useState(""); // State variable to store error message

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Get the data type of the current field from the schema
    const field = schema.fields.find((field) => field.columnName === name);
    const fieldType = field ? field.dataType : null;

    // Perform validation based on the data type
    let isValid = true;
    let errorMessage = "";

    switch (fieldType) {
      case "string":
        if (typeof value !== "string" || value.trim() === "") {
          isValid = false;
          errorMessage = "Value must be a non-empty string.";
        }
        break;
      case "number":
        if (isNaN(value) || value === "") {
          isValid = false;
          errorMessage = "Value must be a number.";
        }
        break;
      // Add validation for other data types as needed
      default:
        errorMessage = ""; // Clear the error message for unsupported data types
        break;
    }

    setNewData({
      ...newData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: isValid ? "" : errorMessage,
    });
  };




  if (!schema) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="container mx-auto p-6 md:p-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-900 font-serif">
          {schema.tableName} Contents
        </h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {schema.fields.map((field) => (
                  <th
                    key={field.columnName}
                    className="py-3 px-4 border-b border-gray-300 bg-orange-100 text-left text-sm font-semibold text-orange-900"
                  >
                    {field.columnName}
                  </th>
                ))}
                <th className="py-3 px-4 border-b border-gray-300 bg-orange-100 text-left text-sm font-semibold text-orange-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-orange-50 transition duration-200"
                >
                  {schema.fields.map((field) => (
                    <td
                      key={field.columnName}
                      className="py-3 px-4 border-b border-gray-300 text-gray-700"
                    >
                      {item.data[field.columnName]}
                    </td>
                  ))}
                  <td className="py-3 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="text-orange-600 hover:text-orange-800 font-semibold py-2 px-4 rounded-lg border border-orange-600 bg-orange-200 hover:bg-orange-300 transition duration-200 ease-in-out mx-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800 font-semibold py-2 px-4 rounded-lg border border-red-600 bg-red-200 hover:bg-red-300 transition duration-200 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-900">
            Add / Update Data
          </h2>
          <div className="space-y-4">
            {schema.fields.map((field) => (
              <div key={field.columnName} className="flex items-center">
                <label className="text-sm font-medium text-orange-700 w-32">
                  {field.columnName}:
                </label>
                <input
                  type="text"
                  name={field.columnName}
                  placeholder={`Enter the ${field.columnName}`}
                  value={newData[field.columnName] || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm flex-grow"
                />
                {errors[field.columnName] && (
                  <p className="text-red-500 ml-2">
                    {errors[field.columnName]}
                  </p>
                )}
              </div>
            ))}
            <button
              onClick={handleAddDataClick}
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              {selectedData ? "Update Data" : "Add Data"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaContents;
