import Avatar from "./Avatar";
import ProfilePublic from "./ProfilePublic";
import ProfilePrivate from "./ProfilePrivate";

import axios from 'axios';

import {LoggedUser} from './LoggedUser';

interface ProfilesPageProps {
    user: LoggedUser,
}

export default function ProfilesPage({user}: ProfilesPageProps) {

    const token = localStorage.getItem('token');
    if (token) {

        // axios.get('/api/users/profile', {
        axios.get('/api/me/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            if (res.status === 200) {
                // console.log(res);
            }
        })
        .catch(error => {
            // console.log(error);
        });
    }

    return (
        <>
        <div>
            <h2>Your profile</h2>            
            <ProfilePublic user={user} />
            <ProfilePrivate user={user} />
            <Avatar />
        </div>
        </>
    );
}
