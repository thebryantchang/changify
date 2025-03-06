import {NavLink,Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle logout functionality
  const handleLogout = () => {
    // Clear JWT token from localStorage
    localStorage.removeItem('token');

    // Clear cookies if stored (example using document.cookie)
    Cookies.remove('x-access-token', { path: '/' });

    console.log('User logged out');

    // Redirect to sign-in page
    navigate('/');
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 border-b-2 border-blue-600'
      : 'text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300';

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="flex justify-between h-16 px-4"> {/* Adjusted padding here */}
        {/* Left Side: My Tasks and Add New Task Buttons */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/home" // Replace with your My Tasks route
            className={getNavLinkClass}
          >
            My Tasks
          </NavLink>
          <NavLink
            to="/addtask" // Replace with your Add New Task route
            className={getNavLinkClass}
          >
            Add New Task
          </NavLink>
        </div>

        {/* Right Side: Log Out Button */}
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;