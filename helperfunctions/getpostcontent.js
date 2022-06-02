import axios from "axios";
export default async function (githubkey, path) {
  const myHeaders = {
    headers: {
      Authorization: "Bearer " + githubkey,
    },
  };

  const { data: blogPostMD } = await axios.get(
    "https://raw.githubusercontent.com/artturipa/myblog/main/" +
      encodeURIComponent(path) +
      "/" +
      "blog.md",
    myHeaders
  );

  const { data: blogPostMeta } = await axios.get(
    "https://raw.githubusercontent.com/artturipa/myblog/main/" +
      encodeURIComponent(path) +
      "/" +
      "meta.json",
    myHeaders
  );

  const postContent = {
    content: blogPostMD,
    meta: blogPostMeta,
    path: path,
  };

  return postContent;
}
