import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <br />
      <br />

      <section className="py-20 px-4 text-center bg-orange-100 text-white rounded-3xl">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-orange-900">
            Welcome Vahan 
          </h1>
          <a
            href="https://drive.google.com/file/d/1UXQ3XCd5HWgfTNbXrXVtBuBhrhUFsfKX/view"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            RESUME
          </a>
          <p className="text-lg mb-8 text-orange-500">
            Go to Home(CMS)
          </p>
          <a
            href="/New-Schema"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Get Started
          </a>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-orange-50">
              <h3 className="text-xl font-bold mb-4 text-orange-700">
                Add Schema
              </h3>
              <p>
                You can add , delete, update, and get the Schemas
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-orange-50">
              <h3 className="text-xl font-bold mb-4 text-orange-700">
                Add data to table
              </h3>
              <p>
              You can add , delete, update, and get the info from the table
              </p>
            </div>
           
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
