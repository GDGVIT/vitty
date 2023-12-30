import React from 'react';
import Navbar from '../components/Nav';

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <>
    <Navbar/>
    <div className="h-auto w-auto">
      {children}
    </div>
    </>
  );
};

export default Template;
