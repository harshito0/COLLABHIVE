import React from 'react';
import { Activity, Clock, Users, ArrowRight, Code } from 'lucide-react';
import './Dashboard.css';

const MOCK_PROJECTS = [
  { id: 1, name: 'E-commerce Redesign', role: 'Frontend Lead', progress: 75, members: 4, tech: ['React', 'Node'] },
  { id: 2, name: 'AI Mentor Dashboard', role: 'Full Stack', progress: 30, members: 2, tech: ['Vite', 'Gemini API'] },
];

export function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, Alex! 👋</h1>
          <p className="text-muted">Here's what's happening with your projects today.</p>
        </div>
        <button className="btn-primary">Generate New Idea 💡</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper blue">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Tasks Completed</p>
            <h3 className="stat-value">24</h3>
            <p className="stat-trend positive">↑ 12% this week</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper purple">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Hours Collaborated</p>
            <h3 className="stat-value">12.5h</h3>
            <p className="stat-trend">Last 7 days</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper green">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Teams</p>
            <h3 className="stat-value">3</h3>
            <p className="stat-trend">1 new match</p>
          </div>
        </div>
      </div>

      <div className="projects-section">
        <div className="section-header flex-between">
          <h2>Active Projects</h2>
          <button className="btn-secondary text-sm flex-center gap-2">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="projects-grid">
          {MOCK_PROJECTS.map(project => (
            <div key={project.id} className="project-card glass-panel">
              <div className="project-header flex-between">
                <div className="project-icon">
                  <Code size={20} />
                </div>
                <span className="badge-role">{project.role}</span>
              </div>
              <h3 className="project-name">{project.name}</h3>
              
              <div className="tech-stack flex-center gap-2" style={{justifyContent: 'flex-start'}}>
                {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
              </div>

              <div className="project-footer mt-4">
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${project.progress}%` }}></div>
                </div>
                <div className="flex-between mt-2 text-sm text-muted">
                  <span>{project.progress}% Complete</span>
                  <div className="flex-center gap-1">
                    <Users size={14} /> {project.members} members
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
