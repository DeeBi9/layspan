import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-maritime-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-maritime rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">⚓</span>
            </div>
            <h1 className="text-xl font-bold text-maritime-dark">SoF Extractor</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-maritime-dark font-medium">✓ Multi-Currency Support</span>
              <span className="text-maritime-dark font-medium">✓ SoF Document Detection</span>
              <span className="text-maritime-dark font-medium">✓ Export Results: JSON/CSV</span>
              <span className="text-maritime-dark font-medium">✓ Laytime & Demurrage Calculation</span>
              <span className="text-maritime-dark font-medium">✓ PDFs/Docx Support</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;