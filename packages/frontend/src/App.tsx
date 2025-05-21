import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { supabase } from './lib/supabaseClient';
import Homepage from './pages/Homepage';
import EditProfilePage from './pages/EditProfilePage'; // Import EditProfilePage
import { Button } from './components/ui/button';

const App = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state for session

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      }
      setUserId(session?.user.id ?? null);
      setLoading(false);
    };

    // Listen for auth changes to update userId
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUserId(session?.user.id ?? null);
        // No need to set loading here as it's for initial load
      }
    );

    getSession(); // Initial fetch

    return () => {
      authListener?.unsubscribe(); // Cleanup listener
    };
  }, []);

  if (loading) { // Display loading until session is fetched
    return <p>Loading...</p>;
  }

  // If no userId after loading, and not on an auth page, redirect or show login
  // For now, we'll rely on RequireAuth or similar patterns if certain pages need protection
  // This basic setup allows navigation even if userId is null, as EditProfilePage handles its own auth.

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full">
        <nav className="p-4 bg-gray-100">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/edit-profile">Edit Profile</Link>
        </nav>
        <div className='m-5'>
          <Routes>
            <Route path="/" element={userId ? <Homepage userId={userId} /> : <p>Please log in to see the homepage.</p>} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
          </Routes>
          {userId && ( // Only show sign out button if user is logged in
            <div className='flex justify-center mt-10'>
              <Button
                className='bg-red-600'
                onClick={async () => {
                  console.log('Signing out');
                  await supabase.auth.signOut();
                  // userId will be set to null by onAuthStateChange
                }}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
