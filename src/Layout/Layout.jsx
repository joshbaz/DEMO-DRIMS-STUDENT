import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Toaster } from 'sonner';
import Sidebar from './Sidebar';
import { Icon } from '@iconify/react';
import { useGetLoggedInUser } from '../store/tanstackStore/services/queries';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Layout = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { data: userData } = useGetLoggedInUser();

  return (
    <div className="bg-gray-50 flex h-screen overflow-hidden">
      {/* 1. Mobile Sidebar Drawer */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileDrawerOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop overlay with blur */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
            isMobileDrawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileDrawerOpen(false)}
        />
        {/* Drawer contents */}
        <div 
          className={`absolute inset-y-0 left-0 w-56 bg-white shadow-xl transition-transform duration-300 ease-in-out transform flex flex-col ${
            isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onClose={() => setIsMobileDrawerOpen(false)} />
        </div>
      </div>

      {/* 2. Desktop Sidebar - always visible on desktop, hidden on mobile */}
      <div className="hidden md:flex md:w-56 md:shrink-0 h-full border-r border-gray-200">
        <Sidebar />
      </div>
      
      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile top header bar */}
        <header className="md:hidden flex items-center justify-between h-16 bg-white shadow-sm border-b border-gray-200 px-4 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileDrawerOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 focus:outline-none transition-colors"
            >
              <Icon icon="mdi:menu" className="w-6 h-6" />
            </button>
            <img src="/Logo2.png" alt="UMI Logo" className="h-10 w-auto" />
          </div>
          
          <div className="flex items-center">
            <NavLink to="/profile" className="flex items-center">
              <Avatar className="h-9 w-9 ring-2 ring-blue-50">
                <AvatarImage
                  src={userData?.user?.profile_image}
                  alt="profile"
                />
                <AvatarFallback className="bg-[#23388F] text-white font-semibold text-sm">
                  {userData?.user?.name?.charAt(0) || 'S'}
                </AvatarFallback>
              </Avatar>
            </NavLink>
          </div>
        </header>

        {/* Scrollable page body */}
        <main className="flex-1 overflow-y-auto bg-gray-50 focus:outline-none">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </div>
  );
};

export default Layout;