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
            setPageMessage('Logout successful, redirecting...');

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
        <div className="mt-3 h-6 text-sm text-center">{pageMessage}</div>
    );
}