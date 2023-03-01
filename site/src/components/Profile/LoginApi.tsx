import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


interface LoginApiProps {
    setLogged: Function,
}


export default function LoginApi({ setLogged }: LoginApiProps) {

    const [pageMessage, setPageMessage] = React.useState('Logging...');
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
                        localStorage.setItem('token', res.data['access_token']);
    
                        setLogged(true);
                        setPageMessage('Login success, redirecting');
                        setTimeout(() => { navigate('/') }, 3000);
                    }
                    else {
                        setPageMessage('Login error');
                        // console.log('error', res.statusText);
                    }
    
                });
                // .catch(error => {
                //     setPageMessage('Login error22');
                //     // console.log('error', error);
                // });
        }
        else {
            setPageMessage('Missing infos');
    
        }

    }, [setPageMessage])


    return (
        <div className="flex justify-center mt-6">
            <form className="bg-gray-200 w-98 py-4 border border-gray-500 shadow-lg pr-10 center justify-center">
                <div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">
                    {pageMessage}
                </div>
            </form >
        </div>
    );
}