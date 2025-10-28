import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiBarChart,
  FiSearch,
  FiBell,
  FiUser,
  FiCheckCircle,
  FiClock,
  FiMenu,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { HiOutlineCalendar } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for the stats
  const _stats = [
    { title: "Total Users", value: "1,257", icon: FiUsers, change: "+12%" },
    { title: "Revenue", value: "$35,800", icon: FiDollarSign, change: "+8%" },
    { title: "Growth", value: "23%", icon: FiTrendingUp, change: "+2.3%" },
    { title: "Engagement", value: "89%", icon: FiBarChart, change: "+5%" },
  ];

  // Mock data for the chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [650, 750, 850, 900, 950, 1000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="hidden md:block"
      />

   
      {/* Mobile Sidebar (slide-out) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          noFixed={true}
          className="h-full"
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsMobileMenuOpen(false);
          }}
        />
      </div>


      <main className="md:ml-64 pb-16 md:pb-8 bg-white md:bg-gray-50 ">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between p-6 fixed top-0 right-0 ">
         

          <div className="flex items-center gap-4">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 focus:outline-none rounded-lg border border-gray-200 bg-white text-sm"
              />
            </div>
            <button className="text-gray-600">
              <FiBell size={16} />
            </button>
             <IoIosArrowDown className="text-gray-400 cursor-pointer relative right-2" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between gap-4 mb-6 bg-white p-4">
          <div className="ml-8">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center gap-8 w-[30%] mr-8">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 focus:outline-none rounded-lg border border-gray-200 bg-white text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-700 border-r border-r-gray-200 p-2">
                <FiBell size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-[#EDF5FD] flex items-center justify-center text-gray-600">
                <FiUser />
              </div>
              <IoIosArrowDown className="text-gray-400 cursor-pointer relative right-2" />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="md:grid md:grid-cols-3 md:gap-4 md:mb-6 md:bg-white md:rounded-lg md:p-6 md:shadow md:mx-8 flex flex-row justify-between px-4 border-b border-gray-100 py-4 mt-20 md:mt-0 bg-white">
          <div className="flex flex-col md:border-r md:border-r-gray-200">
            <p className="text-xs md:text-sm text-gray-500">Projects</p>
            <div className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-gray-800">
              12
            </div>
          </div>

          <div className="flex flex-col md:border-r md:border-r-gray-200">
            <p className="text-xs md:text-sm text-gray-500">Beneficiaries</p>
            <div className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-gray-800">
              5,432
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs md:text-sm text-gray-500">Funding</p>
            <div className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-gray-800">
              $250,000
            </div>
          </div>
        </div>

        <div className="md:bg-white md:rounded-lg md:shadow md:p-6 md:mb-6 md:mx-8 px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              Progress Overview
            </h3>
            <button className="flex items-center gap-1 text-xs md:text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
              <span>Year</span>
              <HiOutlineCalendar className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="text-xs text-gray-500">
                Project Completion Rate
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-800">1,200</div>
              <div className="text-sm text-green-500">Last Quarter +10%</div>

              <div className="mt-4 h-56">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: "rgba(0,0,0,0.04)" },
                      },
                      x: { grid: { display: false } },
                    },
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-1 bg-gray-50 p-4 rounded">
              <div className="text-sm text-gray-600">Beneficiary Reach</div>
              <div className="mt-2 text-2xl font-bold text-gray-800">1,200</div>
              <div className="text-sm text-green-500">Last Quarter +10%</div>

              <div className="mt-6 space-y-3">
                {["Q1", "Q2", "Q3", "Q4"].map((q, idx) => (
                  <div key={q} className="flex items-end gap-3">
                    <div
                      className={`w-8 bg-blue-300 rounded-t ${
                        idx === 3 ? "h-20" : "h-12"
                      }`}
                    />
                    <div className="text-sm text-gray-500">{q}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:bg-white md:rounded-lg md:shadow md:mx-8 md:p-6 px-4 pt-4">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              Recent Activities
            </h3>
            <div className="text-xs md:text-sm text-gray-500">
              1 June 2025 - 20 June 2025
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="">
              <div className=" text-gray-500">Services delivered</div>
              <div className="mt-2 font-bold">5</div>
            </div>
            <div className="">
              <div className=" text-gray-500">Items distributed</div>
              <div className="mt-2 font-bold">300</div>
            </div>
            <div className="">
              <div className=" text-gray-500">New enrollments</div>
              <div className="mt-2 font-bold">150</div>
            </div>
            <div className="">
              <div className=" text-gray-500">Funds received</div>
              <div className="mt-2 font-bold">₦120,000</div>
            </div>
            <div className="">
              <div className=" text-gray-500">Funds disbursed</div>
              <div className="mt-2 font-bold">₦120,000</div>
            </div>
          </div>
           
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="text-green-500 mt-1">
                <FiCheckCircle />
              </div>
              <div>
                <div className="text-sm font-medium">
                  Project 'Empower Youth' completed
                </div>
                <div className="text-xs text-gray-500">2 days ago</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="text-gray-600 mt-1">
                <FiClock />
              </div>
              <div>
                <div className="text-sm font-medium">
                  New funding received for 'Clean Water Initiative'
                </div>
                <div className="text-xs text-gray-500">1 week ago</div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
