import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layout';

// export default function App({ Component, pageProps }) {
//   return 
//   (<>
//     <Navbar/>

//   <Component {...pageProps} />
//   </>)
// }

function MyApp({Component, pageProps}){
  // const getLayout = Component.getLayout || ((page) => page)
  
  return(
  <>
    <SessionProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  </>
  )
}

export default MyApp;
