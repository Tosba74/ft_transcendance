import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TfaCode from "./TfaCode";

interface LogPageProps {
    setLogged: Function,
}

export default function LogPage({ setLogged }: LogPageProps) {
    const [focus, setFocused] = useState(false);

    const [userId, setUserId] = React.useState(-1);
    const [tfa, setTfa] = React.useState(false);
    const [pageMessage, setPageMessage] = React.useState('');

    const [loginName, setLoginName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [tfaCode, setTfaCode] = React.useState('');
    
    const navigate = useNavigate();
    
    const loginUser = () => {
        setPageMessage('Login successful, redirecting...');
        setLogged(true);
        setTimeout(() => { navigate('/') }, 3000);
    }
    
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (tfa === false) {
            axios.post("/api/login/basic", {
                'username': loginName,
                'password': password,
            })
            .then(res => {
                if (res.data['access_token']) {
                    localStorage.setItem('token', res.data['access_token']);
                    loginUser();
                }
                else {
                    setTfa(true);
                    setUserId(res.data.id);
                    setPageMessage('');
                }
            })
            .catch(() => setPageMessage('Password invalid'));
        }
    };

    return (
        <div className="flex justify-center mt-6">
            <form className="bg-gray-200 w-98 py-2 pt-10 border border-gray-500 shadow-lg center justify-center">
                <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">

                { !tfa &&
                <>
                    <div className="mb-6 flex text-center content-center justify-center center w-80 px-6">
                        <label className="text-right pr-4 block w-2/5 text-sl font-medium text-gray-900 dark:text-gray-800">
                            Login name
                        </label>
                        <input 
                            id="loginName" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="text" 
                            value={loginName}
                            onChange={e => setLoginName(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-6 flex text-center content-center justify-center center w-80 px-6">
                        <label className="text-right pr-4 block w-2/5 text-sl font-medium text-gray-900 dark:text-gray-800">
                            Password
                        </label>
                        <input 
                            id="password" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 center content-center text-center font-medium rounded-lg text-sm md:w-auto px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Log in
                    </button>
                </>
                }

                { tfa && 
                    <TfaCode userId={userId} loginUser={loginUser} errorMsg={setPageMessage}/>
                }
                    <div className="mt-3 h-6 text-sm text-center">{pageMessage}</div>
                </div>
            </form >
        </div>
    );
}