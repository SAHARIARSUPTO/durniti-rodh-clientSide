"use client";
import React from "react";

// Dummy JSON data
const divisionReports = [
  { name: "ঢাকা", totalReports: 120 },
  { name: "চট্টগ্রাম", totalReports: 80 },
  { name: "রাজশাহী", totalReports: 55 },
  { name: "খুলনা", totalReports: 70 },
  { name: "বরিশাল", totalReports: 40 },
  { name: "সিলেট", totalReports: 45 },
  { name: "রংপুর", totalReports: 60 },
  { name: "ময়মনসিংহ", totalReports: 35 },
];

const DivisionReportsSection = () => {
  return (
    <section className="bg-[#f9f9f9] py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#fd7e14] text-center mb-12">
          বাংলাদেশ বিভাগের রিপোর্ট
        </h2>

        {/* Division Cards */}
        <div className="flex flex-wrap -mx-4">
          {divisionReports.map((division) => (
            <div
              key={division.name}
              className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                {/* SVG Icon */}
                <svg
                  className="w-12 h-12 text-[#fd7e14] mb-4 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2 4 4 8-8 2 2"
                  />
                </svg>

                <h3 className="text-2xl font-bold text-[#fd7e14] mb-2">
                  {division.name}
                </h3>
                <p className=" mb-4 text-xl font-semibold text-gray-800">
                  {division.totalReports} রিপোর্ট
                </p>
                <a
                  href="#"
                  className="inline-block px-6 py-2 text-white bg-[#fd7e14] hover:bg-[#e06c1f] rounded-lg transition duration-300"
                >
                  বিস্তারিত দেখুন
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionReportsSection;
