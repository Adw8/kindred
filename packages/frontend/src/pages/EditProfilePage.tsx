import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { UserProfile } from '../../types';
import { Button } from '../../components/ui/button'; // Import the Button component

const EditProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
        setProfile(null);
      } else if (user) {
        const userProfile = {
          id: user.id,
          email: user.email || '',
          username: user.user_metadata?.username || null,
          avatar_url: user.user_metadata?.avatar_url || null,
          bio: user.user_metadata?.bio || null,
        };
        setProfile(userProfile);
        setUsername(userProfile.username);
        setAvatarUrl(userProfile.avatar_url);
        setBio(userProfile.bio);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    if (!profile) return;

    setIsUpdating(true);
    const { data, error } = await supabase.auth.updateUser({
      data: {
        username: username,
        avatar_url: avatarUrl,
        bio: bio,
      },
    });

    setIsUpdating(false);

    if (error) {
      alert('Error updating profile: ' + error.message);
    } else if (data.user) {
      alert('Profile updated!');
      setProfile({
        id: data.user.id,
        email: data.user.email || '',
        username: data.user.user_metadata?.username || null,
        avatar_url: data.user.user_metadata?.avatar_url || null,
        bio: data.user.user_metadata?.bio || null,
      });
    }
  };

  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-4">No profile data found.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={profile.email} 
            readOnly 
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
          <input
            type="text"
            id="username"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700 mb-1">Avatar URL:</label>
          <input
            type="text"
            id="avatar_url"
            value={avatarUrl || ''}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio:</label>
          <textarea
            id="bio"
            value={bio || ''}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <Button onClick={handleProfileUpdate} disabled={isUpdating} className="w-full sm:w-auto">
          {isUpdating ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </div>
  );
};

export default EditProfilePage;
