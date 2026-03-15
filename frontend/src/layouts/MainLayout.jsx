import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/AuthContext";

const MainLayout = ({ onSelectedTheme }) => {
  const { appName } = useAuth();
  // Posisi bisa: 'top', 'left', 'right'
  const [navPosition, setNavPosition] = useState(localStorage.getItem("navpos")); 

  // Logika Class Grid berdasarkan posisi
  const layoutStyles = {
    top: "grid-rows-[auto_1fr_auto] min-h-screen",
    left: "grid-cols-[auto_1fr] min-h-screen",
    right: "grid-cols-[1fr_auto] min-h-screen"
  };
  const handleSetNavPosition=(pos)=>{
    localStorage.setItem("navpos",pos)
    setNavPosition(pos)
  }
  return (
    <div className={`grid ${layoutStyles[navPosition]} bg-base-200 transition-all duration-500`}>
      
      {/* NAVBAR: Kita kirimkan prop position agar Navbar tahu cara merender dirinya */}
      <Navbar 
        onSelectedTheme={onSelectedTheme} 
        position={navPosition} 
        setPosition={handleSetNavPosition} 
      />

      {/* MAIN CONTENT */}
      <div className={`flex flex-col ${navPosition === 'top' ? "" : "h-screen overflow-hidden"}`}>
        <main className={`flex-1 overflow-y-auto p-4 md:p-8 w-full`}>
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

        <footer className="footer footer-center p-4 bg-base-300 text-base-content border-t border-primary/10 shrink-0">
          <p className="text-xs">Copyright © 2026 - {appName} by Fengli</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;