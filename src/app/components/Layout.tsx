import { useState } from 'react';
import { Outlet } from 'react-router';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { buildings } from '../data/campusData';
import { useNavigate } from 'react-router';

export function Layout() {
  const [isEventMode, setIsEventMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    // Search for buildings
    const matchedBuilding = buildings.find(
      (building) =>
        building.name.toLowerCase().includes(query.toLowerCase()) ||
        building.shortName.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedBuilding) {
      // Navigate to buildings page if a match is found
      navigate('/buildings');
    }
  };

  const handleEventModeToggle = () => {
    setIsEventMode(!isEventMode);
    if (!isEventMode) {
      navigate('/event-mode');
    } else {
      navigate('/');
    }
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav
        onSearch={handleSearch}
        isEventMode={isEventMode}
        onEventModeToggle={handleEventModeToggle}
        onMenuToggle={handleMenuToggle}
      />
      
      {/* Sidebar with Hamburger Menu */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <main className="w-full">
        <Outlet context={{ isEventMode }} />
      </main>
    </div>
  );
}