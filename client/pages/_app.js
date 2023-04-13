import '@/styles/globals.css'
import Navbar from '@/components/Navbar'

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
  <Navbar />
    <Component {...pageProps} />
  </>
  )
}

export default MyApp;
