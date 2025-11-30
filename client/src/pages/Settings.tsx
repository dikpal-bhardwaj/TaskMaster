import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import './Settings.css';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/change-password', {
        oldPassword,
        newPassword
      });
      setMessage(response.data.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="container">
        <div className="page-header animate-fade-in">
          <div>
            <h1 style={{ textShadow: '0 0 40px rgba(124, 58, 237, 0.5)' }}>
              ⚙️ Settings
            </h1>
            <p className="subtitle">Manage your account preferences</p>
          </div>
        </div>

        <div className="settings-grid">
          <div className="settings-section animate-fade-in">
            <div className="section-header">
              <h2>👤 Account Information</h2>
            </div>
            <div className="info-card card">
              <div className="info-row">
                <div className="info-item">
                  <span className="info-label">Username</span>
                  <span className="info-value">{user?.username}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{user?.email}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <span className="info-label">Account Status</span>
                  <span className="info-badge active">✓ Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-section animate-fade-in">
            <div className="section-header">
              <h2>🔒 Change Password</h2>
            </div>
            <div className="form-card card">
              <form onSubmit={handlePasswordChange}>
                <div className="input-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                </div>

                <div className="input-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                </div>

                {error && (
                  <div className="alert alert-error">
                    <span className="alert-icon">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}
                
                {message && (
                  <div className="alert alert-success">
                    <span className="alert-icon">✓</span>
                    <span>{message}</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? '🔄 Updating...' : '✓ Update Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
