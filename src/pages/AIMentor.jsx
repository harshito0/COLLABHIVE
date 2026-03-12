import React, { useState } from 'react';
import { Send, Sparkles, Code2, Database, LayoutTemplate, Server } from 'lucide-react';
import './AIMentor.css';

export function AIMentor() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setResult(null);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setResult({
        features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Gateway Integration', 'Admin Dashboard'],
        folderStructure: `src/
  components/
  pages/
  context/
  services/
  utils/`,
        schema: `User { id, email, password }
Product { id, name, price, stock }
Order { id, userId, total, status }`,
        endpoints: `GET /api/products
POST /api/orders
POST /api/auth/login`
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="ai-mentor-container">
      <div className="mentor-header">
        <div className="icon-badge">
          <Sparkles size={28} className="text-primary" />
        </div>
        <div>
          <h1 className="text-gradient">AI Project Mentor</h1>
          <p className="text-muted">Describe your idea, and I'll generate the complete technical roadmap.</p>
        </div>
      </div>

      <form className="prompt-box glass-panel" onSubmit={handleGenerate}>
        <input 
          type="text" 
          placeholder="e.g. Build an E-commerce Website" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
        />
        <button type="submit" className="btn-primary flex-center gap-2" disabled={isGenerating}>
          {isGenerating ? 'Thinking...' : 'Generate Plan'} <Send size={16} />
        </button>
      </form>

      {result && (
        <div className="mentor-results">
          <div className="result-card glass-panel">
            <div className="card-header border-b">
              <LayoutTemplate size={20} className="text-primary" />
              <h3>Core Features List</h3>
            </div>
            <ul className="feature-list">
              {result.features.map((f, i) => (
                <li key={i}>
                  <div className="check-circle"></div>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="result-card glass-panel">
            <div className="card-header border-b">
              <Database size={20} className="text-secondary" />
              <h3>Database Schema</h3>
            </div>
            <pre className="code-block">{result.schema}</pre>
          </div>

          <div className="result-card glass-panel">
            <div className="card-header border-b">
              <Server size={20} className="text-accent" />
              <h3>API Endpoints</h3>
            </div>
            <pre className="code-block">{result.endpoints}</pre>
          </div>

          <div className="result-card glass-panel">
            <div className="card-header border-b">
              <Code2 size={20} className="text-success" />
              <h3>Folder Structure</h3>
            </div>
            <pre className="code-block">{result.folderStructure}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
