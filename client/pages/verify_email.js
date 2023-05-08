import React from "react";
import { useRouter } from 'next/router'
import axios from '@/lib/axios';
import { useEffect } from "react";


function verify_email(){
    const router = useRouter();

    useEffect(() => {
        verify();
    })
    
    const verify = async () => {
        if(router.query.token){
            console.log("VERIFIED: "+router.query.token);
            let token = router.query.token;
            let url = 'http://127.0.0.1:8000/api/customverify-email?token='+token;
            await axios.get(url)
            .then((response) => 
                {
                    console.log("VERIFIED:");
                    console.log(response);
                    // router.push('/login?verification_result='+response.data.message);
                    router.push('/verification_done?result='+response.data.message);
                })
            .catch(error => {
                if(error.response.status != 500 && error.response.status != 401) 
                throw error
    
                console.log("UNAUTHORIZED");
                router.push('/verification_done?error=Verification failed.');
            })
        }
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* {
                router.query.token 
                &&
                <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md text-center">{router.query.token}</p>
            } */}
            <h1>Verifying...</h1>
        </div>
    )
}

export default verify_email;
