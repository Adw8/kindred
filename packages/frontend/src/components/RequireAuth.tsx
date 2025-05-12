import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true);
  // const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false);
      if (session && session.user.id) {
        // setUserId(session?.user.id);
        console.log('Found session');
      }
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false);
    })
    return () => subscription.unsubscribe()
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
