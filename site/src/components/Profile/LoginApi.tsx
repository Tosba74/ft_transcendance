import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    const [username, setUsername] = React.useState('');
    const [tfa, setTfa] = React.useState(false);
    const [login, setLogin] = React.useState(false);
    const [error, setError] = React.useState(false);

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    let code = searchParams.get("code");
    let state = searchParams.get("state");

    React.useEffect(() => {

        if (code != null && state != null) {
            axios.post("/api/login/apicallback",
                {
                    'code': code,
                    'state': state,
                })
                .then(res => {
                    if (res.status === 201) {
                        const token = res.data['access_token'];
                        const decoded: LoggedUser = jwt_decode(token);
                        setTfa(decoded.tfa_enabled);
                        setUsername(decoded.login_name);
                        
                        if (decoded.tfa_enabled === false) {
                            localStorage.setItem('token', token);
                            setLogin(true);
                            setLogged(true);
                            setTimeout(() => { navigate('/') }, 3000);
                        }
                    }
                    else
                        setError(true);
                })
                .catch(error => console.log(error));
                // .catch(error => setError(true));
        }
        else
            setError(true);

    }, [setLogin, setError, setTfa])


    return (
        <div className="flex justify-center mt-6">
            <form className="bg-gray-200 w-98 py-4 border border-gray-500 shadow-lg pr-10 center justify-center">
                <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">
                    {login &&
                        <p>Login success, redirecting</p>
                    }
                    {tfa &&
                        <p>ask tfa code</p>
                        // <TfaCode username={username} />
                    }
                    {error === true &&
                        <p>Oups, an error occured</p>
                    }
                </div>
            </form >
        </div>
    );
}