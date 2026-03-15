import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { ToastProvider } from './components/layout/ToastContainer';
import { Dashboard } from './pages/Dashboard';
import { AIMentor } from './pages/AIMentor';
import { Matchmaking } from './pages/Matchmaking';
import { Workspace } from './pages/Workspace';
import { Hackathon } from './pages/Hackathon';
import { Portfolio } from './pages/Portfolio';
import { ProfileSettings } from './pages/ProfileSettings';
import RecruiterHub from './pages/RecruiterHub';
import LandingPage from './pages/LandingPage';
import { TeamRoom } from './pages/TeamRoom';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileSetup } from './components/auth/ProfileSetup';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import './App.css';

// Placeholder components for routing
const Placeholder = ({ title }) => (
  <div className="flex-center" style={{ height: '60vh', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ fontSize: '2.5rem' }}>{title}</h1>
    <p className="text-muted">Module under construction. Check back soon!</p>
  </div>
);

/* ── Layout wrapper: handles responsive sidebar state ── */
function AppLayout({ user, onLoginClick, onLogout, isSidebarOpen, setIsSidebarOpen, children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/landing';

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      <Sidebar 
        user={user} 
        onLoginClick={onLoginClick} 
        onLogout={onLogout} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <main className="main-content">
        <Header 
          user={user} 
          onLoginClick={onLoginClick} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <div className="page-container">
          {children}
        </div>
      </main>
      {isSidebarOpen && (
        <div className="mobile-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
}

function AppInner() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ── Auth Listener (Basic Authentication) ──
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("🔥 Auth State Changed:", firebaseUser ? "User exists" : "Guest");
      if (firebaseUser) {
        // Just set the basic ID and email to unblock the app
        setUser(prev => prev?.uid === firebaseUser.uid ? prev : { 
          uid: firebaseUser.uid, 
          email: firebaseUser.email,
          name: firebaseUser.displayName 
        });
      } else {
        setUser(null);
        setPendingUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ── Profile Sync (Real-time Firestore) ──
  useEffect(() => {
    if (!user?.uid || !db || isProfileSetupOpen) return;

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        console.log("👤 Profile Updated:", data.name);
        setUser(prev => ({ ...prev, ...data }));
      } else {
        console.log("⚠️ No profile found for", user.uid);
      }
    }, (err) => {
      console.error("❌ Profile Sync Error:", err);
    });

    return () => unsubscribe();
  }, [user?.uid, isProfileSetupOpen]);

  // ── Safety Fallback for Loader ──
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleLogin = (authData) => {
    if (authData.isNewUser) {
      setPendingUser(authData);
      setIsAuthOpen(false);
      setIsProfileSetupOpen(true);
    } else {
      setUser(authData);
      setIsAuthOpen(false);
      navigate('/');
    }
  };

  const handleProfileComplete = (profileData) => {
    setUser({ ...pendingUser, ...profileData });
    setPendingUser(null);
    setIsProfileSetupOpen(false);
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setPendingUser(null);
      setIsSidebarOpen(false);
      toast.success("Signed out successfully");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  const openAuth = () => setIsAuthOpen(true);

  if (isLoading) {
    return (
      <div className="app-loader">
        <div className="loader-content">
          <div className="loader-hex"></div>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <>
        <AppLayout 
          user={user} 
          onLoginClick={openAuth} 
          onLogout={handleLogout}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <Routes>
            <Route path="/" element={<Dashboard user={user} onLoginClick={openAuth} />} />
            <Route path="/mentor" element={<AIMentor user={user} />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/learning" element={<Placeholder title="Learning Paths" />} />
            <Route path="/recruiter" element={<RecruiterHub />} />
            <Route path="/portfolio" element={<Portfolio user={user} />} />
            <Route path="/settings" element={<ProfileSettings user={user} onLogout={handleLogout} />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/team" element={<TeamRoom user={user} />} />
          </Routes>
        </AppLayout>

        <CommandPalette />
        
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
        />
        
        <ProfileSetup
          isOpen={isProfileSetupOpen}
          onComplete={handleProfileComplete}
        />
      </>
    </ToastProvider>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
