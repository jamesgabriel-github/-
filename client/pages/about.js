import React from "react";
import MainLayout from "@/layouts/MainLayout";
// import Layout from '@/components/layout';

function about(){
return (
    // <Layout>
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>About Us Page</h1>
        </div>
    // </Layout>
    )
}

export default about;

// about.getLayout = function getLayout(page){
//     return(
//       <MainLayout>
//         {page}
//       </MainLayout>
//     )
//   }