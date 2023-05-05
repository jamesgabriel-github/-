import React from "react";
import { useRouter } from 'next/router'


function verify_email(){
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {
                router.query.result 
                &&
                <p className="text-green-700 bg-green-100 py-2 px-5 rounded-md text-center">{router.query.result}</p>
            }
            {
                router.query.error 
                &&
                <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md text-center">{router.query.error}</p>
            }
        </div>
    )
}

export default verify_email;
