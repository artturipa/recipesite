import getposts from "helperfunctions/getposts";
import getpaths from "helperfunctions/getpaths";
import getpostcontent from "helperfunctions/getpostcontent";
import Markdown from "marked-react";
import Image from "next/image";

export default function PostPage({ postContent }) {
  console.log("\n\n HERE STARTS SLUG \n\n");
  const dateFormatted = new Date(
    Date.parse(postContent.meta.publishDate)
  ).toLocaleDateString();
  return (
    <>
      <div className="blogPostContainer">
        <div className="blogPost">
          <div className="categoryTags">
            {postContent.meta.categories.split(",").map((tag, i) => {
              return (
                <small
                  key={i}
                  className={"category big " + tag.replace(/\s/g, "")}
                >
                  {tag}
                </small>
              );
            })}
          </div>
          <h1 className="postTitle"> {postContent.meta.title}</h1>
          <div className="postPublished">
            <strong>Raapustettu</strong>{" "}
            <strong className="date">{dateFormatted}</strong>{" "}
            <strong>/ </strong>
            <strong className="author">Artturi & Tatja</strong>
          </div>
          <div className="divider" />

          {postContent.meta.coverPic ? (
            <div className="img">
              <Image
                src={postContent.meta.coverPic}
                alt="coverimage"
                layout="fill"
                priority
              />
            </div>
          ) : (
            ""
          )}

          <div className="postMarkdown">
            <Markdown>{postContent.content}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  console.log("GET STATIC PATHS GOING");
  const pathsUnformatted = await getpaths(process.env.GITHUB_API_KEY);

  const paths = pathsUnformatted.map((post) => {
    return {
      params: {
        slug: post.path,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log("GET STATIC PROPS GOING");
  const postContent = await getpostcontent(process.env.GITHUB_API_KEY, slug);
  return {
    props: {
      postContent,
    },
  };
}
