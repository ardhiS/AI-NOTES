import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Sparkles, ArrowRight, LayoutGrid, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard({ session }: { session: any }) {
  const user = session?.user;
  const displayName = user?.email?.split('@')[0] || 'Guest';

  const stats = [
    { label: 'Total Notes', value: '12', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'AI Insights', value: '48', icon: Sparkles, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Recently Edited', value: '3', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Welcome Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] bg-white border border-slate-200/60 p-10 shadow-xl shadow-slate-200/40"
      >
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wider uppercase">AI Workspace</span>
            <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Secure & Synced
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-4 font-display tracking-tight">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{displayName}</span>
          </h1>
          
          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            {session 
              ? "Your AI-powered workspace is ready. Capture ideas, organize thoughts, and let AI help you unlock new insights from your notes."
              : "Your AI-powered workspace — clean, fast, and beautifully organized. Sign in to start creating notes and syncing them across devices."}
          </p>

          <div className="flex items-center gap-4">
            <Link 
              to={session ? "/create" : "/auth"}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New Note
            </Link>
            {!session && (
              <Link 
                to="/auth"
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Sign In to Sync
              </Link>
            )}
          </div>
        </div>

        {/* Decorative Illustration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-10 pointer-events-none">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#4F46E5" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,86.9,-15.7,86.9,0C86.9,15.7,83.6,31.3,76.4,44.7C69.2,58.1,58.1,69.2,44.7,76.4C31.3,83.6,15.7,86.9,0,86.9C-15.7,86.9,-31.3,83.6,-44.7,76.4C-58.1,69.2,-69.2,58.1,-76.4,44.7C-83.6,31.3,-86.9,15.7,-86.9,0C-86.9,-15.7,-83.6,-31.3,-76.4,-44.7C-69.2,-58.1,-58.1,-69.2,-44.7,-76.4C-31.3,-83.6,-15.7,-86.9,0,-86.9C15.7,-86.9,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">Active</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
            <div className="mt-4 h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r from-indigo-500 to-violet-500 w-2/3 rounded-full`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-slate-200/60 p-8 rounded-[32px] shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Manage Content</h3>
                <p className="text-sm text-slate-500">Access your full library and tags</p>
              </div>
            </div>
            <Link to="/notes" className="px-5 py-2.5 bg-slate-50 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-all flex items-center gap-2 group">
              View All Notes
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center py-10 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <div className="max-w-xs">
              <p className="text-slate-400">No notes found in your library yet. Start by creating your first note.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[32px] shadow-xl shadow-indigo-200 text-white relative overflow-hidden"
        >
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Assistant</h3>
                <p className="text-indigo-100 text-sm">Your personal knowledge partner</p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                <p className="text-sm italic">"I can summarize your meeting notes or suggest tags based on your writing style. Just ask!"</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                <p className="text-sm">Try saying: <span className="font-bold">"Summarize my last 3 notes"</span></p>
              </div>
            </div>

            <button className="mt-8 w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg">
              Start AI Chat
            </button>
          </div>

          {/* Background Decorations */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute top-10 right-10 w-20 h-20 bg-indigo-400/20 blur-2xl rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
