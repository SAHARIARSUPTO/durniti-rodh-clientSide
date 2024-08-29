"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define types for the data
interface Division {
  name: string;
}

interface Report {
  division: string;
}

interface DivisionReport {
  name: string;
  totalReports: number;
}

const DivisionReportsSection: React.FC = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [divisionReports, setDivisionReports] = useState<DivisionReport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [divisionsResponse, reportsResponse] = await Promise.all([
          axios.get<Division[]>("https://durniti-rodhv2.vercel.app/divisions"),
          axios.get<Report[]>("https://durniti-rodhv2.vercel.app/reports"),
        ]);

        setDivisions(divisionsResponse.data);
        setReports(reportsResponse.data);

        // Aggregate reports by division
        const reportCounts = reportsResponse.data.reduce(
          (acc: { [divisionName: string]: number }, report: Report) => {
            const divisionName = report.division;
            acc[divisionName] = (acc[divisionName] || 0) + 1;
            return acc;
          },
          {}
        );

        const updatedDivisionReports = divisionsResponse.data.map(
          (division) => ({
            name: division.name,
            totalReports: reportCounts[division.name] || 0,
          })
        );

        setDivisionReports(updatedDivisionReports);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (divisionName: string) => {
    setLoading(true);
    const url = `reports/reports?divisionName=${encodeURIComponent(
      divisionName
    )}`;
    console.log("Navigating to:", url); // Debugging line
    try {
      await router.push(url);
    } catch (error) {
      console.error("Error navigating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f9f9f9] py-16 min-h-screen relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#fd7e14] text-center mb-12">
          বাংলাদেশের সকল বিভাগের রিপোর্ট
        </h2>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="loader border-t-4 border-[#fd7e14] border-solid rounded-full h-16 w-16"></div>
          </div>
        )}

        <div className="flex flex-wrap -mx-4">
          {divisionReports.map((division) => (
            <div
              key={division.name}
              className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
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
                <p className="mb-4 text-xl font-semibold text-gray-800">
                  {division.totalReports} রিপোর্ট
                </p>
                <button
                  onClick={() => handleClick(division.name)}
                  className="inline-block px-6 py-2 text-white bg-[#fd7e14] hover:bg-[#e06c1f] rounded-lg transition duration-300"
                >
                  বিস্তারিত দেখুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionReportsSection;
