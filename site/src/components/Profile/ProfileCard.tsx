import { Profile } from "./Profile";
import React from "react";
import logoInconnu from '../../assets/img/inconnu.jpeg';

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

interface ProfileCardProps {
  profile: Profile;
  onEdit: (profile: Profile) => void;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { profile, onEdit } = props;
  const handleEditClick = (profileBeingEdited: Profile) => {
    onEdit(profileBeingEdited);
  };
  // const cancelEditing = () => {
    // setProfileBeingEdited(profile);
  // };
  return (
    <div className="items-center justify-center w-full flex md:w-auto md:order-1">
      <div className="bg-gray-200 w-48 h-80 z-40 border border-gray-800 items-center center">
        {/* <img src={profile.imageUrl} alt={profile.name} /> */}
        <div className="w-20 h-20 justify-center items-center">
          <img className="w-16 h-16 rounded-full justify-center items-center" height="16" src={logoInconnu} alt={profile.name} />
        </div>
        <section>
          <h5>
            <strong>{profile.name}</strong>
          </h5>
          <p>{formatDescription(profile.description)}</p>
          <button
            className="border rounded-full p-1 px-2 bg-blue-300"
            onClick={() => {
              handleEditClick(profile);
            }}
          >
            <span className="icon-edit "></span>
            Edit
          </button>
        </section>
      </div>
    </div>
  );
}

// https://cdn.intra.42.fr/coalition/cover/192/jpeg-back5.jpg