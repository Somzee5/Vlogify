import React from 'react';
import { useSelector } from 'react-redux';

const AuthDebug = () => {
  const { currentUser, loading, error } = useSelector(state => state.user);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50 max-w-xs">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>Error: {error || 'None'}</div>
        <div>User: {currentUser ? 'Yes' : 'No'}</div>
        {currentUser && (
          <>
            <div>ID: {currentUser._id || 'No ID'}</div>
            <div>Username: {currentUser.username || 'No username'}</div>
            <div>Email: {currentUser.email || 'No email'}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthDebug;
