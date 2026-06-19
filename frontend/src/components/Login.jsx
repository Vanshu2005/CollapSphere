import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong during login");
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong during sign up");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-10 px-4 min-h-[70vh]">
      {/* Branding Header above card */}
      <div className="text-center mb-8 space-y-2 max-w-sm animate-fade-in">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-teal-400 flex items-center justify-center shadow-lg shadow-violet-500/20 mx-auto">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1v-2.5M4 7l2-1M4 7l2 1M4 7v2.5M10 21l2-1 2 1v-2.5M6 18l2-1v-2.5m12 3.5l-2-1v-2.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-4 tracking-tight">CollabSphere</h1>
        <p className="text-sm text-slate-400">Find developers. Build together.</p>
      </div>

      {/* Card Body Container */}
      <div className="card w-full max-w-md glass-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="card-body p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-center text-white border-b border-white/5 pb-4">
            {isLoginForm ? "Login to Workspace" : "Create Builder Account"}
          </h2>

          <div className="space-y-4">
            {/* SignUp fields */}
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <fieldset className="fieldset space-y-1">
                  <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">First Name</legend>
                  <input 
                    type="text" 
                    className="glass-input w-full p-3 text-sm focus:border-violet-500" 
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset space-y-1">
                  <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Name</legend>
                  <input 
                    type="text" 
                    className="glass-input w-full p-3 text-sm focus:border-violet-500" 
                    placeholder="Doe" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            )}

            {/* Email Field */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</legend>
              <input 
                type="email" 
                className="glass-input w-full p-3 text-sm focus:border-violet-500" 
                placeholder="developer@collabsphere.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            {/* Password Field */}
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</legend>
              <input 
                type="password" 
                className="glass-input w-full p-3 text-sm focus:border-violet-500" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (isLoginForm ? handleLogin() : handleSignUp())}
              />
            </fieldset>
          </div>

          {/* Error display */}
          {error && (
            <p className="text-rose-400 text-xs text-center font-medium bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5">
              {error}
            </p>
          )}

          {/* Action Button */}
          <div className="card-actions justify-center pt-2">
            <button 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-teal-500 text-white font-bold text-sm hover:brightness-110 active:scale-98 transition-all cursor-pointer border-none shadow-lg shadow-violet-950/20" 
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Switch View Trigger Link */}
          <p 
            className="text-xs text-slate-400 text-center hover:text-white transition-colors cursor-pointer select-none py-1 mt-2 border-t border-white/5" 
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
          >
            {isLoginForm ? "New to CollabSphere? Sign up here" : "Already registered? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
