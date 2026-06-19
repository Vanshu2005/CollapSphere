import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

// Helper to seed/retrieve extra developer metadata deterministically
export const getDeveloperDetails = (user) => {
  if (!user) return {};
  
  // Extract user skills or seed them deterministically from about text / ID
  let skills = user.skills || [];
  if (skills.length === 0 && user.about) {
    const aboutLower = user.about.toLowerCase();
    const techPool = ['react', 'node', 'express', 'mongodb', 'python', 'javascript', 'typescript', 'docker', 'kubernetes', 'aws', 'figma', 'ui/ux', 'next.js', 'vue', 'django', 'rust', 'c++', 'go'];
    techPool.forEach(tech => {
      if (aboutLower.includes(tech)) {
        skills.push(tech.toUpperCase());
      }
    });
  }
  if (skills.length === 0) {
    const defaultPools = [
      ['React', 'Node.js', 'TailwindCSS'],
      ['Python', 'Django', 'PostgreSQL'],
      ['Figma', 'UI/UX', 'CSS/HTML'],
      ['Next.js', 'TypeScript', 'GraphQL'],
      ['Docker', 'AWS', 'Kubernetes', 'Go']
    ];
    // Use user ID or name hash for deterministic fallback index
    const seed = user._id ? parseInt(user._id.substring(user._id.length - 4), 16) || 0 : 0;
    skills = defaultPools[seed % defaultPools.length];
  }

  // Retrieve saved github URL, or fallback to mock
  const userGithub = user._id ? localStorage.getItem(`collab_git_${user._id}`) : null;
  const githubUrl = user.githubUrl || userGithub || `https://github.com/${(user.firstName + (user.lastName || '')).toLowerCase().replace(/[^a-z0-9]/g, '')}`;

  // Retrieve saved availability, or fallback
  const userAvail = user._id ? localStorage.getItem(`collab_avail_${user._id}`) : null;
  const availabilities = ['Available', 'Looking for Hackathons', 'Open Source', 'Busy'];
  const seedVal = user._id ? parseInt(user._id.substring(user._id.length - 4), 16) || 0 : 0;
  const availabilityStatus = user.availabilityStatus || userAvail || availabilities[seedVal % availabilities.length];

  // Retrieve hackathon interest
  const userHack = user._id ? localStorage.getItem(`collab_hack_${user._id}`) : null;
  const hackathonInterest = user.hackathonInterest || userHack || (availabilityStatus === 'Looking for Hackathons' || (seedVal % 3 !== 0) ? 'Yes' : 'No');

  // Retrieve team size preference
  const userTeam = user._id ? localStorage.getItem(`collab_team_${user._id}`) : null;
  const teamSizes = ['2 members', '3-4 members', '4-5 members', '5+ members'];
  const teamSizePreference = user.teamSizePreference || userTeam || teamSizes[seedVal % teamSizes.length];

  return {
    skills,
    githubUrl,
    availabilityStatus,
    hackathonInterest,
    teamSizePreference
  };
};

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [animationClass, setAnimationClass] = useState("");

  if (!user) {
    return null;
  }

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const {
    skills,
    githubUrl,
    availabilityStatus,
    hackathonInterest,
    teamSizePreference
  } = getDeveloperDetails(user);

  const handleSendRequest = async (status, userId) => {
    // 1. Play swipe animation
    setAnimationClass(status === "interested" ? "animate-swipe-right" : "animate-swipe-left");
    
    // 2. Wait for animation to finish before calling dispatch
    setTimeout(async () => {
      try {
        await axios.post(
          `${BASE_URL}/request/send/${status}/${userId}`,
          {},
          { withCredentials: true }
        );
        dispatch(removeUserFromFeed(userId));
        setAnimationClass("");
      } catch (err) {
        console.error("Error sending request:", err.response?.data || err.message);
        setAnimationClass(""); // reset animation class in case of error
      }
    }, 400);
  };

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Looking for Hackathons':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Busy':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Open Source':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div className={`card w-full max-w-sm glass-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative ${animationClass}`}>
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Photo Header Container */}
      <figure className="relative h-64 overflow-hidden bg-slate-950">
        <img 
          src={photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=350&h=350&q=80'} 
          alt={`${firstName} photo`} 
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
        />
        
        {/* Availability Status Badge */}
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getStatusBadgeStyles(availabilityStatus)}`}>
          {availabilityStatus}
        </span>
      </figure>

      {/* Card Content body */}
      <div className="card-body p-6 space-y-4">
        
        {/* Profile Details Title */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title text-xl font-bold text-white leading-tight">
              {firstName} {lastName}
            </h2>
            {age && gender && (
              <p className="text-xs text-slate-400 mt-0.5">{age} • {gender}</p>
            )}
          </div>
          
          {/* GitHub Connection */}
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-white/5 hover:bg-violet-600/20 text-slate-300 hover:text-white border border-white/10 hover:border-violet-500/40 transition-all duration-200"
              title="GitHub Profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          )}
        </div>

        {/* User Bio */}
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {about || "Hey there! I'm open to collaborate on exciting codebases and hacking on new projects."}
        </p>

        {/* Extra Specs row: Hackathon interest & Team Size */}
        <div className="grid grid-cols-2 gap-2.5 py-1.5 border-y border-white/5 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Hacks: <strong className="text-slate-200">{hackathonInterest}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Size: <strong className="text-slate-200">{teamSizePreference}</strong></span>
          </div>
        </div>

        {/* Skills List */}
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Primary Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-0.5 text-xs font-semibold rounded bg-violet-600/10 text-violet-300 border border-violet-500/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-between items-center pt-2 gap-4">
          <button
            className="flex-1 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/30 font-semibold transition-all duration-200 text-sm cursor-pointer"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          
          <button
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-teal-500 text-white font-bold hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:brightness-110 transition-all duration-200 text-sm cursor-pointer border-none"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Collaborate
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserCard;
