import Homepage from './pages/Homepage'
import { supabase } from './lib/supabaseClient'
import { Button } from './components/ui/button'
import { useEffect, useState } from 'react';

const App = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user.id ?? null);
    };

    getSession();
  }, []);

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
      <div className="min-h-screen w-full">
        <div className='m-5'>
          <Homepage userId={userId} />
          <div className='flex justify-center mt-10'>
            <Button
              className='bg-red-600'
              onClick={
                async () => {
                  console.log('Signing out')
                  await supabase.auth.signOut()
                }
              }>
              Sign out
            </Button>
          </div>
        </div>
      </div>
  )
}

export default App;
