import axios from "axios";
export default async function (githubkey) {
  const myHeaders = {
    headers: {
      Authorization: "Bearer " + githubkey,
    },
  };

  console.log("\n\n HERE STARTS GETPATHS \n\n");

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

  console.log("%c \n\n blogContentsArr:\n\n ", "color:red");

  console.dir(blogContentsArr);

  console.log("%c \n\n blogContentTree:\n\n ", "color:red");

  console.dir(blogContentTree);

  console.log("%c \n\n contentResponseArr:\n\n ", "color:red");

  console.dir(contentResponseArr);

  contentResponseArr.forEach((x, i) => {
    blogContentsArr[i].content = x.data;
  });

  console.log("%c \n\n blogContentsArr:\n\n ", "color:red");

  console.dir(blogContentsArr);

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

  let publishedBlogContent = blogContentsArr.filter(
    (post) => post.meta.published === "yes"
  );

  publishedBlogContent.sort(
    (b, a) =>
      new Date(Date.parse(a.meta.publishDate)) -
      new Date(Date.parse(b.meta.publishDate))
  );

  //const indexPageContentArr = publishedBlogContent.slice(0, 4);
  console.log("%c \n\n Returning publishedblogcontent:\n\n ", "color:red");

  console.dir(publishedBlogContent);

  return publishedBlogContent;
}
