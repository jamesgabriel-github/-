import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import {useAuth} from "../hooks/auth";
import Head from "next/head";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Errors from "@/components/Errors";
import {useSession} from "next-auth/react";
import axios from '@/lib/axios';
import { sendContactForm } from "@/lib/api";
import { useRouter } from 'next/router';

const url = process.env.EMAIL;

const Login = () => {

    const {data: session } = useSession();
    console.log(session);

    const router = useRouter();

    //States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [errors, setErrors] = useState("");

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
        console.log("Account:");
        console.log({name,email,password,password_confirmation});
        let request = 'api/register?url='+process.env.NEXT_PUBLIC_API_URL+"/verify_email";
        await axios.post(request,{name,email,password,password_confirmation}).then((response)=>{
            console.log(response);
        }).catch(error => {
            throw error
        });
        
        // let token = '';
        // let username = '';
        // await axios.post("api/login", {email, password})
        //     .then((response) => 
        //         {
        //             username = response.data.user.name;
        //             token = response.data.token;
        //         })
        //     .catch(error => {
        //         if(error.response.status != 401) throw error

        //         console.log(error.response.data.message);
        //         console.log(Object.values(error.response.data.message));
        //         setErrors(Object.values(error.response.data.message))
        //     });
        // await sendContactForm([username, token]);//username and token must be in correct order
        router.push('/login?message=Please verify your account through your gmail account.')
    }

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <center>
                <h1>Registration Page</h1>
            </center>
            <div className="w-1/4 mx-auto bg-white shadow p-1 rounded">
                <Errors errors={errors}/>
                <form onSubmit={submitForm} autoComplete="off" className="space-y-4">
                    <div className="">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="w-full"
                            onChange={e => setName(e.target.value)}
                            required
                            autoFocus
                            autoComplete="off"
                        />
                    </div>
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
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            className="w-full"
                            onChange={e => setPassword_confirmation(e.target.value)}
                            required
                            autoFocus
                            autoComplete="off"
                        />
                    </div>
                    <div className="">
                        <Button>Save</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;

Login.getLayout = function getLayout(page){
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}