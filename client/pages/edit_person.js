import {useReducer} from "react";
import axios from '@/lib/axios';
import { useRouter } from 'next/router'
import {useSession} from "next-auth/react";


const form_reducer = (state, event) => {
    return{
        ...state,
        [event.target.name]: event.target.value
    }
}

function edit_person(){
    const {data: session } = useSession();
    const router = useRouter();
    const data = router.query;
    const[form_data,set_form_data] = useReducer(form_reducer, {})
    
    const handle_submit = (e) => {
        e.preventDefault();

        //assign previous value if field is null
        if(!form_data.first_name){
            form_data.first_name = data.first_name;
        }
        if(!form_data.middle_name){
            form_data.middle_name = data.middle_name;
        }
        if(!form_data.last_name){
            form_data.last_name = data.last_name;
        }
        axios.put('api/people/'+data.id+'/edit',form_data, {
            headers:{
                'Authorization' : `Bearer ${session?.user.accessToken}`
            }
        }).then((response)=>{
            console.log(response);
            window.location.href = '/';
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handle_submit}>
                <h1>Edit Person</h1>
                <p className="text-xs text-red-600">Note: if field are blank, previous value will be retain.</p>
                <div>
                    <label className="block text-gray-700 text-sm font-bold">First Name</label>
                    <label className="block text-gray-600/75 text-sm">Previous First Name: {data.first_name}</label>
                    <input type="text" onChange={set_form_data} name="first_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mt-2">
                    <label className="block text-gray-700 text-sm font-bold">Middle Name</label>
                    <label className="block text-gray-600/75 text-sm">Previous Middle Name: {data.middle_name}</label>
                    <input type="text" onChange={set_form_data} name="middle_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mt-2">
                    <label className="block text-gray-700 text-sm font-bold">Last Name</label>
                    <label className="block text-gray-600/75 text-sm">Previous Last Name: {data.last_name}</label>
                    <input type="text" onChange={set_form_data} name="last_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
                    Save
                </button>
            </form>
        </div>
        )
}

export default edit_person;

export async function getStaticProps() {
    const response = await axios.get("/api/people");
    const people = response.data.people;
    return {
      props: {
        people
      },
    }
  }