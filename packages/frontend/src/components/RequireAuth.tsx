import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js'

const RequireAuth = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false);
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
