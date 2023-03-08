import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Profile } from '../Profile/Profile'


interface LogPageProps {
    setLogged: Function,
}


export default function LogPage({ setLogged }: LogPageProps) {
    const [focus, setFocused] = useState(false);

    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        axios.post("/api/login/basic",
            {
                'username': loginName,
                'password': password,
            })
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data['access_token']);
                    localStorage.setItem('token', res.data['access_token']);
                    setLogged(true);
                }
                else if (res.status === 206) {
                    console.log(res.data['access_token']);
                    console.log("send me your code authentificator");
                    axios.post("/api/login/tfa/authenticate",
                    {
                        'username': loginName,
                        'password': password,
                        // 'tfa_code': tfa_code,
                    })
                    .then(function(response) {
                        console.log(response);
                    })
                    
                    // console.log('error', res.statusText);
                }

            })
            .catch(error => {
                // console.log('error', error);
            });
    };

    return (
        <div className="flex justify-center mt-6">
            <form className="bg-gray-200 w-98 py-4 border border-gray-500 shadow-lg pr-10 center justify-center">
                <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">

                    <div className="mb-6 flex text-center content-center justify-center center w-80">
                        <label className="block w-80 text-sl font-medium text-gray-900 dark:text-gray-800">
                            Your email
                        </label>
                        <input type="text" id="loginName" placeholder="login" required value={loginName} onChange={e => setLoginName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-6 flex text-center content-center justify-center center w-80">
                        <label className="block w-80 text-sl font-medium text-gray-900 dark:text-gray-800">
                            Your password
                        </label>
                        <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* <div className="flex items-start mb-2 px-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600">Remember me</label>
                    </div> */}

                    <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 center content-center text-center font-medium rounded-lg text-sm md:w-auto px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Log in
                    </button>
                </div>
            </form >
        </div>
    );
}