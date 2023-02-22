import { Profile } from "./Profile";
import React from "react";

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
    // <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
    <div className="bg-gray-200">
      <img src={profile.imageUrl} alt={profile.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{profile.name}</strong>
        </h5>
        <p>{formatDescription(profile.description)}</p>
        <button
          className=" bordered"
          onClick={() => {
            handleEditClick(profile);
          }}
        >
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}
