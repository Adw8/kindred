import Homepage from './pages/Homepage'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabaseClient'

const App = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, []);

  return (
    session ? (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    ) : (
      <div className="min-h-screen w-full">
        <Homepage />
      </div>
    )
  )
}

export default App;
