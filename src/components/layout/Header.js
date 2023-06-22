import Image from "next/image";
import logoHorizontal from "../../../public/images/logo-horizontal.svg";
import imgLupa from "../../../public/images/search.svg";
import Navbar from "./Navbar";
import { useState } from "react";
import SearchResult from "./SearchResult";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";

const userService = new UserService();

export default function Header() {
  const [result, setResult] = useState([]);
  const [searchParameter, setSearchParameter] = useState([]);
  const router = useRouter();

  let headerClassName = '';
  if(window && window.location.pathname !== "/"){
    headerClassName = "desktop";
  }

  const handleSearchInput = async (e) => {
    setSearchParameter(e.target.value);
    setResult([]);

    if (searchParameter.length < 3) {
      return;
    }

    try {
      const { data } = await userService.search(searchParameter);

      setResult(data);
    } catch (e) {
      alert(
        "Não foi possível realizar a pesquisa de usuário: " +
          e?.response?.data?.error
      );
    }
  };

  const handleClickSearchResult = (id) => {
    setSearchParameter("");
    setResult([]);
    router.push(`/profile/${id}`);
  };

  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <header className={`headerMain ${headerClassName}`}>
      <div className="headerMainContent">
        <div className="logoHeaderMain">
          <Image
            onClick={redirectToHome}
            src={logoHorizontal}
            alt="logo devagram"
            layout="fill"
          />
        </div>
        <div className="searchBar">
          <div className="containerImgSearch">
            <Image src={imgLupa} alt="icon search" layout="fill" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchParameter}
            onChange={handleSearchInput}
          />
        </div>
        <Navbar className="desktop" />
      </div>

      {result.length > 0 && (
        <div className="searchResultContainer">
          {result.map((r) => (
            <SearchResult
              avatar={r.avatar}
              name={r.name}
              email={r.email}
              key={r._id}
              id={r._id}
              onClick={handleClickSearchResult}
            />
          ))}
        </div>
      )}
    </header>
  );
}
