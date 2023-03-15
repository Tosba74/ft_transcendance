import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TfaCode from "./TfaCode";

interface LoginApiProps {
    setLogged: Function,
}

interface LoggedUser {
    id: number,
    login_name: string,
    pseudo: string,
    color: number,
    avatar_url: string,
    tfa_enabled: boolean,
    is_admin: boolean
}

export default function LoginApi({ setLogged }: LoginApiProps) {
    const [userId, setUserId] = React.useState(-1);
    const [tfa, setTfa] = React.useState(false);
    const [token, setToken] = React.useState('');
    const [pageMessage, setPageMessage] = React.useState('');

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    let code = searchParams.get("code");
    let state = searchParams.get("state");

    const loginUser = () => {
        console.log(token);
        localStorage.setItem('token', token);
        setPageMessage('Login success, redirecting...');
        setLogged(true);
        setTimeout(() => { navigate('/') }, 3000);
    }

    React.useEffect(() => {
        if (code != null && state != null) {
            axios.post("/api/login/apicallback",
                {
                    'code': code,
                    'state': state,
                })
                .then(res => {
                    if (res.status === 201) {
                        setToken(res.data['access_token']);
                        const decoded: LoggedUser = jwt_decode(res.data['access_token']);
                        setTfa(decoded.tfa_enabled);
                        setUserId(decoded.id);
                        
                        if (!decoded.tfa_enabled) {
                            loginUser();
                        }
                    }
                    else {
                        setPageMessage('Error contacting 42 API');

                    }
                })
                // .catch(error => setPageMessage( JSON.stringify(error, null, ' ') ) );
                // .catch(error => console.log(error));
        }
        else
            setPageMessage('Error missing infos');

    }, [setTfa, setUserId, setToken, setPageMessage])

    return (
        <div className="flex justify-center mt-6">
            <form className="bg-gray-200 w-98 py-4 border border-gray-500 shadow-lg pr-10 center justify-center">
                <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">
                    {tfa &&
                        <TfaCode userId={userId} loginUser={loginUser} errorMsg={setPageMessage}/>
                    }
                    <div>{pageMessage}</div>
                </div>
            </form >
        </div>
    );
}