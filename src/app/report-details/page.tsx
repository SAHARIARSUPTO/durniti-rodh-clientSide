"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Image from "next/image";
import Footer from "@/Components/Footer/page";
import Navbar from "@/Components/Navbar/page";

type ReportType = {
  _id: string;
  title: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  description: string;
  reportDateTime: string;
  reviewed: boolean;
  solveStatus: boolean;
  solveReason?: string;
  imageLink: string;
};

const ReportDetailsContent = () => {
  const [report, setReport] = useState<ReportType | null>(null);
  const [reviewer, setReviewer] = useState("");
  const [reviewerContact, setReviewerContact] = useState("");
  const [solver, setSolver] = useState("");
  const [solverContact, setSolverContact] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchReportDetails = async () => {
      const reportId = searchParams.get("id");

      if (!reportId) {
        console.error("No report ID in query parameters");
        return;
      }

      try {
        const response = await axios.get<ReportType>(
          `https://durniti-rodhv2.vercel.app/reports/${reportId}`
        );
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    };

    fetchReportDetails();
  }, [searchParams]);

  const handleReview = async () => {
    if (!report) return;

    if (!reviewer || !reviewerContact) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill out all fields before reviewing the report.",
        icon: "warning",
      });
      return;
    }

    try {
      await axios.post(
        `https://durniti-rodhv2.vercel.app/reports/${report._id}/review`,
        {
          reviewer,
          reviewerContact,
        }
      );
      Swal.fire({
        title: "Reviewed!",
        text: "Report marked as reviewed successfully.",
        icon: "success",
      });
      setReport({ ...report, reviewed: true });
    } catch (error) {
      console.error("Error marking report as reviewed:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to mark the report as reviewed.",
        icon: "error",
      });
    }
  };

  const handleSolve = async () => {
    if (!report) return;

    if (!solver || !solverContact) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill out all fields before solving the report.",
        icon: "warning",
      });
      return;
    }

    try {
      await axios.post(
        `https://durniti-rodhv2.vercel.app/reports/${report._id}/solve`,
        {
          solver,
          solverContact,
        }
      );
      Swal.fire({
        title: "Solved!",
        text: "Report marked as solved successfully.",
        icon: "success",
      });
      setReport({ ...report, solveStatus: true });
    } catch (error) {
      console.error("Error marking report as solved:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to mark the report as solved.",
        icon: "error",
      });
    }
  };

  const handleUnsolve = async () => {
    if (!report) return;

    const { value: reason } = await Swal.fire({
      title: "Provide Reason for Unsolve",
      input: "text",
      inputLabel: "Cause for Unsolving",
      inputPlaceholder: "Enter the reason...",
      showCancelButton: true,
    });

    if (reason) {
      try {
        await axios.post(
          `https://durniti-rodhv2.vercel.app/reports/${report._id}/unsolve`,
          {
            reason,
          }
        );
        Swal.fire({
          title: "Unsolved!",
          text: "Report marked as unsolved successfully.",
          icon: "warning",
        });
        setReport({ ...report, solveStatus: false, solveReason: reason });
      } catch (error) {
        console.error("Error marking report as unsolved:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to mark the report as unsolved.",
          icon: "error",
        });
      }
    }
  };

  if (!report) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-[#e8f0f2] py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#fd7e14] text-center mb-12">
            অভিযোগের শিরোনামঃ {report.title}
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  <strong>বিভাগঃ</strong> {report.division}
                </p>
                <p className="mb-4">
                  <strong>জেলাঃ </strong> {report.district}
                </p>
                <p className="mb-4">
                  <strong>উপজেলাঃ </strong> {report.upazila}
                </p>
                <p className="mb-4">
                  <strong>ইউনিয়ন/এলাকাঃ </strong> {report.union}
                </p>
                <p className="mb-4">
                  <strong>বিবরণঃ </strong> {report.description}
                </p>
              </div>
              {report.imageLink && (
                <div className="flex justify-center items-center">
                  <a
                    href={report.imageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={report.imageLink}
                      alt={report.title}
                      className="w-full h-auto object-cover rounded-lg shadow-lg"
                      width={200}
                      height={200}
                    />
                  </a>
                </div>
              )}
            </div>
            <div className="mt-6">
              <p className="mb-4">
                <strong>রিপোর্টের তারিখঃ </strong>{" "}
                {new Date(report.reportDateTime).toLocaleString()}
              </p>
              <div className="flex items-center mb-4">
                <strong className="mr-2">রিভিউঃ </strong>
                {report.reviewed ? (
                  <FaEye className="text-green-500 text-xl" />
                ) : (
                  <FaEyeSlash className="text-red-500 text-xl" />
                )}
              </div>
              <div className="flex items-center mb-4">
                <strong className="mr-2">সলভঃ </strong>
                {report.solveStatus ? (
                  <FaCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-xl" />
                )}
              </div>
              {report.solveReason && (
                <p className="mt-4">
                  <strong>
                    রিপোর্টটি ইতমধ্যে কেউ একজন সলভ করার চেষ্টা করেছিলেন এবং
                    পরবর্তিতে অন্যকেউ আনসলভ করেছেন । আনসলভের কারণঃ ।
                  </strong>{" "}
                  {report.solveReason}
                </p>
              )}
            </div>
            <div className="mt-6">
              {!report.reviewed && (
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
                  <input
                    type="text"
                    required
                    placeholder="আপনার নাম লিখুন"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}
                    className="input input-bordered w-full md:max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="আপনার যোগাযোগ নম্বর লিখুন"
                    required
                    value={reviewerContact}
                    onChange={(e) => setReviewerContact(e.target.value)}
                    className="input input-bordered w-full md:max-w-xs"
                  />
                  <button
                    onClick={handleReview}
                    className="btn btn-primary w-full md:w-auto"
                  >
                    রিপোর্ট পর্যালোচনা করুন
                  </button>
                </div>
              )}
              {report.reviewed && !report.solveStatus && (
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
                  <input
                    type="text"
                    placeholder="আপনার নাম লিখুন"
                    value={solver}
                    onChange={(e) => setSolver(e.target.value)}
                    className="input input-bordered w-full md:max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="আপনার যোগাযোগ নম্বর লিখুন"
                    value={solverContact}
                    onChange={(e) => setSolverContact(e.target.value)}
                    className="input input-bordered w-full md:max-w-xs"
                  />
                  <button
                    onClick={handleSolve}
                    className="btn btn-success w-full md:w-auto"
                  >
                    রিপোর্ট সমাধান করুন
                  </button>
                </div>
              )}
              {report.solveStatus && (
                <button onClick={handleUnsolve} className="btn btn-warning">
                  রিপোর্ট আনসলভ করুন
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const ReportDetails = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      }
    >
      <ReportDetailsContent />
    </Suspense>
  );
};

export default ReportDetails;
