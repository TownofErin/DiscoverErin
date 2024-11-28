import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';

const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Pass isHomePage prop to Navigation for different styling */}
      <Navigation isHomePage={true} />
      <main className="flex-grow">
        <div className="max-w-[2000px] mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
