"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fd7e14] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {/* Credit and Description */}
          <div>
            <p className="text-lg font-semibold mb-2">
              এই প্রকল্প সম্পূর্ণভাবে স্বেচ্ছাসেবী
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-2">যোগাযোগ</h4>
            <p>
              <a
                href="https://www.facebook.com/profile.php?id=61564884819596"
                className="text-white underline"
                target="blank"
              >
                Facebook | দুর্নীতি রোধ
              </a>
            </p>
          </div>

          {/* Additional Information */}
          <div>
            <p className="text-sm">
              এই প্রকল্পের উদ্দেশ্য হলো জনগণের দুর্নীতি সম্পর্কে সচেতনতা বৃদ্ধি
              করা এবং কার্যকর প্রতিবেদন প্রক্রিয়া সরবরাহ করা।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
