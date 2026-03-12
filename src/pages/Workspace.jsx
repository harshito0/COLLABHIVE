import React, { useState } from 'react';
import { Layout, MessageSquare, MonitorPlay, Github, Plus, MoreHorizontal } from 'lucide-react';
import './Workspace.css';

const TABS = [
  { id: 'tasks', label: 'Tasks', icon: Layout },
  { id: 'chat', label: 'Team Chat', icon: MessageSquare },
  { id: 'whiteboard', label: 'Whiteboard', icon: MonitorPlay },
  { id: 'github', label: 'GitHub', icon: Github },
];

const INITIAL_TASKS = {
  todo: [
    { id: 1, title: 'Design database schema', tag: 'Backend' },
    { id: 2, title: 'Configure Next.js routing', tag: 'Frontend' },
  ],
  inProgress: [
    { id: 3, title: 'Build AI Mentor UI', tag: 'Design' },
  ],
  done: [
    { id: 4, title: 'Project Initialization', tag: 'DevOps' },
  ]
};

export function Workspace() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Simple drag and drop handlers could be added here later

  return (
    <div className="workspace-container">
      <div className="workspace-header">
        <div>
          <div className="flex-center gap-2" style={{justifyContent: 'flex-start'}}>
            <span className="badge-project-status">Active Sprint</span>
            <span className="text-muted text-sm">Ends in 3 days</span>
          </div>
          <h1 className="mt-2 text-gradient">E-commerce Redesign</h1>
        </div>
        
        <div className="header-team flex-center">
          <div className="avatar-stack">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1" alt="Alex" />
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ec4899" alt="Sarah" />
            <div className="avatar-more">+2</div>
          </div>
          <button className="btn-secondary ml-4 flex-center gap-2">
            <Plus size={16} /> Invite
          </button>
        </div>
      </div>

      <div className="workspace-tabs border-b">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn flex-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="workspace-content">
        {activeTab === 'tasks' && (
          <div className="kanban-board">
            
            {/* TODO Column */}
            <div className="kanban-column glass-panel">
              <div className="column-header flex-between mb-4">
                <div className="flex-center gap-2">
                  <div className="dot dot-gray"></div>
                  <h3>To Do</h3>
                  <span className="task-count">{tasks.todo.length}</span>
                </div>
                <button className="icon-btn-small"><Plus size={16}/></button>
              </div>
              <div className="task-list">
                {tasks.todo.map(task => (
                  <div key={task.id} className="task-card" draggable="true">
                    <div className="flex-between mb-2">
                      <span className="task-tag">{task.tag}</span>
                      <MoreHorizontal size={14} className="text-muted" />
                    </div>
                    <p className="task-title">{task.title}</p>
                    <div className="task-footer mt-4">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1" className="task-avatar" alt="Assignee" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IN PROGRESS Column */}
            <div className="kanban-column glass-panel">
              <div className="column-header flex-between mb-4">
                <div className="flex-center gap-2">
                  <div className="dot dot-blue"></div>
                  <h3>In Progress</h3>
                  <span className="task-count">{tasks.inProgress.length}</span>
                </div>
                <button className="icon-btn-small"><Plus size={16}/></button>
              </div>
              <div className="task-list">
                {tasks.inProgress.map(task => (
                  <div key={task.id} className="task-card" draggable="true">
                    <div className="flex-between mb-2">
                      <span className="task-tag blue">{task.tag}</span>
                      <MoreHorizontal size={14} className="text-muted" />
                    </div>
                    <p className="task-title">{task.title}</p>
                    <div className="task-footer mt-4">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ec4899" className="task-avatar" alt="Assignee" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DONE Column */}
            <div className="kanban-column glass-panel">
              <div className="column-header flex-between mb-4">
                <div className="flex-center gap-2">
                  <div className="dot dot-green"></div>
                  <h3>Done</h3>
                  <span className="task-count">{tasks.done.length}</span>
                </div>
                <button className="icon-btn-small"><Plus size={16}/></button>
              </div>
              <div className="task-list">
                {tasks.done.map(task => (
                   <div key={task.id} className="task-card opacity-muted" draggable="true">
                    <div className="flex-between mb-2">
                      <span className="task-tag green">{task.tag}</span>
                      <MoreHorizontal size={14} className="text-muted" />
                    </div>
                    <p className="task-title line-through">{task.title}</p>
                    <div className="task-footer mt-4 flex-between">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1" className="task-avatar" alt="Assignee" />
                       <span className="text-success text-xs">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== 'tasks' && (
          <div className="glass-panel flex-center" style={{ height: '500px', flexDirection: 'column' }}>
            <h2>{TABS.find(t => t.id === activeTab)?.label} Module</h2>
            <p className="text-muted mt-2">Implementation planned for next phase.</p>
          </div>
        )}
      </div>
    </div>
  );
}
