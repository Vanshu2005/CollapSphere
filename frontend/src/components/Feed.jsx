import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feedItems = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    // Only fetch if feed is empty or null
    if (!feedItems || feedItems.length === 0) {
      getFeed();
    }
  }, []);

  const handleRefresh = () => {
    getFeed();
  };

  if (!feedItems) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Explore Builders</h1>
        <p className="text-xs text-slate-400 mt-1">
          Discover hackathon teammates, open-source collaborators, and co-founders.
        </p>
      </div>

      {feedItems.length === 0 ? (
        <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center max-w-sm w-full space-y-5 animate-fade-in shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center mx-auto border border-violet-500/20">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No new builders found!</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              You've viewed all registered profiles in your matching pool. Adjust your skills or try checking back later!
            </p>
          </div>
          <button 
            onClick={handleRefresh}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-teal-500 text-white font-bold text-sm hover:brightness-110 active:scale-98 transition-all cursor-pointer"
          >
            Refilter Deck
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center animate-fade-in">
          <UserCard user={feedItems[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;
