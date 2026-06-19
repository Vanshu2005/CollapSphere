import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  // States linked to database
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  // States linked to client-side local storage (backend-safe persistence)
  const [githubUrl, setGithubUrl] = useState(
    user?._id ? localStorage.getItem(`collab_git_${user._id}`) || "" : ""
  );
  const [availabilityStatus, setAvailabilityStatus] = useState(
    user?._id ? localStorage.getItem(`collab_avail_${user._id}`) || "Available" : "Available"
  );
  const [hackathonInterest, setHackathonInterest] = useState(
    user?._id ? localStorage.getItem(`collab_hack_${user._id}`) || "Yes" : "Yes"
  );
  const [teamSizePreference, setTeamSizePreference] = useState(
    user?._id ? localStorage.getItem(`collab_team_${user._id}`) || "3-4 members" : "3-4 members"
  );

  const [error, setError] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    const cleanSkill = newSkill.trim();
    if (cleanSkill && !skills.includes(cleanSkill)) {
      setSkills([...skills, cleanSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const saveProfile = async () => {
    setError("");
    try {
      // 1. Save core fields to database via REST endpoint
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      // 2. Persist extra fields in localStorage
      if (user?._id) {
        localStorage.setItem(`collab_git_${user._id}`, githubUrl);
        localStorage.setItem(`collab_avail_${user._id}`, availabilityStatus);
        localStorage.setItem(`collab_hack_${user._id}`, hackathonInterest);
        localStorage.setItem(`collab_team_${user._id}`, teamSizePreference);
      }

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row justify-center items-start gap-8 my-4">
      {/* Edit Profile Form */}
      <div className="card w-full max-w-2xl glass-panel border border-white/5 shadow-2xl rounded-2xl overflow-hidden flex-1">
        <div className="card-body p-6 md:p-8 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-2xl font-black text-white">Edit Profile Settings</h2>
            <p className="text-xs text-slate-400 mt-1">Update your professional details and custom builder requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">First Name</legend>
              <input
                type="text"
                className="glass-input w-full p-3 text-sm focus:border-violet-500"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            {/* Last Name */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Name</legend>
              <input
                type="text"
                className="glass-input w-full p-3 text-sm focus:border-violet-500"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            {/* Photo URL */}
            <fieldset className="fieldset space-y-1 md:col-span-2">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Photo URL</legend>
              <input
                type="text"
                className="glass-input w-full p-3 text-sm focus:border-violet-500"
                placeholder="Enter photo address url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>

            {/* Age */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Age</legend>
              <input
                type="number"
                className="glass-input w-full p-3 text-sm focus:border-violet-500"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>

            {/* Gender */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Gender</legend>
              <select
                className="glass-input w-full p-3 text-sm focus:border-violet-500 select select-bordered bg-[#0e0a29]"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </fieldset>

            {/* GitHub URL (Extra) */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">GitHub Profile URL</legend>
              <input
                type="url"
                className="glass-input w-full p-3 text-sm focus:border-violet-500"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </fieldset>

            {/* Availability Status (Extra) */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Availability Status</legend>
              <select
                className="glass-input w-full p-3 text-sm focus:border-violet-500 select select-bordered bg-[#0e0a29]"
                value={availabilityStatus}
                onChange={(e) => setAvailabilityStatus(e.target.value)}
              >
                <option value="Available">Available</option>
                <option value="Looking for Hackathons">Looking for Hackathons</option>
                <option value="Open Source">Open Source Collaborator</option>
                <option value="Busy">Busy</option>
              </select>
            </fieldset>

            {/* Hackathon Interest (Extra) */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Hackathon Interest</legend>
              <select
                className="glass-input w-full p-3 text-sm focus:border-violet-500 select select-bordered bg-[#0e0a29]"
                value={hackathonInterest}
                onChange={(e) => setHackathonInterest(e.target.value)}
              >
                <option value="Yes">Yes, seeking teammate</option>
                <option value="No">No, focusing on projects</option>
              </select>
            </fieldset>

            {/* Team Size Preference (Extra) */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Team Size Preference</legend>
              <select
                className="glass-input w-full p-3 text-sm focus:border-violet-500 select select-bordered bg-[#0e0a29]"
                value={teamSizePreference}
                onChange={(e) => setTeamSizePreference(e.target.value)}
              >
                <option value="2 members">2 members (Pair programming)</option>
                <option value="3-4 members">3-4 members (Hackathons)</option>
                <option value="4-5 members">4-5 members (Startups)</option>
                <option value="5+ members">5+ members (Large Teams)</option>
              </select>
            </fieldset>
          </div>

          {/* About */}
          <fieldset className="fieldset space-y-1">
            <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">About Bio</legend>
            <textarea
              className="glass-input w-full p-3 text-sm focus:border-violet-500 textarea textarea-bordered h-24 bg-[#0e0a29]"
              placeholder="Write a brief intro about yourself, what you are building, or what stack you're excited about..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

          {/* Tag-based Skills editor */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Developer Skills Stack</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="glass-input flex-1 p-3 text-sm focus:border-violet-500"
                placeholder="Type skill (e.g. REACT) and click Add"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
              />
              <button 
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all cursor-pointer"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-1.5 pt-2">
              {skills.length === 0 ? (
                <span className="text-xs text-slate-500 italic">No skills listed yet. Add skills above.</span>
              ) : (
                skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="flex items-center gap-1 px-3 py-1 rounded bg-violet-600/10 border border-violet-500/20 text-xs font-semibold text-violet-300 animate-fade-in"
                  >
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-rose-400 font-bold ml-1 cursor-pointer transition-colors"
                      title={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="alert alert-error bg-rose-500/15 border border-rose-500/30 text-rose-400 rounded-xl p-3 text-xs">
              <span>Error: {error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="card-actions justify-center pt-2">
            <button 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-teal-500 text-white font-bold text-sm hover:brightness-110 active:scale-98 transition-all cursor-pointer border-none shadow-lg shadow-violet-950/20" 
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview Column */}
      <div className="flex flex-col items-center justify-start space-y-4 flex-shrink-0 w-full xl:w-96">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Live Preview</h3>
        <UserCard 
          user={{
            _id: user?._id,
            firstName: firstName || "Firstname",
            lastName: lastName || "Lastname",
            photoUrl: photoUrl,
            age: age || "22",
            gender: gender || "male",
            about: about || "Developer profile preview",
            skills: skills,
            githubUrl: githubUrl,
            availabilityStatus: availabilityStatus,
            hackathonInterest: hackathonInterest,
            teamSizePreference: teamSizePreference
          }} 
        />
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl shadow-2xl p-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Profile and extra requirements saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
