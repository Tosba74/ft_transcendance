import React, { Fragment, useState, useRef, SyntheticEvent } from "react";
import AvatarUpdate from "./AvatarUpdate";

export default function ProfilesPage() {
   
    // const [profiles, setProfiles] = useState<Profile[]>(Mock_Profile);

    // const saveProfile = (profile: Profile) => {
    //     let updatedProfiles = profiles.map((p: Profile) => {
    //         return p.id === profile.id ? profile : p;
    //     });
    //     setProfiles(updatedProfiles);
    // };

    return (
        <>
        <div>
            <h2>Profiles !!</h2>
            {/* <ProfileList onSave={saveProfile} profiles={profiles} /> */}
            
            {/* <UserInformation /> */}
            <AvatarUpdate />
        </div>
        </>
    );
}
