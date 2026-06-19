import React from 'react';

const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-[#0a071d]/60 border-t border-white/5 text-slate-400 mt-auto flex flex-col sm:flex-row justify-between gap-4 w-full">
      <aside className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-gradient-to-tr from-violet-600 to-teal-400 flex items-center justify-center shadow shadow-violet-500/10">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1v2.5M4 7l2-1M4 7l2 1M4 7v2.5M10 21l2-1 2 1v-2.5M6 18l2-1v-2.5m12 3.5l-2-1v-2.5" />
          </svg>
        </div>
        <p className="text-xs">Copyright © {new Date().getFullYear()} - <span className="text-slate-300 font-semibold">CollabSphere</span> (Find developers. Build together.)</p>
      </aside>
      <nav className="flex gap-4 items-center">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
