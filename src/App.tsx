import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Layout from './components/Layout';

function ProtectedRoute({ session, children }: { session: any, children: React.ReactNode }) {
  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F8F9FD]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/" />} />
      <Route element={<Layout session={session} />}>
        <Route path="/" element={<Dashboard session={session} />} />
        <Route 
          path="/notes" 
          element={
            <ProtectedRoute session={session}>
              <Dashboard session={session} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create" 
          element={
            <ProtectedRoute session={session}>
              <Dashboard session={session} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/account" 
          element={
            <ProtectedRoute session={session}>
              <Dashboard session={session} />
            </ProtectedRoute>
          } 
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
