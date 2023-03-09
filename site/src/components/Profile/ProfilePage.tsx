import React, { Fragment, useState } from "react";
import { Mock_Profile } from "./Mock_Profile";
import ProfileList from "./ProfileList";
import { Profile } from "./Profile";
import ChatIcon from "../Chat/ChatIcon";

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
            <div className="w-full h-full flex flex-auto justify-center">
                <div>
                    <ProfileList onSave={saveProfile} profiles={profiles} />
                </div>
                {/* <Profile onSave={saveProfile} profiles={profiles} /> */}
                {/* <div className="flex-row"> */}
                {/* </div> */}
            </div>
        </Fragment>
    );
}
