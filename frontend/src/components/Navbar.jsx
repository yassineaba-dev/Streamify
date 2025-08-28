import { Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

// Updated Navbar component
const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo now visible on all pages and screen sizes */}
          <div className="lg:hidden sm:top-4 left-14 top-5 fixed items-center">
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-7 sm:size-9 text-primary" />
              <span className="text-xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end fixed right-2 gap-3 sm:gap-4">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-5 w-5 sm:h-6 sm:w-6 text-base-content opacity-70" />
              </button>
            </Link>

            <ThemeSelector />

            <div className="avatar">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>

            {/* Logout button */}
            <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
              <LogOutIcon className="h-5 w-5 sm:h-6 sm:w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;