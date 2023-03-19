import Avatar from "./Avatar";
import Pseudo from "./Pseudo";
import ProfilePublic from "./ProfilePublic";
import ProfilePrivate from "./ProfilePrivate";

import { LoggedUser } from './LoggedUser';
interface ProfilePageProps {
    user: LoggedUser,
    setUserInfos: Function,
}

export default function ProfilePage({user, setUserInfos}: ProfilePageProps) {

    return (
        <>
        <div>
            <h2>Your profile</h2>            
            <Pseudo user={user} setUserInfos={setUserInfos}/>
            <Avatar user={user} setUserInfos={setUserInfos}/>

            {/* add informations like stats, friend, channels, etc in the next 2 components */}
            {/* <ProfilePublic user={user} /> */}
            {/* <ProfilePrivate user={user} /> */}
        </div>
        </>
    );
}
