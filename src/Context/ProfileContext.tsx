import React, { createContext, useContext, useState } from 'react';
import { Profile, mockUsers } from '../../data/mockedProfiles';

type ProfileContextType = {
  profiles: Profile[];
  setProfiles: (profiles: Profile[]) => void;
  setProfilesByAccountId: (accountId: number) => void;
  getProfileById: (profileId: number) => Profile | null;
  getProfileData: () => Profile[];
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const setProfilesByAccountId = (accountId: number) => {
    const mockedProfiles = mockUsers.filter((u) => u.account_id === accountId);
    const profilesFromState = profiles.filter(
      (u) => u.account_id === accountId
    );
    const combinedProfiles = mockedProfiles.concat(profilesFromState);
    const uniqueProfiles = Array.from(new Set(combinedProfiles));

    setProfiles(uniqueProfiles);
  };

  const getProfileData = () => {
    return profiles;
  };

  const getProfileById = (profileId: number) => {
    const profile = mockUsers.find((profile) => profile.id === profileId);
    if (profile) {
      return profile;
    } else {
      const profileInState = profiles.find(
        (profile) => profile.id === profileId
      );
      return profileInState || null;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        setProfiles: setProfiles,
        setProfilesByAccountId: setProfilesByAccountId,
        getProfileById: getProfileById,
        getProfileData: getProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext(): ProfileContextType {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('Add userprovider into app.tsx');
  }
  return context;
}
