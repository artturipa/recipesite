import Image from "next/image";
import headerBackground from "../public/images/ta2.jpg";

export default function Header({ showHeaderContent }) {
  console.log("DOING HEADER");
  const styleObj = {
    visibility: showHeaderContent ? "initial" : "hidden",
  };

  return (
    <header className="title">
      <Image src={headerBackground} alt="background" layout="fill" priority />

      <div style={styleObj}>
        <h1>
          Tatjan ja Artturin <br />
          Herkkuruuat ! =)
        </h1>
        <div className="linkRow">
          <a href="/" target="_blank" className="headerLink">
            About
          </a>

          <a href="/" target="_blank" className="headerLink">
            blog archives
          </a>

          <a href="/" target="_blank" className="headerLink">
            Contact{" "}
          </a>
        </div>
      </div>
    </header>
  );
}
