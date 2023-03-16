import React, { Fragment, useState, useRef, SyntheticEvent } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import { Mock_Profile } from "./Mock_Profile";
// import ProfileList from "./ProfileList";
// import { Profile } from "./Profile";

interface LoggedUser {
    id: number,
    login_name: string,
    pseudo: string,
    color: number,
    avatar_url: string,
    tfa_enabled: boolean,
    is_admin: boolean
}

export default function ProfilesPage() {
   
    // const [profiles, setProfiles] = useState<Profile[]>(Mock_Profile);

    // const saveProfile = (profile: Profile) => {
    //     let updatedProfiles = profiles.map((p: Profile) => {
    //         return p.id === profile.id ? profile : p;
    //     });
    //     setProfiles(updatedProfiles);
    // };

    const [pageMessage, setPageMessage] = React.useState('');

    const fileInput: any = useRef();

    function imageValidation(): boolean {
        
        // validate mime types

        // validate limit size

        // eventually validate image proportion w/h and/or reformat image as a square ??

        return true;
    }

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();        
        if (!fileInput) 
            return;
        
        if (imageValidation() === false) {
            setPageMessage('Error during the upload1');
            return;
        }
        
        const token: string | null = localStorage.getItem('token');
        let user_decoded: LoggedUser | null = null;
        let id: number | null = null;
        if (token) {
            user_decoded = jwt_decode(token);
            if (user_decoded)
                id = user_decoded.id;
        }
        if (token === null || user_decoded === null || id === null) {
            setPageMessage('Error during the upload2');
            return;
        }

        axios.put(`/api/users/${id}/upload_image`, {
            'content': fileInput.current.files[0].name
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.data === true) {
                setPageMessage('Image updated successfully');
            }
        })
        .catch(() => setPageMessage('Error during the upload3'));
    }

    return (
        <div className="flex justify-center mt-6">
            <form onSubmit={handleSubmit} className="bg-gray-200 w-98 py-2 pt-10 border border-gray-500 shadow-lg center justify-center">
                <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">
                    
                    <div className="mb-6 flex text-center content-center justify-center center w-80 px-6">
                        <label className="text-right pr-4 block w-2/5 text-sl font-medium text-gray-900 dark:text-gray-800">
                            Upload file:
                        </label>
                        <input
                            id="avatar"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="file"
                            ref={fileInput}
                            required
                        />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 center content-center text-center font-medium rounded-lg text-sm md:w-auto px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                    </button>

                    <div className="mt-3 h-6 text-sm text-center">{pageMessage}</div>

                </div>
            </form>
        </div>

        // <>
        //     <div>
        //     <h2>Profiles !!</h2>
        //     <ProfileList onSave={saveProfile} profiles={profiles} />
        //     </div>
        // </>
    );
}
