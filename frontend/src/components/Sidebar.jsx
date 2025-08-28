import { useState } from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, ShipWheelIcon, UsersIcon, XIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

// Updated Sidebar component with mobile support
const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-[10px] left-2 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn btn-ghost btn-circle"
        >
          {isMobileMenuOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <aside className={`bg-base-200 border-r border-base-300 flex flex-col h-screen fixed lg:sticky top-0 z-40 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-80`}>
        <div className="lg:p-5 pt-4 pl-14 border-b border-base-300">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/" ? "btn-active" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HomeIcon className="size-5 text-base-content opacity-70" />
            <span>Home</span>
          </Link>

          <Link
            to="/notifications"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/notifications" ? "btn-active" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <BellIcon className="size-5 text-base-content opacity-70" />
            <span>Notifications</span>
          </Link>
        </nav>

        {/* USER PROFILE SECTION */}
        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;