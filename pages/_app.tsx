import NextNprogress from 'nextjs-progressbar'
import '../styles/main.scss'
import "react-responsive-modal/styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="yellow"
        startPosition={0.3}
        stopDelayMs={200}
        height="2"
      />
      <Component {...pageProps} />
    </>
  )
}
