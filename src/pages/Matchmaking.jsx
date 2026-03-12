import React, { useState } from 'react';
import { X, Heart, Star, MapPin, Code, Briefcase } from 'lucide-react';
import './Matchmaking.css';

const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ec4899',
    bio: 'Passionate about creating beautiful UI/UX. Looking for a backend dev to build a cool SaaS platform.',
    skills: ['React', 'Tailwind', 'Framer Motion'],
    interests: ['Web3', 'AI', 'EdTech'],
    availability: '15 hrs/week',
    matchScore: 92
  },
  {
    id: 2,
    name: 'David Kumar',
    role: 'Backend Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=10b981',
    bio: 'Node.js enthusiast. I love building scalable APIs and database architectures.',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    interests: ['FinTech', 'Open Source'],
    availability: '20 hrs/week',
    matchScore: 85
  },
  {
    id: 3,
    name: 'Elena Silva',
    role: 'UI/UX Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=8b5cf6',
    bio: 'Figma wizard. I want to participate in the upcoming Global Hackathon.',
    skills: ['Figma', 'Prototyping', 'User Research'],
    interests: ['Hackathons', 'Social Good'],
    availability: '10 hrs/week',
    matchScore: 78
  }
];

export function Matchmaking() {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [animationClass, setAnimationClass] = useState('');

  const currentProfile = profiles[0];

  const handleAction = (type) => {
    // Add animation class
    setAnimationClass(type === 'like' ? 'swipe-right' : 'swipe-left');
    
    // Remove profile after animation
    setTimeout(() => {
      setProfiles(prev => prev.slice(1));
      setAnimationClass('');
    }, 400);
  };

  if (!currentProfile) {
    return (
      <div className="flex-center" style={{ height: '60vh', flexDirection: 'column', gap: '1rem' }}>
        <Star size={48} className="text-warning" />
        <h2>You've reviewed all matches!</h2>
        <p className="text-muted">Check back later for new developers.</p>
        <button className="btn-secondary mt-4" onClick={() => setProfiles(MOCK_PROFILES)}>Reset Demo</button>
      </div>
    );
  }

  return (
    <div className="matchmaking-container">
      <div className="match-header text-center">
        <h1>Smart Team Formation</h1>
        <p className="text-muted">Find the perfect teammates based on skills and interests.</p>
      </div>

      <div className="card-stack">
        <div className={`profile-card glass-panel ${animationClass}`}>
          <div className="match-badge">
            <Star size={14} /> {currentProfile.matchScore}% Match
          </div>
          
          <div className="profile-image-container">
            <img src={currentProfile.avatar} alt={currentProfile.name} className="profile-image" />
          </div>

          <div className="profile-info">
            <h2>{currentProfile.name}</h2>
            <p className="role-text">{currentProfile.role}</p>
            
            <p className="bio-text">{currentProfile.bio}</p>

            <div className="tags-section">
              <div className="tag-group">
                <span className="tag-label"><Code size={14} /> Skills</span>
                <div className="tags-flex">
                  {currentProfile.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="tag-group">
                <span className="tag-label"><Heart size={14} /> Interests</span>
                <div className="tags-flex">
                  {currentProfile.interests.map(interest => (
                    <span key={interest} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>

              <div className="bottom-meta flex-between mt-4 border-t pt-4">
                <span className="flex-center gap-1 text-muted text-sm">
                  <Briefcase size={14} /> {currentProfile.availability}
                </span>
                <span className="flex-center gap-1 text-muted text-sm">
                  <MapPin size={14} /> Remote
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-btn pass" onClick={() => handleAction('pass')}>
            <X size={32} />
          </button>
          <button className="action-btn like" onClick={() => handleAction('like')}>
            <Heart size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
