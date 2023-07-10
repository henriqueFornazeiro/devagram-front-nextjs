import Feed from "../../components/feed";
import withAuth from "../../hoc/withAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeaderProfile from "../../components/headerProfile";
import UserService from "../../services/UserService";

const userService = new UserService();

function Profile({userLogged}) {

  const [user, setUser] = useState({});
  const router = useRouter();

  const getProfile = async (userId) => {
    try {

      const {data} = await userService.getUserProfile(
        userId === "me" ? userLogged.id : userId
      );


      return data;
    } catch (error) {
      alert(`Erro ao obter perfil do usuário! (${error})`);
    }
  }

  const isProfileUserLogged = () =>{
    return router.query.id == "me"
  }

  useEffect( ()=>{
    async function fetchData() {
      if(!router.query.id){
        return;
      }

      const data = await getProfile(router.query.id);
      setUser(data);

    }
    fetchData();    

  },[router.query.id])

  return (
    <>    
      <div className="profilePage">        
        <HeaderProfile userLogged={userLogged} user={user} isProfileUserLogged={isProfileUserLogged() || userLogged.id == router.query.id}/>     
        <Feed userLogged={userLogged} userProfile={user}/>
      </div>
    </>
  );
}

export default withAuth(Profile);
