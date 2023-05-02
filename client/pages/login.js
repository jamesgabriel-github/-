import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import {useAuth} from "../hooks/auth";
import Head from "next/head";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Errors from "@/components/Errors";
import {signIn, useSession} from "next-auth/react";

const Login = () => {

    const {data: session } = useSession();
    console.log(session);

    //States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        // console.log("Password:"+password);

        // login({email, password, setErrors});

        const payload = {email,password};
        // console.log(payload);

        // let id = "1";
        // let name = "asd";
        // let email2 = "123";

        // const user = {id,name,email:email2};
        // console.log(user);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/",
        });
        // window.location.href = "/";

        // console.log(session);
        // console.log("Session:"+session.accessToken);
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
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

Login.getLayout = function getLayout(page){
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}