import Image from "next/image";
import logoHorizontal from "../../../public/images/logo-horizontal.svg";
import imgLupa from "../../../public/images/search.svg";
import Navbar from "./Navbar";
import { useState } from "react";
import SearchResult from "./SearchResult";

export default function Header() {
  const [result, setResult] = useState([]);
  const [searchParameter, setSearchParameter] = useState([]);

  const handleSearchInput =(e)=>{
    setSearchParameter(e.target.value);
    setResult([]);

    if(searchParameter.length<3){
        return
    }
    setResult([{
        avatar:'',
        name:"Henrique",
        email:'henrique@email.com',
        _id:'12345'
    },{
        avatar:'',
        name:"Patolino",
        email:'patolino@email.com',
        _id:'1234'
    },{
        avatar:'',
        name:"Taz",
        email:'taz@email.com',
        _id:'125'
    }])
  }

  const handleClickSearchResult = (id) => {
    console.log("click", { id });
    
  };
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
