import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Command, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        if (data.session) {
          navigate('/');
        } else {
          setSuccessMsg('Your account has been created. Please check your email and verify your address before logging in.');
          setIsSignUp(false);
          setPassword('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (err: any) {
      if (err.message?.includes('rate limit')) {
        setError('Email rate limit exceeded. Supabase free tier allows 3 sign-up emails per hour. Please wait a while or try a different email address.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FD] p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/20 blur-[120px] rounded-full -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-violet-200/20 blur-[120px] rounded-full -z-10 -translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] p-10 shadow-2xl shadow-slate-200/60 relative overflow-hidden">
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">
              <Command className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-display tracking-tight">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isSignUp ? 'Join our community of creators' : 'Enter your credentials to access your AI workspace.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm rounded-2xl flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {successMsg}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                {!isSignUp && (
                  <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center gap-2 ml-1">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="remember" className="text-sm text-slate-500 font-medium cursor-pointer">Remember me</label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">OR</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <Chrome className="w-5 h-5 text-red-500" />
              Continue with Google
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-500 font-medium">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-indigo-600 font-bold hover:underline transition-all"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
