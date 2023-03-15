import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LogPageProps {
    setLogged: Function,
}

export default function LogPage({ setLogged }: LogPageProps) {
    const [focus, setFocused] = useState(false);

    const [loginName, setLoginName] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const [tfa, setTfa] = React.useState(false);
    const [token, setToken] = React.useState('');

    const [tfaCode, setTfaCode] = React.useState('');
    const [userId, setUserId] = React.useState(-1);

    const [pageMessage, setPageMessage] = React.useState('');

    const navigate = useNavigate();
    
    const logUser = () => {
        console.log(token);
        localStorage.setItem('token', token);
        setLogged(true);
        setPageMessage('Login success, redirecting...');
        setTimeout(() => { navigate('/') }, 3000);
    }
    
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (tfa === false) {
            axios.post("/api/login/basic",
            {
                'username': loginName,
                'password': password,
            })
            .then(res => {
                if (res.data['access_token']) {
                    console.log(res.data['access_token']);
                    setToken(res.data['access_token']);
                    logUser();
                }
                else {
                    setTfa(true);
                    setUserId(res.data.id);
                    setPageMessage('');
                }
            })
            .catch(error => {
                setPageMessage('Password invalid');
                // console.log('error', error);
            });
        }
        else {
            axios.post("/api/login/tfa/authenticate",
            {
                'id': userId,
                'tfa_code': tfaCode
            })
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data['access_token']);
                    setToken(res.data['access_token']);
                    logUser();
                }
                else {
                    setPageMessage('Login error21');
                    // console.log('error', res.statusText);
                }
            })
            .catch(error => {
                setPageMessage('Code invalid');
                // console.log('error', error);
            });
        }
    };

    return (
        <div className="flex justify-center mt-6">
            <form className="bg-gray-200 w-98 py-4 border border-gray-500 shadow-lg pr-10 center justify-center">
                <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">

                { !tfa &&
                    <>
                    <div className="mb-6 flex text-center content-center justify-center center w-80">
                        <label className="text-right pr-4 block w-80 text-sl font-medium text-gray-900 dark:text-gray-800">
                            Login name
                        </label>
                        <input 
                            id="loginName" 
                            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="text" 
                            value={loginName}
                            onChange={e => setLoginName(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-6 flex text-center content-center justify-center center w-80">
                        <label className="text-right pr-4 block w-80 text-sl font-medium text-gray-900 dark:text-gray-800">
                            Password
                        </label>
                        <input 
                            id="password" 
                            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    </>
                }

                {
                    tfa &&
                    <div className="mb-6 flex text-center content-center justify-center center w-80">
                        <label className="text-right pr-4 block w-80 text-sl font-medium text-gray-900 dark:text-gray-800">
                            Code
                        </label>
                        <input 
                            id="tfaCode"
                            className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="XXXXXX" 
                            value={tfaCode}
                            onChange={e => setTfaCode(e.target.value)} 
                            required
                        />
                    </div>
                }

                    {/* <div className="flex items-start mb-2 px-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600">Remember me</label>
                    </div> */}

                    <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 center content-center text-center font-medium rounded-lg text-sm md:w-auto px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Log in
                    </button>
                    <div>{pageMessage}</div>
                </div>
            </form >
        </div>
    );
}