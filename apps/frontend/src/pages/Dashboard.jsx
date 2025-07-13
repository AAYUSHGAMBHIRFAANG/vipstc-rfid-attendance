// apps/frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate }           from 'react-router-dom';
import { useAuth }               from '../context/AuthContext.jsx';
import './Dashboard.css';         // we'll add styling next

export default function Dashboard() {
  const { token, signOut } = useAuth();
  const [sections, setSections] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/session/mine/sections', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(({ sections }) => setSections(sections))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="center">Loading your sections…</p>;
  if (error)   return <p className="center error">Failed to load: {error}</p>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Your Sections</h1>
        <button onClick={signOut} className="logout-btn">Logout</button>
      </header>

      <div className="section-grid">
        {sections.map((sec) => (
          <div
            key={sec.sectionId}
            className="section-card"
            onClick={() => navigate(`/attendance/${sec.sectionId}`)}
          >
            <h2>{sec.courseName} {sec.semesterNumber}{sec.semesterType.toUpperCase()}</h2>
            <p className="code">{sec.sectionName}</p>
            <div className="actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/attendance/${sec.sectionId}/start`);
                }}
              >
                Record
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/attendance/${sec.sectionId}/report`);
                }}
              >
                Retrieve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
