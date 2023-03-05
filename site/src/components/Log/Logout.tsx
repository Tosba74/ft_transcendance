import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function Logout() {

    const [pageMessage, setPageMessage] = React.useState('Logout');
    const navigate = useNavigate()

    React.useEffect(() => {
        localStorage.clear();

        const token = localStorage.getItem('token');

        if (token == null) {
            setPageMessage('Logout successful, redirecting');

            // axios.post("/api/login/apicallback",
            //         {
            //             'code': code,
            //             'state': state,
            //         })
            //         .then(res => {   
            //         })
            //         .catch(error => {
            //             setPageMessage('Login error');
            //             // console.log('error', error);
            //         });


            setTimeout(() => { navigate('/') }, 3000);
        }
        else {
            setPageMessage('Logout error');

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