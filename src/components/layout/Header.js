import Image from "next/image";
import logoHorizontal from "../../../public/images/logo-horizontal.svg";
import imgLupa from "../../../public/images/search.svg";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="headerMain">
      <div className="headerMainContent">
        <div className="logoHeaderMain">
          <Image src={logoHorizontal} alt="logo devagram" layout="fill" />
        </div>
        <div className="searchBar">
          <div className="containerImgSearch">
            <Image src={imgLupa} alt="icon search" layout="fill" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            value={""}
            onChange={() => {}}
          />
        </div>
        <Navbar className="desktop" />
      </div>
    </header>
  );
}
