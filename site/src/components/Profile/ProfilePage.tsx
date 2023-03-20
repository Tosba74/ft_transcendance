import React from "react";
import Avatar from "./Avatar";
import Pseudo from "./Pseudo";
import ProfilePublic from "./ProfilePublic";
import ProfilePrivate from "./ProfilePrivate";

import axios from 'axios';
import jwt_decode from "jwt-decode";

import { LoggedUser } from './LoggedUser';
interface ProfilePageProps {
    user: LoggedUser,
    setUserInfos: Function,
}

export default function ProfilePage({user, setUserInfos}: ProfilePageProps) {

    const [tokenMessage, setTokenMessage] = React.useState('');

    function refreshTokenAndUserInfos() {
		const token = localStorage.getItem('token');
		axios.get("/api/login/refresh_token", {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
		.then(res => {
			const newtoken: string = res.data['access_token'];
			if (newtoken) {
				localStorage.setItem('token', newtoken);
				const user: LoggedUser = jwt_decode(newtoken);
				setUserInfos(user);
			}
		})
		.catch((error) => {
			setTokenMessage('Error while refreshing user\'s token');
			console.log(error);
		});
	}

    return (
        <>
        <div>
            <h2>Your profile</h2>            
            <Pseudo user={user} refreshUserInfos={refreshTokenAndUserInfos}/>
            <Avatar user={user} refreshUserInfos={refreshTokenAndUserInfos}/>

            {/* add informations like stats, friend, channels, etc in the next 2 components */}
            {/* <ProfilePublic user={user} /> */}
            {/* <ProfilePrivate user={user} /> */}

            <div className="mt-3 h-6 text-sm text-center">{tokenMessage}</div>
        </div>
        </>
    );
}
