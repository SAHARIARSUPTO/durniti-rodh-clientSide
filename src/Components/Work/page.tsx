"use client";
import Image from "next/image";
import React from "react";
import myImage from "./png.svg";

const WhatWeDoSection = () => {
  return (
    <section className="bg-[#e8f0f2] py-16 flex flex-col lg:flex-row items-center">
      <div className="container mx-auto px-4 flex flex-col items-center lg:items-start text-center lg:text-left lg:w-2/5">
        {/* Heading */}
        <h2 className="text-3xl md:text-6xl font-bold text-[#fd7e14] mb-6">
          আমরা এখানে কী করি?
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8 w-3/5">
          আমাদের উদ্দেশ্য হলো আপনার এলাকার দুর্নীতি রিপোর্ট করার জন্য একটি সহজ
          এবং কার্যকর প্ল্যাটফর্ম প্রদান করা।
        </p>

        {/* Call to Action */}
        <div className="flex justify-center">
          <a
            href="/report"
            className="inline-block px-6 py-3 text-lg text-white bg-[#fd7e14] hover:bg-[#e06c1f] rounded-lg transition duration-300"
          >
            এখন রিপোর্ট করুন
          </a>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
        <Image
          src={myImage}
          alt="Description of image"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default WhatWeDoSection;
