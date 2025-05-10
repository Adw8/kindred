import Homepage from './pages/Homepage'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabaseClient'
import { Button } from './components/ui/button'

const App = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session && session.user.id) {
        setUserId(session?.user.id);
      }
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, []);

  return (
    !session ? (
      <>
        <div className="flex justify-center items-center min-h-screen">
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-3xl font-semibold'>
              Login
            </div>
            <div className="w-[400px]">
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={[]}
              />
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="min-h-screen w-full">
        <Homepage userId = {userId}/>
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
    )
  )
}

export default App;
