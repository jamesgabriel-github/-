import React from "react";
import axios from '@/lib/axios';
import Link from 'next/link'

function index({people}){
  console.log(people);

  function delete_person(id){
    axios.delete('api/people/'+id+'/delete').then((response)=>{
      console.log(response);
      location.reload();
  })
  // console.log('api/people/'+id+'/delete');
  }
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <Navbar/>
    // </main>
    // <div className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <h1>Home Page</h1>
    // </div>
    <>
      <h1>People</h1>
      <div className="mt-4 mb-4">
      <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" href="/add_person">Add New Person</a>
      </div>
      
      <center>
        <table id="people">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              // <div className="" key={person.id}>
              //   <p>{person.first_name}</p>
              // </div>
              <tr key={person.id}>
                <td>
                  {person.first_name}
                </td>
                <td>
                  {person.middle_name}
                </td>
                <td>
                  {person.last_name}
                </td>
                <td>
                  <Link className="no-underline hover:underline text-orange-600/100 font-bold mr-2"
                    href={{
                      pathname: '/edit_person',
                      query: {
                        id: person.id,
                      first_name: person.first_name,
                      middle_name: person.middle_name,
                      last_name: person.last_name}
                    }}
                  >
                   Edit
                  </Link>

                  <a onClick={()=>delete_person(person.id)} className="no-underline hover:underline text-red-600/100 font-bold cursor-pointer">Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  )
}

export default index;

export async function getStaticProps() {
  const response = await axios.get("/api/people");
  const people = response.data.people;
  return {
    props: {
      people
    },
  }
}
