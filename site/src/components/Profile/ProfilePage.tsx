import Avatar from "./Avatar";
import ProfilePublic from "./ProfilePublic";
import ProfilePrivate from "./ProfilePrivate";

import {LoggedUser} from './LoggedUser';

interface ProfilesPageProps {
    user: LoggedUser,
}

export default function ProfilesPage({user}: ProfilesPageProps) {
    

    return (
        <>
        <div>
            <h2>Profiles !!</h2>            
            <ProfilePublic user={user} />
            <ProfilePrivate user={user} />
            <Avatar user={user} />
        </div>
        </>
    );
}
