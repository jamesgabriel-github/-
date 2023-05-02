import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from '@/lib/axios';
import {useSession} from "next-auth/react";

export const useAuth = ({middleware} = {}) => {
    const {data: session } = useSession();
    const router = useRouter();
    //Loading
    const [isLoading, setIsLoading] = useState(true);

    //User
    const {data: user, error, mutate} = useSWR("/api/user",
        () => axios
            .get("/api/user")
            .then(response => {
                console.log("data:")
                console.log(response.data)
                response.data
            })
            .catch(error => {
                if(error.response.useState !== 409)
                throw error
            }));

    //CSRF
    const csrf = () => axios.get("sanctum/csrf-cookie");

    //Login
    const login = async ({setErrors, ...props}) => {
        setErrors([]);
        console.log("AUTH");
        await csrf();
        console.log("setting local storage");
        let user = axios.post("api/login", props)
            .then((response) => 
                // mutate() && router.push("/")
                {
                    localStorage.setItem("accessToken", response.data.token);
                    console.log(response.data.token)
                    // return response;
                    mutate() && router.push("/")
                })
            .catch(error => {
                if(error.response.status != 401) throw error

                console.log(error.response.data.message);
                console.log(Object.values(error.response.data.message));
                setErrors(Object.values(error.response.data.message))
                // setErrors(error.response.data.message)
            })
            console.log("user:"+user);
    }

    //Logout
    const logout = async () => {
        await axios.post("/logout");

        mutate(null);

        router.push("/login");
    }

    useEffect(() => {
        if(user || error){
            setIsLoading(false);
        }

        if(middleware == "guest" && user) router.push("");

        if(middleware == "auth" && error) router.push("/login");
    })

    return {
        user,
        csrf,
        isLoading,
        login,
        logout
    }
}