import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiPlusCircle, FiList, FiLogIn, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Tasky
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            <NavLink to="/" icon={<FiHome />}>Home</NavLink>
            <NavLink to="/add-task" icon={<FiPlusCircle />}>Add Task</NavLink>
            <NavLink to="/manage-tasks" icon={<FiList />}>Manage Tasks</NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-blue-500 font-medium hover:bg-blue-50 transition-all duration-300 flex items-center space-x-2"
            >
              <FiLogIn className="transition-transform group-hover:rotate-12" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2 group hover:shadow-md"
            >
              <FiUserPlus className="transition-transform group-hover:scale-110" />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};


const NavLink = ({ to, children, icon }) => {
  return (
    <Link
      to={to}
      className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 relative group flex items-center space-x-2"
    >
      <span className="text-blue-500 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span>{children}</span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 transition-all duration-300"></span>
    </Link>
  );
};

// Mobile Menu Component
const MobileMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:bg-blue-50 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Menu Dropdown with Transition */}
      <div 
        className={`absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-2 px-4 transition-all duration-300 transform origin-top ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-2">
          <MobileNavLink to="/" icon={<FiHome />}>Home</MobileNavLink>
          <MobileNavLink to="/add-task" icon={<FiPlusCircle />}>Add Task</MobileNavLink>
          <MobileNavLink to="/manage-tasks" icon={<FiList />}>Manage Tasks</MobileNavLink>
          <div className="border-t border-gray-100 my-2"></div>
          <MobileNavLink to="/login" icon={<FiLogIn />}>Login</MobileNavLink>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium text-center hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <FiUserPlus className="transition-transform duration-300 group-hover:scale-110" />
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Mobile NavLink Component with icon
const MobileNavLink = ({ to, children, icon }) => {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-md  transition-colors duration-300 flex items-center space-x-3"
    >
      <span className="text-blue-500">{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

export default Navbar;