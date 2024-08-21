"use client";
import { useState, useEffect, SetStateAction } from "react";
import Swal from "sweetalert2"; // Updated import to use sweetalert2 directly

const ReportPage = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [reportDetails, setReportDetails] = useState({
    title: "",
    description: "",
    contactNumber: "",
  });
  const [solveStatus, setSolveStatus] = useState(""); // New state for solveStatus
  const [reviewed, setReviewed] = useState(false); //
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/divisions")
      .then((res) => res.json())
      .then((data) => setDivisions(data))
      .catch((error) => console.error("Error fetching divisions:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      setLoading(true);
      fetch(`http://localhost:8000/districts?division_id=${selectedDivision}`)
        .then((res) => res.json())
        .then((data) => {
          const filteredDistricts = data.filter(
            (district: { division_id: string }) =>
              district.division_id === selectedDivision
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
      fetch(`http://localhost:8000/upazilas?district_id=${selectedDistrict}`)
        .then((res) => res.json())
        .then((data) => {
          const filteredUpazilas = data.filter(
            (upazila: { district_id: string }) =>
              upazila.district_id === selectedDistrict
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
      fetch(`http://localhost:8000/unions?upazila_id=${selectedUpazila}`)
        .then((res) => res.json())
        .then((data) => {
          const filteredUnions = data.filter(
            (union) => union.upazilla_id === selectedUpazila
          );
          setUnions(filteredUnions);
        })
        .catch((error) => console.error("Error fetching unions:", error))
        .finally(() => setLoading(false));
    } else {
      setUnions([]);
    }
  }, [selectedUpazila]);

  const handleDivisionChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrict("");
    setSelectedUpazila("");
    setSelectedUnion("");
  };

  const handleDistrictChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedDistrict(event.target.value);
    setSelectedUpazila("");
    setSelectedUnion("");
  };

  const handleUpazilaChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedUpazila(event.target.value);
    setSelectedUnion("");
  };

  const handleUnionChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedUnion(event.target.value);
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setReportDetails({
      ...reportDetails,
      [name]: value,
    });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    event.preventDefault();
    const selectedDivisionName =
      divisions.find((div) => div.id === selectedDivision)?.bn_name || "";
    const selectedDistrictName =
      districts.find((dist) => dist.id === selectedDistrict)?.bn_name || "";
    const selectedUpazilaName =
      upazilas.find((up) => up.id === selectedUpazila)?.bn_name || "";
    const selectedUnionName =
      unions.find((un) => un.id === selectedUnion)?.bn_name || "";
    fetch("http://localhost:8000/reports", {
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
          onClose: () => {
            setSelectedDivision("");
            setSelectedDistrict("");
            setSelectedUpazila("");
            setSelectedUnion("");
            setReportDetails({
              title: "",
              description: "",
              contactNumber: "",
            });
          },
        });
      })
      .catch((error) => console.error("Error submitting report:", error));
  };

  return (
    <div className="report-page bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-4xl mb-6 text-[#fd7e14] font-bold">
        দুর্নীতি রিপোর্ট করুন
      </h1>
      <p className="mb-6 text-lg text-gray-700">
        আপনার তথ্য সম্পূর্ণ নিরাপদ থাকবে
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="font-semibold text-[#fd7e14] text-lg">
          বিভাগ:
          {loading ? (
            <span className="loading loading-spinner loading-lg ml-2"></span>
          ) : (
            <select
              value={selectedDivision}
              onChange={handleDivisionChange}
              className="ml-2 p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="">বিভাগ নির্বাচন করুন</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.bn_name}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="font-semibold text-[#fd7e14] text-lg">
          জেলা:
          {loading ? (
            <span className="loading loading-spinner loading-lg ml-2"></span>
          ) : (
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="ml-2 p-3 border border-gray-300 rounded-lg w-full"
              disabled={!selectedDivision}
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.bn_name}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="font-semibold text-[#fd7e14] text-lg">
          উপজেলা:
          {loading ? (
            <span className="loading loading-spinner loading-lg ml-2"></span>
          ) : (
            <select
              value={selectedUpazila}
              onChange={handleUpazilaChange}
              className="ml-2 p-3 border border-gray-300 rounded-lg w-full"
              disabled={!selectedDistrict}
            >
              <option value="">উপজেলা নির্বাচন করুন</option>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.bn_name}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="font-semibold text-[#fd7e14] text-lg">
          ইউনিয়ন:
          {loading ? (
            <span className="loading loading-spinner loading-lg ml-2"></span>
          ) : (
            <select
              value={selectedUnion}
              onChange={handleUnionChange}
              className="ml-2 p-3 border border-gray-300 rounded-lg w-full"
              disabled={!selectedUpazila || unions.length === 0}
            >
              <option value="">ইউনিয়ন নির্বাচন করুন</option>
              {unions.map((union) => (
                <option key={union.id} value={union.id}>
                  {union.bn_name}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="font-semibold text-[#fd7e14] text-lg">
          শিরোনাম:
          <input
            type="text"
            name="title"
            value={reportDetails.title}
            onChange={handleInputChange}
            className="ml-2 p-3 border border-gray-300 rounded-lg w-full"
            placeholder="শিরোনাম লিখুন"
          />
        </label>

        <label className="font-semibold text-[#fd7e14] text-lg">
          যোগাযোগের নম্বর:
          <input
            type="text"
            name="contactNumber"
            value={reportDetails.contactNumber}
            onChange={handleInputChange}
            className="ml-2 p-3 border border-gray-300 rounded-lg w-full"
            placeholder="যোগাযোগের নম্বর লিখুন"
          />
        </label>

        <label className="font-semibold text-[#fd7e14] text-lg">
          বিবরণ:
          <textarea
            name="description"
            value={reportDetails.description}
            onChange={handleInputChange}
            className="ml-2 p-3 border border-gray-300 rounded-lg w-full"
            placeholder="বিবরণ লিখুন"
            rows={6}
          />
        </label>

        <button
          type="submit"
          className="bg-[#fd7e14] text-white p-3 rounded-lg hover:bg-[#e56c0f] transition duration-200"
        >
          জমা দিন
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
