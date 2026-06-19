import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { getDeveloperDetails } from './UserCard';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Team Requests</h1>
        <p className="text-sm text-slate-400 mt-1">
          Review incoming collaboration invites. Accept to form a team and start building.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center max-w-md mx-auto space-y-4 my-10 animate-fade-in shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto border border-white/5">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">No requests found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            You don't have any pending incoming invitations. Build a strong profile to attract other developers!
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto animate-fade-in">
          {requests.map((request) => {
            const sender = request.fromUserId;
            if (!sender) return null;

            const { _id: senderId, firstName, lastName, photoUrl, age, gender, about } = sender;
            const { skills, githubUrl, availabilityStatus } = getDeveloperDetails(sender);

            return (
              <div 
                key={request._id} 
                className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-violet-500/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Developer details */}
                <div className="flex gap-4 items-start flex-1 min-w-0">
                  <img 
                    src={photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'} 
                    alt={firstName} 
                    className="w-16 h-16 rounded-xl object-cover ring-1 ring-white/10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h2 className="font-bold text-lg text-white leading-tight">
                        {firstName} {lastName}
                      </h2>
                      {age && gender && (
                        <span className="text-xs text-slate-400">
                          ({age} • {gender})
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[11px] text-teal-400 font-medium mt-1">
                      Availability: {availabilityStatus}
                    </p>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {about || "Hey, I saw your profile and would love to collaborate on a project together!"}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[9px] font-semibold bg-violet-600/10 text-violet-300 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Accept / Reject actions */}
                <div className="flex md:flex-col lg:flex-row items-center gap-2.5 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  {githubUrl && (
                    <a 
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-violet-600/10 border border-white/10 hover:border-violet-500/30 text-slate-300 hover:text-white transition-all"
                      title="View GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  )}

                  <button 
                    className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer" 
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  
                  <button 
                    className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-teal-500 text-white hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] hover:brightness-110 active:scale-98 transition-all cursor-pointer border-none"  
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept Project
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;
