import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, FileText, PlusCircle, User, LogOut, LogIn, Search, Bell, Command } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../supabaseClient';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout({ session }: { session: any }) {
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: FileText, label: 'My Notes', path: '/notes' },
    { icon: PlusCircle, label: 'Create Note', path: '/create' },
    { icon: User, label: 'Account', path: '/account' },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FD] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white/40 backdrop-blur-xl border-r border-slate-200/60 flex flex-col z-20">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Command className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 font-display">AI Notes</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                  isActive 
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200" 
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-200/60">
          {session ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
              <span className="font-medium">Sign Out</span>
            </button>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 group"
            >
              <LogIn className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
              <span className="font-medium">Sign In</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search notes, tags, or AI insights..."
                className="w-full bg-white/60 border border-slate-200/60 rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/60 flex items-center justify-center text-slate-600 font-semibold shadow-sm overflow-hidden">
              {session?.user?.email ? (
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`} 
                  alt="avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <Outlet />
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-200/20 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-200/20 blur-[120px] rounded-full -z-10" />
      </main>
    </div>
  );
}
