import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchUser = async () => {
    // only skip fetch if user already has an _id
    if (userData?._id) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data || res.data)); // ✅ extract actual user object or fallback to direct response
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login"); // ✅ correct check
      } else {
        console.error("Fetch user error:", err);
      }
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#080516]">
      {userData && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto animate-fade-in">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Body;
