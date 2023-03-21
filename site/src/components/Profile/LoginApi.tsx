import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import TfaCode from "./TfaCode";

interface LoginApiProps {
    setLogged: Function,
}

export default function LoginApi({ setLogged }: LoginApiProps) {
    const [userId, setUserId] = React.useState(-1);
    const [tfa, setTfa] = React.useState(false);
    const [pageMessage, setPageMessage] = React.useState('');

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    let code = searchParams.get("code");
    let state = searchParams.get("state");
    
    const loginUser = () => {
        setPageMessage('Login successful, redirecting...');
        setLogged(true);
        setTimeout(() => { navigate('/') }, 3000);
    }

    React.useEffect(() => {
        if (code != null && state != null) {
            axios.post("/api/login/apicallback", {
                'code': code,
                'state': state
            })
            .then(res => {
                if (res.status === 201 && res.data['access_token']) {
                    localStorage.setItem('token', res.data['access_token']);
                    loginUser();
                }
                else if (res.status === 201 && res.data['id']) {
                    setUserId(res.data['id']);
                    setTfa(true);
                }
                else setPageMessage('Error contacting 42 API');
            })
            // .catch(() => setPageMessage('Error during login: retry without refreshing logging process.'));
        }
        else setPageMessage('Error missing infos');

    }, [setTfa, setUserId, setPageMessage])

    return (
        <>
        { !tfa && 
            <div className="mt-3 h-6 text-sm text-center">{pageMessage}</div>
        }
        { tfa &&
            <div className="flex justify-center mt-6">
                <form className="bg-gray-200 w-98 py-2 pt-10 border border-gray-500 shadow-lg center justify-center">
                    <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">
                            <TfaCode userId={userId} loginUser={loginUser} errorMsg={setPageMessage}/>
                        <div className="mt-3 h-6 text-sm text-center">{pageMessage}</div>
                    </div>
                </form >
            </div>
        }
        </>
    );
}