import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useGetStudentProfile } from "../../store/tanstackStore/services/queries";
import MyProfileProgressPage from "./MyProfileProgressPage.jsx";
import MyProfileAccountSettings from "./MyProfileAccountSettings.jsx";
import { Icon } from "@iconify/react";
import { Loader2, ArrowLeft } from "lucide-react";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("progress");
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [activeTab]);

  const { data: studentData, isLoading, error } = useGetStudentProfile();

  if (error) {
    return (
      <div className="min-h-full bg-gray-50 p-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <span className="text-red-500">
            Error loading data: {error?.message}
          </span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-full bg-gray-50 p-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            <span className="text-lg font-medium text-gray-900">
              Loading profile data...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!studentData?.student) {
    return (
      <div className="min-h-full bg-gray-50 p-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 bg-[#23388F] text-white rounded-lg gap-2 hover:bg-blue-600"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <span className="text-lg font-medium text-gray-900">
              Profile not found
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-full bg-gray-50">
      {/* Top Search Bar */}
     

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 sm:py-6 gap-2">
        <h1 className="text-xl sm:text-2xl font-[Inter-Medium]">
          My Profile
        </h1>
        <span className="text-xs sm:text-sm font-[Inter-Regular] text-gray-500">
          Last login: {format(new Date(), "MM-dd-yyyy hh:mm:ssaa")}
        </span>
      </div>

      {/* Progress and Settings Tabs */}
      <div className="px-4 sm:px-6 py-2 sm:py-4 mb-4">
        <div className="bg-white p-4 rounded-[10px] shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-base sm:text-lg font-[Inter-SemiBold] text-gray-900">
                Reg. Number: {studentData?.student?.registrationNumber || "N/A"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button
                onClick={() => setActiveTab("progress")}
                className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-[6px] text-xs sm:text-sm font-[Inter-Medium] gap-2 text-semantic-text-primary border-2 cursor-pointer
                  ${activeTab === "progress" ? "border-[#23388F]" : "border-[#C4C5C6]"}`}
              >
                <Icon icon="material-symbols:browse-activity-sharp" width="20" height="20" className="text-[#626263]" />
                Progress
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-[6px] text-xs sm:text-sm font-[Inter-Medium] gap-2 text-[#070B1D] border-2 cursor-pointer
                  ${activeTab === "settings" ? "border-[#23388F]" : "border-[#C4C5C6]"}`}
              >
                <Icon icon="material-symbols:manufacturing" width="20" height="20" className="text-[#626263]" />
                Account Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-2 sm:py-4 mb-4">
        {activeTab === "progress" && <MyProfileProgressPage studentData={studentData} />}
        {activeTab === "settings" && <MyProfileAccountSettings studentData={studentData} />}
      </div>
    </div>
  );
};

export default MyProfile;
