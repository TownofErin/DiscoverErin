import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/layouts/DefaultLayout';
import MapComponent from '../components/MapComponent';

const DirectionsCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

const PlanYourTrip = () => {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <div className="bg-[#E5EDE5] w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm mb-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">&bull;</span>
            <span className="text-gray-900">Plan Your Trip</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">How to get here.</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            To visit Erin, Ontario, from major cities like Toronto, the best route is to drive or use a combination of public transit and taxis. Here are some detailed options:
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-lg overflow-hidden mb-12 h-[400px]">
          <MapComponent />
        </div>

        <div className="max-w-4xl">
          <DirectionsCard title="From Toronto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">By Car:</h3>
                <p className="text-gray-700">
                  Route: Take Gardiner Expressway W from downtown Toronto. Continue onto Queen Elizabeth Way (QEW) and then take the exit onto Highway 403 W. Follow Highway 401 W and take exit 312 for Wellington County Road 124 toward Guelph/Erin. Continue on County Road 124 to reach Erin.
                </p>
                <p className="text-gray-600 mt-2">
                  Distance and Time: Approximately 80 km, taking about 1 hour and 20 minutes depending on traffic.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">By Public Transit:</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Train and Taxi:</span> Take a GO Train from Toronto's Union Station to Mount Pleasant GO Station. From there, you can take a taxi to Erin. This route takes around 1 hour and 20 minutes and costs between $50 and $70.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Bus and Taxi:</span> You can also take a GO bus from Toronto to Georgetown, then a taxi to Erin, which will take about 1 hour and 40 minutes in total.
                  </p>
                </div>
              </div>
            </div>
          </DirectionsCard>

          <DirectionsCard title="From Mississauga">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">By Car:</h3>
              <p className="text-gray-700">
                Route: Take Highway 401 W from central Mississauga. Exit at Trafalgar Road (exit 328) and follow Trafalgar Road N, then turn left onto Wellington County Road 124 to reach Erin.
              </p>
              <p className="text-gray-600 mt-2">
                Distance and Time: Approximately 50 km, taking about 50 minutes.
              </p>
            </div>
          </DirectionsCard>

          <DirectionsCard title="From Guelph">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">By Car:</h3>
              <p className="text-gray-700">
                Route: Take Wellington County Road 124 directly from Guelph to Erin.
              </p>
              <p className="text-gray-600 mt-2">
                Distance and Time: Approximately 30 km, taking about 30 minutes.
              </p>
            </div>
          </DirectionsCard>

          <DirectionsCard title="Public Transit Options">
            <p className="text-gray-700">
              If you prefer public transit, the combination of GO Train and taxi services is convenient. For instance, after reaching the nearest GO station (like Mount Pleasant or Georgetown), local taxi services such as Gtown Taxi (+1 905-873-2222) or Red Top Taxi (+1 519-821-1700) can provide the final leg of your journey to Erin.
            </p>
          </DirectionsCard>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PlanYourTrip;
