"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Footer from "@/Components/Footer/page";
import Navbar from "@/Components/Navbar/page";
import { useRouter } from "next/navigation"; // Import useRouter

interface Division {
  id: string;
  bn_name: string;
  name: string; // Adding 'name' field for API submission
}

interface District {
  id: string;
  bn_name: string;
  name: string; // Adding 'name' field for API submission
  division_id: string;
}

interface Upazila {
  id: string;
  bn_name: string;
  name: string; // Adding 'name' field for API submission
  district_id: string;
}

interface Union {
  id: string;
  bn_name: string;
  name: string; // Adding 'name' field for API submission
  upazilla_id: string;
}

const ReportPage = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazila[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [selectedUnion, setSelectedUnion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [reportDetails, setReportDetails] = useState({
    title: "",
    description: "",
    contactNumber: "",
    imageLink: "", // Added imageLink state
  });
  const [solveStatus, setSolveStatus] = useState<string>("");
  const [reviewed, setReviewed] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // New state for image file

  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setLoading(true);
    fetch("https://durniti-rodhv2.vercel.app/divisions")
      .then((res) => res.json())
      .then((data) => setDivisions(data))
      .catch((error) => console.error("Error fetching divisions:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      setLoading(true);
      fetch(
        `https://durniti-rodhv2.vercel.app/districts?division_id=${selectedDivision}`
      )
        .then((res) => res.json())
        .then((data) => {
          const filteredDistricts = data.filter(
            (district: District) => district.division_id === selectedDivision
          );
          setDistricts(filteredDistricts);
        })
        .catch((error) => console.error("Error fetching districts:", error))
        .finally(() => setLoading(false));
    } else {
      setDistricts([]);
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      setLoading(true);
      fetch(
        `https://durniti-rodhv2.vercel.app/upazilas?district_id=${selectedDistrict}`
      )
        .then((res) => res.json())
        .then((data) => {
          const filteredUpazilas = data.filter(
            (upazila: Upazila) => upazila.district_id === selectedDistrict
          );
          setUpazilas(filteredUpazilas);
        })
        .catch((error) => console.error("Error fetching upazilas:", error))
        .finally(() => setLoading(false));
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedUpazila) {
      setLoading(true);
      fetch(
        `https://durniti-rodhv2.vercel.app/unions?upazila_id=${selectedUpazila}`
      )
        .then((res) => res.json())
        .then((data) => {
          const filteredUnions = data.filter(
            (union: Union) => union.upazilla_id === selectedUpazila
          );
          setUnions(filteredUnions);
        })
        .catch((error) => console.error("Error fetching unions:", error))
        .finally(() => setLoading(false));
    } else {
      setUnions([]);
    }
  }, [selectedUpazila]);

  const handleDivisionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrict("");
    setSelectedUpazila("");
    setSelectedUnion("");
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
    setSelectedUpazila("");
    setSelectedUnion("");
  };

  const handleUpazilaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUpazila(event.target.value);
    setSelectedUnion("");
  };

  const handleUnionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnion(event.target.value);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setReportDetails({
      ...reportDetails,
      [name]: value,
    });
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Upload to ImageBB
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            params: { key: "84637e8bbffbf467ef488486fc948bf5" },
          }
        );
        setReportDetails((prevDetails) => ({
          ...prevDetails,
          imageLink: response.data.data.url, // ImageBB response contains the image URL
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedDivisionName =
      divisions.find((div) => div.id === selectedDivision)?.name || ""; // Use name for API submission
    const selectedDistrictName =
      districts.find((dist) => dist.id === selectedDistrict)?.name || ""; // Use name for API submission
    const selectedUpazilaName =
      upazilas.find((up) => up.id === selectedUpazila)?.name || ""; // Use name for API submission
    const selectedUnionName =
      unions.find((un) => un.id === selectedUnion)?.name || ""; // Use name for API submission

    fetch("https://durniti-rodhv2.vercel.app/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        division: selectedDivisionName,
        district: selectedDistrictName,
        upazila: selectedUpazilaName,
        union: selectedUnionName,
        solveStatus,
        reviewed,
        reportDateTime: new Date().toISOString(),
        ...reportDetails,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your report has been submitted successfully.",
          confirmButtonColor: "#fd7e14",
        }).then(() => {
          setSelectedDivision("");
          setSelectedDistrict("");
          setSelectedUpazila("");
          setSelectedUnion("");
          setReportDetails({
            title: "",
            description: "",
            contactNumber: "",
            imageLink: "", // Clear image link after submission
          });
          setImageFile(null); // Clear image file after submission
          router.push("/"); // Navigate to homepage after submission
        });
      })
      .catch((error) => console.error("Error submitting report:", error));
  };

  return (
    <>
      <Navbar />
      <div className="relative bg-[#e8f0f2] p-8 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0f2] to-[#fd7e14] opacity-20 animate-pulse"></div>
        <h1 className="text-4xl mb-6 text-[#fd7e14] font-bold z-10 relative">
          দুর্নীতি/অনিয়ম রিপোর্ট করুন
        </h1>
        <p className="mb-6 text-lg text-red-500 z-10 relative">
          আপনার তথ্য সম্পূর্ণ নিরাপদ থাকবে।
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
          <label className="block text-lg font-semibold">বিভাগ</label>
          <select
            value={selectedDivision}
            onChange={handleDivisionChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- নির্বাচন করুন --</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.bn_name}
              </option>
            ))}
          </select>

          <label className="block text-lg font-semibold">জেলা</label>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- নির্বাচন করুন --</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.bn_name}
              </option>
            ))}
          </select>

          <label className="block text-lg font-semibold">উপজেলা</label>
          <select
            value={selectedUpazila}
            onChange={handleUpazilaChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- নির্বাচন করুন --</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.id}>
                {upazila.bn_name}
              </option>
            ))}
          </select>

          <label className="block text-lg font-semibold">ইউনিয়ন</label>
          <select
            value={selectedUnion}
            onChange={handleUnionChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- নির্বাচন করুন --</option>
            {unions.map((union) => (
              <option key={union.id} value={union.id}>
                {union.bn_name}
              </option>
            ))}
          </select>

          <label className="block text-lg font-semibold">শিরোনাম</label>
          <input
            type="text"
            name="title"
            value={reportDetails.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />

          <label className="block text-lg font-semibold">বিবরণ</label>
          <textarea
            name="description"
            value={reportDetails.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>

          <label className="block text-lg font-semibold">যোগাযোগ নম্বর</label>
          <input
            type="text"
            name="contactNumber"
            value={reportDetails.contactNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />

          <label className="block text-lg font-semibold">ছবি আপলোড করুন</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          {loading && (
            <div className="w-full flex justify-center items-center py-4">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#fd7e14] text-white py-2 rounded-md transition-transform transform hover:scale-105"
          >
            রিপোর্ট জমা দিন
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ReportPage;
