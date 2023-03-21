// import { Mock_Profile } from "./Mock_Profile";
// import ProfileList from "./ProfileList";
// import { Profile } from "./Profile";

import Avatar from "./ProfilePage/Avatar";
import Pseudo from "./ProfilePage/Pseudo";
import TfaButton from "./ProfilePage/TfaButton";

import ProfilePublic from "./ProfilePage/ProfilePublic";
import ProfilePrivate from "./ProfilePage/ProfilePrivate";

import { LoggedUser } from './LoggedUser';
interface ProfilePageProps {
    user: LoggedUser,
    refreshUserInfos: Function
}

export default function ProfilePage({user, refreshUserInfos}: ProfilePageProps) {

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
            <h2>My profile</h2>
            {/* <ProfileList onSave={saveProfile} profiles={profiles} />             */}
            
            <br />
            <Pseudo user={user} refreshUserInfos={refreshUserInfos}/>
            <br />
            <Avatar user={user} refreshUserInfos={refreshUserInfos}/>
            <br />
            <TfaButton user={user} refreshUserInfos={refreshUserInfos} />

            {/* add informations like stats, friend, channels, etc in the next 2 components */}
            {/* <ProfilePublic user={user} /> */}
            {/* <ProfilePrivate user={user} /> */}

        </div>
        </>
    );
}
