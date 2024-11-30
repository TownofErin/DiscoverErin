import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';

const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-[1280px] mx-auto px-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
