import axios from "axios";
import getpaths from "./getpaths";
export default async function (githubkey) {
  const myHeaders = {
    headers: {
      Authorization: "Bearer " + githubkey,
    },
  };

  console.log("\n\n HERE STARTS GETPOSTS \n\n");

  const { data: blogContentResponse } = await axios.get(
    "https://api.github.com/repos/artturipa/recipes/git/trees/master?recursive=1",
    myHeaders
  );

  const blogContentTree = blogContentResponse.tree;
  let blogContentsArr = [];
  let obj = {};

  blogContentTree.forEach((x) => {
    if (x.path.startsWith("blog_resources")) return;
    if (x.type === "tree") obj.path = x.path;
    else if (x.type === "blob" && x.path.endsWith(".md")) {
      obj.uri = x.path;
    }

    if (obj.uri && obj.path) {
      blogContentsArr.push(obj);
      obj = {};
    }
  });

  console.log("\n\n HERE STARTS contentResponseArr \n\n");

  const contentResponseArr = [
    ...(await Promise.all(
      blogContentsArr.map(
        (x) =>
          axios.get(
            "https://raw.githubusercontent.com/artturipa/recipes/master/" +
              x.uri
          ),
        myHeaders
      )
    )),
  ];

  contentResponseArr.forEach((x, i) => {
    blogContentsArr[i].content = x.data;
  });

  console.log("\n\n HERE STARTS metaResponseArr \n\n");

  const metaResponseArr = [
    ...(await Promise.all(
      blogContentsArr.map(
        (x) =>
          axios.get(
            "https://raw.githubusercontent.com/artturipa/recipes/master/" +
              encodeURIComponent(x.path) +
              "/" +
              "meta.json"
          ),
        myHeaders
      )
    )),
  ];

  metaResponseArr.forEach((x, i) => {
    blogContentsArr[i].meta = x.data;
  });

  console.log("\n\n HERE STARTS publishedBlogContent \n\n");

  let publishedBlogContent = blogContentsArr.filter(
    (post) => post.meta.published === "yes"
  );

  publishedBlogContent.sort(
    (b, a) =>
      new Date(Date.parse(a.meta.publishDate)) -
      new Date(Date.parse(b.meta.publishDate))
  );

  //const indexPageContentArr = publishedBlogContent.slice(0, 4);

  console.log("\n\n HERE RETURNING publishedBlogContent \n\n");
  console.dir(publishedBlogContent);
  return publishedBlogContent;
}
