import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Script 
      async 
      strategy='lazyOnload' 
      id='google-analytics-import'
      src="https://www.googletagmanager.com/gtag/js?id=G-FP3T13R77C"
    ></Script>
    <Script
      id='google-analytics-init'
      strategy='lazyOnload' 
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FP3T13R77C');
        `
      }}
    ></Script>
        
    <Component {...pageProps} />
  </>
}

export default MyApp
