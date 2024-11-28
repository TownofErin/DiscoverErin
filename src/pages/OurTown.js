import React from 'react';
import DefaultLayout from '../components/layouts/DefaultLayout';

const OurTown = () => {
  return (
    <DefaultLayout>
      {/* Hero Section with full-width green background */}
      <div className="bg-[#E5EDE5] w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-base text-gray-600 uppercase tracking-wide mb-4">
              ABOUT ERIN
            </h2>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              About Our Town
            </h1>
            <p className="text-xl text-gray-600">
              Erin boasts several must-visit attractions, including the scenic Erin Heritage Walking Trail, 
              the charming village of Hillsburgh, and the beautiful Elora Cataract Trailway. Be sure to 
              explore the Erin Fall Fair, one of Ontario's oldest agricultural fairs.
            </p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <img
            src="https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6668b138dca18e09ad0a17e0_Events.jpg"
            alt="Erin Fall Fair Ferris wheel lit up at night"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OurTown;
