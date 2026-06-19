import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileAnalytics = () => {
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections) || [];
  const requests = useSelector((store) => store.requests) || [];

  if (!user) return null;

  const skills = user.skills || [];
  const completeness = skills.length > 0 && user.about ? 95 : 60;

  // Mock data for weekly profile impressions
  const weeklyImpressions = [
    { day: 'Sun', count: 12, height: '24%' },
    { day: 'Mon', count: 24, height: '48%' },
    { day: 'Tue', count: 32, height: '64%' },
    { day: 'Wed', count: 45, height: '90%' },
    { day: 'Thu', count: 28, height: '56%' },
    { day: 'Fri', count: 38, height: '76%' },
    { day: 'Sat', count: 18, height: '36%' }
  ];

  // Mock data for skill demands matching
  const skillDemands = [
    { name: 'Frontend (React/Vite)', match: 92, color: 'bg-violet-500' },
    { name: 'Backend (Node/Express)', match: 78, color: 'bg-teal-400' },
    { name: 'Database (MongoDB)', match: 65, color: 'bg-cyan-400' },
    { name: 'DevOps (Docker/AWS)', match: 40, color: 'bg-amber-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Profile Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitor your builder presence, matching statistics, and team invitations.
        </p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Core Gauges */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
          <h3 className="text-base font-bold text-white uppercase tracking-wider text-slate-400">Teammate Performance</h3>
          
          <div className="space-y-4">
            {/* Completion Gauge */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase">Profile Completion</span>
                <span className="text-violet-400 font-bold">{completeness}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-violet-600 to-teal-400 h-2 rounded-full" style={{ width: `${completeness}%` }}></div>
              </div>
              <p className="text-[10px] text-slate-500">
                {completeness === 95 
                  ? 'Your profile is highly competitive. Great job!' 
                  : 'Add skill tags and connect GitHub to unlock 95% complete status.'}
              </p>
            </div>

            {/* Match Rate Gauge */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase">Collaboration Interest Rate</span>
                <span className="text-teal-400 font-bold">84%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
              <p className="text-[10px] text-slate-500">
                8.4 out of 10 builders respond positively to your project invites.
              </p>
            </div>

            {/* Profile Visibility Score */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase">Search Visibility</span>
                <span className="text-cyan-400 font-bold">High</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-[10px] text-slate-500">
                Your card is displayed in the first pages of matching query results.
              </p>
            </div>
          </div>
        </div>

        {/* Center Card: Weekly Impressions Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider text-slate-400">Profile Impressions</h3>
                <p className="text-[11px] text-slate-500 mt-1">Weekly directory hits & card views</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-semibold">
                +18.4%
              </span>
            </div>
            
            {/* Impressions Total */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">197</span>
              <span className="text-xs text-slate-400">views total</span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="flex items-end justify-between h-40 pt-4 border-b border-white/5 pb-2">
            {weeklyImpressions.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 w-8 group cursor-pointer">
                {/* Floating tooltips */}
                <span className="text-[9px] font-bold text-white bg-slate-900 border border-white/10 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.count}
                </span>
                <div 
                  className="w-full bg-gradient-to-t from-violet-600 to-teal-400 rounded-t group-hover:brightness-110 transition-all duration-300"
                  style={{ height: item.height }}
                />
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Skill Match Ratios */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
          <h3 className="text-base font-bold text-white uppercase tracking-wider text-slate-400">Teammate Alignment</h3>
          
          <div className="space-y-4.5">
            {skillDemands.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">{skill.name}</span>
                  <span className="text-slate-400 font-medium">{skill.match}% Match</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className={`${skill.color} h-1.5 rounded-full`} style={{ width: `${skill.match}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500 leading-relaxed">
            Your tags align with 84% of project requirements from open-source teams. Link more developer badges to maximize your matches!
          </div>
        </div>

      </div>

      {/* Analytics Timeline */}
      <section className="glass-panel p-6 rounded-2xl border border-white/5">
        <h3 className="text-lg font-bold text-white mb-6">Recent Matching Milestones</h3>
        
        <div className="space-y-6 relative border-l border-white/5 ml-3 pl-6">
          {/* Milestone 1 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-teal-400 border-4 border-[#07051b] shadow-md shadow-teal-500/20" />
            <h4 className="text-sm font-semibold text-white">Collaboration Formed</h4>
            <p className="text-xs text-slate-400 mt-1">You and 3 other builders formed the "FinTech AI" hackathon team.</p>
            <span className="text-[10px] text-slate-500 mt-2 block">2 hours ago</span>
          </div>

          {/* Milestone 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-violet-600 border-4 border-[#07051b] shadow-md shadow-violet-500/20" />
            <h4 className="text-sm font-semibold text-white">GitHub Connection Synchronized</h4>
            <p className="text-xs text-slate-400 mt-1">Connected account to your developer profile dashboard.</p>
            <span className="text-[10px] text-slate-500 mt-2 block">1 day ago</span>
          </div>

          {/* Milestone 3 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#07051b] shadow-md shadow-cyan-500/20" />
            <h4 className="text-sm font-semibold text-white">100 Profile Impressions Milestone</h4>
            <p className="text-xs text-slate-400 mt-1">Your cards were explored by over 100 unique hackathon builders.</p>
            <span className="text-[10px] text-slate-500 mt-2 block">3 days ago</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileAnalytics;
