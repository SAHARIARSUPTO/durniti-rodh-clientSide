"use client";
import Image from "next/image";
import React from "react";
import myImage from "./png.svg";

const WhatWeDoSection = () => {
  return (
    <section className="bg-[#e8f0f2] py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="px-4 text-center lg:text-left">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#fd7e14] mb-6">
          আমরা এখানে কী করি?
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8">
          আমাদের উদ্দেশ্য হলো আপনার এলাকার দুর্নীতি/অভিযোগ রিপোর্ট করার জন্য
          একটি সহজ এবং কার্যকর প্ল্যাটফর্ম প্রদান করা।
        </p>

        {/* Call to Action */}
        <div className="flex justify-center lg:justify-start">
          <a
            href="/report"
            className="inline-block px-6 py-3 text-lg text-white bg-[#fd7e14] hover:bg-[#e06c1f] rounded-lg transition duration-300"
          >
            এখন রিপোর্ট করুন
          </a>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end">
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
