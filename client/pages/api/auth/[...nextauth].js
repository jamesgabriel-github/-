import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from '@/lib/axios';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            async authorize(credentials, req){
                // const {email, password} = credentials;
                let email = credentials.email;
                let password = credentials.password;
                console.log("CREDS"); 

                // let user = "";
                const csrf = () => axios.get("sanctum/csrf-cookie");

                console.log("AUTH");
                await csrf();

                let id = "";
                let name = "";
                let email2 = "";
                let role = "";
                let token = "";

                await axios.post("api/login", {email, password})
                    .then((response) => 
                        // mutate() && router.push("/")
                        {
                            id = response.data.user.id;
                            name = response.data.user.name;
                            email2 = response.data.user.email;
                            role = response.data.user.role;
                            token = response.data.token;
                            // mutate() && router.push("/")
                        })
                    .catch(error => {
                        if(error.response.status != 401) throw error

                        console.log(error.response.data.message);
                        console.log(Object.values(error.response.data.message));
                        setErrors(Object.values(error.response.data.message))
                        // setErrors(error.response.data.message)
                    })

                    const user = {id,name,email:email2,role,token:token};
                // if(user){
                //     return user
                // }
                // else{
                //     return null
                // }

                // Add logic here to look up the user from the credentials supplied
                // const user = { id: 1, name: 'J Smith123', email: 'jsmith@example.com' }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    console.log("ASD");
                    return user
                } else {
                    // If you return null or false then the credentials will be rejected
                    return null
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks:{
        async jwt({token, user}){
            // return {...token,...user};
            if (user) {
                token.accessToken = user?.token;
                // token.accessToken = '123';
                // Set the values you need in the session
                token.user = {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                    role: user?.role,
                };
                token.role = user?.role;
            }
    
            return token;
        },
        async session({session, token}){
            session.user = token.user;
            // return session;
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: '/login'
    }
})