import React, { useState } from "react";
import Profil from "../Profil";
import { Profile } from "./Profile";
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
    <div className="flex flex-wrap gap-4">
      {profiles.map((profile) => (
        <div key={profile.id}>
            <Profil profile={profile} />
        </div>
      ))}
    </div>
  );
}