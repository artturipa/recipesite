import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import getposts from "helperfunctions/getposts";
import Card from "@components/Card";

export default function Home({ posts }) {
  return (
    <>
      <div className="container">
        <Head>
          <title>Artturi's Ramblings</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="indexPage">
          <div className="postsContainer">
            {posts.map((post, index) => (
              <Card post={post} key={index} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getposts(process.env.GITHUB_API_KEY);

  return {
    props: {
      posts: await posts,
      showHeaderContent: true,
    },
  };
}
