import axios from "axios";
import getpaths from "./getpaths";
export default async function (githubkey) {
  const myHeaders = {
    headers: {
      Authorization: "Bearer " + githubkey,
    },
  };

  const { data: blogContentResponse } = await axios.get(
    "https://api.github.com/repos/artturipa/myblog/git/trees/main?recursive=1",
    myHeaders
  );

  const blogContentTree = blogContentResponse.tree;
  let blogContentsArr = [];
  let obj = {};
  blogContentTree.forEach((x) => {
    if (x.type === "tree") obj.path = x.path;
    else if (x.type === "blob" && x.path.endsWith(".md")) {
      obj.uri = x.path;
      blogContentsArr.push(obj);
      obj = {};
    }
  });

  const contentResponseArr = [
    ...(await Promise.all(
      blogContentsArr.map(
        (x) =>
          axios.get(
            "https://raw.githubusercontent.com/artturipa/myblog/main/" + x.uri
          ),
        myHeaders
      )
    )),
  ];

  contentResponseArr.forEach((x, i) => {
    blogContentsArr[i].content = x.data;
  });

  const metaResponseArr = [
    ...(await Promise.all(
      blogContentsArr.map(
        (x) =>
          axios.get(
            "https://raw.githubusercontent.com/artturipa/myblog/main/" +
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

  let publishedBlogContent = blogContentsArr.filter(
    (post) => post.meta.published === "yes"
  );

  publishedBlogContent.sort(
    (b, a) =>
      new Date(Date.parse(a.meta.publishDate)) -
      new Date(Date.parse(b.meta.publishDate))
  );

  //const indexPageContentArr = publishedBlogContent.slice(0, 4);

  return publishedBlogContent;
}
