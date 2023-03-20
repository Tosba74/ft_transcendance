import React, { useRef, SyntheticEvent, useEffect } from "react";
import axios from "axios";

import { LoggedUser } from "./LoggedUser";
interface AvatarProps {
    user: LoggedUser,
    refreshUserInfos: Function
}

/* Upload fonctionne
Apres un changement d image, il est possible que l'ancienne image reste visible (si meme extension)
car l image aura le meme nom et le navigateur la garde en cache.
Solution (a faire plus tard):
Sur l'api, a voir pour implementer un random string dans le nom de l'image 
(mais ca demande plus de logique dans les fonctions)
*/

export default function Avatar({user, refreshUserInfos}: AvatarProps) {

    const { avatar_url, } = user;

    // const [avatarStream, setAvatarStream] = React.useState({});
    const [avatarUrl, setAvatarUrl] = React.useState(avatar_url);
    const [avatarMessage, setAvatarMessage] = React.useState('');

    const fileInput: any = useRef();

    function fileValidation(): boolean {
        if (fileInput.current.files[0] === undefined) {
            setAvatarMessage('Error: file not detected');
            return false;
        }

        // validate type (jpg/png)
        if (fileInput.current.files[0].type !== 'image/png' && 
            fileInput.current.files[0].type !== 'image/jpg' &&
            fileInput.current.files[0].type !== 'image/jpeg') {
            setAvatarMessage('Error: the image must be jpg or png');
            return false;
        }

        // validate size (1MO)
        if (fileInput.current.files[0].size < 1 || fileInput.current.files[0].size > 1000000) {
            setAvatarMessage('Error: maximum image size 1 MO');
            return false;
        }

        // eventually validate image proportion w/h and/or reformat image as a square ??

        return true;
    }

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();        

        if (fileValidation() === false)
            return;

        const token = localStorage.getItem('token');
        if (token) {
            const data = new FormData();
            data.append('avatar', fileInput.current.files[0], fileInput.current.files[0].name);
    
            axios.put(`/api/users/upload_image`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                setAvatarMessage('Image uploaded successfully');
                setAvatarUrl(res.data);
                refreshUserInfos();
                setTimeout(() => { setAvatarMessage('') }, 3000);
            })
            .catch(() => setAvatarMessage('Error: impossible to contact API. Try to re-login...'));
        }
    }

    // function fetchAvatarStream() {
    //     try {
    //         const token = localStorage.getItem('token');
    //                                                                 // POURQUOI ROUTE /users FONCTIONNE PAS COMME LES AUTRES ?
    //         // axios.get("/api/users/avatar", {
    //         axios.get("/api/me/avatar", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         })
    //         .then(res => {
    //             // setAvatarStream(res.data);
    //             setAvatarUrl(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    
    //     } catch {
    
    //     }
        
    //     // setLogged(false)
    // }

    // useEffect(fetchAvatarStream, [avatarMessage]);

    return (
        <div className="flex justify-center mt-6">
            <form onSubmit={handleSubmit} className="bg-gray-200 w-98 py-2 pt-10 border border-gray-500 shadow-lg center justify-center">
                <img
                    id="avatarImg"
                    className="text-center w-80 h-80" 
                    // src={`data:image/jpeg;base64,${avatarStream}`} 
                    src={avatarUrl}
                />
                <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">
                    
                    <div className="mb-6 flex text-center content-center justify-center center w-80 px-6">
                        <label className="text-right pr-4 block w-2/5 text-sl font-medium text-gray-900 dark:text-gray-800">
                            New avatar ?
                        </label>
                        <input
                            id="avatarInput"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="file"
                            ref={fileInput}
                        />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 center content-center text-center font-medium rounded-lg text-sm md:w-auto px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Save
                    </button>

                    <div className="mt-3 h-6 text-sm text-center">{avatarMessage}</div>

                </div>
            </form>
        </div>
    );

}
