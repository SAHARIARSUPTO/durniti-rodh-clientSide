"use client";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-[#fd7e14] shadow-md">
      <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo and Brand */}
        <a href="/" className="text-2xl text-white font-bold">
          দুর্নীতি রোধ
        </a>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <a
            href="/report"
            className="block px-4 py-2 text-xl text-white font-semibold hover:bg-[#e06c1f] rounded-lg"
          >
            রিপোর্ট করুন
          </a>
          <a
            href="#view-reports"
            className="block px-4 py-2 text-xl text-white font-semibold hover:bg-[#e06c1f] rounded-lg"
          >
            রিপোর্ট দেখুন
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
