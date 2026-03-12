import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { AIMentor } from './pages/AIMentor';
import { Matchmaking } from './pages/Matchmaking';
import { Workspace } from './pages/Workspace';
import { Hackathon } from './pages/Hackathon';
import { Portfolio } from './pages/Portfolio';
import './App.css';

// Placeholder components for routing
const Placeholder = ({ title }) => (
  <div className="flex-center" style={{ height: '60vh', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ fontSize: '2.5rem' }}>{title}</h1>
    <p className="text-muted">Module under construction. Check back soon!</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/mentor" element={<AIMentor />} />
              <Route path="/matchmaking" element={<Matchmaking />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/hackathon" element={<Hackathon />} />
              <Route path="/learning" element={<Placeholder title="Learning Paths" />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
