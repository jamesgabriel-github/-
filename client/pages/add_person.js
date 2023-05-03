import {useReducer} from "react";
import axios from '@/lib/axios';
import {useSession} from "next-auth/react";

const form_reducer = (state, event) => {
    return{
        ...state,
        [event.target.name]: event.target.value
    }
}

function add_person(){
    const {data: session } = useSession();
    const[form_data,set_form_data] = useReducer(form_reducer, {})

    const handle_submit = (e) => {
        e.preventDefault();
        axios.post('api/people',form_data, {
            headers:{
                'Authorization' : `Bearer ${session?.accessToken}`
            }
        }).then((response)=>{
            console.log(response);
            window.location.href = '/';
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handle_submit}>
                <h1>Add New Person</h1>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    <input type="text" onChange={set_form_data} name="first_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Middle Name</label>
                    <input type="text" onChange={set_form_data} name="middle_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input type="text" onChange={set_form_data} name="last_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
                    Create
                </button>
            </form>
        </div>
        )
}

export default add_person;