import { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { BsFileEarmarkText } from "react-icons/bs";
import { FiSettings, FiMenu } from "react-icons/fi";
import { LuFolderDot, LuLogOut } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { FaRegComment } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <AiOutlineHome className="text-[18px]" /> },
    { id: 'projects', label: 'Projects', icon: <LuFolderDot className="text-[18px]" /> },
    { id: 'reports', label: 'Reports', icon: <BsFileEarmarkText className="text-[18px]" /> },
    { id: 'team', label: 'Team', icon: <GoPeople className="text-[18px]" /> },
    { id: 'testimonial', label: 'Testimonial', icon: <FaRegComment className="text-[18px]" /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings className="text-[18px]" /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-8 left-4 z-50 p-2 rounded-md hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <IoCloseOutline className="text-2xl" />
        ) : (
          <FiMenu className="text-2xl" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen flex transition-transform duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="w-2 bg-gray-800" />
        <aside className="w-64 bg-white shadow-lg">
          <div className="p-6 flex gap-2 items-center mt-12 md:mt-0">
            <div className="flex items-center justify-center">
              <img src="/logo.png" className="w-5" alt="Beacyn Logo" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 tracking-widest">BEACYN</h2>
          </div>

          <nav className="mt-6 px-4 space-y-2">
            {navItems.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2 flex items-center text-left gap-3 cursor-pointer transition-all duration-150 ${
                  activeTab === id
                    ? 'bg-blue-600 text-white rounded-full'
                    : 'hover:bg-gray-100 rounded-md text-black'
                }`}
              >
                <span className={`${activeTab === id ? 'text-white' : 'text-gray-600'}`}>{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4 text-sm absolute left-4 bottom-4 cursor-pointer">
            <button className="flex items-center gap-2 hover:text-gray-800">
              <LuLogOut className="text-[18px]" />
              Log Out
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}