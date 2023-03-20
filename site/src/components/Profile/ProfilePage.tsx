import Avatar from "./Avatar";
import Pseudo from "./Pseudo";
import ProfilePublic from "./ProfilePublic";
import ProfilePrivate from "./ProfilePrivate";

import { LoggedUser } from './LoggedUser';
interface ProfilePageProps {
    user: LoggedUser,
    refreshUserInfos: Function
}

export default function ProfilePage({user, refreshUserInfos}: ProfilePageProps) {

    return (
        <>
        <div>
            <h2>Your profile</h2>            
            <Pseudo user={user} refreshUserInfos={refreshUserInfos}/>
            <Avatar user={user} refreshUserInfos={refreshUserInfos}/>

            {/* add informations like stats, friend, channels, etc in the next 2 components */}
            {/* <ProfilePublic user={user} /> */}
            {/* <ProfilePrivate user={user} /> */}

        </div>
        </>
    );
}
