import Feed from "@/components/feed";
import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeaderProfile from "@/components/headerProfile";

function Profile({userLogged}) {

  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(()=>{
    setUser({
      name: "Henrique Fornazeiro"
    });
    
  },[router.query.id])

  return (
    <>    
      <div className="profilePage">        
        <HeaderProfile userLogged={userLogged} user={user}/>     
        <Feed userLogged={userLogged}/>
      </div>
    </>
  );
}

export default withAuth(Profile);
