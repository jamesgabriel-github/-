import axios from '@/lib/axios';
import { compress } from '@/next.config';
import {useSession, getSession} from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';


const page = ({status}) => {
    const {data: session } = useSession();
    console.log("stat");
    console.log(status);
    // const data = await getServerSession(authOptions);

    // console.log(data);

    const router = useRouter();

    if(status == 'unauthorized'){
        typeof window !== 'undefined' && router.push('/login?message=This page is avaiable for admin only.');
    }

    useEffect(() => {
    })

    
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Admin Page</h1>
        </div>
    );
};

export default page;

// export async function getStaticProps() {
//     console.log("static props");
//     // const response = await axios.get("/api/adminrole");
//     // const people = response.data.people;
//     // return {
//     //   props: {
//     //     people
//     //   },
//     // }
//     return {
//       props: {},
//     }
//   }

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
    await axios.get("api/adminrole", {
            headers: {
                'Role' : role
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