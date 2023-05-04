import {getSession} from "next-auth/react";
import axios from '@/lib/axios';
import { useRouter } from 'next/router';

const page = ({status}) => {
    const router = useRouter();
    console.log("status");
    console.log(status);

    if(status == 'unauthorized'){
        typeof window !== 'undefined' && router.push('/login?message=You are not authorized.');
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>User Page</h1>
        </div>
    );
};

export default page

export async function getServerSideProps(context) {
    // const data = await getServerSession(authOptions);

    // console.log(data);
    const session = await getSession(context);
    let role = '';
    if(session){
        console.log("SERVER SESSION");
        console.log(session.user.role);
        role = session.user.role;
    }

    let status = 'unauthorized';
    await axios.get("api/authorized", {
            headers: {
                'Authorization' : `Bearer ${session?.accessToken}`
            },
        })
        .then((response) => 
            {
                console.log("SUCCESS");
                status="success"
            })
        .catch(error => {
            if(error.response.status != 401) throw error

            console.log("UNAUTHORIZED");
            status = 'unauthorized';
        })
            
    return {
      props: { status }, // will be passed to the page component as props
    }
  }