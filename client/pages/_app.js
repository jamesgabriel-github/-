import '@/styles/globals.css'
import Layout from '@/components/layout';

// export default function App({ Component, pageProps }) {
//   return 
//   (<>
//     <Navbar/>

//   <Component {...pageProps} />
//   </>)
// }

function MyApp({Component, pageProps}){
  return (
  <>
    <Layout>
        <Component {...pageProps} />
    </Layout>
  </>
  )
}

export default MyApp;
