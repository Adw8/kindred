import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/themeProvider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FriendDetails from './pages/FriendDetails.tsx'
import Login from './pages/Login.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import HomepageHeader from './components/HomepageHeader.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route element={<HomepageHeader />}>
              <Route path='/' element={<App />} />
              <Route path='/friend/:id' element={<FriendDetails />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>,
  </StrictMode>
)
