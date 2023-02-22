import React, { Fragment, useState } from "react";
import { Mock_Profile } from "./Mock_Profile";
import ProfileList from "./ProfileList";
import { Profile } from "./Profile";

export default function ProfilesPage() {
    const [profiles, setProfiles] = useState<Profile[]>(Mock_Profile);

    const saveProfile = (profile: Profile) => {
        let updatedProfiles = profiles.map((p: Profile) => {
            return p.id === profile.id ? profile : p;
        });
        setProfiles(updatedProfiles);
    };

    return (
        <Fragment>
            <div className="bg-cyan-500">
            <h2>Profiles !!</h2>
            <ProfileList onSave={saveProfile} profiles={profiles} />
            </div>
        </Fragment>
    );
}
