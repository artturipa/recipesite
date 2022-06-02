import Link from "next/link";
import Image from "next/image";
import defaultPostImage from "../public/images/godhand.jpeg";

export default function Card({ post }) {
  const tags = ["SN Development", "Architecture", "didsdusd"];

  return (
    <div className="card">
      <Link href={`/blog/${post.path}`}>
        <div className="cardContent">
          <div className="img">
            <Image
              src={post.meta.coverPic ? post.meta.coverPic : defaultPostImage}
              alt="blogpostimage"
              layout="fill"
            />
          </div>
          <div className="detailsAndBottomContent">
            <div className="detailsContent">
              <div className="categoryTags">
                {post.meta.categories.split(",").map((tag, i) => {
                  return (
                    <small
                      key={i}
                      className={"category " + tag.replace(/\s/g, "")}
                    >
                      {tag}
                    </small>
                  );
                })}
              </div>
              <div className="titleAndDate">
                <h3>{post.meta.title}</h3>
                <strong className="publishDate">
                  Posted:{" "}
                  {new Date(
                    Date.parse(post.meta.publishDate)
                  ).toLocaleDateString()}
                </strong>
              </div>

              <p>{post.meta.description}</p>
            </div>
            <div className="readMore">
              <strong>Read More</strong>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
