import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';  
import { BASE_URL } from '../utils/constants';

const NavBar = ({ toggleSidebar }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="navbar bg-[#0b081c]/40 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 px-4 md:px-6 h-16">
      <div className="flex-1 flex items-center gap-2">
        {/* Mobile Hamburger Toggle */}
        {user && (
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-circle text-slate-300 md:hidden"
            aria-label="Toggle Navigation"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Branding Title */}
        {!user ? (
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-teal-400 flex items-center justify-center shadow-md shadow-violet-500/20">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1v2.5M4 7l2-1M4 7l2 1M4 7v2.5M10 21l2-1 2 1v-2.5M6 18l2-1v-2.5m12 3.5l-2-1v-2.5" />
              </svg>
            </span>
            <span className="bg-gradient-to-r from-violet-400 to-teal-300 bg-clip-text text-transparent">CollabSphere</span>
          </Link>
        ) : (
          <Link to="/" className="text-xl font-bold tracking-tight text-white md:hidden">
            <span className="bg-gradient-to-r from-violet-400 to-teal-300 bg-clip-text text-transparent">CollabSphere</span>
          </Link>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-slate-300 text-sm font-medium">
            Welcome, <span className="text-violet-300 font-semibold">{user.firstName}</span>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-1 ring-white/10 hover:ring-violet-500/50 transition-all duration-200">
              <div className="w-9 rounded-full">
                <img
                  alt="user photo"
                  src={user.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#0e0b24] border border-white/10 rounded-xl z-30 mt-3 w-52 p-2 shadow-2xl"
            >
              <div className="px-3 py-2 border-b border-white/5 mb-1 sm:hidden">
                <p className="text-xs text-slate-500">Logged in as</p>
                <p className="text-sm font-medium text-white truncate">{user.firstName} {user.lastName}</p>
              </div>
              <li>
                <Link to="/profile" className="flex justify-between py-2 text-slate-300 hover:text-white rounded-lg">
                  Profile Settings
                  <span className="badge badge-sm bg-violet-600 border-none text-white font-bold">Edit</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="py-2 text-slate-300 hover:text-white rounded-lg">My Teams</Link>
              </li>
              <li>
                <Link to="/explore" className="py-2 text-slate-300 hover:text-white rounded-lg">Explore Builders</Link>
              </li>
              <li>
                <Link to="/requests" className="py-2 text-slate-300 hover:text-white rounded-lg">Team Requests</Link>
              </li>
              <div className="h-px bg-white/5 my-1" />
              <li>
                <button onClick={handleLogout} className="py-2 text-rose-400 hover:text-white hover:bg-rose-500/10 rounded-lg">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
