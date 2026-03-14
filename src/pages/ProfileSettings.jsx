import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  MapPin, 
  Code2, 
  Sparkles, 
  Save, 
  Github, 
  Linkedin,
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '../components/layout/ToastContainer';
import './ProfileSettings.css';

const SKILL_OPTIONS = [
  'React', 'Node.js', 'Python', 'Java', 'Machine Learning', 'UI/UX Design',
  'Flutter', 'Vue.js', 'Django', 'PostgreSQL', 'MongoDB', 'Docker',
  'Kubernetes', 'Data Science', 'Next.js', 'TypeScript', 'GraphQL', 'AWS'
];

const INTEREST_OPTIONS = [
  'Web Development', 'AI / ML', 'Hackathons', 'Open Source', 'EdTech', 
  'FinTech', 'Web3 / Blockchain', 'Mobile Apps', 'Game Dev', 'Competitive Programming'
];

export function ProfileSettings({ user, onLogout }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    profession: '',
    year: '',
    college: '',
    location: '',
    skills: [],
    interests: [],
    availability: '',
    github: '',
    linkedin: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        bio: user.bio || '',
        profession: user.profession || '',
        year: user.year || '',
        college: user.college || '',
        location: user.location || '',
        skills: user.skills || [],
        interests: user.interests || [],
        availability: user.availability || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
      });
    }
  }, [user]);

  const update = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));

  const toggleSkill = (skill) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleInterest = (interest) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSave = async () => {
    if (!profile.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        ...profile,
        lastUpdated: serverTimestamp()
      });
      toast.success("Profile updated successfully! ✨");
    } catch (err) {
      console.error('Profile Update Error:', err);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex-center" style={{ height: '60vh' }}>
        <p className="text-muted">Please sign in to view your profile settings.</p>
      </div>
    );
  }

  return (
    <div className="settings-container animation-fade-in">
      <div className="settings-header flex-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted">Manage your identity and developer presence</p>
        </div>
        <div className="flex-center gap-4">
          <button 
            className="btn-secondary flex-center gap-2" 
            onClick={onLogout}
            style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
          >
            <LogOut size={18} /> Logout
          </button>
          <button 
            className="btn-primary flex-center gap-2" 
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="settings-grid">
        {/* Left Column: Basic & Professional */}
        <div className="settings-section glass-panel">
          <div className="section-title flex-center gap-2 mb-6">
            <User size={20} className="text-primary" />
            <h2>Personal Identity</h2>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input 
              className="form-input" 
              value={profile.name} 
              onChange={e => update('name', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Short Bio</label>
            <textarea 
              className="form-input" 
              rows={3} 
              placeholder="Tell the community who you are..."
              value={profile.bio} 
              onChange={e => update('bio', e.target.value)} 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <div className="icon-input">
                <MapPin size={16} className="input-icon" />
                <input 
                  className="form-input" 
                  value={profile.location} 
                  onChange={e => update('location', e.target.value)} 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Current Role</label>
              <select 
                className="form-input" 
                value={profile.profession} 
                onChange={e => update('profession', e.target.value)}
              >
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>UI/UX Designer</option>
                <option>Data Scientist / AI Engineer</option>
                <option>Mobile Developer</option>
                <option>DevOps Engineer</option>
                <option>Student</option>
              </select>
            </div>
          </div>

          <div className="form-row mt-4">
            <div className="form-group">
              <label>GitHub</label>
              <div className="icon-input">
                <Github size={16} className="input-icon" />
                <input 
                  className="form-input" 
                  placeholder="github.com/username"
                  value={profile.github} 
                  onChange={e => update('github', e.target.value)} 
                />
              </div>
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <div className="icon-input">
                <Linkedin size={16} className="input-icon" />
                <input 
                  className="form-input" 
                  placeholder="linkedin.com/in/username"
                  value={profile.linkedin} 
                  onChange={e => update('linkedin', e.target.value)} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Interests */}
        <div className="settings-section glass-panel">
          <div className="section-title flex-center gap-2 mb-6">
            <Code2 size={20} className="text-primary" />
            <h2>Technical Arsenal</h2>
          </div>

          <div className="form-group">
            <label className="mb-4 block">Skills & Tooling</label>
            <div className="tags-grid">
              {SKILL_OPTIONS.map(skill => (
                <button
                  key={skill}
                  className={`tag-toggle ${profile.skills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="section-title flex-center gap-2 mt-8 mb-6">
            <Sparkles size={20} className="text-secondary" />
            <h2>Creative Interests</h2>
          </div>

          <div className="form-group">
            <div className="tags-grid">
              {INTEREST_OPTIONS.map(interest => (
                <button
                  key={interest}
                  className={`tag-toggle interest ${profile.interests.includes(interest) ? 'selected' : ''}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="trust-banner mt-8 p-4 glass-panel border-primary">
            <div className="flex-center gap-3">
              <ShieldCheck className="text-primary" />
              <div>
                <p className="text-sm font-bold">Privacy First</p>
                <p className="text-xs text-muted">Your data is secured by CollabHive Cloud.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
