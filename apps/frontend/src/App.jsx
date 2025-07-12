// apps/frontend/src/App.jsx
import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes    from './routes.jsx';
import Layout       from './components/Layout.jsx';
import ProfileModal from './components/ProfileModal.jsx';

export default function App() {
  const [showProfile, setShowProfile] = React.useState(false);

  return (
    <AuthProvider>
      <Layout>
        {/* only show when logged in */}
        <ProfileButton onClick={() => setShowProfile(true)} />
        <AppRoutes />
        <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      </Layout>
    </AuthProvider>
  );
}

// simple Profile button
function ProfileButton(props) {
  return (
    <button
      style={{ position: 'absolute', top: 16, right: 16 }}
      {...props}
    >
      Profile
    </button>
  );
}
