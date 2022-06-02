import Header from "../components/Header";
import "@styles/globals.css";
import Footer from "@components/Footer";

function Application({ Component, pageProps }) {
  const showHeaderContent = pageProps.showHeaderContent ? true : false;
  return (
    <>
      <Header showHeaderContent={showHeaderContent} />
      <main className="container">
        <div className="main">
          <Component {...pageProps} />
        </div>
        {/* <Footer /> */}
      </main>
    </>
  );
}

export default Application;

import "@styles/global-late-loading.css";
