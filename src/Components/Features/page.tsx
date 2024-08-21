"use client";
import React from "react";

const FeaturesSection = () => {
  return (
    <section className="bg-[#f4f4f4] py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#fd7e14] text-center mb-12">
          আমাদের বৈশিষ্ট্যসমূহ
        </h2>

        {/* Features List */}
        <div className="flex flex-wrap -mx-4">
          {/* Feature 1 */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                সহজ ব্যবহার
              </h3>
              <p className="text-gray-600">
                আমাদের প্ল্যাটফর্মটি ব্যবহার করা সহজ এবং দ্রুত, যাতে আপনি সহজেই
                রিপোর্ট করতে পারেন।
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
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
                  d="M4 7h16M4 11h16M4 15h16"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                দ্রুত প্রতিক্রিয়া
              </h3>
              <p className="text-gray-600">
                আপনার প্রতিবেদনগুলির প্রতি দ্রুত প্রতিক্রিয়া নিশ্চিত করি।
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
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
                  d="M5 3v4h4V3H5zm8 0v4h4V3h-4zm0 6v4h4v-4h-4zM5 9v4h4V9H5z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                নিরাপত্তা
              </h3>
              <p className="text-gray-600">
                আপনার তথ্যের নিরাপত্তা আমাদের প্রথম অগ্রাধিকার।
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
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
                  d="M19 11V7a4 4 0 00-4-4H5a4 4 0 00-4 4v4a4 4 0 004 4h10a4 4 0 004-4z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ২৪/৭ সহায়তা
              </h3>
              <p className="text-gray-600">
                আমরা প্রতিদিন ২৪ ঘন্টা এবং সপ্তাহে ৭ দিন সহায়তা প্রদান করি।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
