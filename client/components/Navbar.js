import React from "react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

function Navbar() {
    const {data: session } = useSession();
    console.log("Session:");
    console.log(session);
    return (
        <div className="navbar flex flex-row">
            <div>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        About Us
                    </Link>
                </li>
                <li>
                    <Link href="/contact">
                        Contact Us
                    </Link>
                </li>
                <li>
                    <Link href="/public/page">
                        Public
                    </Link>
                </li>
                <li>
                    <Link href="/user/page">
                        User
                    </Link>
                </li>
                <li>
                    <Link href="/admin/page">
                        Admin
                    </Link>
                </li>
            </ul>
            </div>
        
            <div className="ml-auto p-2">
                {session?.user ?
                    <a 
                        href="/login" 
                        className="hover:font-bold text-white"
                        onClick={() => {
                                signOut();
                        }
                        }
                    >
                        Sign Out
                    </a>
                    :
                    <Link className="hover:font-bold text-white" href={"/login"}>
                        Sign In
                    </Link>
                }
            </div>
        </div>
    )
}

export default Navbar