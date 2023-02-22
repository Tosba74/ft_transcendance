import React, { useState } from "react";
import { Profile } from "./Profile";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";

interface ProfileListProps {
  profiles: Profile[];
  onSave: (profile: Profile) => void;
}

export default function ProfileList({ profiles, onSave }: ProfileListProps) {
  const [profileBeingEdited, setProfileBeingEdited] = useState({});

  const handleEdit = (profile: Profile) => {
    setProfileBeingEdited(profile);
  };

  const cancelEditing = () => {
    setProfileBeingEdited({});
  };

  return (
    <div className="row">
      {profiles.map((profile) => (
        <div key={profile.id} className="cols-sm">
          {profile === profileBeingEdited ? (
            <ProfileForm profile={profile} onSave={onSave} onCancel={cancelEditing} />
          ) : (
            <ProfileCard profile={profile} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </div>
  );
}