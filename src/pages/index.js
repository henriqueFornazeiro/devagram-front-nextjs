import { useEffect, useState } from "react";
import Login from "../components/login";
import UserService from "@/services/UserService";
import Home from "@/components/home";

const userService = new UserService();
export default function Index() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(()=>{
    setIsAuthenticated(
      userService.isAuthenticated()
    )
  }, []);


  if(isAuthenticated){
    return <Home />
  }

  return (
    <>      
      <Login posAuth={()=> setIsAuthenticated(true)}/>
    </>
  )
}
