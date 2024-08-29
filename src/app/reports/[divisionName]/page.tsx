"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Report {
  _id: string;
  title: string;
  district: string;
  upazila: string;
  union: string;
  description: string;
  imageLink: string;
}

const DivisionReportsPage = () => {
  const searchParams = useSearchParams();
  const [reports, setReports] = useState<Report[]>([]);
  const [divisionName, setDivisionName] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      const divisionNameParam = searchParams.get("divisionName");

      if (!divisionNameParam) {
        console.error("No divisionName in query parameters");
        return;
      }

      setDivisionName(divisionNameParam);

      try {
        const response = await axios.get<Report[]>(
          `https://durniti-rodhv2.vercel.app/reports?divisionName=${encodeURIComponent(
            divisionNameParam
          )}`
        );
        console.log("Reports data:", response.data);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReports();
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-[#fd7e14]">
        {divisionName} বিভাগের রিপোর্ট
      </h1>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500">
          No reports available for this division.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#fd7e14] text-white">
              <tr>
                <th className="py-2 px-4 text-left text-xs md:text-sm">
                  Title
                </th>
                <th className="py-2 px-4 text-left text-xs md:text-sm">
                  District
                </th>
                <th className="py-2 px-4 text-left text-xs md:text-sm">
                  Upazila
                </th>
                <th className="py-2 px-4 text-left text-xs md:text-sm">
                  Union
                </th>
                <th className="py-2 px-4 text-left text-xs md:text-sm">
                  Description
                </th>
                <th className="py-2 px-4 text-left text-xs md:text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-xs md:text-sm">
                    {report.title}
                  </td>
                  <td className="py-2 px-4 border-b text-xs md:text-sm">
                    {report.district}
                  </td>
                  <td className="py-2 px-4 border-b text-xs md:text-sm">
                    {report.upazila}
                  </td>
                  <td className="py-2 px-4 border-b text-xs md:text-sm">
                    {report.union}
                  </td>
                  <td className="py-2 px-4 border-b text-xs md:text-sm">
                    {report.description}
                  </td>
                  <td className="py-2 px-4 border-b text-xs md:text-sm">
                    <Link
                      href={`/report-details?id=${report._id}`}
                      className="inline-block px-4 py-2 text-white bg-[#fd7e14] hover:bg-[#e67e22] rounded-md text-xs md:text-sm lg:text-base font-medium transition-colors duration-300"
                    >
                      বিস্তারিত
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DivisionReportsPage;
