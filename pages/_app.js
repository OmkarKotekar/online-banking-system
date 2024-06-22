import "@/styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  useEffect(()=>{
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })

    router.events.on('routeChangeStart', ()=>{
      setProgress(10)
    })

    // const token = localStorage.getItem('token')
    // if(token){
    //   setUser({value:token})
    //   setkey(Math.random())
    // }
  }, [router.query]);

  return(
  <>
    <Head>
      <title>Thakur Bank</title>
      <link rel='icon' href='/bank_logo.png' />
    </Head>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={()=> setProgress(0)} waitingTime={400}/>
      <Navbar/>
    <Component {...pageProps} />
    <Footer/>
  </>
)};
