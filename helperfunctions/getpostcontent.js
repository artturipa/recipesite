import axios from "axios";
export default async function (githubkey, path) {
  const myHeaders = {
    headers: {
      Authorization: "Bearer " + githubkey,
    },
  };

  console.log("\n\n HERE STARTS GETPOSTCONTENT \n\n");
  console.log("\n\n path: " + path + " \n\n");

  const { data: blogPostMD } = await axios.get(
    "https://raw.githubusercontent.com/artturipa/recipes/master/" +
      encodeURIComponent(path) +
      "/" +
      "blog.md",
    myHeaders
  );
  console.log("PROCESSED A BIT");
  console.dir(blogPostMD);

  const { data: blogPostMeta } = await axios.get(
    "https://raw.githubusercontent.com/artturipa/recipes/master/" +
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

  console.dir(postContent);

  return postContent;
}
