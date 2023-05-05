import MainLayout from "@/layouts/MainLayout";
import { useState, useEffect } from "react";
import {useAuth} from "../hooks/auth";
import Head from "next/head";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Errors from "@/components/Errors";
import {signIn, useSession} from "next-auth/react";
import { useRouter } from 'next/router'
import axios from '@/lib/axios';
import { sendContactForm } from "@/lib/api";



const Login = () => {

    const {data: session } = useSession();
    console.log(session);
    const router = useRouter();
    // console.log("Router");
    // console.log(router.query.message);

    //States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [token, setToken] = useState("");

    //Auth Hook
    const {login, isLoading, user} = useAuth({middleware: "guest"});

    //check loading and user
    if(isLoading || user){
        // return (
        //     <>Is loading ...</>
        // )
    }
    //Submit form
    const submitForm = async e => {
        e.preventDefault();
        // console.log("Email:"+email);
        // console.log("Password:"+password);

        // login({email, password, setErrors});

        const payload = {email,password};
        // console.log(payload);

        // let id = "1";
        // let name = "asd";
        // let email2 = "123";

        // const user = {id,name,email:email2};
        // console.log(user);
        let token = '';
        await axios.post("api/login", {email, password})
        .then((response) => 
            {
                token = response.data.token;
            })
        .catch(error => {
            if(error.response.status != 401) throw error

            // console.log(error.response.data.message);
            // console.log(Object.values(error.response.data.message));
            // setErrors(Object.values(error.response.data.message))
        });
        if(token){
            console.log("TOKEN"+token);
            await axios.get('api/user', {
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            }).then(async (response)=>{
                console.log(response);
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/",
                });
            })
            .catch(error => {
                if(error.response.status != 403) throw error
                router.push('/login?message=Please verify your account through your gmail account.')
                // console.log(error.response.data.message);
                // console.log(Object.values(error.response.data.message));
                // setErrors(Object.values(error.response.data.message))
            })
        }

        // await sendContactForm(result);
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            {
                router.query.message 
                &&
                <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md text-center">{router.query.message}</p>
            }
            {
                router.query.verification_result 
                &&
                <p className="text-green-700 bg-green-100 py-2 px-5 rounded-md text-center">{router.query.verification_result}</p>
            }
            <div className="w-1/4 mx-auto bg-white shadow p-1 rounded">
                <Errors errors={errors}/>
                <form onSubmit={submitForm} autoComplete="off" className="space-y-4">
                    <div className="">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="w-full"
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoFocus
                            autoComplete="off"
                        />
                    </div>

                    <div className="">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="w-full"
                            onChange={e => setPassword(e.target.value)}
                            required
                            autoFocus
                            autoComplete="off"
                        />
                    </div>
                    <div className="">
                        <Button>Log in</Button>
                        <a className="rounded inline-flex items-center px-4 
                        py-2 bg-green-700 border border-transparent 
                        font-semibold text-xs text-white uppercase tracking-widest 
                        hover:bg-green-800 active:bg-indigo-900 focus:outline-none 
                        focus:border-green-900 focus:ring ring-indigo-50 
                        disabled:opacity-25 transition ease-in-out duration-150 ml-2" 
                        href="/register">Register</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;

// Login.getLayout = function getLayout(page){
//     return (
//         <MainLayout>
//             {page}
//         </MainLayout>
//     )
// }