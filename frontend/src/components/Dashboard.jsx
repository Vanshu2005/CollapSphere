import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addConnections } from '../utils/connectionSlice';
import { addRequests } from '../utils/requestSlice';

const Dashboard = () => {
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections) || [];
  const requests = useSelector((store) => store.requests) || [];
  const dispatch = useDispatch();

  const fetchDashboardData = async () => {
    try {
      const connRes = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(connRes.data.data));
    } catch (err) {
      console.error("Dashboard: Error fetching connections:", err);
    }

    try {
      const reqRes = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(reqRes.data.data));
    } catch (err) {
      console.error("Dashboard: Error fetching requests:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  // Local storage values
  const storedAvailability = localStorage.getItem(`collab_avail_${user._id}`) || 'Available';
  const storedGithub = localStorage.getItem(`collab_git_${user._id}`) || '';

  // Parse skills: usually an array, but safeguard in case it is undefined
  const userSkills = user.skills || [];

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl glass-panel p-6 md:p-8 border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-20 w-60 h-60 bg-teal-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
              Builder Dashboard
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3 text-white tracking-tight">
              Welcome back, <span className="gradient-text">{user.firstName}</span>!
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
              Find developers. Build together. You are currently visible in the builder directory as <span className="text-teal-400 font-medium">{storedAvailability.toLowerCase()}</span>.
            </p>
          </div>
          <div>
            <Link 
              to="/explore"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-teal-500 text-white font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300 inline-block text-center whitespace-nowrap shadow-lg shadow-violet-950/20"
            >
              Explore Builders
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="glass-card p-5 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Teams</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white">{connections.length}</span>
            <span className="text-[10px] text-teal-400 font-medium">collaborators</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Connected tech builders</p>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-5 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-teal-400" />
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pending Requests</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white">{requests.length}</span>
            <span className="text-[10px] text-violet-400 font-medium">received</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Review collaboration requests</p>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-5 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Impressions</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white">128</span>
            <span className="text-[10px] text-emerald-400 font-medium">+12% wk</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Profile directory views</p>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-5 rounded-xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Match Rate</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-white">84%</span>
            <span className="text-[10px] text-indigo-400 font-medium">high score</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Mutual interest percentage</p>
        </div>
      </section>

      {/* Grid Layout: Left Main Column, Right Sidebar Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Active Milestones & Team Invitations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Collaborations Section */}
          <div className="glass-panel p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Active Collaboration Milestones
            </h3>
            
            <div className="space-y-4">
              {/* Milestone 1 */}
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Hackathon Project: FinTech AI</h4>
                    <p className="text-xs text-slate-400 mt-1">Milestone: Complete Next.js prototype and set up auth.</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold uppercase">
                    In Progress
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
                  <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
                  <span>Progress: 65%</span>
                  <span>Due in 3 days</span>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">OpenSource Library: CSS-Glass-Box</h4>
                    <p className="text-xs text-slate-400 mt-1">Milestone: Publish npm package v1.0.0 and update docs.</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold uppercase">
                    Planning
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
                  <span>Progress: 15%</span>
                  <span>Due in 12 days</span>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">SaaS MVP: BuilderLink</h4>
                    <p className="text-xs text-slate-400 mt-1">Milestone: Deploy to AWS Amplify, complete database schemas.</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20 font-semibold uppercase">
                    Testing
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
                  <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
                  <span>Progress: 90%</span>
                  <span>Due tomorrow</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Invites Showcase */}
          <div className="glass-panel p-6 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Incoming Team Requests
              </h3>
              {requests.length > 0 && (
                <Link to="/requests" className="text-xs font-semibold text-violet-400 hover:text-white transition-colors">
                  View All ({requests.length})
                </Link>
              )}
            </div>

            {requests.length === 0 ? (
              <div className="py-6 text-center text-slate-500 text-sm bg-white/[0.01] rounded-lg border border-dashed border-white/5">
                No pending requests. Swipe "Interested" in the Builder feed to discover collaborators!
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {requests.slice(0, 3).map((req) => {
                  const sender = req.fromUserId || {};
                  return (
                    <div key={req._id} className="py-3.5 flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={sender.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80'}
                          alt={sender.firstName}
                          className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">{sender.firstName} {sender.lastName}</h4>
                          <p className="text-xs text-slate-400 line-clamp-1">{sender.about || 'Wants to collaborate'}</p>
                        </div>
                      </div>
                      <Link 
                        to="/requests"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-violet-600 hover:text-white border border-white/10 hover:border-violet-500 transition-all text-slate-300"
                      >
                        Review
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Col - My Profile Completeness & Quick links */}
        <div className="space-y-6">
          
          {/* Builder Profile Completeness Panel */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 relative">
            <h3 className="text-lg font-bold text-white mb-4">Builder Profile</h3>
            
            <div className="flex flex-col items-center py-4">
              {/* Circular Progress Ring */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="url(#progressGradient)" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 * (1 - (userSkills.length > 0 && user.about ? 0.95 : 0.6))} 
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-white">{userSkills.length > 0 && user.about ? '95%' : '60%'}</span>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Complete</p>
                </div>
              </div>

              <div className="text-center mt-5">
                <h4 className="font-bold text-white text-base">{user.firstName} {user.lastName}</h4>
                <p className="text-xs text-slate-400 mt-1">{user.gender ? `${user.age || '22'} • ${user.gender}` : 'Developer'}</p>
              </div>

              {/* Tech stack badges */}
              <div className="w-full mt-6 space-y-3 border-t border-white/5 pt-4">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Tech Stack</p>
                  {userSkills.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No skills listed yet.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {userSkills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded bg-violet-500/10 text-violet-300 border border-violet-500/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">GitHub Connection</p>
                  {storedGithub ? (
                    <a href={storedGithub} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-400 hover:underline flex items-center gap-1.5 truncate">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      {storedGithub.replace('https://github.com/', '')}
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 italic">No GitHub connected.</span>
                  )}
                </div>
              </div>

              <Link 
                to="/profile"
                className="w-full mt-6 text-center py-2.5 rounded-xl border border-white/10 hover:border-violet-500 bg-white/[0.02] hover:bg-violet-600/10 text-slate-200 text-xs font-semibold transition-all"
              >
                Edit Profile Info
              </Link>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="glass-panel p-6 rounded-xl border border-white/5">
            <h3 className="text-sm font-bold text-white mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/explore" className="p-3 text-center bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 rounded-xl text-xs text-slate-300 font-medium hover:text-white transition-all">
                Find Partners
              </Link>
              <Link to="/connections" className="p-3 text-center bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 rounded-xl text-xs text-slate-300 font-medium hover:text-white transition-all">
                My Projects
              </Link>
              <Link to="/requests" className="p-3 text-center bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 rounded-xl text-xs text-slate-300 font-medium hover:text-white transition-all">
                Team Requests
              </Link>
              <Link to="/analytics" className="p-3 text-center bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 rounded-xl text-xs text-slate-300 font-medium hover:text-white transition-all">
                View Analytics
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
