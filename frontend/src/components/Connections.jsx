import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { getDeveloperDetails } from './UserCard';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Determinate a collaborative role for each teammate based on their skills
  const getTeammateRole = (skills) => {
    const primary = skills[0]?.toLowerCase() || '';
    if (primary.includes('figma') || primary.includes('ux') || primary.includes('ui')) return 'UI/UX Designer';
    if (primary.includes('node') || primary.includes('django') || primary.includes('py')) return 'Backend Architect';
    if (primary.includes('aws') || primary.includes('docker') || primary.includes('kube')) return 'DevOps Engineer';
    if (primary.includes('react') || primary.includes('next') || primary.includes('vue')) return 'Frontend Engineer';
    return 'Full Stack Developer';
  };

  if (!connections) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">My Projects</h1>
        <p className="text-sm text-slate-400 mt-1">
          Review your collaboration teams, chat with teammates, and manage project progress.
        </p>
      </div>

      {connections.length === 0 ? (
        <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center max-w-md mx-auto space-y-4 my-10 animate-fade-in shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto border border-white/5">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">No teammates found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            You don't have any active projects yet. Browse the Builder Directory and request connection to team up!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
            const { skills, githubUrl, availabilityStatus } = getDeveloperDetails(connection);
            const role = getTeammateRole(skills);

            return (
              <div 
                key={_id} 
                className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-violet-500/30 hover:shadow-[0_4px_25px_rgba(139,92,246,0.1)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual glow indicator based on availability */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-2xl" />

                <div className="flex gap-4 items-start">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'} 
                      alt={firstName} 
                      className="w-16 h-16 rounded-xl object-cover ring-1 ring-white/10"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-slate-900 border border-white/10 text-teal-400">
                      Active
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-bold text-lg text-white truncate leading-tight">
                        {firstName} {lastName}
                      </h2>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-violet-500/10 text-violet-300 rounded border border-violet-500/15">
                        {role}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 italic">
                      Status: <span className="text-slate-300 font-medium">{availabilityStatus}</span>
                    </p>

                    <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                      {about || "Let's build something awesome together! Connect on GitHub to review our codebase."}
                    </p>
                  </div>
                </div>

                {/* Tech stack mini tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {skills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[9px] font-semibold bg-white/5 text-slate-300 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <a 
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-white/5 hover:bg-violet-600/10 text-slate-300 hover:text-white border border-white/10 hover:border-violet-500/30 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub Code
                  </a>

                  <button 
                    onClick={() => alert(`Simulated Chat with ${firstName}! Complete messaging requires backend websocket setup.`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-teal-500 text-white hover:shadow-[0_0_10px_rgba(124,58,237,0.3)] hover:brightness-110 active:scale-98 transition-all cursor-pointer border-none"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Open Workspace
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

export default Connections;
